import { Col, Row } from "antd"
import "@/assets/styles/page/homepage.css"
import slogan1 from "@/assets/images/banner1.gif"
import slogan2 from "@/assets/images/banner2.gif"
import slogan3 from "@/assets/images/banner3.gif"

const slogan = [
    {
        title: "Tầm Nhìn",
        sub: "Nền tảng công nghệ số 01",
        des: "Kiến tạo tương lai tài chính thông minh với AI, đồng hành cùng khách hàng trên hành trình phát triển bền vững."
    },
    {
        title: "Sứ Mệnh",
        sub: "Cung cấp trải nghiệm tốt nhất",
        des: "Tối ưu hóa trải nghiệm khách hàng bằng AI tiên tiến, thông qua quản lý ngân sách, phát triển tài chính, xây dựng tương lai."
    },
    {
        title: "giá trị cốt lõi",
        sub: "Quản lý và kết nối hiệu quả",
        des: "Đơn giản – Chính xác – Đồng hành – Phát triển – Bền vững"
    },
]
const SloganComponent = () => {
    return (
        <div className="slogan">
            <Row gutter={[60, 20]}>
                {
                    slogan.map((item, index) => {
                        return (
                            <Col
                                lg={8} md={12} sm={12} xs={24}
                                key={index}
                            >
                                <div className="content">
                                    <h2>{item.title}</h2>
                                    <h3>{item.sub}</h3>
                                    <p>{item.des}</p>
                                </div>
                            </Col>
                        )
                    })
                }
            </Row>
            <div className="line"></div>
            <Row className="part-2" gutter={[20, 20]} justify={"space-between"} align={"top"}>
                <Col lg={12} md={12} sm={24} xs={24}>
                    <h2>FATS – Empowering Smarter Financial Futures</h2>
                </Col>
                <Col lg={12} md={12} sm={24} xs={24}>
                </Col>
                <Col lg={12} md={12} sm={24} xs={24}>

                    <h3>FATS AI định hình tương lai tài chính số bằng công nghệ trí tuệ nhân tạo (AI). Chúng tôi cung cấp nền tảng quản lý tài chính toàn diện, giúp cá nhân và doanh nghiệp SME chủ động kiểm soát tài sản, tối ưu hóa dòng tiền và kiến tạo kế hoạch tài chính bền vững, hướng tới tăng trưởng dài hạn.</h3>
                </Col>
                <Col lg={10} md={12} sm={24} xs={24}>
                    <p>FATS AI cam kết đổi mới sáng tạo, minh bạch và đồng hành cùng khách hàng trên hành trình xây dựng tương lai tài chính bền vững. Chúng tôi phục vụ cá nhân cần kiểm soát tài chính cá nhân thông minh và SME cần tối ưu chi phí, quản lý dòng tiền và phát triển kinh doanh hiệu quả.</p>
                </Col>
            </Row>
            {/* <Row className="part-2" gutter={[20, 20]}>
                <Col lg={8} md={12} sm={12} xs={24}>
                    <img src={slogan1} alt="" className="rounded-[15px]" />
                </Col>
                <Col lg={8} md={12} sm={12} xs={24}>
                    <img src={slogan2} alt="" className="rounded-[15px]" />
                </Col>
                <Col lg={8} md={12} sm={12} xs={24}>
                    <img src={slogan3} alt="" className="rounded-[15px]" />
                </Col>
            </Row> */}
        </div>
    )
}

export default SloganComponent