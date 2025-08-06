"use client"
import { ROUTE_PATH } from '@/core/common/appRouter'
import styles from '@/assets/styles/admin/Management.module.css';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { WarningMessage } from '@/infrastructure/common/components/toast/notificationToast';
import { Col, Row } from 'antd';
import InputTextCommon from '@/infrastructure/common/components/input/input-text';
import categoryBlogService from '@/infrastructure/repositories/category/categoryBlog.service';
import { FullPageLoading } from '@/infrastructure/common/components/controls/loading';
import ManageLayout from '@/infrastructure/common/Layouts/Manage-Layout';
import { ButtonDesign } from '@/infrastructure/common/components/button/buttonDesign';
import AdminLayout from '@/infrastructure/common/Layouts/admin/MainLayout';
import Constants from '@/core/common/constants';
import InputSelectCategoryCommon from '@/infrastructure/common/components/input/select-category-common';
import videoService from '@/infrastructure/repositories/video/video.service';

type Props = {
    params: { slug: string };
};

const SlugCategoryManagement = ({ params }: Props) => {
    const [detail, setDetail] = useState<any>({});
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
        router.push(ROUTE_PATH.VIDEO_MANAGEMENT)
    }

    const onGetByIdAsync = async () => {
        if (params.slug) {
            try {
                await videoService.GetVideoById(
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
            });
        };
    }, [detail]);


    const onUpdateAsync = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await videoService.UpdateVideoAdmin(
                params.slug,
                {
                    name: dataRequest.name,
                    description: "",
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
            title={'Xem chi tiết danh mục'}
            breadcrumb={'Danh mục'}
            redirect={ROUTE_PATH.VIDEO_MANAGEMENT}
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
                            <Col xs={24} sm={24} className={`${styles.border_add} flex justify-center`}>
                                <div className={styles.legend_title}>Thêm thông tin mới</div>
                                <Row gutter={[30, 20]}>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                        <InputTextCommon
                                            label={"Tên video"}
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
                                            label={"Link video"}
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
                                            listDataOfItem={Constants.VideoType.List}
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

export default SlugCategoryManagement