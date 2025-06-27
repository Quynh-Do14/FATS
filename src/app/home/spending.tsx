import { Col, Row } from 'antd'
import "../../assets/styles/page/homepage.css"

const SpendingComponent = () => {
    return (
        <div className="spending">
            <Row gutter={[40, 20]}>
                <Col xs={24} md={24} lg={12}>
                    <div className='left-content'></div>
                </Col>
                <Col xs={24} md={24} lg={12}>
                    <div className='right-content'>
                        <h2>FATS - Financial Analysis Technology Service</h2>
                        <p>Quản lý tài chính thông minh, tối ưu ngân sách, hướng tới tự do tài chính.</p>
                        <div className='flex flex-col gap-6'>
                            <div className='flex gap-6 items-start'>
                                <div className='icon'>
                                    <i className="fa fa-headphones text-[#1d9b5e] text-[28px]" aria-hidden="true"></i>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <div className='title'>FATS – Hỗ trợ 24/7, tài chính trong tầm tay!</div>
                                    <div className='sub-title'>Thông minh, chính xác, tiện dụng – Giúp bạn kiểm soát tài chính dễ dàng mọi lúc, mọi nơi.</div>
                                </div>
                            </div>
                            <div className='flex gap-6 items-start'>
                                <div className='icon'>
                                    <i className="fa fa-headphones text-[#1d9b5e] text-[28px]" aria-hidden="true"></i>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <div className='title'>FATS – Thông minh, chính xác, tiện dụng</div>
                                    <div className='sub-title'>Giải pháp tài chính hiện đại, giúp bạn quản lý chi tiêu hiệu quả và dễ dàng hơn bao giờ hết.</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </Col>
            </Row>
        </div >
    )
}

export default SpendingComponent