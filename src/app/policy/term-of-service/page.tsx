import LayoutClient from "@/infrastructure/common/Layouts/Client-Layout";
import "@/assets/styles/page/policy.css";
const TermOfServicePolicy = () => {
    return (
        <LayoutClient>
            <div className="padding-common policy-container">
                <div className="content">
                    <h1 className="text-3xl font-semibold text-gray-800 mb-6">
                        Thỏa Thuận Sử Dụng Dịch Vụ
                    </h1>

                    <div className="space-y-6 text-gray-700">
                        {/* 1. Chấp nhận điều khoản */}
                        <section>
                            <h2 className="text-xl font-semibold mb-2">
                                1. Chấp nhận Điều khoản Sử dụng
                            </h2>
                            <p>
                                Khi truy cập và sử dụng dịch vụ quản lý tài chính tại nền tảng của chúng tôi, bạn đồng ý tuân thủ các điều khoản này. Vui lòng đọc kỹ để hiểu rõ quyền lợi và trách nhiệm của bạn.
                            </p>
                        </section>

                        {/* 2. Phạm vi dịch vụ */}
                        <section>
                            <h2 className="text-xl font-semibold mb-2">
                                2. Phạm vi Dịch vụ
                            </h2>
                            <p>Chúng tôi cung cấp các dịch vụ bao gồm:</p>
                            <ul className="list-disc ml-6 space-y-2">
                                <li>Quản lý tài chính cá nhân, lập kế hoạch đầu tư và dự báo tài chính.</li>
                                <li>Hỗ trợ kế toán, kiểm soát ngân sách và tối ưu hóa dòng tiền.</li>
                                <li>Phân tích xu hướng tài chính, cung cấp báo cáo và tư vấn tài chính.</li>
                                <li>Tích hợp API ngân hàng để quản lý giao dịch và lịch sử tài chính.</li>
                            </ul>
                        </section>

                        {/* 3. Trách nhiệm của Người dùng */}
                        <section>
                            <h2 className="text-xl font-semibold mb-2">
                                3. Trách nhiệm của Người dùng
                            </h2>
                            <p>Người dùng có trách nhiệm:</p>
                            <ul className="list-disc ml-6 space-y-2">
                                <li>Sử dụng dịch vụ đúng mục đích, không thực hiện các hành vi gian lận hoặc vi phạm pháp luật.</li>
                                <li>Cung cấp thông tin tài chính cá nhân chính xác và cập nhật thường xuyên.</li>
                                <li>Đảm bảo bảo mật tài khoản và mật khẩu cá nhân, tránh chia sẻ thông tin đăng nhập.</li>
                                <li>Không sao chép, chia sẻ dữ liệu hoặc sử dụng thuật toán phân tích tài chính của hệ thống cho mục đích thương mại khi chưa được cấp phép.</li>
                            </ul>
                        </section>

                        {/* 4. Quyền và trách nhiệm của hệ thống */}
                        <section>
                            <h2 className="text-xl font-semibold mb-2">
                                4. Quyền và Trách nhiệm của Chúng tôi
                            </h2>
                            <p>Chúng tôi cam kết:</p>
                            <ul className="list-disc ml-6 space-y-2">
                                <li>Bảo vệ quyền riêng tư và dữ liệu tài chính của người dùng theo quy định pháp luật.</li>
                                <li>Cung cấp dịch vụ ổn định, cập nhật liên tục để nâng cao trải nghiệm người dùng.</li>
                                <li>Có quyền tạm ngừng hoặc chấm dứt dịch vụ nếu phát hiện hành vi gian lận, vi phạm điều khoản sử dụng.</li>
                            </ul>
                        </section>

                        {/* 5. Quyền sở hữu trí tuệ */}
                        <section>
                            <h2 className="text-xl font-semibold mb-2">
                                5. Quyền Sở hữu Trí tuệ
                            </h2>
                            <p>
                                Toàn bộ dữ liệu tài chính, thuật toán phân tích và nội dung trên nền tảng thuộc quyền sở hữu của chúng tôi và được bảo vệ theo luật sở hữu trí tuệ. Người dùng không được sao chép hoặc sử dụng dữ liệu này cho mục đích thương mại nếu không có sự đồng ý bằng văn bản.
                            </p>
                        </section>

                        {/* 6. Giới hạn trách nhiệm */}
                        <section>
                            <h2 className="text-xl font-semibold mb-2">
                                6. Giới hạn Trách nhiệm
                            </h2>
                            <p>
                                Chúng tôi không chịu trách nhiệm đối với bất kỳ tổn thất nào do việc sử dụng dữ liệu tài chính không chính xác hoặc do người dùng sử dụng thông tin từ hệ thống mà không có sự tư vấn chuyên sâu.
                            </p>
                        </section>

                        {/* 7. Thay đổi điều khoản */}
                        <section>
                            <h2 className="text-xl font-semibold mb-2">
                                7. Thay đổi Điều khoản Sử dụng
                            </h2>
                            <p>
                                Chúng tôi có quyền thay đổi, cập nhật điều khoản sử dụng mà không cần thông báo trước. Việc tiếp tục sử dụng dịch vụ sau khi có thay đổi đồng nghĩa với việc bạn chấp nhận điều khoản mới.
                            </p>
                        </section>

                        {/* 8. Liên hệ hỗ trợ */}
                        <section>
                            <h2 className="text-xl font-semibold mb-2">
                                8. Liên hệ và Hỗ trợ
                            </h2>
                            <p>
                                Nếu có bất kỳ câu hỏi nào về điều khoản sử dụng dịch vụ, vui lòng liên hệ qua:
                            </p>
                            <ul className="list-disc ml-6 space-y-2">
                                <li><strong>Hotline:</strong> (028) 987 654 - 0943803333</li>
                                <li><strong>Email:</strong> <a href="mailto:lienhe@fats.vn" className="text-blue-600">lienhe@fats.vn</a></li>
                            </ul>
                            <p>
                                Chúng tôi luôn sẵn sàng hỗ trợ và đảm bảo sự hài lòng của khách hàng khi sử dụng dịch vụ.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </LayoutClient>
    );
};

export default TermOfServicePolicy;
