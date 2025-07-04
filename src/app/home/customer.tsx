"use client"
import React from 'react'
import TitleComponent from '@/infrastructure/common/components/controls/TitleComponent'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import customer1 from "@/assets/images/customer1.png"
import customer2 from "@/assets/images/customer2.png"
import customer3 from "@/assets/images/customer3.png"
import customer4 from "@/assets/images/no-avatar.png"

import trust1 from "@/assets/images/trust1.png"
import trust2 from "@/assets/images/trust2.png"
import trust3 from "@/assets/images/trust3.png"
import trust4 from "@/assets/images/trust4.png"
import trust5 from "@/assets/images/trust5.png"

const customer = [
    {
        "name": "Nguyễn Hoàng An",
        img: customer1,
        "title": "Giảng viên & tác giả sách kỹ năng tài chính",
        "testimonial": "Giao diện dễ dùng, AI tự gợi ý giúp tôi cắt giảm chi phí không cần thiết. Nhờ đó, tôi tiết kiệm được 15–20% mỗi tháng mà trước đây không nhận ra!"
    },
    {
        "name": "Trần Minh Tuấn",
        img: customer2,
        "title": "Cố vấn tài chính cá nhân tại TP HCM",
        "testimonial": "Tôi từng thử nhiều app quản lý tài chính, nhưng FATS AI là app đầu tiên khiến tôi thấy ‘hợp’. Ghi thu chi nhanh, có nhắc tiết kiệm theo mục tiêu và theo nhóm rất tiện"
    },
    {
        "name": "Lê Thanh Hà",
        img: customer3,
        "title": "Nhân viên văn phòng",
        "testimonial": "Từ ngày dùng FATS AI, mình theo dõi chi tiêu đều hơn hẳn. App phân loại chi tiết, dễ nhìn và còn cảnh báo khi mình chi vượt mức mỗi tháng. Rất hữu ích!"
    },
    {
        "name": "Hoàng Minh Anh ",
        img: customer4,
        "title": "Sinh viên năm cuối",
        "testimonial": "App này nên có từ hồi năm nhất. Dễ dùng, dễ hiểu, giúp mình không xài lố khi gần hết tháng. Có biểu đồ theo dõi cũng thích"
    }
]

const trusts = [
    trust1,
    trust2,
    trust3,
    trust4,
    trust5,
]

const CustomerComponent = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 3000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768, // màn hình <= 768px
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480, // màn hình <= 480px
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false
                }
            }
        ]
    };

    const settingLogo = {
        dots: false,
        infinite: true,
        speed: 3000,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768, // màn hình <= 768px
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480, // màn hình <= 480px
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return (
        <div className="customer">
            <TitleComponent
                title={'TRUST BY'}
                color={'white'}
            />
            <Slider {...settingLogo} className='slider'>
                {
                    trusts && trusts.length && trusts.concat(trusts).map((it, index) => {
                        return (
                            <div className={"slider-content"} key={index}>
                                <img
                                    src={it.src}
                                    alt={`Slide ${index + 1}`}
                                />

                            </div>
                        )
                    })
                }
            </Slider>
            <div className="line"></div>
            <div className="title">
                <h2>Khách hàng nói gì về FATS</h2>
            </div>
            <Slider {...settings} className='slider'>
                {
                    customer && customer.length && customer.map((it, index) => {
                        return (
                            <div className={"slider-content"} key={index}>
                                <img
                                    src={it.img.src}
                                    alt={`Slide ${index + 1}`}
                                    width={200}
                                    height={200}
                                    className='rounded-full'
                                />
                                <div className='name'>
                                    <div>{it.name}</div>
                                    <span>{it.title}</span>
                                </div>
                                <p>{it.testimonial}</p>
                            </div>
                        )
                    })
                }
            </Slider>
        </div>
    )
}

export default CustomerComponent