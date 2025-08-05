// components/CheckInCard.tsx
import { useEffect, useState } from 'react';
import styles from '@/assets/styles/page/attendance.module.css';
import coin from '@/assets/images/attendance/coin.png'
interface DayData {
    checkinDate: string;
    dayOfWeek: string;
    checkin: boolean;
}

type Props = {
    onCheckInAsync: () => void;
    todayCheckin: DayData | undefined;
};
const CheckIn = (props: Props) => {
    const { onCheckInAsync, todayCheckin } = props
    const [currentDate, setCurrentDate] = useState<string>('');

    useEffect(() => {
        const date = new Date();
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        };
        setCurrentDate(date.toLocaleDateString('vi-VN', options));
    }, []);


    return (
        <div className={styles.checkIn}>
            <div className={`${styles.card} ${styles.cardHover}`}>
                <div className={styles.textCenter}>
                    {/* Motivational Quote */}
                    <div className="mb-4">
                        <h3 className={`${styles.title} ${styles.textGlow}`}>Thêm một ngày, thêm một xu!</h3>
                        <p className={styles.subtitle}>Hôm nay bạn đã sẵn sàng nhận thưởng chưa?</p>
                    </div>

                    {/* Current Date */}
                    <div className="mb-4">
                        <div className={styles.currentDateContainer}>
                            <p className={styles.currentDateLabel}>Hôm nay</p>
                            <p className={styles.currentDate} id="currentDate">{currentDate}</p>
                        </div>
                    </div>

                    {/* Coin Display */}
                    <div className="mb-4 flex flex-col items-center justify-center gap-2">
                        <div className={`${styles.coinContainer} ${styles.coinBounce}`}>
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
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                            <span className={styles.coinCount} id="coinCount">Nhận ngay: 5 xu</span>
                        </div>
                    </div>

                    {/* Check-in Button */}
                    <button
                        className={`
                            ${styles.checkInBtn} 
                            ${todayCheckin?.checkin ? styles.checkInBtnSuccess : ''}
                            relative overflow-hidden transition-all duration-300
                            px-6 py-3 rounded-lg font-medium text-white
                            shadow-lg hover:shadow-xl
                            transform hover:-translate-y-1 active:translate-y-0
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                            disabled:opacity-80 disabled:cursor-not-allowed
                        `}
                        onClick={onCheckInAsync}
                        disabled={todayCheckin?.checkin}
                    >
                        <span className={`${styles.btnText} relative z-10 flex items-center justify-center`}>
                            {todayCheckin?.checkin ? (
                                <span className="">Đã Điểm Danh</span>
                            ) : (
                                <span className="">Điểm Danh Ngay</span>
                            )}
                        </span>

                        {/* Hiệu ứng background khi hover */}
                        {!todayCheckin?.checkin && (
                            <span className={`
                                ${styles.ripple} absolute inset-0 bg-gradient-to-r 
                                from-blue-400 to-blue-600 opacity-0 
                                group-hover:opacity-100 transition-opacity duration-300
                                `} />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
export default CheckIn