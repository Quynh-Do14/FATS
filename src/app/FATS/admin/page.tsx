import { ROUTE_PATH } from '@/core/common/appRouter';
import AdminLayout from '@/infrastructure/common/Layouts/admin/MainLayout';
import ManageLayout from '@/infrastructure/common/Layouts/Manage-Layout';
import React from 'react';

const ManageLayoutPage = () => {
    return (
        <AdminLayout
            title={''}
            breadcrumb={'Trang quản trị'}
            redirect={ROUTE_PATH.HOME_PAGE}
        ></AdminLayout>
    )
}

export default ManageLayoutPage