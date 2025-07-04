import React from 'react'
import LayoutClient from '@/infrastructure/common/Layouts/Client-Layout'
import BannerCommon from '@/infrastructure/common/components/banner/BannerCommon'
import banner1 from "@/assets/images/banner/banner1.png"
import "@/assets/styles/page/blog.css";
import { Endpoint } from '@/core/common/apiLink';
import { configImageURL, convertDateOnlyShow, convertSlug, splitTakeId } from '@/infrastructure/helper/helper';
import { Metadata } from 'next';
import { Col, Row } from 'antd';
import Link from 'next/link';
import { ROUTE_PATH } from '@/core/common/appRouter';
import BreadcrumbCommon from '@/infrastructure/common/Layouts/Breadcumb';

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
        description: blog.blog?.shortDescription,
        openGraph: {
            title: blog.blog.title,
            description: blog.blog?.shortDescription,
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
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        {/* Bài viết chính */}
                        <div className="md:col-span-8 order-1 md:order-1 flex flex-col gap-4">
                            <BreadcrumbCommon
                                breadcrumb={"Tin tức"}
                                redirect={ROUTE_PATH.BLOG}
                                title={blogDetail.title}
                            />
                            <h2 className="text-2xl font-bold text-gray-800">{blogDetail.title}</h2>
                            <article
                                className="prose max-w-none px-2 text-justify"
                                dangerouslySetInnerHTML={{ __html: blogDetail.content }}
                            />
                        </div>

                        {/* Tin liên quan */}
                        <div className="md:col-span-4 order-2 md:order-2 flex flex-col gap-6">
                            <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Tin liên quan</h2>
                            {relatedBlogs.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col gap-3 border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition"
                                >
                                    <div className="aspect-video w-full rounded overflow-hidden">
                                        <Link href={`${ROUTE_PATH.BLOG}/${convertSlug(item?.title)}-${item?.id}.html`}>
                                            <div
                                                className="w-full h-full bg-center bg-cover"
                                                style={{
                                                    backgroundImage: `url(${configImageURL(item.imageCode)})`,
                                                }}
                                            />
                                        </Link>
                                    </div>

                                    <div className="text-sm text-gray-600 flex items-center gap-3">
                                        <i className="fa fa-clock-o" aria-hidden="true"></i>
                                        <span>{convertDateOnlyShow(item.createdAt)}</span>
                                        <i className="fa fa-user-o ms-3" aria-hidden="true"></i>
                                        <span>{item.createdBy}</span>
                                    </div>

                                    <Link
                                        href={`${ROUTE_PATH.BLOG}/${convertSlug(item?.title)}-${item?.id}.html`}
                                        className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition"
                                    >
                                        {item.title}
                                    </Link>

                                    <p className="text-sm text-gray-500 line-clamp-2">{item.shortDescription}</p>

                                    <Link
                                        href={`${ROUTE_PATH.BLOG}/${convertSlug(item?.title)}-${item?.id}.html`}
                                        className="text-sm font-medium text-blue-600 inline-flex items-center hover:underline"
                                    >
                                        Xem chi tiết
                                        <i className="fa fa-long-arrow-right ml-2" aria-hidden="true"></i>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>


                </div>
            </div>
        </LayoutClient>
    )
}

export default BlogDetailPage