'use client'
import styles from "@/assets/styles/admin/layout.module.css";
import Sidebar from "./Sider";
import Header from "./Header";
import { useState } from "react";

const AdminLayout = ({ ...props }: any) => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const { title, breadcrumb, redirect } = props
    return (
        <div className={styles.wrapper}>
            <Sidebar isOpen={isSidebarOpen} />
            <div className={`${styles.mainContent} ${!isSidebarOpen ? styles.full : ''}`}>
                <Header
                    onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
                    breadcrumb={breadcrumb}
                    title={title}
                    redirect={redirect}
                />
                <div className={styles.pageContent}>{props.children}</div>
            </div>
        </div>
    );
}
export default AdminLayout;