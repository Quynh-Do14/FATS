'use client';
import React, { useEffect, useState } from "react";
import LayoutClient from "@/infrastructure/common/Layouts/Client-Layout";
import BannerCommon from "@/infrastructure/common/components/banner/BannerCommon";
import { PaginationCommon } from "@/infrastructure/common/components/pagination/Pagination";
import banner1 from "@/assets/images/banner/banner1.png"
import "@/assets/styles/page/blog.css";
import blogService from "@/infrastructure/repositories/blog/blog.service";
import { configImageURL, convertSlug } from "@/infrastructure/helper/helper";
import { useRecoilValue } from "recoil";
import { CategoryBlogState } from "@/core/atoms/category/categoryState";
import { ROUTE_PATH } from "@/core/common/appRouter";
import Link from "next/link";
import BlogListSkeleton from "./skeleton";
import Constants from "@/core/common/constants";

let timeout: any
const BlogPage = () => {
  const [mainBlogs, setMainBlog] = useState<Array<any>>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalElement, setTotalElement] = useState<number>(0);
  const [searchText, setSearchText] = useState<string>("");
  const [pageSize, setPageSize] = useState<number>(10);
  const [categoryId, setCategoryId] = useState<string>("");

  const categoryBlogState = useRecoilValue(CategoryBlogState).data;

  const onGetListAsync = async ({ name = "", page = currentPage, size = pageSize, categoryId = "" }) => {
    const param = {
      page: page - 1,
      size: size,
      keyword: name,
      categoryId: categoryId
    }
    try {
      await blogService.GetBlog(
        param,
        setLoading
      ).then((res) => {
        setMainBlog(res.content);
        setTotalElement(res.page.totalElements);
      })
    }
    catch (error) {
      console.error(error);
    }
  }

  const onSearch = async (name = "", page = 1, size = 10, categoryId = "") => {
    await onGetListAsync({ name: name, page: page, size: size, categoryId: categoryId });
  };

  const onChangeSearchText = (e: any) => {
    setSearchText(e.target.value);
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      onSearch(e.target.value, currentPage, pageSize, categoryId).then((_) => { });
    }, Constants.DEBOUNCE_SEARCH);
  };

  const onChangePage = async (value: any) => {
    setCurrentPage(value)
    await onSearch(searchText, value, pageSize, categoryId).then(_ => { });
  };

  const onPageSizeChanged = async (value: any) => {
    setPageSize(value)
    setCurrentPage(1)
    await onSearch(searchText, 1, value, categoryId).then(_ => { });
  };

  const onSelectCategory = async (value: string) => {
    setCategoryId(value)
    await onSearch(searchText, 1, pageSize, value).then(_ => { });
  };

  useEffect(() => {
    onSearch().then(_ => { });
  }, []);

  return (
    <LayoutClient>
      <div className="blog">
        <BannerCommon
          title={"Tin tức"}
          sub={"Tin tức"}
          backgroundUrl={banner1.src}
        />
        <div className="padding-common">
          <div className="grid grid-cols-12 gap-6 md:gap-16">
            <div className="col-span-12 md:col-span-9 flex flex-col gap-4 order-2 md:order-1 left">
              {
                !loading ? (
                  mainBlogs.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center text-gray-600">
                      <i className="fa fa-folder-open text-[#003333] mb-6"
                        style={{ fontSize: "80px" }}
                        aria-hidden="true"></i>
                      <h2 className="text-xl font-semibold mb-2">Không có bài viết nào</h2>
                    </div>
                  ) : (
                    mainBlogs.map((item, index) => {
                      const isEven = index % 2 === 0;
                      return (
                        <div
                          key={index}
                          className={`flex flex-col mb-3 gap-4 md:gap-10 items-center 
              ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                        >
                          <div className="item-image">
                            <Link href={`${ROUTE_PATH.BLOG}/${convertSlug(item?.title)}-${item?.id}.html`}>
                              <div
                                className="bg-img"
                                style={{
                                  backgroundImage: `url(${configImageURL(item.imageCode)})`,
                                }}
                              ></div>
                            </Link>
                          </div>
                          <div className="item-text md:text-right">
                            <p className="author">
                              <i className="fa fa-clock-o me-2" aria-hidden="true"></i>
                              <span>{item.createdAt} </span>
                              <i
                                className="fa fa-user-o ms-4 me-2"
                                aria-hidden="true"
                              ></i>
                              <span>{item.createdBy}</span>
                            </p>
                            <Link href={`${ROUTE_PATH.BLOG}/${convertSlug(item?.title)}-${item?.id}.html`} className="title">
                              {item.title}
                            </Link>
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
                        </div>
                      );
                    })
                  )
                ) : (
                  <BlogListSkeleton />
                )
              }
              <PaginationCommon
                total={totalElement}
                currentPage={currentPage}
                onChangePage={onChangePage}
                pageSize={10}
                onChangeSize={onPageSizeChanged}
                disabled={false}
                isClient={false}
              />
            </div>
            <div className="order-1 md:order-2 col-span-12 md:col-span-3 right">
              <div className="search-input m-auto">
                <input
                  type="search"
                  name=""
                  id=""
                  placeholder="Nhập từ khóa..."
                  onChange={onChangeSearchText}
                  value={searchText}
                />
                <span>
                  <i className="fa fa-search" aria-hidden="true"></i>
                </span>
              </div>

              <div className="hidden md:block mt-10">
                <div className="categories">
                  <h2 className="category-name">Danh Mục Tin</h2>
                  <div className="category-content">
                    <ul>
                      <li>
                        <a
                          className={`category-item cursor-pointer ${categoryId === '' ? 'active' : ''}`}
                          onClick={() => onSelectCategory('')}
                        >
                          Tất cả
                        </a>
                      </li>
                      {categoryBlogState.map((item, index) => (
                        <li key={index}>
                          <a
                            className={`category-item cursor-pointer ${categoryId === item.id ? 'active' : ''}`}
                            onClick={() => onSelectCategory(item.id)}
                          >
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* <div className="tags">
                  <h2 className="category-name">Tags</h2>
                  <div className="category-content">
                    <div className="flex flex-wrap gap-2">
                      <a className="tags-item" href="#">
                        Tài chính
                      </a>
                      <a className="tags-item" href="#">
                        Dòng tiền
                      </a>
                      <a className="tags-item" href="#">
                        AI
                      </a>
                      <a className="tags-item" href="#">
                        Đầu tư
                      </a>
                      <a className="tags-item" href="#">
                        Quản lý
                      </a>
                    </div>
                  </div>
                </div> */}

                {/* <div className="featured-news">
                  <h2 className="category-name">Tin Nổi Bật</h2>
                  <div className="category-content">
                    <div className="flex flex-col gap-6">
                      <div className="featured-news-item">
                        <a href="#">
                          <div className="featured-news-img">
                            <div
                              className="bg-img"
                              style={{
                                backgroundImage: `url('https://ocafe.net/wp-content/uploads/2024/10/anh-nen-may-tinh-4k-1.jpg')`,
                              }}
                            ></div>
                          </div>
                        </a>
                        <p className="author">
                          <i
                            className="fa fa-clock-o me-2"
                            aria-hidden="true"
                          ></i>
                          <span>27/03/2025</span>
                          <i
                            className="fa fa-user-o ms-4 me-2"
                            aria-hidden="true"
                          ></i>
                          <span>admin</span>
                        </p>

                        <a href="#" className="title">
                          Cách Ứng Dụng AI Trong Dự Báo Tài Chính & Ra Quyết
                          Định Đầu Tư
                        </a>
                      </div>
                      <div className="featured-news-item">
                        <a href="#">
                          <div className="featured-news-img">
                            <div
                              className="bg-img"
                              style={{
                                backgroundImage: `url('https://ocafe.net/wp-content/uploads/2024/10/anh-nen-may-tinh-4k-1.jpg')`,
                              }}
                            ></div>
                          </div>
                        </a>
                        <p className="author">
                          <i
                            className="fa fa-clock-o me-2"
                            aria-hidden="true"
                          ></i>
                          <span>27/03/2025</span>
                          <i
                            className="fa fa-user-o ms-4 me-2"
                            aria-hidden="true"
                          ></i>
                          <span>admin</span>
                        </p>

                        <a href="#" className="title">
                          Cách Ứng Dụng AI Trong Dự Báo Tài Chính & Ra Quyết
                          Định Đầu Tư
                        </a>
                      </div>
                      <div className="featured-news-item">
                        <a href="#">
                          <div className="featured-news-img">
                            <div
                              className="bg-img"
                              style={{
                                backgroundImage: `url('https://ocafe.net/wp-content/uploads/2024/10/anh-nen-may-tinh-4k-1.jpg')`,
                              }}
                            ></div>
                          </div>
                        </a>
                        <p className="author">
                          <i
                            className="fa fa-clock-o me-2"
                            aria-hidden="true"
                          ></i>
                          <span>27/03/2025</span>
                          <i
                            className="fa fa-user-o ms-4 me-2"
                            aria-hidden="true"
                          ></i>
                          <span>admin</span>
                        </p>

                        <a href="#" className="title">
                          Cách Ứng Dụng AI Trong Dự Báo Tài Chính & Ra Quyết
                          Định Đầu Tư
                        </a>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutClient>
  );
};

export default BlogPage;
