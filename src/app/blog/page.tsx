'use client';
import React from "react";
import LayoutClient from "@/infrastructure/common/Layouts/Client-Layout";
import BannerCommon from "@/infrastructure/common/components/banner/BannerCommon";
import { PaginationCommon } from "@/infrastructure/common/components/pagination/Pagination";
import banner1 from "@/assets/images/banner/banner1.png"
import blog from "@/assets/images/blog.jpg"

const BlogPage = () => {
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
            <div className="col-span-12 md:col-span-9 flex flex-col gap-12 order-2 md:order-1 left">
              <div className="flex md:flex-row-reverse flex-col mb-3 gap-4 md:gap-10 items-center">
                <div className="item-image">
                  <a href="#">
                    <div
                      className="bg-img"
                      style={{
                        backgroundImage: `url(${blog.src})`,
                      }}
                    ></div>
                  </a>
                </div>
                <div className="item-text md:text-right">
                  <p className="author">
                    <i className="fa fa-clock-o me-2" aria-hidden="true"></i>
                    <span>27/03/2025</span>
                    <i
                      className="fa fa-user-o ms-4 me-2"
                      aria-hidden="true"
                    ></i>
                    <span>admin</span>
                  </p>
                  <a href="#" className="title">
                    Cách ung Dụng AI Trong Dự Báo Tài Chính & Ra Quyết Định
                    Đầu Tư
                  </a>
                  <p className="description">
                    Công nghệ AI đang thay đổi cách doanh nghiệp dự báo tài
                    chính như thế nào? Cùng tìm hiểu cách tận dụng AI để nâng
                    cao hiệu quả.
                  </p>
                  <a href="#" className="see-move">
                    Xem chi tiết
                    <i
                      className="fa fa-long-arrow-right ms-3"
                      aria-hidden="true"
                    ></i>
                  </a>
                </div>
              </div>
              <div className="flex md:flex-row flex-col mb-3 gap-4 md:gap-10 items-center">
                <div className="item-image">
                  <a href="#">
                    <div
                      className="bg-img"
                      style={{
                        backgroundImage: `url('https://ocafe.net/wp-content/uploads/2024/10/anh-nen-may-tinh-4k-1.jpg')`,
                      }}
                    ></div>
                  </a>
                </div>

                <div className="item-text md:text-left">
                  <p className="author">
                    <i className="fa fa-clock-o me-2" aria-hidden="true"></i>
                    <span>27/03/2025</span>
                    <i
                      className="fa fa-user-o ms-4 me-2"
                      aria-hidden="true"
                    ></i>
                    <span>admin</span>
                  </p>
                  <a href="#" className="title">
                    Cách Ứng Dụng AI Trong Dự Báo Tài Chính & Ra Quyết Định
                    Đầu Tư
                  </a>
                  <p className="description">
                    Công nghệ AI đang thay đổi cách doanh nghiệp dự báo tài
                    chính như thế nào? Cùng tìm hiểu cách tận dụng AI để nâng
                    cao hiệu quả.
                  </p>
                  <a href="#" className="see-move">
                    Xem chi tiết
                    <i
                      className="fa fa-long-arrow-right ms-3"
                      aria-hidden="true"
                    ></i>
                  </a>
                </div>
              </div>

              <PaginationCommon
                total={100}
                currentPage={2}
                onChangePage={() => { }}
                pageSize={10}
                onChangeSize={() => { }}
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
                        <a className="category-item" href="#">
                          Quản lý tài chính doanh nghiệp
                        </a>
                      </li>
                      <li>
                        <a className="category-item" href="#">
                          Quản lý tài chính doanh nghiệp
                        </a>
                      </li>
                      <li>
                        <a className="category-item" href="#">
                          Quản lý tài chính doanh nghiệp
                        </a>
                      </li>
                      <li>
                        <a className="category-item" href="#">
                          Quản lý tài chính doanh nghiệp
                        </a>
                      </li>
                      <li>
                        <a className="category-item" href="#">
                          Quản lý tài chính doanh nghiệp
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="tags">
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
                </div>

                <div className="featured-news">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutClient>
  );
};

export default BlogPage;
