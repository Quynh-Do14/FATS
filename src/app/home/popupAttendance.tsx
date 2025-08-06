import { ROUTE_PATH } from '@/core/common/appRouter'
import { CloseOutlined } from '@ant-design/icons'
import { Modal } from 'antd'
import React, { useEffect, useState } from 'react'

type Props = {
    handleCancel: () => void,
    visible: boolean,
}

const PopupAttendance = (props: Props) => {
    const {
        handleCancel,
        visible,
    } = props;

    const [timeLeft, setTimeLeft] = useState('23:59:59');

    // Countdown timer effect
    useEffect(() => {
        const timer = setInterval(() => {
            const now: any = new Date();
            const endOfDay: any = new Date();
            endOfDay.setHours(23, 59, 59, 999);

            const diff = endOfDay - now;
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24).toString().padStart(2, '0');
            const minutes = Math.floor((diff / (1000 * 60)) % 60).toString().padStart(2, '0');
            const seconds = Math.floor((diff / 1000) % 60).toString().padStart(2, '0');

            setTimeLeft(`${hours}:${minutes}:${seconds}`);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <Modal
            key={"f-0"}
            centered
            visible={visible}
            closable={true}
            footer={false}
            className=''
            onCancel={() => handleCancel()}
            closeIcon={<CloseOutlined />}
        >
            <div className="popup-attendance">
                {/* Floating decorative elements */}
                <div className="floating-elements">
                    <div className="floating-element" style={{ top: '10%', left: '10%', fontSize: '24px' }}>⭐</div>
                    <div className="floating-element" style={{ top: '20%', right: '15%', fontSize: '20px' }}>🎁</div>
                    <div className="floating-element" style={{ bottom: '20%', left: '20%', fontSize: '18px' }}>💎</div>
                    <div className="floating-element" style={{ bottom: '15%', right: '10%', fontSize: '22px' }}>🏆</div>
                </div>

                <div className="popup-inner">
                    {/* Title */}
                    <h2 className="popup-title">Đừng Quên Điểm Danh!</h2>

                    {/* Message */}
                    <p className="popup-message">
                        Hôm nay bạn chưa điểm danh đấy! 🤔<br />
                        Chỉ cần <strong>1 cú click</strong> để nhận <strong className="text-blue">+5 xu</strong> miễn phí và duy trì chuỗi điểm danh của bạn.
                    </p>

                    {/* Benefits */}
                    <div className="benefits-container">
                        <h3 className="benefits-title">
                            Lợi ích khi điểm danh hôm nay:
                        </h3>
                        <div className="benefits-list">
                            <div className="benefit-item">
                                <span className="bullet blue"></span>
                                <span className="benefit-text">Nhận ngay <strong>5 xu</strong> vào tài khoản</span>
                            </div>
                            <div className="benefit-item">
                                <span className="bullet green"></span>
                                <span className="benefit-text">Duy trì chuỗi điểm danh <strong>5 ngày</strong></span>
                            </div>
                            <div className="benefit-item">
                                <span className="bullet purple"></span>
                                <span className="benefit-text">Tiến gần hơn đến <strong>bonus 7 ngày</strong></span>
                            </div>
                        </div>
                    </div>

                    {/* Countdown */}
                    <div className="countdown-container">
                        <div className="countdown-content">
                            <svg className="clock-small-icon" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                            </svg>
                            <span className="countdown-text">Còn lại <span className="time-left">{timeLeft}</span> trong ngày hôm nay</span>
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="action-buttons">
                        <a href={ROUTE_PATH.ATTENDANCE} className="primary-button">
                            Điểm Danh Ngay
                        </a>
                    </div>

                    {/* Footer message */}
                    <p className="footer-message">
                        💡 <em>Mẹo: Điểm danh vào cùng một thời điểm mỗi ngày để tạo thói quen tốt!</em>
                    </p>
                </div>
            </div>
        </Modal>
    )
}

export default PopupAttendance