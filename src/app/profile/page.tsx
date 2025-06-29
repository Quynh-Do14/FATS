'use client'
import React, { useEffect, useState } from 'react';
import LayoutClient from '@/infrastructure/common/Layouts/Client-Layout';
import BannerCommon from '@/infrastructure/common/components/banner/BannerCommon';
import { isTokenStoraged } from '@/infrastructure/utils/storage';
import { useRecoilState } from 'recoil';
import { ProfileState } from '@/core/atoms/profile/profileState';
import authService from '@/infrastructure/repositories/auth/service/auth.service';
import { configImageURL } from '@/infrastructure/helper/helper';
import { WarningMessage } from '@/infrastructure/common/components/toast/notificationToast';
import { FullPageLoading } from '@/infrastructure/common/components/controls/loading';
import { Col, Row } from 'antd';
import InputTextCommon from '@/infrastructure/common/components/input/input-text';
import { ButtonDesign } from '@/infrastructure/common/components/button/buttonDesign';
import UploadAvatar from '@/infrastructure/common/components/input/upload-avatar';
import "@/assets/styles/page/profile.css";
import { ButtonSend } from '@/infrastructure/common/components/button/buttonSend';
import { ROUTE_PATH } from '@/core/common/appRouter';
import InputNumberCommon from '@/infrastructure/common/components/input/input-number';
import budgetService from '@/infrastructure/repositories/budget/budget.service';
import Constants from '@/core/common/constants';
import banner3 from '@/assets/images/banner/banner3.png'
import DialogNotificationCommon from '@/infrastructure/common/components/modal/dialogNotification';
import { useRouter } from 'next/navigation';

