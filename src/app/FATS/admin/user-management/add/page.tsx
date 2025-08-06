"use client"
import React, { useState } from 'react'
import styles from '@/assets/styles/admin/Management.module.css';
import { ROUTE_PATH } from '@/core/common/appRouter';
import { Col, Row } from 'antd';
import InputTextCommon from '@/infrastructure/common/components/input/input-text';
import { useRouter } from 'next/navigation';
import { WarningMessage } from '@/infrastructure/common/components/toast/notificationToast';
import { FullPageLoading } from '@/infrastructure/common/components/controls/loading';
import { ButtonDesign } from '@/infrastructure/common/components/button/buttonDesign';
import InputSelectCategoryCommon from '@/infrastructure/common/components/input/select-category-common';
import AdminLayout from '@/infrastructure/common/Layouts/admin/MainLayout';
import userService from '@/infrastructure/repositories/user/user.service';
import InputPasswordCommon from '@/infrastructure/common/components/input/input-password';
import Constants from '@/core/common/constants';

const AddUserManagement = () => {
    const [validate, setValidate] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [submittedTime, setSubmittedTime] = useState<any>();
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
        router.push(ROUTE_PATH.USER_MANAGEMENT)
    }
    const onCreateAsync = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            try {
                await userService.AddUserAdmin({
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
            catch (error) {
                console.error(error)
            }
        }
        else {
            WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
        };

    };
    return (
        <AdminLayout
            title={'Thêm người dùng'}
            breadcrumb={'người dùng'}
            redirect={ROUTE_PATH.USER_MANAGEMENT}
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
                                        <InputPasswordCommon
                                            label={"Mật khẩu"}
                                            attribute={"password"}
                                            isRequired={true}
                                            dataAttribute={dataRequest.password}
                                            setData={setDataRequest}
                                            disabled={false}
                                            validate={validate}
                                            setValidate={setValidate}
                                            submittedTime={submittedTime}
                                        />
                                    </Col>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                        <InputPasswordCommon
                                            label={"Nhập lại mật khẩu"}
                                            attribute={"confirmPassword"}
                                            isRequired={true}
                                            dataAttribute={dataRequest.confirmPassword}
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
export default AddUserManagement