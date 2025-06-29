"use client"
import React, { useEffect, useState } from 'react';
import styles from '@/assets/styles/admin/Management.module.css';
import { Table } from 'antd';
import Column from 'antd/es/table/Column'
import { TitleTableCommon } from '@/infrastructure/common/components/text/title-table-common';
import { PaginationCommon } from '@/infrastructure/common/components/pagination/Pagination';
import { ROUTE_PATH } from '@/core/common/appRouter';
import { useRouter } from 'next/navigation';
import Constants from '@/core/common/constants';
import DialogConfirmCommon from '@/infrastructure/common/components/modal/dialogConfirm';
import { ActionCommon } from '@/infrastructure/common/components/action/action-common';
import categoryBlogService from '@/infrastructure/repositories/category/categoryBlog.service';
import { FullPageLoading } from '@/infrastructure/common/components/controls/loading';
import { ButtonDesign } from '@/infrastructure/common/components/button/buttonDesign';
import { InputSearchCommon } from '@/infrastructure/common/components/input/input-search-common';
import ManageLayout from '@/infrastructure/common/Layouts/Manage-Layout';

let timeout: any
const ListCategoryManagement = () => {
    const [listCategory, setListCategory] = useState<Array<any>>([])
    const [total, setTotal] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [searchText, setSearchText] = useState<string>("");
    const [idSelected, setIdSelected] = useState<string>("");
    const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter();
    const onGetListBlogAsync = async ({ name = "", size = pageSize, page = currentPage }) => {
        const param = {
            page: page - 1,
            size: size,
            keyword: name,
        }
        try {
            await categoryBlogService.GetCategory(
                param,
                setLoading
            ).then((res) => {
                setListCategory(res.content)
                setTotal(res.page.totalElements)
            })
        }
        catch (error) {
            console.error(error)
        }
    }
    const onSearch = async (name = "", size = pageSize, page = 1,) => {
        await onGetListBlogAsync({ name: name, size: size, page: page, });
    };

    const onChangeSearchText = (e: any) => {
        setSearchText(e.target.value);
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            onSearch(e.target.value, pageSize, currentPage).then((_) => { });
        }, Constants.DEBOUNCE_SEARCH);
    };

    useEffect(() => {
        onSearch().then(_ => { });
    }, [])
    const onChangePage = async (value: any) => {
        setCurrentPage(value)
        await onSearch(searchText, pageSize, value).then(_ => { });
    }
    const onPageSizeChanged = async (value: any) => {
        setPageSize(value)
        setCurrentPage(1)
        await onSearch(searchText, value, 1).then(_ => { });
    }

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
            await categoryBlogService.DeleteCategoryAdmin(
                idSelected,
                setLoading
            ).then((res) => {
                if (res) {
                    onSearch().then(() => { })
                }
            })
        }
        catch (error) {
            console.error(error)
        }
    }
    return (
        <ManageLayout
            title={'Danh sách danh mục bài viết'}
            breadcrumb={'Danh mục'}
            redirect={ROUTE_PATH.BLOG_CATEGORY_MANAGEMENT}
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
                            onClick={() => router.push(ROUTE_PATH.ADD_BLOG_CATEGORY_MANAGEMENT)}
                            title={'Thêm mới'}
                            width={130}
                        />
                    </div>
                    <div className={styles.table_container}>
                        <Table
                            dataSource={listCategory}
                            pagination={false}
                            className='table-common'
                        >
                            <Column
                                title={"STT"}
                                dataIndex="stt"
                                key="stt"
                                width={"5%"}
                                render={(val, record, index) => (
                                    <div style={{ textAlign: "center" }}>
                                        {index + 1 + pageSize * (currentPage - 1)}
                                    </div>
                                )}
                            />
                            <Column
                                title={
                                    <TitleTableCommon
                                        title="Tên danh mục"
                                        width={'250px'}
                                    />
                                }
                                key={"name"}
                                dataIndex={"name"}
                            />
                            <Column
                                title={
                                    <TitleTableCommon
                                        title="Thao tác"
                                        width={"80px"}
                                    />
                                }
                                width={"80px"}
                                fixed="right"
                                align='center'
                                render={(action, record: any) => (
                                    <ActionCommon
                                        onClickDetail={() => router.push(`${ROUTE_PATH.BLOG_CATEGORY_MANAGEMENT}/${record.id}`)}
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
                        message={"Bạn có muốn xóa danh mục này ra khỏi hệ thống"}
                        titleCancel={"Bỏ qua"}
                        titleOk={"Xóa danh mục"}
                        visible={isDeleteModal}
                        handleCancel={onCloseModalDelete}
                        handleOk={onDeleteAsync}
                        title={"Xác nhận"}
                    />
                </div>
            </div>
            <FullPageLoading isLoading={loading} />
        </ManageLayout >
    )
}

export default ListCategoryManagement