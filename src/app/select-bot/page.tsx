'use client'
import { useState } from 'react';
import "@/assets/styles/page/chat.css"
import LayoutClient from '@/infrastructure/common/Layouts/Client-Layout';
import BubbleCommon from '@/infrastructure/common/components/controls/Bubble';
import Constants from '@/core/common/constants';
import { Col, Row } from 'antd';
import authService from '@/infrastructure/repositories/auth/service/auth.service';
import { FullPageLoading } from '@/infrastructure/common/components/controls/loading';
import { ROUTE_PATH } from '@/core/common/appRouter';
import { useRecoilValue } from 'recoil';
import { ProfileState } from '@/core/atoms/profile/profileState';
import { ButtonDesign } from '@/infrastructure/common/components/button/buttonDesign';
import { useRouter } from 'next/navigation';

const SelectBotPage = () => {
    const [selectedOption, setSelectedOption] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const profileState = useRecoilValue(ProfileState).data
    const handleOptionClick = (option: any) => {
        setSelectedOption(option);
    };

    const onChangeBotAsync = async () => {
        try {
            await authService.changeBotChat(
                Number(selectedOption),
                () => {
                    router.push(ROUTE_PATH.HOME_PAGE);
                },
                setLoading
            ).then(() => { })
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <LayoutClient>
            <div className="select-bot-container">
                <BubbleCommon />
                <div className="padding-common">
                    <div className='bg-[#FFFFFF60] rounded-[8px] px-10 py-8'>
                        <h2 className="header">Bạn muốn BotChat có tính cách như thế nào?</h2>
                        <Row gutter={[20, 20]} className="options" justify={"center"}>
                            {
                                Constants.BotChatList.List.map((item, index) => {
                                    return (
                                        <Col xs={24} sm={12} md={8} key={index}>
                                            <div
                                                className={`option ${(selectedOption === item.value) ? 'selected' : ''} ${profileState?.character?.id === item.value ? "owner" : ""}`}
                                                onClick={() => handleOptionClick(item.value)}
                                            >
                                                <img src={item.avatar.src} alt="" width={160} />
                                                {/* <p>{item.label}</p> */}
                                            </div>
                                        </Col>
                                    )
                                })
                            }
                            <Col span={24}>
                                <ButtonDesign
                                    classColor={'green'}
                                    onClick={onChangeBotAsync}
                                    title={'Xác nhận'}
                                />
                            </Col>
                            <Col span={24}>
                                <ButtonDesign
                                    classColor={'transparent'}
                                    onClick={() => router.push(ROUTE_PATH.HOME_PAGE)}
                                    title={'Quay lại'}
                                />
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
            <FullPageLoading isLoading={loading} />
        </LayoutClient>
    );
};

export default SelectBotPage;
