import React from "react";
import LayoutClient from "@/infrastructure/common/Layouts/Client-Layout";
import "@/assets/styles/page/policy.css";

const ServicePolicy = () => {
    return (
        <LayoutClient>
            <div className="padding-common policy-container">
                <div className="content">
                    <h1 className="text-3xl font-semibold text-gray-800 mb-6">
                        Chính sách cung ứng dịch vụ FATS
                    </h1>

                    <div className="space-y-6 text-gray-700">
                        {/* 1. Truy cập trực tuyến */}
                        <section>
                            <h2 className="text-xl font-semibold mb-2">1. Truy cập trực tuyến qua Website & Ứng dụng</h2>
                            <p>Người dùng có thể sử dụng các công cụ tài chính cá nhân thông qua website hoặc ứng dụng FATS, bao gồm:</p>
                            <ul className="list-disc ml-6 space-y-2 mt-2">
                                <li>Theo dõi thu chi</li>
                                <li>Phân tích dòng tiền</li>
                                <li>Tạo mục tiêu tài chính</li>
                                <li>Quản lý quỹ nhóm</li>
                            </ul>
                        </section>

                        {/* 2. Gói dùng thử & Premium */}
                        <section>
                            <h2 className="text-xl font-semibold mb-2">2. Gói Dùng thử & Gói Premium</h2>
                            <ul className="list-disc ml-6 space-y-2">
                                <li>Dùng thử miễn phí 14 ngày với đầy đủ tính năng cơ bản và nâng cao.</li>
                                <li>Đăng ký gói Premium để mở khóa toàn bộ tính năng AI, báo cáo nâng cao và được hỗ trợ ưu tiên.</li>
                            </ul>
                        </section>

                        {/* 3. Dịch vụ theo nhóm/cộng đồng */}
                        <section>
                            <h2 className="text-xl font-semibold mb-2">3. Dịch vụ theo Nhóm/Cộng đồng</h2>
                            <ul className="list-disc ml-6 space-y-2">
                                <li>Cho phép người dùng tạo quỹ nhóm để quản lý chi tiêu chung như gia đình, bạn bè hoặc nhóm tiết kiệm.</li>
                                <li>Hỗ trợ minh bạch tài chính nhóm nhằm tránh mâu thuẫn và đảm bảo rõ ràng.</li>
                            </ul>
                        </section>

                        {/* 4. Khuyến nghị cá nhân hóa */}
                        <section>
                            <h2 className="text-xl font-semibold mb-2">4. Cung cấp Khuyến nghị Cá nhân hóa</h2>
                            <p>
                                FATS AI ứng dụng trí tuệ nhân tạo để phân tích hành vi tài chính của người dùng, từ đó đưa ra các gợi ý về tiết kiệm, phân bổ chi tiêu và cảnh báo bất thường.
                            </p>
                        </section>

                        {/* 5. Tư vấn & hỗ trợ */}
                        <section>
                            <h2 className="text-xl font-semibold mb-2">5. Tư vấn & Hỗ trợ Khách hàng</h2>
                            <p>
                                FATS hỗ trợ khách hàng thông qua các kênh email và hotline để giải đáp thắc mắc và tư vấn nâng cấp dịch vụ.
                            </p>
                        </section>

                        {/* Thời hạn cung ứng dịch vụ */}
                        <section>
                            <h2 className="text-xl font-semibold mb-2">
                                6. Thời hạn Ước tính Cung ứng Dịch vụ của FATS AI
                            </h2>

                            <div className="space-y-4">
                                {/* Ngay lập tức */}
                                <div>
                                    <h3 className="font-semibold text-gray-800">1. Ngay lập tức (kích hoạt tự động)</h3>
                                    <ul className="list-disc ml-6 space-y-1 text-gray-700">
                                        <li>
                                            Áp dụng cho các dịch vụ <strong>miễn phí</strong> hoặc <strong>dùng thử 14 ngày</strong>.
                                        </li>
                                        <li>
                                            Người dùng có thể <strong>truy cập và sử dụng ngay sau khi đăng ký tài khoản</strong>.
                                        </li>
                                        <li>
                                            Hệ thống sẽ <strong>kích hoạt tự động</strong> mà không cần thao tác thủ công.
                                        </li>
                                    </ul>
                                </div>

                                {/* Sau khi thanh toán */}
                                <div>
                                    <h3 className="font-semibold text-gray-800">2. Sau khi thanh toán (gói Premium)</h3>
                                    <ul className="list-disc ml-6 space-y-1 text-gray-700">
                                        <li>
                                            Áp dụng cho các gói dịch vụ <strong>Premium trả phí</strong>.
                                        </li>
                                        <li>
                                            Dịch vụ sẽ được <strong>kích hoạt ngay sau khi hệ thống xác nhận thanh toán thành công</strong>.
                                        </li>
                                        <li>
                                            Thời gian xử lý thông thường: <strong>vài giây đến vài phút</strong>, đảm bảo trải nghiệm mượt mà.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </LayoutClient>
    );
};

export default ServicePolicy;
