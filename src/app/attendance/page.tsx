'use client';
import { useState } from 'react';
import styles from '@/assets/styles/page/attendance.module.css';
import LayoutClient from '@/infrastructure/common/Layouts/Client-Layout';
import BannerCommon from '@/infrastructure/common/components/banner/BannerCommon';
import banner2 from '@/assets/images/banner/banner2.png'



const AttendancePage = () => {
    const [checkedIn, setCheckedIn] = useState(false);

    const handleCheckIn = () => {
        setCheckedIn(true);
    };

    return (
        <LayoutClient>
            <BannerCommon
                title={'Điểm danh nhận xu'}
                sub={'Điểm danh'}
                backgroundUrl={banner2.src}
            />
            <div className="padding-common">
                <div className={styles.attendanceWrapper}>
                    <div className={styles.card}>
                        <h2>🌞 Điểm danh hàng ngày</h2>
                        <p className={styles.subText}>
                            Nhận thưởng mỗi ngày khi bạn điểm danh!
                        </p>

                        <div className={styles.streakContainer}>
                            <span>🔥 Chuỗi ngày: </span>
                            <strong>5 ngày liên tiếp</strong>
                        </div>

                        <div className={styles.rewardBox}>
                            {/* <FaGift className={styles.giftIcon} /> */}
                            <span>5 xu</span>
                        </div>

                        <button
                            className={`${styles.checkInButton} ${checkedIn ? styles.disabled : ""
                                }`}
                            onClick={handleCheckIn}
                            disabled={checkedIn}
                        >
                            {checkedIn ? (
                                <>
                                     Đã điểm danh
                                </>
                            ) : (
                                "Nhấn để điểm danh"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </LayoutClient>
    );
}
export default AttendancePage