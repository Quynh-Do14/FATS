import { useState } from 'react'
import styles from '@/assets/styles/page/attendance.module.css';
import coin from "@/assets/images/attendance/coin.png"
import coinGif from "@/assets/images/attendance/coin.gif"
import Image from 'next/image';
import { ButtonDesign } from '@/infrastructure/common/components/button/buttonDesign';
export default function CheckIn() {
    const [claimed, setClaimed] = useState(false)

    const handleClaim = () => {
        setClaimed(true)

        const todayCard = document.querySelector(`.${styles.todayCard}`)
        if (todayCard) {
            for (let i = 0; i < 15; i++) {
                const sparkle = document.createElement('div')
                sparkle.innerHTML = '✨'
                sparkle.style.position = 'absolute'
                sparkle.style.left = `${Math.random() * 100}%`
                sparkle.style.top = `${Math.random() * 100}%`
                sparkle.style.fontSize = `${Math.random() * 15 + 10}px`
                sparkle.style.animation = 'sparkle 1s ease-out forwards'
                sparkle.style.pointerEvents = 'none'
                sparkle.style.zIndex = '10'
                todayCard.appendChild(sparkle)

                setTimeout(() => sparkle.remove(), 1000)
            }
        }
    }

    return (
        <div className={styles.section}>
            <h1 className={styles.sectionTitle}>Điểm danh nhận xu mỗi ngày</h1>

            <div className={styles.todayCard}>
                <div className={styles.todayDate} id="currentDate"></div>
                <div className={styles.coinIcon}>
                    <Image
                        src={coinGif}
                        alt="coin"
                        width={50}
                        height={50}
                    />

                </div>
                <div className={styles.rewardAmount}>+100 xu</div>
                <ButtonDesign
                    classColor={'green'}
                    onClick={() => { }}
                    title={'Nhận xu'}
                    width={150}
                />
            </div>

            <div className={styles.weeklyGrid}>
                {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((day, i) => {
                    const isClaimed = i < 2 || (i === 2 && claimed)
                    const isToday = i === 2 && !claimed
                    const isUpcoming = i > 2 && !claimed

                    return (
                        <div
                            key={day}
                            className={`${styles.dayCard} ${isClaimed ? styles.claimed : isToday ? styles.today : styles.upcoming
                                }`}
                        >
                            {isClaimed && <div className={styles.checkmark}>✓</div>}
                            <div className={styles.dayName}>{day}</div>
                            <div
                                className={`${styles.dayStatus} ${isClaimed
                                    ? styles.statusClaimed
                                    : isToday
                                        ? styles.statusToday
                                        : styles.statusUpcoming
                                    }`}
                            >
                                {isClaimed ? 'Đã nhận' : isToday ? 'Hôm nay' : 'Chưa nhận'}
                            </div>
                            <div className={styles.dayReward}>
                                <span className={styles.smallCoin}>
                                    <Image
                                        src={coin}
                                        alt="coin"
                                        width={30}
                                        height={30}
                                    />
                                </span> {50 + i * 10}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
