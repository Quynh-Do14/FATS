"use client"
import BannerCommon from '@/infrastructure/common/components/banner/BannerCommon'
import LayoutClient from '@/infrastructure/common/Layouts/Client-Layout'
import React, { useEffect, useState } from 'react'
import banner2 from "@/assets/images/banner/banner2.png"
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '@/assets/styles/page/watch.css';
import YouTubeThumbnail from './youtube-thumbnail'
import Link from 'next/link'
import { ROUTE_PATH } from '@/core/common/appRouter'
import videoService from '@/infrastructure/repositories/video/video.service'
import { FullPageLoading } from '@/infrastructure/common/components/controls/loading'
import { Col, Row } from 'antd'

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
                    backgroundUrl={banner2.src}
                />
                <div className="padding-common">
                    {/* <div className="slider-container">
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
                    </div> */}
                    <div className="slider-container">
                        <Row gutter={[20, 20]}>
                            {
                                listVideo.map((item, index) => {
                                    return (
                                        <Col key={index} xs={24} sm={12} md={8} lg={6}>
                                            <Link href={`${ROUTE_PATH.WATCH}/${item.id}`}>
                                                <div className="youtube-thumbnail">
                                                    <YouTubeThumbnail
                                                        url={item.urlVideo}
                                                        key={index}
                                                        quality="maxresdefault"
                                                    />
                                                    <div className="video-hover-overlay">
                                                        <div className="video-info">
                                                            <h4>{item.urlVideo}</h4>
                                                            <p>{item.videoType}</p>
                                                        </div>
                                                        <div className="play-icon">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="48px" height="48px">
                                                                <path d="M8 5v14l11-7z" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </div>
                </div>
            </div>
            <FullPageLoading isLoading={loading} />
        </LayoutClient >
    )
}

export default WatchPage
