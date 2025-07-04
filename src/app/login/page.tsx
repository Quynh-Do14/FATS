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
import banner3 from '@/assets/images/banner/banner3.png'
import { useRouter } from 'next/navigation'
const LoginScreen = () => {
    const [validate, setValidate] = useState<any>({});
    const [submittedTime, setSubmittedTime] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const [remember, setRemember] = useState<boolean>(true);

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
                        router.push(ROUTE_PATH.HOME_PAGE)
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

    return (
        <LayoutClient>
            <BannerCommon
                title={'Đăng Nhập'}
                sub={'Thành viên'}
                backgroundUrl={banner3.src}
            />
            <div className='auth-screen'>
                <div className='content'>
                    <div>
                        <h2>Chào mừng trở lại !</h2>
                        <h3>Nhập thông tin để có quyền truy cập không giới hạn vào dữ liệu và thông tin</h3>
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
                        <div className="remember-forgot">
                            <label className="custom-checkbox">
                                {/* <input
                                    type="checkbox"
                                    checked={remember}
                                    onChange={() => setRemember(!remember)}
                                />
                                <span className="checkmark" />
                                Ghi nhớ tài khoản */}
                            </label>

                            <a href={ROUTE_PATH.FORGOT_PASSWORD} className="forgot-link">Quên mật khẩu</a>
                        </div>
                        <ButtonDesign
                            classColor={'green'}
                            title={'Đăng nhập'}
                            onClick={onLoginAsync}
                        />

                        <div className="divider">
                            <div className="line" />
                            <span className="divider-text">Hay đăng nhập</span>
                            <div className="line" />
                        </div>

                        <ButtonDesign
                            classColor={'transparent'}
                            onClick={onLoginWithGoogle}
                            title={'Đăng nhập với Google'}
                            icon={
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className=" " role="img" aria-hidden="true" aria-labelledby=" "><path fill="#4285F4" d="M21.6 12.23c0-.71-.06-1.4-.18-2.05H12v3.87h5.38a4.6 4.6 0 0 1-2 3.02v2.5h3.24c1.89-1.73 2.98-4.3 2.98-7.34Z"></path><path fill="#34A853" d="M12 22c2.7 0 4.96-.9 6.62-2.42l-3.23-2.51c-.9.6-2.04.95-3.39.95-2.6 0-4.8-1.76-5.6-4.12H3.06v2.6A10 10 0 0 0 12 22Z"></path><path fill="#FBBC05" d="M6.4 13.9a6.01 6.01 0 0 1 0-3.8V7.5H3.06a10 10 0 0 0 0 9l3.34-2.6Z"></path><path fill="#EA4335" d="M12 5.98c1.47 0 2.79.5 3.82 1.5L18.7 4.6A10 10 0 0 0 3.06 7.5l3.34 2.6c.8-2.36 3-4.12 5.6-4.12Z"></path></svg>
                            }
                        />
                        <p className="signup-text">
                            Bạn chưa có tài khoản?
                            <a href={ROUTE_PATH.REGISTER} className="gradient-link">Đăng ký ngay</a>
                        </p>
                    </div>
                </div>
            </div>
            <FullPageLoading isLoading={loading} />
        </LayoutClient>
    )
}

export default LoginScreen