"use client"
import { Col, Row } from "antd";
import TitleComponent from "@/infrastructure/common/components/controls/TitleComponent";
import selectFats1 from "@/assets/images/selectFats1.png";
import selectFats2 from "@/assets/images/selectFats2.png";
import selectFats3 from "@/assets/images/selectFats3.png";
import selectFats4 from "@/assets/images/selectFats4.png";
import AnimatedNumber from "@/infrastructure/common/components/controls/AnimatedNumber";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";;

const PricingComponent = () => {
    const plans = [
        {
            id: 1,
            title: "FATS Cơ bản",
            sub: "Cash Flow Management",
            price: false,
            features: [
                "AI hỗ trợ quản lý ngân sách (có giới hạn)",
                "Theo dõi dòng tiền theo thời gian thực",
                "Cảnh báo dòng tiền"
            ],
            button: "Try for free",
            highlighted: false,
        },
        {
            id: 2,
            title: "FATS AI +",
            sub: "Short-term Planning",
            price: "53.000vnđ",
            cost: "69.900vnđ",
            features: [
                "Các tính năng của gói FATS Cơ Bản",
                "AI hỗ trợ quản lý ngân sách không giới hạn",
                "Theo dõi và cảnh báo dòng tiền theo thời gian thực",
                "Nhận diện hóa đơn tự động",
                "Khi đăng ký FATS AI+, bạn đã góp 1.000 VNĐ vào Quỹ Hỗ Trợ Trẻ Em Sứt Môi, Hở Hàm Ếch của Operation Smile Việt Nam – Cùng chung tay mang lại những nụ cười trọn vẹn và tương lai tươi sáng cho các em nhỏ."
            ],
            button: "Try for free",
            highlighted: true,
        },
        {
            id: 3,
            title: "FATS AI Premium",
            sub: "Long-term Planning",
            price: "96.000vnđ",
            cost: "129.900vnđ",
            features: [
                "Các tính năng của gói FATS +",
                "AI hỗ trợ quản lý ngân sách không giới hạn",
                "Theo dõi dòng tiền theo thời gian thực",
                "Cảnh báo dòng tiền",
                "Nhận diện hóa đơn tự động",
                "Đặt mục tiêu tiết kiệm theo nhóm không giới hạn",
                "Khi đăng ký FATS AI+, bạn đã góp 2.000 VNĐ vào Quỹ Hỗ Trợ Trẻ Em Sứt Môi, Hở Hàm Ếch của Operation Smile Việt Nam – Cùng chung tay mang lại những nụ cười trọn vẹn và tương lai tươi sáng cho các em nhỏ.",
            ],
            button: "Try for free",
            highlighted: false,
        },
    ];

    const reason = [
        {
            img: selectFats1,
            name: "Tối ưu",
            number: 25,
            content: "Tiết kiệm chi tiêu"
        },
        {
            img: selectFats2,
            name: "Tiết kiệm",
            number: 70,
            content: "Thời gian xử lý sổ sách"
        },
        {
            img: selectFats3,
            name: "Tăng",
            number: 65,
            content: "Hiệu quả tài chính"
        },
        {
            img: selectFats4,
            name: "Hơn",
            number: 99,
            content: "Khách hàng tin tưởng và đồng hành cùng FATS AI"
        },
    ]
    const router = useRouter();
    const textRef = useRef<HTMLDivElement>(null);
    const [isAnimate, setIsAnimate] = useState<boolean>(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Chỉ set true một lần duy nhất
                if (entry.isIntersecting && !isAnimate) {
                    setIsAnimate(true);
                }
            },
            {
                threshold: 0.1
            }
        );

        const currentSectionRef = textRef.current;
        if (currentSectionRef) {
            observer.observe(currentSectionRef);
        }

        return () => {
            if (currentSectionRef) {
                observer.unobserve(currentSectionRef);
            }
        };
    }, [isAnimate]);

    return (
        <div className="pricing-container">
            <div className="title">
                <TitleComponent
                    title={'Nâng Tầm Tài Chính'}
                    color={'black'}
                />
                <div>
                    <h2>Giải Pháp Tài Chính</h2>
                    <h3>Thông minh - Hiệu quả - Bền Vững</h3>
                </div>
                <p className="sub">FATS AI – Cung cấp các gói giải pháp tài chính thông minh.</p>
            </div>
            <Row gutter={[40, 20]}>
                {plans.map((plan, index) => (
                    <Col lg={8} md={12} sm={12} xs={24} key={index}>
                        <div key={index} className={`box`}>
                            <div>
                                <h3>{plan.title}</h3>
                                {/* <p className="sub">{plan.sub}</p> */}
                                <span className="text-[18px] font-normal text-[#666666]">{plan.price == false ? "Miễn phí" : " Chỉ từ"}</span>
                                {
                                    plan.price == false
                                        ?
                                        <p className="text-[24px] font-semibold">
                                            23h+ dùng thử tính năng FATS premium
                                        </p>
                                        :
                                        <div className="text-[24px] font-semibold">
                                            {plan.price}<span className="text-[18px] font-normal text-[#666666]"> / tháng</span>
                                            <div className="text-[14px] font-normal text-[#666666]">Giá gốc: <span className="line-through">{plan.cost} / tháng </span></div>
                                        </div>
                                }
                            </div>
                            <button onClick={() => router.push("/payment-info")}>Đăng ký ngay</button>
                            <ul className="flex flex-col gap-4">
                                <li>Dịch vụ bao gồm</li>
                                {plan.features.map((feature, idx) => (
                                    <li
                                        key={idx}
                                        className={`flex items-start`}>
                                        <span className="mr-2">
                                            <i className="fa fa-thumb-tack" aria-hidden="true"></i>
                                        </span>
                                        {feature}
                                    </li>
                                ))}

                            </ul>
                        </div>
                    </Col>
                ))}
            </Row>
            <div className="title">
                <h2>Lý do nên chọn FATS</h2>
            </div>
            <Row gutter={[40, 20]} className="reason">
                {
                    reason.map((item, index) => (
                        <Col lg={6} md={12} sm={12} xs={24} key={index}>
                            <div className="flex flex-col items-center">
                                <img src={item.img.src} alt="" />
                                <div className="label">
                                    <span className="name-figure">{item.name}</span>
                                    <div ref={textRef} className="figure"><AnimatedNumber value={isAnimate ? item.number : 0} />%</div>
                                </div>
                                <p>{item.content}</p>
                            </div>
                        </Col>
                    ))
                }

            </Row>
        </div>
    );
};

export default PricingComponent;