const ProfilePage = () => {
    const [validate, setValidate] = useState<any>({});
    const [validateBudget, setValidateBudget] = useState<any>({});
    const [submittedTime, setSubmittedTime] = useState<any>();
    const [detailProfile, setDetailProfile] = useState<any>({});
    const [budget, setBudget] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false)
    const [tab, setTab] = useState<number>(1);
    const [isOpenModalSuccesss, setIsOpenModalSuccesss] = useState<boolean>(false);

    const [token, setToken] = useState<boolean>(false);
    const [isLoadingToken, setIsLoadingToken] = useState<boolean>(false);

    const router = useRouter();

    const [, setDetailState] = useRecoilState(ProfileState);

    const [_data, _setData] = useState<any>({});
    const dataProfile = _data;

    const setDataProfile = (data: any) => {
        Object.assign(dataProfile, { ...data });
        _setData({ ...dataProfile });
    };

    const isValidData = () => {
        let allRequestOK = true;

        setValidate({ ...validate });

        Object.values(validate).forEach((it: any) => {
            if (it.isError === true) {
                allRequestOK = false;
            }
        });
        return allRequestOK;
    };

    const isValidDataBudget = () => {
        let allRequestOK = true;

        setValidateBudget({ ...validateBudget });

        Object.values(validateBudget).forEach((it: any) => {
            if (it.isError === true) {
                allRequestOK = false;
            }
        });
        return allRequestOK;
    };

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const tokenS = await isTokenStoraged();
                setToken(tokenS);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoadingToken(true);
            }
        };

        fetchToken();
    }, []);

    const onGetProfileAsync = async () => {
        if (isLoadingToken) {
            if (!token) return;
            try {
                await authService.profile(
                    setLoading
                ).then((response) => {
                    setDetailProfile(response);
                    setDetailState({
                        user: response
                    })
                });
            }
            catch (error) {
                console.error(error);
            }
        }
    };

    const onGetBudgetAsync = async () => {
        if (isLoadingToken) {
            if (!token) return;
            try {
                await budgetService.GetBudget(
                    setLoading
                ).then((response) => {
                    setBudget(response);

                })
            }
            catch (error) {
                console.error(error)
            }
        }
    };

    useEffect(() => {
        onGetProfileAsync().then(() => { })
        onGetBudgetAsync().then(() => { });
    }, [token, isLoadingToken])

    useEffect(() => {
        if (detailProfile) {
            setDataProfile({
                avatar: detailProfile.avatarCode ? configImageURL(detailProfile.avatarCode) : null,
                email: detailProfile.email,
                username: detailProfile.username,
                name: detailProfile.name,
                phoneNumber: detailProfile.phoneNumber,

            });
        }
    }, [detailProfile]);


    useEffect(() => {
        if (budget) {
            setDataProfile({
                goalsSet: budget.goalsSet,
                totalIncome: budget.totalIncome,
                totalExpense: budget.totalExpense,
            });
        }
    }, [budget]);

    const onUpdateProfile = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await authService.updateProfile(
                String(dataProfile.avatar).includes("https")
                    ?
                    {
                        email: dataProfile.email,
                        username: dataProfile.username,
                        name: dataProfile.name,
                        phoneNumber: dataProfile.phoneNumber,
                    }
                    :
                    {
                        avatar: dataProfile.avatar || null,
                        email: dataProfile.email,
                        username: dataProfile.username,
                        name: dataProfile.name,
                        phoneNumber: dataProfile.phoneNumber,
                    }
                ,
                () => {
                    onGetProfileAsync();
                    router.push(ROUTE_PATH.HOME_PAGE)
                },
                setLoading
            )
        }
        else {
            WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
        };
    };

    const onUpdateBudget = async () => {
        if (budget.totalIncome) {
            await setSubmittedTime(Date.now());
            if (isValidDataBudget()) {
                await budgetService.UpdateBudget(
                    {
                        totalIncome: dataProfile.totalIncome,
                    },
                    () => {
                        onGetBudgetAsync();
                        setIsOpenModalSuccesss(true)
                    },
                    setLoading
                )
            }
            else {
                WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
            };
        }
        else {
            await setSubmittedTime(Date.now());
            if (isValidDataBudget()) {
                await budgetService.CreateBudget(
                    {
                        totalIncome: dataProfile.totalIncome,
                    },
                    () => {
                        onGetBudgetAsync();
                        router.push(ROUTE_PATH.HOME_PAGE)
                    },
                    setLoading
                )
            }
            else {
                WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
            };
        }

    };
    const onCloseSuccessModal = () => {
        setIsOpenModalSuccesss(false)
        router.push(ROUTE_PATH.HOME_PAGE)
    }

    const botInfo = Constants.BotChatList.List.find((item) => item.value === detailProfile?.character?.id)
    return (
        <LayoutClient>
            <BannerCommon
                title={'Hồ sơ'}
                sub={'Thông tin cá nhân'}
                backgroundUrl={banner3.src}
            />
            <div className='profile-page'>
                <div className='container'>
                    <div className="tabs">
                        {
                            Constants.ProfileTab.List.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        onClick={() => setTab(item.value)}
                                        className={`${tab == item.value ? "active" : "no-active"} option`}
                                    >
                                        <p>
                                            {item.label}
                                        </p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    {
                        tab == 1
                            ?
                            <div className='content'>
                                <h2>Thông tin ngân sách</h2>
                                <Row gutter={[20, 20]}>
                                    <Col span={24}>
                                        <InputNumberCommon
                                            label={"Tổng thu nhập (VNĐ)"}
                                            attribute={"totalIncome"}
                                            isRequired={true}
                                            dataAttribute={dataProfile.totalIncome}
                                            setData={setDataProfile}
                                            disabled={false}
                                            validate={validateBudget}
                                            setValidate={setValidateBudget}
                                            submittedTime={submittedTime}
                                        />
                                    </Col>
                                    <Col span={24}>
                                        <ButtonDesign
                                            onClick={onUpdateBudget}
                                            classColor="green"
                                            title={'Cập nhật ngân sách'}
                                        />
                                    </Col>
                                </Row>
                            </div>
                            :
                            tab == 2
                                ?
                                <div className='content'>
                                    <h2>Thông tin BotChat</h2>
                                    <div className='chatbot'>
                                        <div className='flex flex-col gap-2 items-center'>
                                            <img src={botInfo?.avatar.src} alt='' width={100} />
                                        </div>
                                        <div className='bot-name'>
                                            <p>{detailProfile.character?.description}</p>
                                            <ButtonSend
                                                classColor={'green'}
                                                onClick={() => router.push(ROUTE_PATH.SELECT_CHAT_BOT)}
                                                width={180}
                                                title={'Thay đổi Bot'}
                                            />
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className='content'>
                                    <h2>Thông tin cá nhân</h2>
                                    <div className='flex items-center gap-4'>
                                        <UploadAvatar
                                            label={"Ảnh đại diện"}
                                            attribute={"avatar"}
                                            setData={setDataProfile}
                                            dataAttribute={dataProfile.avatar}
                                            listType={"picture-circle"}
                                            shape={"circle"}
                                        />
                                        <div className="flex flex-col gap-1 items-start">
                                            <div className='text-[16px] text-[#8893a7] font-semibold text-truncate'>
                                                {dataProfile.name}
                                            </div>
                                            <div className='text-[14px] text-[#6b7280] font-normal underline text-truncate'>
                                                {dataProfile.email}
                                            </div>
                                        </div>
                                    </div>
                                    <Row gutter={[20, 20]}>
                                        <Col span={24}>
                                            <InputTextCommon
                                                label={"Tên đăng nhập"}
                                                attribute={"username"}
                                                isRequired={false}
                                                dataAttribute={dataProfile.username}
                                                setData={setDataProfile}
                                                disabled={true}
                                                validate={validate}
                                                setValidate={setValidate}
                                                submittedTime={submittedTime}
                                            />
                                        </Col>
                                        <Col span={24}>
                                            <InputTextCommon
                                                label={"Email"}
                                                attribute={"email"}
                                                isRequired={false}
                                                dataAttribute={dataProfile.email}
                                                setData={setDataProfile}
                                                disabled={true}
                                                validate={validate}
                                                setValidate={setValidate}
                                                submittedTime={submittedTime}
                                            />
                                        </Col>
                                        <Col span={24}>
                                            <InputTextCommon
                                                label={"Tên người dùng"}
                                                attribute={"name"}
                                                isRequired={true}
                                                dataAttribute={dataProfile.name}
                                                setData={setDataProfile}
                                                disabled={false}
                                                validate={validate}
                                                setValidate={setValidate}
                                                submittedTime={submittedTime}
                                            />
                                        </Col>
                                        <Col span={24}>
                                            <InputTextCommon
                                                label={"Số điện thoại"}
                                                attribute={"phoneNumber"}
                                                isRequired={true}
                                                dataAttribute={dataProfile.phoneNumber}
                                                setData={setDataProfile}
                                                disabled={false}
                                                validate={validate}
                                                setValidate={setValidate}
                                                submittedTime={submittedTime}
                                            />
                                        </Col>
                                        <Col span={24}>
                                            <ButtonDesign
                                                onClick={onUpdateProfile}
                                                classColor="green"
                                                title={'Cập nhật'}
                                            />
                                        </Col>
                                    </Row>
                                </div>
                    }
                </div>
                <DialogNotificationCommon
                    title={'Cập nhật ngân sách thành công'}
                    message={'Thông tin cập nhật mới sẽ được áp dụng vào tháng tiếp theo'}
                    titleCancel={'Đóng'}
                    handleCancel={onCloseSuccessModal}
                    visible={isOpenModalSuccesss}
                />
            </div>
            <FullPageLoading isLoading={loading} />
        </LayoutClient>
    )
}

export default ProfilePage