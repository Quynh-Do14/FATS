'use client'
import { Col, Dropdown, Layout, Menu, Row, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import "@/assets/styles/components/MainLayout.css";
import profile from "@/assets/images/no-avatar.png";
import { ROUTE_PATH } from '@/core/common/appRouter';
import { useRouter } from 'next/navigation'
import { useRecoilState } from 'recoil';
import Constants from '@/core/common/constants';
import logo from '@/assets/images/logo.png';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { isTokenStoraged } from '@/infrastructure/utils/storage';
import authService from '@/infrastructure/repositories/auth/service/auth.service';
import DialogConfirmCommon from '@/infrastructure/common/components/modal/dialogConfirm';
import { ProfileState } from '@/core/atoms/profile/profileState';
import BreadcrumbCommon from '@/infrastructure/common/Layouts/Breadcumb';
import AdminLayout from '@/infrastructure/common/Layouts/admin/MainLayout';

const { Header, Content, Sider } = Layout;

const ManageLayout = ({ ...props }: any) => {

    return (
        <AdminLayout></AdminLayout>
    )
}

export default ManageLayout