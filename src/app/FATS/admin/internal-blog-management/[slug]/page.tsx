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

type Props = {
    params: { slug: string };
};

const SlugBlogManagement = ({ params }: Props) => {
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
        router.push(ROUTE_PATH.INTERNAL_BLOG_MANAGEMENT)
    }

    const onGetByIdAsync = async () => {
        if (params.slug) {
            try {
                await blogService.GetBlogAdminById(
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
                image: configImageURL(detail.imageCode),
                title: detail.title,
                shortDescription: detail.shortDescription,
                content: detail.content,
            });
        };
    }, [detail]);

    const onUpdateAsync = async () => {
        await setSubmittedTime(Date.now());
        let data = {}
        if (configImageURL(detail.imageId) !== dataRequest.image) {
            data = {
                title: dataRequest.title,
                shortDescription: dataRequest.shortDescription,
                content: dataRequest.content,
                categoryId: categoryBlogState[0].id,
                blogType: "COMPANY",
            }
        }
        else {
            data = {
                // image: configImageURL(detail.imageId) !== dataRequest.image ? dataRequest.image : null,
                image: dataRequest.image,
                title: dataRequest.title,
                shortDescription: dataRequest.shortDescription,
                content: dataRequest.content,
                categoryId: categoryBlogState[0].id,
                blogType: "COMPANY",
            }
        }
        if (isValidData()) {
            await blogService.UpdateBlogAdmin(
                params.slug,
                data,
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
            title={'Chi tiết tin tức nội bộ'}
            breadcrumb={'Tin tức nội bộ'}
            redirect={ROUTE_PATH.INTERNAL_BLOG_MANAGEMENT}
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
                            <Col xs={24} sm={24} md={10} lg={8} xl={6} xxl={5} className={`${styles.border_add} flex justify-center`}>
                                <div className='flex flex-col gap-4'>
                                    <div>
                                        <div className={styles.legend_title}>Thêm mới ảnh</div>
                                        <UploadAvatar
                                            dataAttribute={dataRequest.image}
                                            setData={setDataRequest}
                                            attribute={'image'}
                                            label={'Ảnh'}
                                            listType={'picture-card'}
                                            shape={'card'} />
                                    </div>
                                </div>
                            </Col>
                            <Col xs={24} sm={24} md={14} lg={16} xl={18} xxl={19} className={styles.border_add}>
                                <div className={styles.legend_title}>Thông tin chi tiết</div>
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

                                    <Col span={24}>
                                        <InputTextAreaCommon
                                            label={"Mô tả ngắn"}
                                            attribute={"shortDescription"}
                                            isRequired={true}
                                            dataAttribute={dataRequest.shortDescription}
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
        </AdminLayout>
    )
}

export default SlugBlogManagement