import styles from "@/assets/styles/admin/layout.module.css";

import avatar from "@/assets/images/no-avatar.png"
import Image from "next/image";
import BreadcrumbCommon from "../Breadcumb";
import { useState } from "react";
import authService from "@/infrastructure/repositories/auth/service/auth.service";
import { useRouter } from "next/navigation";
import { ROUTE_PATH } from "@/core/common/appRouter";
import { Col, Dropdown, Menu, Row, Space } from "antd";
import DialogConfirmCommon from "../../components/modal/dialogConfirm";
import { useRecoilValue } from "recoil";
import { ProfileState } from "@/core/atoms/profile/profileState";
import { configImageURL } from "@/infrastructure/helper/helper";
type Props = {
    breadcrumb: string
    title: string
    redirect: string
    onToggleSidebar: () => void
}
export default function Header(props: Props) {

    const { breadcrumb, title, redirect, onToggleSidebar } = props
    const [isOpenModalLogout, setIsOpenModalLogout] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const dataProfile = useRecoilValue(ProfileState).data;

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

    const openModalLogout = () => {
        setIsOpenModalLogout(true);
    };

    const closeModalLogout = () => {
        setIsOpenModalLogout(false);
    };

    const listAction = () => {
        return (
            <Menu className='action-admin'>
                <Menu.Item className='info-admin' onClick={openModalLogout}>
                    <div className='info-admin-title px-1 py-2 flex align-middle hover:text-[#fc5a5a]' >
                        <svg className='mr-1-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10" />
                            <polyline points="10 17 15 12 10 7" />
                            <line x1="15" y1="12" x2="3" y2="12" />
                        </svg>
                        Đăng xuất
                    </div>
                </Menu.Item>
            </Menu>
        )
    };
    return (
        <>
            <header className={styles.header}>
                <div className={styles.headerLeft}>
                    <button onClick={onToggleSidebar} className={styles.toggleBtn}>
                        <i className="fa fa-bars" aria-hidden="true"></i>
                    </button>
                    <BreadcrumbCommon breadcrumb={breadcrumb} title={title} redirect={redirect} />
                </div>

                <div className={styles.headerRight}>
                    <Row align={"middle"} gutter={[16, 16]}>
                        <Col className='flex flex-col justify-center align-bottom'>
                            <div className={styles.user_name}>
                                {dataProfile?.name}
                            </div>
                            <div className={styles.role}>
                                {dataProfile.email}
                            </div>
                        </Col>
                        <Col>
                            <Dropdown overlay={listAction} trigger={['click']}>
                                <a onClick={(e) => e.preventDefault()}>
                                    <Space>
                                        <div className={styles.avatar_user}>
                                            <div className={`${styles.grad} ${styles.spin}`}></div>
                                            <Image src={dataProfile?.avatarCode ? configImageURL(dataProfile?.avatarCode) : avatar} alt='' width={40} height={40} className={styles.avatar_img} />
                                        </div>

                                    </Space>
                                </a>
                            </Dropdown>
                        </Col>
                    </Row>

                </div>

            </header >
            <DialogConfirmCommon
                message={"Bạn có muốn đăng xuất khỏi hệ thống"}
                titleCancel={"Bỏ qua"}
                titleOk={"Đăng xuất"}
                visible={isOpenModalLogout}
                handleCancel={closeModalLogout}
                handleOk={onLogOut}
                title={"Xác nhận"}
            />
        </>
    );
}