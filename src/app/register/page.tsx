'use client'
import React, { useState } from 'react'
import "@/assets/styles/page/login.css"
import LayoutClient from '@/infrastructure/common/Layouts/Client-Layout'
import InputTextCommon from '@/infrastructure/common/components/input/input-text'
import InputPasswordCommon from '@/infrastructure/common/components/input/input-password'
import authService from '@/infrastructure/repositories/auth/service/auth.service'
import { WarningMessage } from '@/infrastructure/common/components/toast/notificationToast'
import { FullPageLoading } from '@/infrastructure/common/components/controls/loading'
import { ButtonDesign } from '@/infrastructure/common/components/button/buttonDesign'
import { ROUTE_PATH } from '@/core/common/appRouter'
import BannerCommon from '@/infrastructure/common/components/banner/BannerCommon'
import DialogNotificationCommon from '@/infrastructure/common/components/modal/dialogNotification'
import banner3 from '@/assets/images/banner/banner3.png'
import { useRouter } from 'next/navigation'

const RegisterScreen = () => {
    const [validate, setValidate] = useState<any>({});
    const [submittedTime, setSubmittedTime] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const [remember, setRemember] = useState<boolean>(true);
    const [isOpenModalSuccesss, setIsOpenModalSuccesss] = useState<boolean>(false);

    const [_data, _setData] = useState<any>({});
    const dataLogin = _data;

    const router = useRouter();

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
    const onRegisterAsync = async () => {
        await setSubmittedTime(new Date());
        if (isValidData()) {
            try {
                await authService.register(
                    {
                        name: dataLogin.name,
                        username: dataLogin.username,
                        email: dataLogin.email,
                        password: dataLogin.password,
                        confirmPassword: dataLogin.confirmPassword,
                        phoneNumber: dataLogin.phoneNumber,
                        roles: "user"
                    },
                    () => {
                        setIsOpenModalSuccesss(true);
                    },
                    setLoading
                ).then(() => { });
            } catch (error) {
                console.error(error);
            }
        }
        else {
            WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
        };
    }
    const onCloseSuccessModal = () => {
        setIsOpenModalSuccesss(false)
        router.push(ROUTE_PATH.LOGIN)
    }
    return (
        <LayoutClient>
            <BannerCommon
                title={'Đăng Kí'}
                sub={'Thành viên'}
                backgroundUrl={banner3.src}
            />
            <div className='auth-screen'>
                <div className='content'>

                    <div>
                        <h2>Biểu mẫu thông tin !</h2>
                        <h3>Vui lòng điền tất cả thông tin cần thiết theo biểu mẫu dưới đây</h3>
                    </div>
                    <div className='flex flex-col gap-5'>
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
                        <InputTextCommon
                            label={"Email"}
                            attribute={"email"}
                            isRequired={true}
                            dataAttribute={dataLogin.email}
                            setData={setDataLogin}
                            disabled={false}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                        />
                        <InputTextCommon
                            label={"Họ và tên"}
                            attribute={"name"}
                            isRequired={true}
                            dataAttribute={dataLogin.name}
                            setData={setDataLogin}
                            disabled={false}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                        />
                        <InputTextCommon
                            label={"Số điện thoại"}
                            attribute={"phoneNumber"}
                            isRequired={true}
                            dataAttribute={dataLogin.phoneNumber}
                            setData={setDataLogin}
                            disabled={false}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                        />
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
                        />
                        <InputPasswordCommon
                            label={"Nhập lại mật khẩu"}
                            attribute={"confirmPassword"}
                            isRequired={true}
                            dataAttribute={dataLogin.confirmPassword}
                            setData={setDataLogin}
                            disabled={false}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                        />
                        <ButtonDesign
                            classColor={'green'}
                            title={'Đăng kí'}
                            onClick={onRegisterAsync}
                        />
                        <p className="signup-text">
                            Bạn đã có tài khoản?
                            <a href={ROUTE_PATH.LOGIN} className="gradient-link">Đăng nhập ngay</a>
                        </p>
                    </div>
                </div>
            </div>
            <DialogNotificationCommon
                title={'Đăng kí tài khoản thành công'}
                message={'Đăng ký thành công, vui lòng kiểm tra email (bao gồm spam) để kích hoạt tài khoản'}
                titleCancel={'Đóng'}
                handleCancel={onCloseSuccessModal}
                visible={isOpenModalSuccesss}
            />
            <FullPageLoading isLoading={loading} />
        </LayoutClient>
    )
}

export default RegisterScreen