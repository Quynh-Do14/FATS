import React from "react";
import LayoutClient from "@/infrastructure/common/Layouts/Client-Layout";
import "@/assets/styles/page/policy.css";
const ServiceStandard = () => {
    return (
        <LayoutClient>
            <div className="padding-common policy-container">
                <div className="content">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">
                        Tiêu chuẩn dịch vụ
                    </h1>

                    <div className="space-y-6 text-gray-700">
                        {/* 1. Chất lượng dịch vụ */}
                        <section>
                            <h2 className="text-xl font-semibold mb-2">1. Chất lượng Dịch vụ</h2>
                            <p>
                                <span className="font-semibold">FATS</span> cam kết cung cấp dịch vụ chất lượng cao, đáp ứng đầy đủ các yêu cầu của khách hàng trong lĩnh vực quản lý tài chính, đầu tư, và kế toán doanh nghiệp, giúp tối ưu hóa dòng tiền, lập kế hoạch tài chính hiệu quả và hỗ trợ phân tích dữ liệu tài chính chuyên sâu.
                            </p>
                        </section>

                        {/* 2. Trách nhiệm đối với khách hàng */}
                        <section>
                            <h2 className="text-xl font-semibold mb-2">2. Trách nhiệm Đối với Khách hàng</h2>
                            <ul className="list-disc ml-6 space-y-2">
                                <li><strong>Đảm bảo tính chính xác</strong> và chất lượng của các sản phẩm, dịch vụ cung cấp.</li>
                                <li>Hỗ trợ khách hàng liên tục qua các kênh tư vấn, hỗ trợ trực tuyến và trực tiếp.</li>
                            </ul>
                        </section>

                        {/* 3. Tiến độ và báo cáo */}
                        <section>
                            <h2 className="text-xl font-semibold mb-2">3. Tiến độ và Báo cáo</h2>
                            <ul className="list-disc ml-6 space-y-2">
                                <li>Duy trì thông tin minh bạch bằng cách cung cấp báo cáo tiến độ định kỳ hàng tuần, giúp khách hàng theo dõi quá trình triển khai dự án.</li>
                                <li>Thiết lập các cuộc họp định kỳ (Q&A) để giải đáp thắc mắc và hỗ trợ kỹ thuật cho khách hàng.</li>
                            </ul>
                        </section>

                        {/* 4. Cam kết chỉnh sửa */}
                        <section>
                            <h2 className="text-xl font-semibold mb-2">4. Cam kết Chỉnh sửa</h2>
                            <ul className="list-disc ml-6 space-y-2">
                                <li>Thực hiện các điều chỉnh, sửa đổi theo yêu cầu của khách hàng để đảm bảo sản phẩm hoàn thiện, đúng với mong đợi và mục tiêu đặt ra.</li>
                                <li>Chỉnh sửa và hỗ trợ đến khi khách hàng hoàn toàn hài lòng, cam kết chất lượng dịch vụ tốt nhất trong từng sản phẩm.</li>
                            </ul>
                        </section>

                        {/* 5. Phản hồi và hỗ trợ */}
                        <section>
                            <h2 className="text-xl font-semibold mb-2">5. Phản hồi và Hỗ trợ</h2>
                            <p>Đội ngũ chăm sóc khách hàng luôn sẵn sàng hỗ trợ, tiếp nhận phản hồi để cải thiện chất lượng dịch vụ.</p>
                        </section>

                        {/* 6. Kênh liên hệ */}
                        <section>
                            <h2 className="text-xl font-semibold mb-2">6. Kênh Liên hệ</h2>
                            <p>Để được tư vấn và hỗ trợ, khách hàng vui lòng liên hệ qua:</p>
                            <ul className="list-disc ml-6 space-y-2">
                                <li><strong>Hotline:</strong> (028) 987 654 - 0943803333</li>
                                <li><strong>Email:</strong> <a href="mailto:lienhe@fats.vn" className="text-blue-600">lienhe@fats.vn</a></li>
                                <li><strong>Website:</strong> <a href="https://fats.vn" className="text-blue-600">fats.vn</a></li>
                            </ul>
                            <p>
                                <span className="font-semibold">Lưu ý:</span> Chúng tôi luôn lắng nghe phản hồi từ khách hàng để không ngừng nâng cao tiêu chuẩn dịch vụ, đáp ứng tốt nhất nhu cầu của khách hàng trong lĩnh vực công nghệ thông tin và an toàn thông tin.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </LayoutClient>
    );
};

export default ServiceStandard;
