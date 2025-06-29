"use client"
import React, { useState } from 'react'
import styles from '@/assets/styles/admin/Management.module.css';
import { ROUTE_PATH } from '@/core/common/appRouter';
import { Col, Row } from 'antd';
import InputTextCommon from '@/infrastructure/common/components/input/input-text';
import { useRouter } from 'next/navigation';
import UploadAvatar from '@/infrastructure/common/components/input/upload-avatar';
import blogService from '@/infrastructure/repositories/blog/blog.service';
import { WarningMessage } from '@/infrastructure/common/components/toast/notificationToast';
import InputSelectCommon from '@/infrastructure/common/components/input/select-common';
import { CategoryBlogState } from '@/core/atoms/category/categoryState';
import { useRecoilValue } from 'recoil';
import { FullPageLoading } from '@/infrastructure/common/components/controls/loading';
import ManageLayout from '@/infrastructure/common/Layouts/Manage-Layout';
import { ButtonDesign } from '@/infrastructure/common/components/button/buttonDesign';
import InputTextAreaCommon from '@/infrastructure/common/components/input/text-area-common';
import TextEditorCommon from '@/infrastructure/common/components/input/text-editor-common';
import InputSelectCategoryCommon from '@/infrastructure/common/components/input/select-category-common';

const AddBlogManagement = () => {
    const [validate, setValidate] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [submittedTime, setSubmittedTime] = useState<any>();
    const categoryBlogState = useRecoilValue(CategoryBlogState).data
    const [_data, _setData] = useState<any>({});
    const dataRequest = _data;
    const router = useRouter();
    console.log("categoryBlogState", categoryBlogState);

    const setDataRequest = (data: any) => {
        Object.assign(dataRequest, { ...data });
        _setData({ ...dataRequest });
    };

    const isValidData = () => {
        let allRequestOK = true;

        setValidate({ ...validate });

        Object.values(validate).forEach((it: any) => {
            if (it.isError === true) {
                allRequestOK = false;
            }
        });
        return allRequestOK;
    };

    const onBack = () => {
        router.push(ROUTE_PATH.BLOG_MANAGEMENT)
    }
    const onCreateAsync = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            try {
                await blogService.AddBlogAdmin({
                    image: dataRequest.image,
                    title: dataRequest.title,
                    sortDescription: dataRequest.sortDescription,
                    content: dataRequest.content,
                    categoryId: dataRequest.categoryId,
                },
                    onBack,
                    setLoading
                )
            }
            catch (error) {
                console.error(error)
            }
        }
        else {
            WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
        };

    };
    return (
        <ManageLayout
            title={'Thêm tin tức'}
            breadcrumb={'Tin tức'}
            redirect={ROUTE_PATH.BLOG_MANAGEMENT}
        >
            <div className={styles.management_container}>
                <div className={styles.content}>
                    <div className={styles.btn_container}>
                        <ButtonDesign
                            classColor={'transparent'}
                            onClick={onBack}
                            title={'Quay lại'}
                            width={130}
                        />
                        <ButtonDesign
                            classColor={'green'}
                            onClick={onCreateAsync}
                            title={'Thêm mới'}
                            width={130}
                        />
                    </div>
                    <div className={styles.form_container}>
                        <Row gutter={[30, 20]}>
                            <Col xs={24} sm={24} md={10} lg={8} xl={6} xxl={5} className={`${styles.border_add} flex justify-center`}>
                                <div className='flex flex-col gap-4'>
                                    <div className={styles.legend_title}>Thêm mới ảnh</div>
                                    <UploadAvatar
                                        dataAttribute={dataRequest.image}
                                        setData={setDataRequest}
                                        attribute={'image'}
                                        label={'Ảnh'}
                                        listType={'picture-card'}
                                        shape={'card'} />
                                </div>
                            </Col>
                            <Col xs={24} sm={24} md={14} lg={16} xl={18} xxl={19} className={styles.border_add}>
                                <div className={styles.legend_title}>Thêm thông tin mới</div>
                                <Row gutter={[30, 20]}>
                                    <Col span={24}>
                                        <InputTextCommon
                                            label={"Tiêu đề"}
                                            attribute={"title"}
                                            isRequired={true}
                                            dataAttribute={dataRequest.title}
                                            setData={setDataRequest}
                                            disabled={false}
                                            validate={validate}
                                            setValidate={setValidate}
                                            submittedTime={submittedTime}
                                        />
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <InputSelectCategoryCommon
                                            label={"Danh mục"}
                                            attribute={"categoryId"}
                                            isRequired={true}
                                            dataAttribute={dataRequest.categoryId}
                                            setData={setDataRequest}
                                            disabled={false}
                                            validate={validate}
                                            setValidate={setValidate}
                                            submittedTime={submittedTime}
                                            listDataOfItem={categoryBlogState}
                                            nameOfLabel='name'
                                            nameOfValue='id'
                                        />
                                    </Col>
                                    <Col span={24}>
                                        <InputTextAreaCommon
                                            label={"Mô tả ngắn"}
                                            attribute={"sortDescription"}
                                            isRequired={true}
                                            dataAttribute={dataRequest.sortDescription}
                                            setData={setDataRequest}
                                            disabled={false}
                                            validate={validate}
                                            setValidate={setValidate}
                                            submittedTime={submittedTime}
                                            placeholder={''}
                                        />
                                    </Col>

                                </Row>
                            </Col>
                            <Col span={24}>
                                <TextEditorCommon
                                    label={"Nội dung"}
                                    attribute={"content"}
                                    isRequired={true}
                                    dataAttribute={dataRequest.content}
                                    setData={setDataRequest}
                                    disabled={false}
                                    validate={validate}
                                    setValidate={setValidate}
                                    submittedTime={submittedTime}
                                />
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
            <FullPageLoading isLoading={loading} />
        </ManageLayout>
    )
}
export default AddBlogManagement