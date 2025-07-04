'use client'
import { Col, Modal, Row } from 'antd'
import InputTextCommon from '@/infrastructure/common/components/input/input-text';
import InputPasswordCommon from '@/infrastructure/common/components/input/input-password';
import { useState } from 'react';
import authService from '@/infrastructure/repositories/auth/service/auth.service';
import { WarningMessage } from '@/infrastructure/common/components/toast/notificationToast';
import { ButtonDesign } from '@/infrastructure/common/components/button/buttonDesign';
import Link from 'next/link';

type Props = {
    isLoginClick: boolean,
    setIsLoginClick: Function,
    setLoading: (loading: boolean) => void,
    setDataLogined?: any,
    setIsRegisterClick?: any
}
const LoginModal = (props: Props) => {
    const {
        isLoginClick,
        setIsLoginClick,
        setLoading,
        setDataLogined,
        setIsRegisterClick
    } = props;
    const [validate, setValidate] = useState<any>({});
    const [submittedTime, setSubmittedTime] = useState<any>();

    const [_data, _setData] = useState<any>({});
    const dataLogin = _data;

    const setDataLogin = (data: any) => {
        Object.assign(dataLogin, { ...data });
        _setData({ ...dataLogin });
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


    const handleCancel = () => {
        setIsLoginClick(false);
    };
    const handleOk = () => {
        setIsLoginClick(true);
    };

    const onLoginAsync = async () => {
        await setSubmittedTime(new Date());
        if (isValidData()) {
            try {
                await authService.login(
                    {
                        username: dataLogin.username,
                        password: dataLogin.password,
                    },
                    setLoading
                ).then((response) => {
                    if (response) {
                        handleCancel();
                        setDataLogined(true);
                    }
                });
            } catch (error) {
                console.error(error);
            }
        }
        else {
            WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
        };
    }

    const onLoginWithGoogle = () => {
        const callbackUrl = `${process.env.NEXT_PUBLIC_REDIRECT_URL}`;
        const authUrl = process.env.NEXT_PUBLIC_PUBLIC_URL_AUTH_URI;
        const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

        const targetUrl = `${authUrl}?redirect_uri=${encodeURIComponent(
            callbackUrl
        )}&response_type=code&client_id=${googleClientId}&scope=openid%20email%20profile`;

        window.location.href = targetUrl;
    };

    const handleRegister = () => {
        setIsRegisterClick(true);
    };

    return (
        <Modal
            open={isLoginClick}
            onOk={handleOk}
            footer={[]}
            onCancel={handleCancel}
            centered
        >
            <div className='flex flex-col gap-4'>
                {/* <div className="flex justify-center mt-8">
                    <img src={""} alt="" />
                </div> */}
                <div className="">
                    <p className="text-center font-bold text-[28px] text-[#787878]">Đăng nhập</p>
                </div>
                <Row gutter={[30, 10]}>
                    <Col span={24}>
                        <InputTextCommon
                            label={"Tên đăng nhập"}
                            attribute={"username"}
                            isRequired={true}
                            dataAttribute={dataLogin.username}
                            setData={setDataLogin}
                            disabled={false}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                        />
                    </Col>
                    <Col span={24}>
                        <InputPasswordCommon
                            label={"Mật khẩu"}
                            attribute={"password"}
                            isRequired={true}
                            dataAttribute={dataLogin.password}
                            setData={setDataLogin}
                            disabled={false}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                            onEnterPress={onLoginAsync}
                        />
                    </Col>
                    <Col span={24}>
                        <ButtonDesign
                            onClick={onLoginAsync}
                            title={'Đăng nhập'}
                            classColor={'green'}
                        />
                    </Col>
                    <div className="divider-modal">
                        <div className="line" />
                        <span className="divider-text">Hay đăng nhập</span>
                        <div className="line" />
                    </div>
                    <Col span={24}>
                        <ButtonDesign
                            classColor={'transparent'}
                            onClick={onLoginWithGoogle}
                            title={'Đăng nhập với Google'}
                            icon={
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className=" " role="img" aria-hidden="true" aria-labelledby=" "><path fill="#4285F4" d="M21.6 12.23c0-.71-.06-1.4-.18-2.05H12v3.87h5.38a4.6 4.6 0 0 1-2 3.02v2.5h3.24c1.89-1.73 2.98-4.3 2.98-7.34Z"></path><path fill="#34A853" d="M12 22c2.7 0 4.96-.9 6.62-2.42l-3.23-2.51c-.9.6-2.04.95-3.39.95-2.6 0-4.8-1.76-5.6-4.12H3.06v2.6A10 10 0 0 0 12 22Z"></path><path fill="#FBBC05" d="M6.4 13.9a6.01 6.01 0 0 1 0-3.8V7.5H3.06a10 10 0 0 0 0 9l3.34-2.6Z"></path><path fill="#EA4335" d="M12 5.98c1.47 0 2.79.5 3.82 1.5L18.7 4.6A10 10 0 0 0 3.06 7.5l3.34 2.6c.8-2.36 3-4.12 5.6-4.12Z"></path></svg>
                            }
                        />
                    </Col>
                </Row>
                <div className="flex justify-between flex-wrap py-2 text-[#787878]">
                    <Link href={""}>Quên mật khẩu?</Link>
                    <Link href={''}>
                        <a onClick={handleRegister} className="cursor-pointer">
                            Chưa có tài khoản
                        </a>
                    </Link>
                </div>
            </div>

        </Modal>
    )
}

export default LoginModal