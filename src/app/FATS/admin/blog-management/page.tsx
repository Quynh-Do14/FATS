"use client"
import React, { useEffect, useState } from 'react';
import styles from '@/assets/styles/admin/Management.module.css';
import { Col, Row, Table } from 'antd';
import Column from 'antd/es/table/Column'
import { TitleTableCommon } from '@/infrastructure/common/components/text/title-table-common';
import { PaginationCommon } from '@/infrastructure/common/components/pagination/Pagination';
import { ROUTE_PATH } from '@/core/common/appRouter';
import { useRouter } from 'next/navigation';
import Constants from '@/core/common/constants';
import DialogConfirmCommon from '@/infrastructure/common/components/modal/dialogConfirm';
import { convertDateShow } from '@/infrastructure/helper/helper';
import { FullPageLoading } from '@/infrastructure/common/components/controls/loading';
import blogService from '@/infrastructure/repositories/blog/blog.service';
import { InputSearchCommon } from '@/infrastructure/common/components/input/input-search-common';
import { ButtonDesign } from '@/infrastructure/common/components/button/buttonDesign';
import ManageLayout from '@/infrastructure/common/Layouts/Manage-Layout';
import { ActionCommon } from '@/infrastructure/common/components/action/action-common';
import AdminLayout from '@/infrastructure/common/Layouts/admin/MainLayout';

let timeout: any
const ListBlogManagement = () => {
    const [listResponse, setListResponse] = useState<Array<any>>([])
    const [total, setTotal] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [searchText, setSearchText] = useState<string>("");
    const [searchShow, setSearchShow] = useState<boolean>(true);

    const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);

    const [idSelected, setIdSelected] = useState<string>("");

    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter();
    const onGetListAsync = async ({ name = "", size = pageSize, page = currentPage, show = searchShow }) => {
        const param = {
            page: page - 1,
            size: size,
            keyword: name,
            show: show
        }
        try {
            await blogService.GetBlogAdmin(
                param,
                setLoading
            ).then((res) => {
                setListResponse(res.content)
                setTotal(res.page.totalElements)
            })
        }
        catch (error) {
            console.error(error)
        }
    };

    const onSearch = async (name = "", size = pageSize, page = 1, show = true) => {
        await onGetListAsync({ name: name, size: size, page: page, show: show });
    };

    const onChangeSearchText = (e: any) => {
        setSearchText(e.target.value);
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            onSearch(e.target.value, pageSize, currentPage, searchShow).then((_) => { });
        }, Constants.DEBOUNCE_SEARCH);
    };

    const onChangeSearchShow = (value: any) => {
        setSearchShow(value);
        onSearch(searchText, pageSize, currentPage, value).then((_) => { });
    };

    useEffect(() => {
        onSearch().then(_ => { });
    }, []);

    const onChangePage = async (value: any) => {
        setCurrentPage(value)
        await onSearch(searchText, pageSize, value, searchShow).then(_ => { });
    };

    const onPageSizeChanged = async (value: any) => {
        setPageSize(value)
        setCurrentPage(1)
        await onSearch(searchText, value, 1, searchShow).then(_ => { });
    };
    // Xóa bài
    const onOpenModalDelete = (id: any) => {
        setIsDeleteModal(true);
        setIdSelected(id)
    };

    const onCloseModalDelete = () => {
        setIsDeleteModal(false);
    };

    const onDeleteAsync = async () => {
        setIsDeleteModal(false);
        try {
            await blogService.DeleteBlogAdmin(
                idSelected,
                setLoading
            ).then((res) => {
                if (res) {
                    onSearch().then(() => { })
                    setIsDeleteModal(false);
                }
            })
        }
        catch (error) {
            console.error(error)
        }
    }
    // Xóa bài

    return (
        <AdminLayout
            title={'Danh sách tin tức'}
            breadcrumb={'Tin tức'}
            redirect={ROUTE_PATH.BLOG_MANAGEMENT}
        >
            <div className={styles.management_container}>
                <div className={styles.content}>
                    <div className={styles.search_container}>
                        <InputSearchCommon
                            placeholder={'Tìm kiếm'}
                            value={searchText}
                            onChange={onChangeSearchText}
                            disabled={false}
                        />
                        <ButtonDesign
                            classColor={'green'}
                            onClick={() => router.push(ROUTE_PATH.ADD_BLOG_MANAGEMENT)}
                            title={'Thêm mới'}
                            width={130}
                        />
                    </div>
                    <div className={styles.table_container}>
                        <Table
                            dataSource={listResponse}
                            pagination={false}
                            className='table-common'
                        >
                            <Column
                                title={"STT"}
                                dataIndex="stt"
                                key="stt"
                                // width={"5%"}
                                render={(val, record, index) => (
                                    <div style={{ textAlign: "center" }}>
                                        {index + 1 + pageSize * (currentPage - 1)}
                                    </div>
                                )}
                            />
                            <Column
                                title={
                                    <TitleTableCommon
                                        title="Tên bài viết"
                                        width={'250px'}
                                    />
                                }
                                key={"title"}
                                dataIndex={"title"}
                            />

                            <Column
                                title={
                                    <TitleTableCommon
                                        title="Danh mục"
                                        width={'100px'}
                                    />
                                }
                                key={"categoryName"}
                                dataIndex={"categoryName"}
                            />
                            <Column
                                title={
                                    <TitleTableCommon
                                        title="Ngày đăng"
                                        width={'150px'}
                                    />
                                }
                                key={"createdAt"}
                                dataIndex={"createdAt"}
                                render={(val) => {
                                    return (
                                        <div>{convertDateShow(val)} </div>
                                    )
                                }}
                            />
                            <Column
                                title={
                                    <TitleTableCommon
                                        title="Thao tác"
                                        width={"60px"}
                                    />
                                }
                                fixed="right"
                                align='center'
                                width={"60px"}
                                render={(action, record: any) => (
                                    <ActionCommon
                                        onClickDetail={() => router.push(`${ROUTE_PATH.BLOG_MANAGEMENT}/${record.id}`)}
                                        onClickDelete={() => onOpenModalDelete(record.id)}
                                    />
                                )}
                            />
                        </Table>
                    </div>
                    <div className='flex flex-col'>
                        <PaginationCommon
                            total={total}
                            currentPage={currentPage}
                            onChangePage={onChangePage}
                            pageSize={pageSize}
                            onChangeSize={onPageSizeChanged}
                            disabled={false}
                        />
                    </div>
                    <DialogConfirmCommon
                        message={"Bạn có muốn xóa tin tức này ra khỏi hệ thống"}
                        titleCancel={"Bỏ qua"}
                        titleOk={"Xóa tin tức"}
                        visible={isDeleteModal}
                        handleCancel={onCloseModalDelete}
                        handleOk={onDeleteAsync}
                        title={"Xác nhận"}
                    />

                </div>
            </div>
            <FullPageLoading isLoading={loading} />
        </AdminLayout >
    )
}

export default ListBlogManagement