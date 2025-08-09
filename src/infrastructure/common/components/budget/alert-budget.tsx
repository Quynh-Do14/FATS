import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { ProfileState } from '../../../../core/atoms/profile/profileState'
import alert from "../../../../assets/images/alert.png"
import { ROUTE_PATH } from '../../../../core/common/appRouter'
import { BudgetState } from '../../../../core/atoms/budget/budgetState'
import { getTokenStoraged } from '@/infrastructure/utils/storage'
import SockJS from 'sockjs-client'
import { Client } from '@stomp/stompjs'
import budgetService from '@/infrastructure/repositories/budget/budget.service'
import authService from '@/infrastructure/repositories/auth/service/auth.service'
const AlertBudget = () => {
    const accessToken = getTokenStoraged();
    const [budget, setBudget] = useState<any>({});
    const [dataProfile, setDataProfile] = useState<any>({});

    const getProfileUser = async () => {
        if (!accessToken) return;
        try {
            await authService.profile(
                () => { }
            ).then((response) => {
                if (response) {
                    setDataProfile(response)

                }
            })
        } catch (error) {
            console.error(error);
        }
    }

    const onGetBudgetAsync = async () => {
        if (!accessToken) return;
        try {
            await budgetService.GetBudget(
                () => { }
            ).then((response) => {
                setBudget(response);

            })
        }
        catch (error) {
            console.error(error)
        }
    };

    useEffect(() => {
        getProfileUser().then(() => { });
        onGetBudgetAsync().then(() => { });
    }, [accessToken])

    useEffect(() => {
        // Lấy JWT từ localStorage hoặc sessionStorage
        const token = accessToken ? accessToken : null;
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

        const wsBaseUrl = process.env.NEXT_PUBLIC_BASE_URL?.replace('/hdkt', '');
        const socket = new SockJS(`${wsBaseUrl}/ws?token=${token}`);

        const stompClient = new Client({
            webSocketFactory: () => socket,
            debug: (str) => {
                console.log('STOMP Debug: ' + str);
            },
            connectHeaders: {
                Authorization: `Bearer ${token}`
            },
            onConnect: (frame) => {
                // Lắng nghe thông báo từ đích riêng của user
                stompClient.subscribe('/user/queue/chat', () => {
                    getProfileUser().then(_ => { });
                    onGetBudgetAsync().then(_ => { });
                });
            },
        });

        stompClient.activate();

        return () => {
            stompClient.deactivate();
        };
    }, [accessToken]);

    return (
        <div className='alert-common'
            style={{
                background: dataProfile?.budgetAlert?.level == 1
                    ? "#006699"
                    : dataProfile?.budgetAlert?.level == 2
                        ?
                        "#c37816f5"
                        :
                        dataProfile?.budgetAlert?.level == 3
                            ?
                            "#eb001bcc"
                            :
                            "#006699"
            }}
        >
            <img src={alert.src} alt="" />
            <div className='level'>
                <div className="budget-info__level">
                    Mức độ: {dataProfile?.budgetAlert?.level}
                </div>
                <p>{budget?.totalIncome == 0 ? <a href={ROUTE_PATH.PROFILE}>Tạo ngân sách. {" "} </a> : null} {dataProfile?.budgetAlert?.alert}</p>
            </div>
        </div>
    )
}

export default AlertBudget