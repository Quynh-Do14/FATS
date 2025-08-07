"use client"
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TitleComponent from '@/infrastructure/common/components/controls/TitleComponent';
import blogService from '@/infrastructure/repositories/blog/blog.service';
import { configImageURL, convertDateOnlyShow, convertSlug } from '@/infrastructure/helper/helper';
import { ROUTE_PATH } from '@/core/common/appRouter';
import Link from 'next/link';
import Image from 'next/image';

const PostComponent = () => {
    const [mainBlogs, setMainBlog] = useState<Array<any>>([]);

    const onGetListAsync = async () => {
        const param = {
            size: 6,
        }
        try {
            await blogService.GetBlog(
                param,
                () => { }
            ).then((res) => {
                setMainBlog(res.content);
            })
        }
        catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        onGetListAsync().then(_ => { });
    }, []);

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
                    mainBlogs.map((item, index) => {
                        return (
                            <div className="slider-content" key={index}>
                                <Link
                                    href={`${ROUTE_PATH.BLOG}/${convertSlug(item?.title)}-${item?.id}.html`}
                                >
                                    <div className="image-wrapper">
                                        <Image
                                            src={configImageURL(item.imageCode)}
                                            alt={item.title}
                                            width={300}
                                            height={200}
                                            style={{ objectFit: 'cover', borderRadius: '15px' }}
                                        />
                                    </div>
                                </Link>
                                <div>
                                    <p className="author">
                                        <i className="fa fa-clock-o me-2" aria-hidden="true"></i>
                                        <span>{convertDateOnlyShow(item.createdAt)}</span>
                                        <i
                                            className="fa fa-user-o ms-4 me-2"
                                            aria-hidden="true"
                                        ></i>
                                        <span>{item.createdBy}</span>
                                    </p>
                                    <Link href={`${ROUTE_PATH.BLOG}/${convertSlug(item?.title)}-${item?.id}.html`} className="title text-truncate-2">
                                        {item.title}
                                    </Link>
                                </div>
                                <p className="description text-truncate-2">
                                    {item.shortDescription}
                                </p>
                                <Link href={`${ROUTE_PATH.BLOG}/${convertSlug(item?.title)}-${item?.id}.html`} className="see-move">
                                    Xem chi tiết
                                    <i
                                        className="fa fa-long-arrow-right ms-3"
                                        aria-hidden="true"
                                    ></i>
                                </Link>
                            </div>
                        )
                    })
                }
            </Slider >
        </div >
    )
}

export default PostComponent