"use client"
import React from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TitleComponent from '@/infrastructure/common/components/controls/TitleComponent';
const post = [
    {
        "title": "Cách Ứng Dụng AI Trong Dự Báo Tài Chính & Ra Quyết Định Đầu Tư",
        "date": "25 tháng 2, 2025",
        "author": "Admin",
        "description": "Công nghệ AI đang thay đổi cách doanh nghiệp dự báo tài chính như thế nào? Cùng tìm hiểu cách tận dụng AI để nâng cao hiệu quả.",
        "image": "image1.jpg",
        "link": "/chi-tiet/ung-dung-ai-du-bao-tai-chinh"
    },
    {
        "title": "Công Nghệ Tự Động Hóa: Xu Hướng Giúp Doanh Nghiệp Tiết Kiệm & Tối Ưu Chi Phí",
        "date": "25 tháng 2, 2025",
        "author": "Admin",
        "description": "Ứng dụng phần mềm kế toán tự động giúp giảm sát sai, tiết kiệm thời gian và cắt giảm chi phí vận hành như thế nào?",
        "image": "image2.jpg",
        "link": "/chi-tiet/cong-nghe-tu-dong-hoa"
    },
    {
        "title": "Fintech & AI: Cách Công Nghệ Định Hình Tương Lai Ngành Tài Chính",
        "date": "25 tháng 2, 2025",
        "author": "Admin",
        "description": "Fintech và AI đang thay đổi cách chúng ta quản lý tài chính và đầu tư như thế nào? Cập nhật những xu hướng công nghệ tài chính mới nhất.",
        "image": "image3.jpg",
        "link": "/chi-tiet/fintech-ai-nganh-tai-chinh"
    }
]
const PostComponent = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 3000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 6000,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
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
                }
            }
        ]
    };

    return (
        <div className="post">
            <TitleComponent
                title={'Kho kiến thức Tài Chính'}
                color={'black'}
            />
            <div className="title">
                <h2>Có Thể Bạn Chưa Biết</h2>
            </div>
            <Slider {...settings} className='slider'>
                {
                    post && post.length && post.concat(post).map((item, index) => {
                        return (
                            <div className="slider-content" key={index}>
                                <img src="https://ocafe.net/wp-content/uploads/2024/10/anh-nen-may-tinh-4k-1.jpg" alt="" />
                                <div>

                                    <p className="author">
                                        <i className="fa fa-clock-o me-2" aria-hidden="true"></i>
                                        <span>{item.date}</span>
                                        <i
                                            className="fa fa-user-o ms-4 me-2"
                                            aria-hidden="true"
                                        ></i>
                                        <span>admin</span>
                                    </p>
                                    <a href="#" className="title">
                                        {item.title}
                                    </a>
                                </div>
                                <p className="description">
                                    {item.description}
                                </p>
                                <a href="#" className="see-move">
                                    Xem chi tiết
                                    <i
                                        className="fa fa-long-arrow-right ms-3"
                                        aria-hidden="true"
                                    ></i>
                                </a>
                            </div>
                        )
                    })
                }
            </Slider>
        </div>
    )
}

export default PostComponent