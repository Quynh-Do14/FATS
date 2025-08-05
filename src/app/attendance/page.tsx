'use client';
import { useEffect, useState } from 'react';
import styles from '@/assets/styles/page/attendance.module.css';
import LayoutClient from '@/infrastructure/common/Layouts/Client-Layout';
import BannerCommon from '@/infrastructure/common/components/banner/BannerCommon';
import banner2 from '@/assets/images/banner/banner2.png'
import { Col, Row } from 'antd';
import Guide from './components/guide';
import CheckIn from './components/checkIn';
import AttendanceCalendar from './components/calendar';
import attendanceService from '@/infrastructure/repositories/attendance/attendance.service';
import { FullPageLoading } from '@/infrastructure/common/components/controls/loading';
interface DayData {
    checkinDate: string;
    dayOfWeek: string;
    checkin: boolean;
}

const AttendancePage = () => {
    const [weekDates, setWeekDates] = useState<DayData[]>([]);
    const [todayCheckin, setTodayCheckin] = useState<DayData | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);

    const onGetAttendanceLogAsync = async () => {
        try {
            await attendanceService.GetAttendanceLog(
                {},
                setLoading
            ).then((res) => {
                setWeekDates(res);
            })
        }
        catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        onGetAttendanceLogAsync().then(_ => { });
    }, []);

    useEffect(() => {
        if (weekDates.length) {
            const today = new Date().toISOString().split('T')[0];
            const todayCheckin = weekDates.find(
                (item) => item.checkinDate === today
            );
            setTodayCheckin(todayCheckin)
        }
    }, [weekDates])

    const onCheckInAsync = async () => {
        try {
            await attendanceService.CheckIn(
                {},
                () => {
                    onGetAttendanceLogAsync().then(_ => { });
                },
                setLoading
            ).then(() => { })
        }
        catch (error) {
            console.error(error)
        }
    }
    return (
        <LayoutClient>
            <BannerCommon
                title={'Điểm danh nhận xu'}
                sub={'Điểm danh'}
                backgroundUrl={banner2.src}
            />
            <div className={styles.attendanceContainer}>
                <div className="padding-common">
                    <Row gutter={[20, 20]} wrap>
                        <Col md={24} lg={12}>
                            <CheckIn
                                todayCheckin={todayCheckin}
                                onCheckInAsync={onCheckInAsync}
                            />
                        </Col>
                        <Col md={24} lg={12}>
                            <AttendanceCalendar
                                weekDates={weekDates}
                                todayCheckin={todayCheckin}
                            />
                        </Col>
                        <Col md={24} lg={24}>
                            <Guide />
                        </Col>
                    </Row>
                </div>
            </div>
            <FullPageLoading isLoading={loading} />
        </LayoutClient>
    );
}
export default AttendancePage