import React from "react";
import LayoutClient from "@/infrastructure/common/Layouts/Client-Layout";
import "@/assets/styles/page/policy.css";
const PaymentPolicy = () => {
    return (
        <LayoutClient>
            <div className="padding-common policy-container">
                <div className="content">
                    <h1 className="text-3xl font-semibold text-gray-800 mb-6">
                        Chính sách thanh toán
                    </h1>

                    <div className="space-y-6 text-gray-700">
                        {/* 1. Hình thức thanh toán */}
                        <section>
                            <h2 className="text-xl font-semibold mb-2">
                                1. Hình thức Thanh toán
                            </h2>
                            <p>Khách hàng có thể lựa chọn các hình thức thanh toán sau:</p>
                            <ul className="list-disc ml-6 space-y-2">
                                <li>
                                    <strong>Thanh toán trực tuyến:</strong> Chuyển khoản ngân hàng hoặc các phương thức thanh toán điện tử được chấp nhận.
                                </li>
                                <li>
                                    <strong>Thanh toán trực tiếp:</strong> Tại văn phòng của FATS tại địa chỉ:
                                    <span className="font-semibold">
                                        L17-11, tầng 17, toà nhà Vincom, 72 Lê Thánh Tôn, Bến Nghé, Quận 1, TP HCM, Việt Nam.
                                    </span>
                                </li>
                            </ul>
                        </section>

                        {/* 2. Điều khoản thanh toán */}
                        <section>
                            <h2 className="text-xl font-semibold mb-2">
                                2. Điều khoản Thanh toán
                            </h2>
                            <ul className="list-disc ml-6 space-y-2">
                                <li>
                                    Khoản thanh toán được thực hiện theo các giai đoạn của dự án hoặc thanh toán toàn bộ trước khi nhận bàn giao sản phẩm, tùy thuộc vào thỏa thuận cụ thể với khách hàng.
                                </li>
                                <li>
                                    Chúng tôi sẽ cung cấp hóa đơn và biên nhận cho mọi khoản thanh toán đã hoàn tất.
                                </li>
                            </ul>
                        </section>

                        {/* 3. Cam kết bảo mật thông tin thanh toán */}
                        <section>
                            <h2 className="text-xl font-semibold mb-2">
                                3. Cam kết Bảo mật Thông tin Thanh toán
                            </h2>
                            <p>
                                <span className="font-semibold">FATS</span> đảm bảo bảo mật thông tin thanh toán và cam kết không tiết lộ thông tin tài chính của khách hàng trừ khi có yêu cầu pháp lý.
                            </p>
                        </section>

                        {/* 4. Kênh liên hệ hỗ trợ thanh toán */}
                        <section>
                            <h2 className="text-xl font-semibold mb-2">
                                4. Kênh Liên hệ Hỗ trợ Thanh toán
                            </h2>
                            <p>Nếu khách hàng có bất kỳ câu hỏi nào về chính sách thanh toán, vui lòng liên hệ:</p>
                            <ul className="list-disc ml-6 space-y-2">
                                <li><strong>Hotline:</strong> (028) 987 654 - 0943803333</li>
                                <li><strong>Email:</strong> <a href="mailto:lienhe@fats.vn" className="text-blue-600">lienhe@fats.vn</a></li>
                            </ul>
                            <p>
                                <span className="font-semibold">Lưu ý:</span> Khách hàng cần kiểm tra kỹ thông tin trước khi hoàn tất thanh toán và lưu giữ chứng từ để đảm bảo quyền lợi của mình trong quá trình sử dụng dịch vụ của FATS.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </LayoutClient>
    );
};

export default PaymentPolicy;
