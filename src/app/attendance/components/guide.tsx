import styles from '@/assets/styles/page/attendance.module.css';

function Guide() {
    return (
        <div className={styles.guide}>
            <div className={`${styles.card} ${styles.cardHover}`}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Sử Dụng Xu</h2>
                    <p className={styles.subtitle}>Khám phá những điều tuyệt vời bạn có thể làm!</p>
                </div>

                <div className={styles.usageItems}>
                    {/* Gift exchange */}
                    <div className={styles.usageItem}>
                        <div className={styles.itemContent}>
                            <div className={`${styles.iconContainer} ${styles.pinkGradient}`}>
                                <svg className={`${styles.icon} ${styles.pinkIcon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path>
                                </svg>
                            </div>
                            <div className={styles.itemText}>
                                <h3 className={styles.itemTitle}>Đổi Quà Tặng</h3>
                                <p className={styles.itemDescription}>Voucher giảm giá, quà tặng độc quyền và nhiều phần thưởng hấp dẫn khác</p>
                                <span className={`${styles.priceTag} ${styles.pinkPriceTag}`}>Từ 50 xu</span>
                            </div>
                        </div>
                    </div>

                    {/* Account upgrade */}
                    <div className={styles.usageItem}>
                        <div className={styles.itemContent}>
                            <div className={`${styles.iconContainer} ${styles.purpleGradient}`}>
                                <svg className={`${styles.icon} ${styles.purpleIcon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                </svg>
                            </div>
                            <div className={styles.itemText}>
                                <h3 className={styles.itemTitle}>Nâng Cấp Premium</h3>
                                <p className={styles.itemDescription}>Mở khóa tính năng cao cấp và trải nghiệm không giới hạn</p>
                                <span className={`${styles.priceTag} ${styles.purplePriceTag}`}>Từ 200 xu</span>
                            </div>
                        </div>
                    </div>

                    {/* Mini-game */}
                    <div className={styles.usageItem}>
                        <div className={styles.itemContent}>
                            <div className={`${styles.iconContainer} ${styles.greenGradient}`}>
                                <svg className={`${styles.icon} ${styles.greenIcon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.5a2.5 2.5 0 110 5H9m4.5-5H15a2.5 2.5 0 110 5h-1.5m-5-5v5m5-5v5"></path>
                                </svg>
                            </div>
                            <div className={styles.itemText}>
                                <h3 className={styles.itemTitle}>Mini-Game Thú Vị</h3>
                                <p className={styles.itemDescription}>Tham gia các trò chơi mini để nhân đôi xu và giành thêm phần thưởng</p>
                                <span className={`${styles.priceTag} ${styles.greenPriceTag}`}>Từ 20 xu</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Motivational Tip */}
                <div className={styles.tipContainer}>
                    <div className={styles.tipContent}>
                        <div className={styles.tipIcon}>
                            <svg fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                            </svg>
                        </div>
                        <div className={styles.tipText}>
                            <h4 className={styles.tipTitle}>💡 Bí quyết thành công:</h4>
                            <p className={styles.tipDescription}>Điểm danh liên tục 7 ngày để nhận bonus x2 xu! Hãy tạo thói quen tốt và gặt hái thành quả ngọt ngào.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Guide