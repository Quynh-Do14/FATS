"use client"
import BannerCommon from '@/infrastructure/common/components/banner/BannerCommon'
import LayoutClient from '@/infrastructure/common/Layouts/Client-Layout'
import React from 'react'
import banner1 from "@/assets/images/banner/banner1.png"
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '@/assets/styles/page/watch.css';
import YouTubeThumbnail from './youtube-thumbnail'
import Link from 'next/link'
import { ROUTE_PATH } from '@/core/common/appRouter'

const WatchPage = () => {
    const video = [
        "https://www.youtube.com/watch?v=zg5SUXqHQnA",
        "https://www.youtube.com/watch?v=VJK6wijgeaw",
        "https://www.youtube.com/watch?v=zg5SUXqHQnA",
        "https://www.youtube.com/watch?v=VJK6wijgeaw",
        "https://www.youtube.com/watch?v=zg5SUXqHQnA",
        "https://www.youtube.com/watch?v=VJK6wijgeaw",
        "https://www.youtube.com/watch?v=zg5SUXqHQnA",
        "https://www.youtube.com/watch?v=VJK6wijgeaw",
        "https://www.youtube.com/watch?v=zg5SUXqHQnA",
        "https://www.youtube.com/watch?v=VJK6wijgeaw",
        "https://www.youtube.com/watch?v=zg5SUXqHQnA",
    ]
    const settings = {
        dots: true,
        infinite: true,
        speed: 3000,
        slidesToShow: 4,
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
                },
            },
            {
                breakpoint: 768, // màn hình <= 768px
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480, // màn hình <= 480px
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false,
                },
            }
        ]
    };

    return (
        <LayoutClient>
            <div className="watch-container">
                <BannerCommon
                    title={"Video ngắn"}
                    sub={"Reels"}
                    backgroundUrl={banner1.src}
                />
                <div className="padding-common">
                    <div className="slider-container">
                        <Slider {...settings} className=''>
                            {
                                video && video.length && video.map((item, index) => {
                                    return (
                                        <Link href={`${ROUTE_PATH.WATCH}/${index}`}>
                                            <YouTubeThumbnail
                                                url={item}
                                                key={index}
                                                quality="maxresdefault"
                                            />
                                        </Link>
                                    )
                                })
                            }
                        </Slider>
                    </div>
                </div>
            </div>
        </LayoutClient>
    )
}

export default WatchPage
