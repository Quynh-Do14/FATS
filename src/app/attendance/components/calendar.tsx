
'use client';

import { useEffect, useState } from 'react';
import styles from '@/assets/styles/page/attendance.module.css';
import coin from '@/assets/images/attendance/coin.png'
import attendanceService from '@/infrastructure/repositories/attendance/attendance.service';
import { isTodayCheckinDate } from '@/infrastructure/helper/helper';
import { useRecoilValue } from 'recoil';
import { ProfileState } from '@/core/atoms/profile/profileState';
interface DayData {
    checkinDate: string;
    dayOfWeek: string;
    checkin: boolean;
}

type Props = {
    weekDates: DayData[];
    todayCheckin: DayData | undefined;
};

const AttendanceCalendar = (props: Props) => {
    const { weekDates, todayCheckin } = props;
    const profileState = useRecoilValue(ProfileState).data;

    return (
        <div className={styles.cardWrapper}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Lịch Tuần Này</h2>
                    <p className={styles.subtitle}>Theo dõi chuỗi điểm danh của bạn</p>
                </div>

                {/* Lịch tuần */}
                <div className={styles.calendarContainer}>
                    <div className={styles.weekDayGrid}>
                        <div className={styles.weekDay}>T2</div>
                        <div className={styles.weekDay}>T3</div>
                        <div className={styles.weekDay}>T4</div>
                        <div className={styles.weekDay}>T5</div>
                        <div className={styles.weekDay}>T6</div>
                        <div className={styles.weekDay}>T7</div>
                        <div className={styles.weekDay}>CN</div>
                    </div>

                    <div className={styles.dateGrid}>
                        {weekDates.map((day, index) => (
                            <div
                                key={index}
                                className={`
                  ${styles.dateCell}
                  ${isTodayCheckinDate(day.checkinDate) ? styles.today : ''}
                  ${day.checkin ? styles.checkedIn : styles.notCheckedIn}
                `}
                            >
                                {day.checkin && (
                                    <svg className={styles.checkIcon} fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                    </svg>
                                )}
                                <span className={styles.dateText}>{index + 1}</span>
                            </div>
                        ))}
                    </div>

                    {/* <div className={styles.dateGrid}>
                        {weekDates.map((day, index) => (
                            <div
                                key={index}
                                className={`
                  ${styles.dateCell}
                  ${day.isToday ? styles.today : ''}
                  ${day.isCheckedIn ? styles.checkedIn : styles.notCheckedIn}
                `}
                            >
                                {day.isCheckedIn && (
                                    <svg className={styles.checkIcon} fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                    </svg>
                                )}
                                <span className={styles.dateText}>{day.date}</span>
                            </div>
                        ))}
                    </div> */}
                </div>

                {/* Chú thích */}
                <div className={styles.legend}>
                    {
                        todayCheckin?.checkin
                            ?
                            <div className={styles.legendItem}>
                                <div className={`${styles.legendIcon} ${styles.legendCheckedIn}`}>
                                    <svg className={styles.legendCheckIcon} fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                    </svg>
                                </div>
                                <span>Đã điểm danh</span>
                            </div>
                            :
                            <div className={styles.legendItem}>
                                <div className={`${styles.legendIcon} ${styles.legendNotCheckedIn}`}></div>
                                <span>Chưa điểm danh</span>
                            </div>
                    }
                </div>

                {/* Đếm chuỗi */}
                <div className={`
                    ${styles.coinWallet}
                    relative overflow-hidden
                    bg-gradient-to-br from-amber-400 to-amber-600
                    rounded-2xl p-5
                    shadow-2xl
                    border-2 border-amber-300
                    hover:shadow-golden-glow
                    transition-all duration-500
                    group
                    `}>
                    {/* Hiệu ứng ánh sáng vàng chói */}
                    <div className={`
                        absolute inset-0 
                        bg-[radial-gradient(circle_at_center,_rgba(255,215,0,0.4)_0%,_transparent_70%)]
                        opacity-0 group-hover:opacity-100
                        transition-opacity duration-700
                    `}></div>

                    {/* Nội dung chính với layout mới */}
                    <div className="relative z-10 flex items-center gap-4">
                        {/* Icon xu với animation xoay 3D */}
                        <div className={`
                            ${styles.coin3D}
                            w-12 h-12 flex items-center justify-center
                            bg-amber-400 rounded-full
                            shadow-[0_0_20px_rgba(255,215,0,0.6)]
                            border-2 border-amber-200
                            `}>
                            <img
                                src={coin.src}
                                alt="FATS Coin"
                                className="w-8 h-8 object-contain animate-coin-spin"
                            />
                        </div>

                        {/* Thông tin số xu với hiệu ứng "vàng chảy" */}
                        <div className="flex flex-col">
                            <span className="text-xs font-semibold text-amber-800/90">TÀI KHOẢN XU</span>
                            <div className="flex items-end gap-1">
                                <span className={`
                                    ${styles.coinCounter} 
                                    text-2xl font-extrabold text-amber-900
                                    text-shadow-gold
                                    tracking-wide
                                    `}>
                                    {profileState.coinCheckin ? profileState.coinCheckin : 0}
                                </span>
                                <span className="text-sm font-semibold text-amber-800 mb-0.5">xu</span>
                            </div>
                        </div>

                        {/* Hiệu ứng hạt vàng rơi */}
                        <div className={styles.goldParticles}></div>
                    </div>

                    {/* Hiệu ứng ánh sáng lấp lánh ngẫu nhiên */}
                    <div className={styles.coinSparkles}></div>
                </div>
            </div>
        </div>
    );
};

export default AttendanceCalendar;