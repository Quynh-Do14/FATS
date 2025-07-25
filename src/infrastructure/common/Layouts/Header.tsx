'use client'
import { Col, Dropdown, Menu, Row, Space } from 'antd'
import "@/assets/styles/components/MainLayout.css";
import { useEffect, useState } from 'react'
import Constants from '@/core/common/constants'
import { ROUTE_PATH } from '@/core/common/appRouter';
import { isTokenStoraged } from '../../utils/storage';
import authService from '../../repositories/auth/service/auth.service';
import { useRecoilState } from 'recoil';
import { ProfileState } from '@/core/atoms/profile/profileState';
import DialogConfirmCommon from '../components/modal/dialogConfirm';
import ProfileModal from './Profile';
import ChangePasswordModal from '../components/toast/changePassword';
import { configImageURL } from '../../helper/helper';
import LoginModal from '@/app/auth/Login';
import RegisterModal from '@/app/auth/Register';
import avatar from '@/assets/images/no-avatar.png';
import logo from '@/assets/images/logo.png';
import { FullPageLoading } from '../components/controls/loading';
import DialogNotificationCommon from '../components/modal/dialogNotification';
import { ButtonDesign } from '../components/button/buttonDesign';
import { useRouter, usePathname } from "next/navigation";
import Link from 'next/link';

