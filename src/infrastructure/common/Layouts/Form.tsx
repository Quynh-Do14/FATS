import React, { useState } from 'react'
import "@/assets/styles/components/MainLayout.css";
import { Col, Row } from 'antd';
import TitleComponent from '../components/controls/TitleComponent';
import InputTextAdvisement from '../components/input/input-advisement';
import { ButtonSend } from '../components/button/buttonSend';
const FormAdvisement = () => {

    const [validate, setValidate] = useState<any>({});
    const [submittedTime, setSubmittedTime] = useState<any>();

    const [_data, _setData] = useState<any>({});
    const dataProfile = _data;

    const setDataProfile = (data: any) => {
        Object.assign(dataProfile, { ...data });
        _setData({ ...dataProfile });
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
    return (
        <div className='advisement padding-common'>
            <Row gutter={[20, 20]} >
                <Col md={12} sm={24} xs={24}>
                    <div className='left'>
                        <TitleComponent
                            title={'Để lại thông tin liên hệ'}
                            color={'white'}
                        />
                        <p>
                            Nhận Tư Vấn Ngay
                        </p>
                    </div>
                </Col>
                <Col md={12} sm={12} xs={24}>
                    <Row gutter={[30, 30]} align={'bottom'}>
                        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                            <InputTextAdvisement
                                label={"Họ tên"}
                                attribute={"fullName"}
                                isRequired={true}
                                dataAttribute={dataProfile.fullName}
                                setData={setDataProfile}
                                disabled={false}
                                validate={validate}
                                setValidate={setValidate}
                                submittedTime={submittedTime}
                            />
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                            <InputTextAdvisement
                                label={"Điện thoại"}
                                attribute={"phone"}
                                isRequired={true}
                                dataAttribute={dataProfile.phone}
                                setData={setDataProfile}
                                disabled={false}
                                validate={validate}
                                setValidate={setValidate}
                                submittedTime={submittedTime}
                            />
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                            <InputTextAdvisement
                                label={"Email"}
                                attribute={"email"}
                                isRequired={true}
                                dataAttribute={dataProfile.email}
                                setData={setDataProfile}
                                disabled={false}
                                validate={validate}
                                setValidate={setValidate}
                                submittedTime={submittedTime}
                            />
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={16} xl={16}>
                            <InputTextAdvisement
                                label={"Nội dung cần tư vấn"}
                                attribute={"content"}
                                isRequired={true}
                                dataAttribute={dataProfile.content}
                                setData={setDataProfile}
                                disabled={false}
                                validate={validate}
                                setValidate={setValidate}
                                submittedTime={submittedTime}
                            />
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                            <ButtonSend
                                classColor={'green'}
                                onClick={() => { }}
                                title={'Gửi ngay'}
                            />
                        </Col>
                    </Row>

                </Col>
            </Row>
        </div>
    )
}

export default FormAdvisement