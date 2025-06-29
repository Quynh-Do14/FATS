import styles from "@/assets/styles/admin/layout.module.css";
import BreadcrumbCommon from "../Breadcumb";
import { Dropdown, Menu, Space } from "antd";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { isTokenStoraged } from "@/infrastructure/utils/storage";
import { useRecoilState } from "recoil";
import { ProfileState } from "@/core/atoms/profile/profileState";
import { CategoryBlogState } from "@/core/atoms/category/categoryState";
import { ROUTE_PATH } from "@/core/common/appRouter";
import authService from "@/infrastructure/repositories/auth/service/auth.service";
import categoryBlogService from "@/infrastructure/repositories/category/categoryBlog.service";
import { configImageURL } from "@/infrastructure/helper/helper";
import avatar from "@/assets/images/no-avatar.png";

type Props = {
    title: string,
    breadcrumb: string,
    redirect: string,
    onToggleSidebar: () => void,
}
export default function Header(props: Props) {
    const { title, breadcrumb, redirect, onToggleSidebar } = props
    const [dataProfile, setDataProfile] = useState<any>({});
    const [, setProfileState] = useRecoilState(ProfileState);
    const [, setCategoryBlogState] = useRecoilState(CategoryBlogState);
    const [loading, setLoading] = useState<boolean>(false);
    const [isOpenModalLogout, setIsOpenModalLogout] = useState<boolean>(false);
    const [collapsed, setCollapsed] = useState<boolean>(false);

    const pathname = usePathname();
    const router = useRouter();
    const token = isTokenStoraged();

    const openModalLogout = () => {
        setIsOpenModalLogout(true);
    };

    const closeModalLogout = () => {
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

    const getProfileUser = async () => {
        if (token) {
            try {
                await authService.profile(
                    () => { }
                ).then((response) => {
                    if (response) {
                        setDataProfile(response)
                        setProfileState(
                            {
                                user: response,
                            }
                        )
                    }
                })
            } catch (error) {
                console.error(error);
            }
        }
    }

    useEffect(() => {
        if (token) {
            getProfileUser().then(() => { });
        }
    }, [token]);

    const onGetListCategoryBlogAsync = async () => {
        try {
            await categoryBlogService.GetCategory(
                {},
                () => { }
            ).then((response) => {
                setCategoryBlogState(
                    {
                        data: response.content,
                    }
                )
            })
        }
        catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        onGetListCategoryBlogAsync().then(() => { });
    }, []);
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
        <header className={styles.header}>
            {/* <button onClick={onToggleSidebar} className={styles.toggleBtn}>☰</button> */}
            <BreadcrumbCommon
                breadcrumb={breadcrumb}
                title={title}
                redirect={redirect}
            />
            <div className={styles.headerRight}>
                <Dropdown overlay={listAction} trigger={['click']}>
                    <a onClick={(e) => e.preventDefault()}>
                        <Space>
                            <div className=" ">
                                <img src={dataProfile?.avatarCode ? configImageURL(dataProfile?.avatarCode) : avatar.src} className="rounded-full w-10 h-10" width={50} height={50} alt='' />
                            </div>

                        </Space>
                    </a>
                </Dropdown>
            </div>
        </header>
    );
}