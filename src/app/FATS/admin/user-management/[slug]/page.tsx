"use client"
import React, { useEffect, useState } from 'react'
import styles from '@/assets/styles/admin/Management.module.css';
import { ROUTE_PATH } from '@/core/common/appRouter';
import { Col, Row } from 'antd';
import InputTextCommon from '@/infrastructure/common/components/input/input-text';
import TextEditorCommon from '@/infrastructure/common/components/input/text-editor-common';
import { useRouter } from 'next/navigation';
import InputTextAreaCommon from '@/infrastructure/common/components/input/text-area-common';
import UploadAvatar from '@/infrastructure/common/components/input/upload-avatar';
import blogService from '@/infrastructure/repositories/blog/blog.service';
import { WarningMessage } from '@/infrastructure/common/components/toast/notificationToast';
import InputSelectCommon from '@/infrastructure/common/components/input/select-common';
import CheckBoxCommon from '@/infrastructure/common/components/input/checkbox-common';
import { CategoryBlogState } from '@/core/atoms/category/categoryState';
import { useRecoilValue } from 'recoil';
import { configImageURL } from '@/infrastructure/helper/helper';
import { FullPageLoading } from '@/infrastructure/common/components/controls/loading';
import { ButtonDesign } from '@/infrastructure/common/components/button/buttonDesign';
import ManageLayout from '@/infrastructure/common/Layouts/Manage-Layout';
import InputSelectCategoryCommon from '@/infrastructure/common/components/input/select-category-common';
import AdminLayout from '@/infrastructure/common/Layouts/admin/MainLayout';
import userService from '@/infrastructure/repositories/user/user.service';
import Constants from '@/core/common/constants';

type Props = {
    params: { slug: string };
};

const SlugUserManagement = ({ params }: Props) => {
    const [detail, setDetail] = useState<any>({});
    const [validate, setValidate] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [submittedTime, setSubmittedTime] = useState<any>();
    const categoryBlogState = useRecoilValue(CategoryBlogState).data
    const [_data, _setData] = useState<any>({});
    const dataRequest = _data;
    const router = useRouter();

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

    const onGetByIdAsync = async () => {
        if (params.slug) {
            try {
                await userService.GetUserById(
                    params.slug,
                    setLoading
                ).then((res) => {
                    setDetail(res)
                })
            }
            catch (error) {
                console.error(error)
            }
        }

    }
    useEffect(() => {
        onGetByIdAsync().then(() => { })
    }, [])

    useEffect(() => {
        if (detail) {
            setDataRequest({
                name: detail.name,
                username: detail.username,
                password: detail.password,
                confirmPassword: detail.confirmPassword,
                email: detail.email,
                phoneNumber: detail.phoneNumber,
                roles: detail.roles,
            });
        };
    }, [detail]);

    const onUpdateAsync = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await blogService.UpdateBlogAdmin(
                params.slug,
                {
                    name: dataRequest.name,
                    username: dataRequest.username,
                    password: dataRequest.password,
                    confirmPassword: dataRequest.confirmPassword,
                    email: dataRequest.email,
                    phoneNumber: dataRequest.phoneNumber,
                    roles: dataRequest.roles,
                },
                onBack,
                setLoading
            )
        }
        else {
            WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
        };
    };

    return (
        <AdminLayout
            title={'Chi tiết tin tức'}
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
                            onClick={onUpdateAsync}
                            title={'Cập nhật'}
                            width={130}
                        />
                    </div>
                    <div className={styles.form_container}>
                        <Row gutter={[30, 20]}>
                            {/* <Col xs={24} sm={24} md={10} lg={8} xl={6} xxl={5} className={`${styles.border_add} flex justify-center`}>
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
                            </Col> */}
                            <Col span={24} className={styles.border_add}>
                                <div className={styles.legend_title}>Thêm thông tin mới</div>
                                <Row gutter={[30, 20]}>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                        <InputTextCommon
                                            label={"Tên"}
                                            attribute={"name"}
                                            isRequired={true}
                                            dataAttribute={dataRequest.name}
                                            setData={setDataRequest}
                                            disabled={false}
                                            validate={validate}
                                            setValidate={setValidate}
                                            submittedTime={submittedTime}
                                        />
                                    </Col>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                        <InputTextCommon
                                            label={"Tên đăng nhập"}
                                            attribute={"username"}
                                            isRequired={true}
                                            dataAttribute={dataRequest.username}
                                            setData={setDataRequest}
                                            disabled={false}
                                            validate={validate}
                                            setValidate={setValidate}
                                            submittedTime={submittedTime}
                                        />
                                    </Col>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                        <InputTextCommon
                                            label={"Email"}
                                            attribute={"email"}
                                            isRequired={true}
                                            dataAttribute={dataRequest.email}
                                            setData={setDataRequest}
                                            disabled={false}
                                            validate={validate}
                                            setValidate={setValidate}
                                            submittedTime={submittedTime}
                                        />
                                    </Col>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                        <InputTextCommon
                                            label={"SĐT"}
                                            attribute={"phoneNumber"}
                                            isRequired={true}
                                            dataAttribute={dataRequest.phoneNumber}
                                            setData={setDataRequest}
                                            disabled={false}
                                            validate={validate}
                                            setValidate={setValidate}
                                            submittedTime={submittedTime}
                                        />
                                    </Col>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                        <InputSelectCategoryCommon
                                            label={"Quyền"}
                                            attribute={"categoryId"}
                                            isRequired={true}
                                            dataAttribute={dataRequest.categoryId}
                                            setData={setDataRequest}
                                            disabled={false}
                                            validate={validate}
                                            setValidate={setValidate}
                                            submittedTime={submittedTime}
                                            listDataOfItem={Constants.Role.List}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
            <FullPageLoading isLoading={loading} />
        </AdminLayout>
    )
}

export default SlugUserManagement