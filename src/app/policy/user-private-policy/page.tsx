import React from "react";
import LayoutClient from "@/infrastructure/common/Layouts/Client-Layout";
import "@/assets/styles/page/policy.css";
const UserPrivatePolicy = () => {
    return (
        <LayoutClient>
            <div className="padding-common policy-container">
                <div className="content">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">
                        Chính Sách Bảo Mật Thông Tin Tài Chính
                    </h1>

                    <div className="space-y-6 text-gray-700">
                        {/* 1. Cam kết bảo vệ thông tin */}
                        <section>
                            <h2 className="text-xl font-semibold mb-2">
                                1. Cam kết bảo mật thông tin tài chính
                            </h2>
                            <p>
                                Chúng tôi cam kết bảo vệ thông tin tài chính của khách hàng khi sử dụng các dịch vụ quản lý tài chính, đầu tư và giao dịch qua nền tảng của chúng tôi. Chính sách này nêu rõ cách chúng tôi thu thập, bảo vệ và sử dụng thông tin của bạn.
                            </p>
                        </section>

                        {/* 2. Mục đích thu thập thông tin */}
                        <section>
                            <h2 className="text-xl font-semibold mb-2">
                                2. Mục đích thu thập thông tin tài chính
                            </h2>
                            <p>Chúng tôi thu thập dữ liệu tài chính nhằm:</p>
                            <ul className="list-disc ml-6 space-y-2">
                                <li>Theo dõi thu nhập, chi tiêu và tổng quan tài chính cá nhân.</li>
                                <li>Hỗ trợ người dùng trong việc lập kế hoạch tài chính và quản lý ngân sách.</li>
                                <li>Phân tích xu hướng tài chính và cung cấp khuyến nghị tối ưu hóa đầu tư.</li>
                                <li>Đảm bảo tuân thủ các quy định về pháp lý và giao dịch tài chính.</li>
                            </ul>
                        </section>

                        {/* 3. Phạm vi sử dụng thông tin */}
                        <section>
                            <h2 className="text-xl font-semibold mb-2">
                                3. Phạm vi sử dụng thông tin
                            </h2>
                            <p>
                                Dữ liệu tài chính sẽ chỉ được sử dụng trong nội bộ hệ thống để hỗ trợ người dùng quản lý tài sản cá nhân. Chúng tôi **không** bán hoặc chia sẻ dữ liệu tài chính với bên thứ ba trừ khi có sự chấp thuận từ khách hàng hoặc yêu cầu từ cơ quan pháp luật.
                            </p>
                        </section>

                        {/* 4. Thời gian lưu trữ thông tin */}
                        <section>
                            <h2 className="text-xl font-semibold mb-2">
                                4. Thời gian lưu trữ dữ liệu tài chính
                            </h2>
                            <p>
                                Thông tin tài chính của bạn sẽ được lưu trữ tối đa **5 năm** kể từ lần đăng nhập gần nhất hoặc theo yêu cầu của khách hàng. Bạn có thể yêu cầu xóa dữ liệu của mình bất cứ lúc nào.
                            </p>
                        </section>

                        {/* 5. Ai có thể tiếp cận dữ liệu */}
                        <section>
                            <h2 className="text-xl font-semibold mb-2">
                                5. Ai có thể tiếp cận dữ liệu tài chính của bạn?
                            </h2>
                            <p>Thông tin tài chính của bạn chỉ có thể được truy cập bởi:</p>
                            <ul className="list-disc ml-6 space-y-2">
                                <li>**Chính bạn** thông qua tài khoản cá nhân.</li>
                                <li>**Nhóm bảo mật** để đảm bảo an toàn dữ liệu và hỗ trợ kỹ thuật.</li>
                                <li>Các cơ quan tài chính nhà nước trong trường hợp điều tra hợp pháp.</li>
                            </ul>
                        </section>

                        {/* 6. Quyền của người dùng */}
                        <section>
                            <h2 className="text-xl font-semibold mb-2">
                                6. Quyền của bạn đối với thông tin tài chính
                            </h2>
                            <p>Bạn có thể:</p>
                            <ul className="list-disc ml-6 space-y-2">
                                <li>Truy cập và kiểm tra thông tin tài chính cá nhân.</li>
                                <li>Yêu cầu chỉnh sửa dữ liệu nếu phát hiện sai sót.</li>
                                <li>Xóa dữ liệu tài chính khi không còn sử dụng dịch vụ.</li>
                            </ul>
                            <p>
                                Để thực hiện các quyền trên, vui lòng đăng nhập vào tài khoản hoặc liên hệ chúng tôi qua email <a href="mailto:lienhe@fats.vn" className="text-blue-600">lienhe@fats.vn</a> hoặc hotline <span className="font-semibold">(028) 987 654 - 0943803333</span>.
                            </p>
                        </section>

                        {/* 7. Giải quyết khiếu nại */}
                        <section>
                            <h2 className="text-xl font-semibold mb-2">
                                7. Giải quyết khiếu nại về dữ liệu tài chính
                            </h2>
                            <p>
                                Nếu bạn có bất kỳ khiếu nại nào liên quan đến quyền riêng tư hoặc bảo mật tài chính, chúng tôi cam kết giải quyết trong thời gian sớm nhất.
                            </p>
                            <ul className="list-disc ml-6 space-y-2">
                                <li><strong>Hotline:</strong> (028) 987 654 - 0943803333</li>
                                <li><strong>Email:</strong> <a href="mailto:lienhe@fats.vn" className="text-blue-600">lienhe@fats.vn</a></li>
                                <li><strong>Địa chỉ:</strong> L17-11, tầng 17, toà nhà Vincom, 72 Lê Thánh Tôn, Bến Nghé, Quận 1, TP HCM, Việt Nam.</li>
                            </ul>
                            <p>
                                Chúng tôi sẽ xác nhận, điều tra và cung cấp phản hồi sớm nhất để đảm bảo bạn hoàn toàn yên tâm khi sử dụng hệ thống quản lý tài chính của chúng tôi.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </LayoutClient>
    );
};

export default UserPrivatePolicy;
