import { Col, Row } from "antd";
import "@/assets/styles/components/MainLayout.css";
import { ROUTE_PATH } from "@/core/common/appRouter";
import logo from "@/assets/images/logo-footer.png"
import fb from "@/assets/images/icon/fb.png"
import ig from "@/assets/images/icon/ig.png"
import ytb from "@/assets/images/icon/ytb.png"
import tw from "@/assets/images/icon/tw.png"
import Script from "next/script"
import Link from "next/link";
import bocongthuong from "@/assets/images/bo-cong-thuong.png"
const FooterClient = () => {
    return (
        <footer className="footer-container padding-common">
            <Row gutter={[20, 20]}>
                <Col sm={24} md={12} lg={8}>
                    <img src={logo.src} alt="" className="logo" />
                    <div className="link-container">
                        <div className="flex flex-col gap-4">
                            <p>Kết nối với chúng tôi</p>
                            <div className="link">
                                <div className="link-icon">
                                    <a href="" target='_blank'><img src={fb.src} alt="" /></a>
                                </div>
                                <div className="link-icon">
                                    <a href="" target='_blank'><img src={ig.src} alt="" /></a>
                                </div>
                                <div className="link-icon">
                                    <a href="" target='_blank'><img src={ytb.src} alt="" /></a>
                                </div>
                                <div className="link-icon">
                                    <a href="" target='_blank'><img src={tw.src} alt="" /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col sm={24} md={12} lg={4}>
                    <h2>VỀ FATS</h2>
                    <ul className="flex flex-col gap-4">
                        <li><Link href="#">Giới thiệu</Link></li>
                        <li><Link href="#">Dịch vụ</Link></li>
                        <li><Link href="#">Blog</Link></li>
                        <li><Link href="#">Liên hệ</Link></li>
                        <li><Link href="#">Sitemap</Link></li>
                    </ul>
                </Col>
                <Col sm={24} md={12} lg={6}>
                    <h2>CHÍNH SÁCH HỖ TRỢ</h2>
                    <ul className="flex flex-col gap-4">
                        <li><Link href={ROUTE_PATH.USE_PRIVATE_POLICY}>Chính sách về quyền riêng tư</Link></li>
                        <li><Link href={ROUTE_PATH.TERM_OF_SERVICE}>Thỏa thuận sử dụng dịch vụ</Link></li>
                        <li><Link href={ROUTE_PATH.SERVICE_POLICY}>Phương thức cung ứng dịch vụ</Link></li>
                        <li><Link href={ROUTE_PATH.REFUND_POLICY}>Chính sách hoàn trả</Link></li>
                        <li><Link href={ROUTE_PATH.SERVICE_STANDARD}>Tiêu chuẩn dịch vụ</Link></li>
                        <li><Link href={ROUTE_PATH.PAYMENT_POLICY}>Chính sách thanh toán</Link></li>
                        <li><Link href={ROUTE_PATH.TRANSACTION_POLICY}>Điều kiện giao dịch</Link></li>
                    </ul>
                </Col>
                <Col sm={24} md={12} lg={6}>
                    <h2>THÔNG TIN LIÊN HỆ</h2>
                    <div className="flex flex-col gap-4">
                        <p>
                            <i className="fa fa-map-marker" aria-hidden="true"></i> L17-11, Vincom center, 72 Lê Thánh Tôn, Bến Nghé, Q.1, HCM
                        </p>
                        <p>
                            <i className="fa fa-phone" aria-hidden="true"></i> (028) 987 654 - 0943803333
                        </p>
                        <p>
                            <i className="fa fa-envelope" aria-hidden="true"></i> lienhe@fats.vn
                        </p>
                        <p>
                            <i className="fa fa-globe" aria-hidden="true"></i> www.fats.vn - MST: 0318807860
                        </p>
                        <p>
                            GIẤY PHÉP KINH DOANH: số 0318807860 cấp ngày 14 tháng 1 năm 2025 bởi Sở Kế hoạch và Đầu tư Thành phố Hồ Chí Minh
                        </p>
                    </div>
                </Col>
            </Row>
            <div className="flex flex-col items-center justify-center gap-4 mt-6">
                <a href="http://online.gov.vn/Website/chi-tiet-134772" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity flex justify-center">
                    <img
                        src={bocongthuong.src}
                        alt="FATS"
                        width={"50%"}
                        className="h-auto object-contain"  // Adjust width as needed
                    />
                </a>
                <a
                    href="//www.dmca.com/Protection/Status.aspx?ID=60d23d0c-f8a6-4d1b-b3fc-b90faaa075f9"
                    title="DMCA.com Protection Status"
                    className="dmca-badge hover:opacity-80 transition-opacity"
                >
                    <img
                        src="https://images.dmca.com/Badges/dmca-badge-w150-5x1-10.png?ID=60d23d0c-f8a6-4d1b-b3fc-b90faaa075f9"
                        alt="DMCA.com Protection Status"
                        className="h-8 w-auto"  // Adjust height as needed
                    />
                </a>
                <Script src="https://images.dmca.com/Badges/DMCABadgeHelper.min.js" />
            </div>
        </footer>
    )
}

export default FooterClient