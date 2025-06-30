'use client'
import { Col, Dropdown, Layout, Menu, Row, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import "@/assets/styles/admin/MainLayout.css";
import profile from "@/assets/images/no-avatar.png";
import { ROUTE_PATH } from '@/core/common/appRouter';
import authService from '../../repositories/auth/service/auth.service';
import { useRouter } from 'next/navigation'
import { useRecoilState } from 'recoil';
import DialogConfirmCommon from '../components/modal/dialogConfirm';
import Constants from '@/core/common/constants';
import logo from '@/assets/images/logo.png';
import { isTokenStoraged } from '../../utils/storage';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import categoryBlogService from '@/infrastructure/repositories/category/categoryBlog.service';
import { ProfileState } from '@/core/atoms/profile/profileState';
import { CategoryBlogState } from '@/core/atoms/category/categoryState';
import BreadcrumbCommon from './Breadcumb';
import Image from 'next/image';

const { Header, Content, Sider } = Layout;

const ManageLayout = ({ ...props }: any) => {
    const { title, breadcrumb, redirect } = props
    const [isOpenModalLogout, setIsOpenModalLogout] = useState<boolean>(false);
    const [collapsed, setCollapsed] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false);
    const [dataProfile, setDataProfile] = useState<any>({});
    const [, setProfileState] = useRecoilState(ProfileState);
    const [, setCategoryBlogState] = useRecoilState(CategoryBlogState);

    const pathname = usePathname();
    const router = useRouter();;
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
                                data: response,
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
        <div className="main-layout">
            <Layout>
                <Sider
                    className='sider-custom'
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                >
                    <Menu className='menu-custom' theme="light" mode="inline">
                        <div
                            onClick={() => router.push(ROUTE_PATH.HOME_PAGE)}
                            className="flex items-center justify-center py-4 cursor-pointer"
                        >
                            <img src={logo.src} alt="logo" className='w-20' />
                        </div>
                        {Constants.Menu.List.map((it, index) => (
                            <Menu.Item
                                key={index}
                                className={`menu-item ${pathname.includes(it.link) ? 'active' : ''}`}
                                icon={<i className={it.icon}></i>}
                            >
                                <Link href={it.link}>{it.label}</Link>
                            </Menu.Item>
                        ))}
                    </Menu>

                    <div
                        className='collapse-btn flex items-center justify-center py-3 cursor-pointer'
                        onClick={() => setCollapsed(!collapsed)}
                    >
                        {collapsed ? (
                            <DoubleRightOutlined className='text-white' />
                        ) : (
                            <DoubleLeftOutlined className='text-white' />
                        )}
                    </div>
                </Sider>
                <Layout>
                    <div className='px-4 py-2'>
                        <Row className='header-custom px-4 py-2 shadow-sm' justify="space-between" align="middle">
                            <Col className='flex items-center'>
                                <BreadcrumbCommon breadcrumb={breadcrumb} title={title} redirect={redirect} />
                            </Col>
                            <Col>
                                <Row align="middle" className="gap-3">
                                    <Col className='text-right'>
                                        <div className='font-medium text-sm text-gray-700'>{dataProfile?.name}</div>
                                    </Col>
                                    <Col>
                                        <Dropdown overlay={listAction} trigger={['click']}>
                                            <a onClick={(e) => e.preventDefault()}>
                                                <Space>
                                                    <Image
                                                        className='rounded-full object-cover border cursor-pointer'
                                                        src={dataProfile.avatar || profile.src}
                                                        alt="avatar"
                                                        width={40}
                                                        height={40}
                                                    />
                                                </Space>
                                            </a>
                                        </Dropdown>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>


                    <Content className='content flex flex-col mx-6 mb-2 bg-white'>
                        {props.children}
                    </Content>
                </Layout>
            </Layout>
            <DialogConfirmCommon
                message={"Bạn có muốn đăng xuất khỏi hệ thống"}
                titleCancel={"Bỏ qua"}
                titleOk={"Đăng xuất"}
                visible={isOpenModalLogout}
                handleCancel={closeModalLogout}
                handleOk={onLogOut}
                title={"Xác nhận"}
            />
        </div>
    )
}

export default ManageLayout