import React from "react";
import LayoutClient from "@/infrastructure/common/Layouts/Client-Layout";
import "@/assets/styles/page/policy.css";
const RefundPolicy = () => {
    return (
        <LayoutClient>
            <div className="padding-common policy-container">
                <div className="content">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">
                        Chính sách hoàn trả
                    </h1>

                    <div className="space-y-6 text-gray-700">
                        {/* 1. Cam kết hoàn trả */}
                        <section>
                            <h2 className="text-xl font-semibold mb-2">
                                1. Cam kết Hoàn trả
                            </h2>
                            <p>
                                <span className="font-semibold">FATS</span> cam kết mang lại sự hài lòng cho khách hàng. Trong trường hợp sản phẩm hoặc dịch vụ không đáp ứng yêu cầu, chúng tôi sẽ thực hiện hoàn tiền theo các điều kiện cụ thể.
                            </p>
                        </section>

                        {/* 2. Điều kiện hoàn trả */}
                        <section>
                            <h2 className="text-xl font-semibold mb-2">
                                2. Điều kiện Hoàn trả
                            </h2>
                            <p>Khách hàng có thể yêu cầu hoàn tiền trong các trường hợp sau:</p>
                            <ul className="list-disc ml-6 space-y-2">
                                <li><strong>Dịch vụ không đạt yêu cầu:</strong> Sản phẩm có lỗi kỹ thuật hoặc không đúng như mô tả sẽ được hoàn tiền đầy đủ.</li>
                                <li><strong>Thời gian yêu cầu hoàn trả:</strong> Khách hàng cần gửi yêu cầu hoàn trả trong vòng <span className="font-semibold">7 ngày</span> kể từ khi nhận sản phẩm.</li>
                            </ul>
                        </section>

                        {/* 3. Quy trình hoàn trả */}
                        <section>
                            <h2 className="text-xl font-semibold mb-2">
                                3. Quy trình Hoàn trả
                            </h2>
                            <p>Để yêu cầu hoàn tiền, khách hàng cần thực hiện các bước sau:</p>
                            <ul className="list-disc ml-6 space-y-2">
                                <li>Liên hệ với chúng tôi qua hotline hoặc email để gửi yêu cầu hoàn trả.</li>
                                <li>FATS sẽ tiến hành kiểm tra và xử lý yêu cầu hoàn tiền trong vòng <span className="font-semibold">7 ngày làm việc</span> kể từ khi nhận được yêu cầu.</li>
                            </ul>
                        </section>

                        {/* 4. Liên hệ hỗ trợ */}
                        <section>
                            <h2 className="text-xl font-semibold mb-2">
                                4. Liên hệ và Hỗ trợ
                            </h2>
                            <p>Nếu có bất kỳ thắc mắc nào hoặc cần hỗ trợ về hoàn trả, vui lòng liên hệ:</p>
                            <ul className="list-disc ml-6 space-y-2">
                                <li><strong>Hotline:</strong> (028) 987 654 - 0943803333</li>
                                <li><strong>Email:</strong> <a href="mailto:lienhe@fats.vn" className="text-blue-600">lienhe@fats.vn</a></li>
                            </ul>
                        </section>
                    </div>
                </div>
            </div>
        </LayoutClient>
    );
};

export default RefundPolicy;
