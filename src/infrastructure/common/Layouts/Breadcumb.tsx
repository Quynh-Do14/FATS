"use client"
import { Breadcrumb } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import styles from '@/assets/styles/admin/breadcumb.module.css'
import { ROUTE_PATH } from '@/core/common/appRouter';
type Props = {
    title: string,
    breadcrumb: string,
    redirect: string,
    isAdmin?: boolean,
}
const BreadcrumbCommon = (props: Props) => {
    const { title, breadcrumb, redirect, isAdmin = false } = props;
    const router = useRouter();
    const onNavigate = () => {
        router.push(redirect);
    };
    return (
        <div>
            <div className={styles.breadcumb_container}>
                <div>
                    <Breadcrumb className='flex items-center' separator={<CaretRightOutlined className={`${isAdmin ? styles.font_style_admin : styles.font_style}`} />}>
                        <Breadcrumb.Item className={`${isAdmin ? styles.font_style_admin : styles.font_style}`} onClick={() => router.push(ROUTE_PATH.HOME_PAGE)}>Trang chủ</Breadcrumb.Item>
                        <Breadcrumb.Item className={`${isAdmin ? styles.font_style_admin : styles.font_style}`} onClick={onNavigate}>{breadcrumb}</Breadcrumb.Item>
                        <Breadcrumb.Item className={`${isAdmin ? styles.font_style_admin : styles.font_style}`}>{title}</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            </div>
        </div >
    )
}
export default BreadcrumbCommon