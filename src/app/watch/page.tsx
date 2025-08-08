"use client"
import BannerCommon from '@/infrastructure/common/components/banner/BannerCommon'
import LayoutClient from '@/infrastructure/common/Layouts/Client-Layout'
import React, { useEffect, useState } from 'react'
import banner1 from "@/assets/images/banner/banner1.png"
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '@/assets/styles/page/watch.css';
import YouTubeThumbnail from './youtube-thumbnail'
import Link from 'next/link'
import { ROUTE_PATH } from '@/core/common/appRouter'
import videoService from '@/infrastructure/repositories/video/video.service'
import { FullPageLoading } from '@/infrastructure/common/components/controls/loading'

const WatchPage = () => {
    const [listVideo, setListVideo] = useState<Array<any>>([])
    const [loading, setLoading] = useState<boolean>(false);
    const [total, setTotal] = useState<number>(0);

    const onGetListVideoAsync = async () => {
        const param = {
            // page: page - 1,
            // size: size,
            // keyword: name,
        }
        try {
            await videoService.GetVideo(
                param,
                setLoading
            ).then((res) => {
                setListVideo(res.content);
                setTotal(res.page.totalElements);
            })
        }
        catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        onGetListVideoAsync().then(_ => { });
    }, []);

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
                                listVideo && listVideo.length && listVideo.map((item, index) => {
                                    return (
                                        <Link href={`${ROUTE_PATH.WATCH}/${item.id}`}>
                                            <YouTubeThumbnail
                                                url={item.urlVideo}
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
            <FullPageLoading isLoading={loading} />
        </LayoutClient>
    )
}

export default WatchPage
