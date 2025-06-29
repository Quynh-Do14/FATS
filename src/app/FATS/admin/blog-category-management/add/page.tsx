"use client"
import React, { useState } from 'react'
import styles from '@/assets/styles/admin/Management.module.css';
import { ROUTE_PATH } from '@/core/common/appRouter';
import { Col, Row } from 'antd';
import InputTextCommon from '@/infrastructure/common/components/input/input-text';
import { useRouter } from 'next/navigation';
import { WarningMessage } from '@/infrastructure/common/components/toast/notificationToast';
import categoryBlogService from '@/infrastructure/repositories/category/categoryBlog.service';
import { FullPageLoading } from '@/infrastructure/common/components/controls/loading';
import ManageLayout from '@/infrastructure/common/Layouts/Manage-Layout';
import { ButtonDesign } from '@/infrastructure/common/components/button/buttonDesign';

const AddBlogManagement = () => {
    const [validate, setValidate] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [submittedTime, setSubmittedTime] = useState<any>();

    const [_data, _setData] = useState<any>({});
    const dataBlog = _data;
    const router = useRouter();

    const setDataBlog = (data: any) => {
        Object.assign(dataBlog, { ...data });
        _setData({ ...dataBlog });
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
        router.push(ROUTE_PATH.BLOG_CATEGORY_MANAGEMENT);
    };

    const onAddCategoryAsync = async () => {
        try {
            await setSubmittedTime(Date.now());
            if (isValidData()) {
                await categoryBlogService.AddCategoryAdmin({
                    name: dataBlog.name,
                    description: "",
                },
                    onBack,
                    setLoading
                )
            }
            else {
                WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
            };
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <ManageLayout
            title={'Thêm danh mục'}
            breadcrumb={'Danh mục'}
            redirect={ROUTE_PATH.BLOG_CATEGORY_MANAGEMENT}
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
                            onClick={onAddCategoryAsync}
                            title={'Thêm mới'}
                            width={130}
                        />
                    </div>
                    <div className={styles.form_container}>
                        <Row gutter={[30, 20]}>
                            <Col xs={24} sm={24} className={`${styles.border_add} flex justify-center`}>
                                <div className={styles.legend_title}>Thêm thông tin mới</div>
                                <Row gutter={[30, 20]}>
                                    <Col span={24}>
                                        <InputTextCommon
                                            label={"Tên danh mục"}
                                            attribute={"name"}
                                            isRequired={true}
                                            dataAttribute={dataBlog.name}
                                            setData={setDataBlog}
                                            disabled={false}
                                            validate={validate}
                                            setValidate={setValidate}
                                            submittedTime={submittedTime}
                                        />
                                    </Col>
                                </Row>
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