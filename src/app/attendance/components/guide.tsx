import styles from '@/assets/styles/page/attendance.module.css';
import calendar from "@/assets/images/attendance/calendar.png"
import aim from "@/assets/images/attendance/aim.png"
import gift from "@/assets/images/attendance/gift.png"
import star from "@/assets/images/attendance/star.png"

import Image from 'next/image';

export default function Guide() {
    return (
        <div className={styles.section}>
            <h1 className={styles.sectionTitle}>Cách nhận xu và sử dụng xu</h1>

            <div className={styles.guideSection}>
                <div className={styles.guideTitle}>Cách nhận xu</div>
                <div className={styles.guideItems}>
                    {[
                        {
                            icon: calendar,
                            title: 'Điểm danh mỗi ngày',
                            desc: 'Nhận từ 50-200 xu mỗi ngày khi điểm danh. Điểm danh liên tục để nhận thưởng cao hơn!',
                        },
                        {
                            icon: aim,
                            title: 'Hoàn thành nhiệm vụ',
                            desc: 'Làm các nhiệm vụ hàng ngày như xem video, chia sẻ bài viết để nhận thêm xu',
                        },
                    ].map((item, idx) => (
                        <div className={styles.guideItem} key={idx}>
                            <div className={`${styles.guideIcon} ${styles.earnIcon}`}>
                                <Image src={item.icon} alt={item.title} width={40} height={40} />
                            </div>
                            <div className={styles.guideContent}>
                                <div className={styles.guideItemTitle}>{item.title}</div>
                                <div className={styles.guideItemDesc}>{item.desc}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.guideSection}>
                <div className={styles.guideTitle}>Cách sử dụng xu</div>
                <div className={styles.guideItems}>
                    {[
                        {
                            icon: gift,
                            title: 'Đổi thẻ quà tặng',
                            desc: 'Đổi xu lấy thẻ cào điện thoại, voucher mua sắm, thẻ game với giá ưu đãi',
                        },
                        {
                            icon: star,
                            title: 'Nhận ưu đãi đặc biệt',
                            desc: 'Mở khóa các tính năng VIP, giảm giá sản phẩm và ưu đãi độc quyền',
                        },
                    ].map((item, idx) => (
                        <div className={styles.guideItem} key={idx}>
                            <div className={`${styles.guideIcon} ${styles.useIcon}`}>
                                <Image src={item.icon} alt={item.title} width={40} height={40} />
                            </div>
                            <div className={styles.guideContent}>
                                <div className={styles.guideItemTitle}>{item.title}</div>
                                <div className={styles.guideItemDesc}>{item.desc}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
