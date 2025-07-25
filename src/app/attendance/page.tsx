'use client';
import { useEffect, useState } from 'react';
import styles from '@/assets/styles/page/attendance.module.css';
import LayoutClient from '@/infrastructure/common/Layouts/Client-Layout';
import BannerCommon from '@/infrastructure/common/components/banner/BannerCommon';
import banner2 from '@/assets/images/banner/banner2.png'
import { Col, Row } from 'antd';
import Guide from './components/guide';
import CheckIn from './components/checkIn';

const AttendancePage = () => {
    useEffect(() => {
        const updateCurrentDate = () => {
            const today = new Date()
            const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy']
            const months = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12']

            const dayName = days[today.getDay()]
            const date = today.getDate()
            const month = months[today.getMonth()]
            const el = document.getElementById('currentDate')
            if (el) el.textContent = `${dayName}, ${date} ${month}`
        }

        updateCurrentDate()
    }, [])
    return (
        <LayoutClient>
            <BannerCommon
                title={'Điểm danh nhận xu'}
                sub={'Điểm danh'}
                backgroundUrl={banner2.src}
            />
            <div className="padding-common">
                <div className={styles.attendanceContainer}>
                    <Row gutter={[20, 20]} wrap>
                        <Col md={24} lg={12}>
                            <CheckIn />
                        </Col>
                        <Col md={24} lg={12}>
                            <Guide />
                        </Col>
                    </Row>
                </div>
            </div>
        </LayoutClient>
    );
}
export default AttendancePage