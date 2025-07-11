import LayoutClient from "@/infrastructure/common/Layouts/Client-Layout";
import "@/assets/styles/page/policy.css";
const TransactionPolicy = () => {
    return (
        <LayoutClient>

            <div className="padding-common policy-container">
                <div className="content">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">
                        Điều kiện và Hạn chế Cung cấp Dịch vụ
                    </h1>

                    <div className="space-y-6 text-gray-700">
                        {/* 1. Phạm vi cung cấp */}
                        <section>
                            <h2 className="text-xl font-semibold mb-2">
                                1. Phạm vi Cung cấp
                            </h2>
                            <p>
                                Dịch vụ của <strong>FATS AI</strong> hiện chỉ áp dụng cho người dùng tại <strong>Việt Nam</strong>,
                                sử dụng thông qua nền tảng website <a href="https://fats.vn" className="text-blue-600">https://fats.vn</a> hoặc các nền tảng liên kết chính thức.
                            </p>
                        </section>

                        {/* 2. Giới hạn thời gian cung ứng */}
                        <section>
                            <h2 className="text-xl font-semibold mb-2">
                                2. Giới hạn Thời gian Cung ứng
                            </h2>
                            <ul className="list-disc ml-6 space-y-2">
                                <li>Người dùng có thể sử dụng dịch vụ <strong>ngay sau khi đăng ký</strong> hoặc <strong>hoàn tất thanh toán gói Premium</strong>.</li>
                                <li>Một số tính năng nâng cao có thể yêu cầu xử lý kỹ thuật trong vòng <strong>tối đa 24 giờ</strong>.</li>
                            </ul>
                        </section>

                        {/* 3. Yêu cầu hệ thống */}
                        <section>
                            <h2 className="text-xl font-semibold mb-2">
                                3. Yêu cầu Hệ thống
                            </h2>
                            <p>
                                Người dùng cần có <strong>thiết bị kết nối internet</strong>, trình duyệt được cập nhật hoặc sử dụng <strong>ứng dụng di động</strong> nếu có.
                            </p>
                        </section>

                        {/* 4. Hạn chế sử dụng */}
                        <section>
                            <h2 className="text-xl font-semibold mb-2">
                                4. Hạn chế Sử dụng
                            </h2>
                            <ul className="list-disc ml-6 space-y-2">
                                <li>Không áp dụng cho người dùng tạo tài khoản giả mạo hoặc sử dụng thông tin trái phép.</li>
                                <li>Không chấp nhận hành vi vi phạm chính sách cộng đồng của <strong>FATS AI</strong>.</li>
                            </ul>
                        </section>

                        {/* 5. Quyền thay đổi dịch vụ */}
                        <section>
                            <h2 className="text-xl font-semibold mb-2">
                                5. Quyền Thay đổi Dịch vụ
                            </h2>
                            <p>
                                <strong>FATS AI</strong> có quyền cập nhật, thay đổi tính năng hoặc giới hạn một số chức năng của hệ thống <strong>mà không cần thông báo trước</strong>,
                                nhằm đảm bảo hiệu suất vận hành và bảo mật.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </LayoutClient>
    )
};

export default TransactionPolicy;