type Props = {
    dataProfile: any
    scrollDirection: boolean
    lastScrollY: number
    isLoginClick: boolean,
    setIsLoginClick: Function,
    isOpenModalLogout: boolean,
    setIsOpenModalLogout: Function,
    isOpenModalProfile: boolean,
    setIsOpenModalProfile: Function,
    isOpenModalChangePassword: boolean,
    setIsOpenModalChangePassword: Function,

}
const HeaderClient = (props: Props) => {
    const {
        dataProfile,
        scrollDirection,
        lastScrollY,
        isLoginClick,
        setIsLoginClick,
        isOpenModalLogout,
        setIsOpenModalLogout,
        isOpenModalProfile,
        setIsOpenModalProfile,
        isOpenModalChangePassword,
        setIsOpenModalChangePassword,
    } = props;
    const router = useRouter();
    const pathname = usePathname();

    const [dataLogined, setDataLogined] = useState<boolean>(false)
    const [isRegister, setIsRegisterClick] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [isOpenModalSuccesss, setIsOpenModalSuccesss] = useState<boolean>(false);
    const [token, setToken] = useState<boolean>(false);
    const [isLoadingToken, setIsLoadingToken] = useState<boolean>(false);

    const [, setProfileState] = useRecoilState(ProfileState);

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

    const openModalLogout = () => {
        setIsOpenModalLogout(true);
    };

    const onCloseModalLogout = () => {
        setIsOpenModalLogout(false);
    };

    const onLogOut = async () => {
        setIsOpenModalLogout(false);
        try {
            await authService.logout(
                setLoading
            ).then(() => {
                router.push(ROUTE_PATH.HOME_PAGE);
                window.location.reload();
            });
        } catch (error) {
            console.error(error);
        }
    }

    const openModalProfile = () => {
        setIsOpenModalProfile(true);
    };

    const onCloseModalProfile = () => {
        setIsOpenModalProfile(false);
    };

    const openModalChangePassword = () => {
        setIsOpenModalChangePassword(true);
    };

    const onCloseModalChangePassword = () => {
        setIsOpenModalChangePassword(false);
    };

    const listAction = () => {
        return (
            <Menu className='action-admin'>
                {
                    isAdmin
                    &&
                    <Menu.Item className='info-admin' onClick={() => { router.push(ROUTE_PATH.MANAGE_LAYOUT) }}>
                        <div className='info-admin-title px-1 py-2 flex items-center hover:text-[#5e5eff]'>
                            <i className="fa fa-task" aria-hidden="true"></i>
                            Quản trị viên
                        </div>
                    </Menu.Item>
                }
                <Menu.Item className='info-admin'>
                    <a href={ROUTE_PATH.PROFILE}>
                        <div className='info-admin-title px-1 py-2 flex items-center hover:text-[#5e5eff]'>
                            <i className='fa fa-user' aria-hidden='true'></i>
                            Thông tin cá nhân
                        </div>
                    </a>
                </Menu.Item>

                <Menu.Item className='info-admin' >
                    <a href={ROUTE_PATH.SELECT_CHAT_BOT}>
                        <div className='info-admin-title px-1 py-2 flex items-center hover:text-[#5e5eff]'>
                            <i className="fa fa-retweet" aria-hidden="true"></i>
                            Thay đổi Bot Chat
                        </div>
                    </a>
                </Menu.Item>
                <Menu.Item className='info-admin' onClick={openModalChangePassword}>
                    <div className='info-admin-title px-1 py-2 flex items-center hover:text-[#5e5eff]'>
                        <i className="fa fa-key" aria-hidden="true"></i>
                        Đổi mật khẩu
                    </div>
                </Menu.Item>
                <Menu.Item className='info-admin' onClick={openModalLogout}>
                    <div className='info-admin-title px-1 py-2 flex items-center hover:text-[#fc5a5a]' >
                        <i className='fa fa-sign-out' aria-hidden='true'></i>
                        Đăng xuất
                    </div>
                </Menu.Item>
            </Menu >
        )
    };

    const conditionActive = (link: string) => {
        if (pathname === ROUTE_PATH.HOME_PAGE) {
            return link === ROUTE_PATH.HOME_PAGE ? "active" : "";
        }

        if (link === ROUTE_PATH.HOME_PAGE) {
            return "";
        }

        return pathname.includes(link) ? "active" : "";
    };

    return (
        <div className={`header-common header-layout-client ${scrollDirection ? 'down' : 'up'} ${lastScrollY == 0 ? "bg-change-none" : "bg-change"}`}>
            <nav className="flex items-center justify-between">
                <Link href={ROUTE_PATH.HOME_PAGE}>
                    <img className='cursor-pointer' width={80} height={50} src={logo.src} alt='' />
                </Link>
                <nav className="menu">
                    {
                        Constants.MenuClient.List.map((item, index) => {
                            if (!item.private) {
                                return (
                                    <Link
                                        href={item.link}
                                        key={index}
                                        className={`${conditionActive(item.link)}`}
                                    >{item.label}</Link>
                                )
                            }
                            else {
                                if (isLoadingToken) {
                                    if (token) {
                                        return (
                                            <a
                                                href={item.link}
                                                key={index}
                                                className={`${conditionActive(item.link)}`}
                                            >{item.label}</a>
                                        )
                                    }
                                    else {
                                        return (
                                            <a
                                                href={ROUTE_PATH.LOGIN}
                                                key={index}
                                                className={`${conditionActive(item.link)} cursor-pointer`}
                                            >{item.label}</a>
                                        )
                                    }
                                }
                                else {
                                    return null
                                }
                            }
                        })
                    }
                </nav>
                <div className="flex space-x-4">
                    <div>
                        {
                            isLoadingToken
                                ?
                                (
                                    token ? (
                                        <Row align={"middle"} >
                                            <Col className='mr-2 flex flex-col justify-center align-bottom'>
                                                <div className='user-name'>
                                                    {dataProfile?.name}
                                                </div>
                                                <div className='role'>
                                                    {dataProfile.email}
                                                </div>
                                            </Col>
                                            <Col>
                                                <Dropdown overlay={listAction} trigger={['click']}>
                                                    <a onClick={(e) => e.preventDefault()}>
                                                        <Space>
                                                            <div className="avatar-user">
                                                                <div className="grad spin"></div>
                                                                <img src={dataProfile?.avatarCode ? configImageURL(dataProfile?.avatarCode) : avatar.src} className="avatar-img border-radius" alt='' />
                                                            </div>

                                                        </Space>
                                                    </a>
                                                </Dropdown>
                                            </Col>
                                        </Row>
                                    ) : (
                                        <div className='flex items-center gap-2'>
                                            <ButtonDesign
                                                width={120}
                                                classColor={'transparent'}
                                                title={'Đăng Nhập'}
                                                onClick={() => router.push(ROUTE_PATH.LOGIN)}
                                            />
                                            <ButtonDesign
                                                width={120}
                                                classColor={'green'}
                                                title={'Đăng Kí'}
                                                onClick={() => router.push(ROUTE_PATH.REGISTER)}
                                            />
                                        </div>
                                    )
                                )
                                :
                                null
                        }
                    </div>
                </div>
            </nav >
            <LoginModal
                isLoginClick={isLoginClick}
                setIsLoginClick={setIsLoginClick}
                setLoading={setLoading}
                setDataLogined={setDataLogined}
                setIsRegisterClick={setIsRegisterClick}
            />
            <RegisterModal
                setLoading={setLoading}
                isRegister={isRegister}
                setIsRegisterClick={setIsRegisterClick}
                setIsOpenModalSuccesss={setIsOpenModalSuccesss}
            />
            <DialogNotificationCommon
                title={'Đăng kí tài khoản thành công'}
                message={'Đăng ký thành công, vui lòng kiểm tra email (bao gồm spam) để kích hoạt tài khoản'}
                titleCancel={'Đóng'}
                handleCancel={() => setIsOpenModalSuccesss(false)}
                visible={isOpenModalSuccesss}
            />
            <DialogConfirmCommon
                message={"Bạn có muốn đăng xuất khỏi hệ thống"}
                titleCancel={"Bỏ qua"}
                titleOk={"Đăng xuất"}
                visible={isOpenModalLogout}
                handleCancel={onCloseModalLogout}
                handleOk={onLogOut}
                title={"Xác nhận"}
            />
            <ProfileModal
                handleCancel={onCloseModalProfile}
                visible={isOpenModalProfile}
                loading={loading}
                setLoading={setLoading}
            />
            <ChangePasswordModal
                handleCancel={onCloseModalChangePassword}
                visible={isOpenModalChangePassword}
                isLoading={loading}
            />
            <FullPageLoading isLoading={loading} />
        </div >
    )
}

export default HeaderClient