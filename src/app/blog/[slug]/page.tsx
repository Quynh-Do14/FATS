import React from 'react'
import LayoutClient from '@/infrastructure/common/Layouts/Client-Layout'
import BannerCommon from '@/infrastructure/common/components/banner/BannerCommon'
import banner1 from "@/assets/images/banner/banner1.png"
import "@/assets/styles/page/blog.css";
import { Endpoint } from '@/core/common/apiLink';
import { configImageURL, convertSlug, splitTakeId } from '@/infrastructure/helper/helper';
import { Metadata } from 'next';
import { Col, Row } from 'antd';
import Link from 'next/link';
import { ROUTE_PATH } from '@/core/common/appRouter';

type Props = {
    params: { slug: string };
};
const baseURL = process.env.NEXT_PUBLIC_BASE_URL

export async function generateMetadata({ params }: Props): Promise<Metadata> {

    const blog = await fetch(`${baseURL}${Endpoint.Blog.GetById}/${splitTakeId(params.slug)}`, {
        cache: 'no-store', // Tắt cache
    }).then((res) => res.json());

    return {
        title: blog.blog.title,
        description: blog.blog?.description,
        openGraph: {
            title: blog.blog.title,
            description: blog.blog?.description,
            images: configImageURL(blog.blog.imageCode),
        },
    };
}

const BlogDetailPage = async ({ params }: Props) => {

    const blog = await fetch(`${baseURL}${Endpoint.Blog.GetById}/${splitTakeId(params.slug)}`, {
        cache: 'no-store', // Tắt cache
    }).then((res) =>
        res.json()
    );
    console.log("blog", blog);
    const blogDetail = blog.blog;
    const relatedBlogs: any[] = blog.relatedBlogs;

    return (
        <LayoutClient>
            <div className="blog">
                <BannerCommon
                    title={blogDetail.title}
                    sub={"Tin tức"}
                    backgroundUrl={configImageURL(blogDetail.imageCode)}
                />
                <div className="padding-common">
                    <Row gutter={[40, 20]} wrap>
                        {/* Bài viết chính hiển thị trước trên mobile */}
                        <Col xs={24} md={16} className="order-1 md:order-2">
                            <article
                                style={{ padding: '0 8px' }}
                                dangerouslySetInnerHTML={{ __html: blogDetail.content }}
                            />
                        </Col>

                        {/* Tin nổi bật chuyển xuống dưới trên mobile */}
                        <Col xs={24} md={8} className="order-2 md:order-1">
                            <div className="flex flex-col gap-12 left">
                                <h2 className="category-name">Tin liên quan</h2>
                                {relatedBlogs.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col mb-3 gap-4 md:gap-10 items-center md:items-end"
                                    >
                                        <div className="item-image w-full">
                                            <Link href={`${ROUTE_PATH.BLOG}/${convertSlug(item?.title)}-${item?.id}.html`}>
                                                <div
                                                    className="bg-img"
                                                    style={{
                                                        backgroundImage: `url(${configImageURL(item.imageCode)})`,
                                                    }}
                                                />
                                            </Link>
                                        </div>
                                        <div className="item-text text-left md:text-right w-full">
                                            <p className="author">
                                                <i className="fa fa-clock-o me-2" aria-hidden="true"></i>
                                                <span>{item.createdAt} </span>
                                                <i className="fa fa-user-o ms-4 me-2" aria-hidden="true"></i>
                                                <span>{item.createdBy}</span>
                                            </p>
                                            <Link href={`${ROUTE_PATH.BLOG}/${convertSlug(item?.title)}-${item?.id}.html`} className="title">
                                                {item.title}
                                            </Link>
                                            <p className="description">{item.shortDescription}</p>
                                            <Link href={`${ROUTE_PATH.BLOG}/${convertSlug(item?.title)}-${item?.id}.html`} className="see-move">
                                                Xem chi tiết
                                                <i className="fa fa-long-arrow-right ms-3" aria-hidden="true"></i>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Col>
                    </Row>

                </div>
            </div>
        </LayoutClient>
    )
}

export default BlogDetailPage