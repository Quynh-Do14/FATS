'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

import LayoutClient from '@/infrastructure/common/Layouts/Client-Layout';
import InputPasswordCommon from '@/infrastructure/common/components/input/input-password';
import { WarningMessage } from '@/infrastructure/common/components/toast/notificationToast';
import { FullPageLoading } from '@/infrastructure/common/components/controls/loading';
import { ButtonDesign } from '@/infrastructure/common/components/button/buttonDesign';
import { ROUTE_PATH } from '@/core/common/appRouter';
import BannerCommon from '@/infrastructure/common/components/banner/BannerCommon';
import banner3 from '@/assets/images/banner/banner3.png';

import '@/assets/styles/page/login.css';
import authService from '@/infrastructure/repositories/auth/service/auth.service';

function getQueryParam(param: string): string | null {
    if (typeof window === 'undefined') return null;
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const ResetPasswordScreen = () => {
    const [validate, setValidate] = useState<any>({});
    const [submittedTime, setSubmittedTime] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const [_data, _setData] = useState<any>({});
    const [code, setCode] = useState<string | null>(null);

    const router = useRouter();
    const dataLogin = _data;

    useEffect(() => {
        const urlCode = getQueryParam('code');
        setCode(urlCode);
    }, []);

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
        setSubmittedTime(new Date());

        if (isValidData() && code) {
            try {
                const response = await authService.resetPassword(
                    String(code),
                    {
                        newPassword: dataLogin.newPassword,
                        confirmPassword: dataLogin.confirmPassword,
                    },
                    setLoading
                );
                if (response) {
                    router.push(ROUTE_PATH.HOME_PAGE);
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            WarningMessage('Nhập thiếu thông tin', 'Vui lòng nhập đầy đủ thông tin');
        }
    };

    return (
        <LayoutClient>
            <BannerCommon
                title="Đặt lại mật khẩu"
                sub="Thành viên"
                backgroundUrl={banner3}
            />
            <div className="auth-screen">
                <div className="content">
                    <div>
                        <h2>Đặt lại mật khẩu!</h2>
                        <h3>Vui lòng đặt lại mật khẩu</h3>
                    </div>
                    <div className="flex flex-col gap-5">
                        <InputPasswordCommon
                            label="Mật khẩu mới"
                            attribute="newPassword"
                            isRequired={true}
                            dataAttribute={dataLogin.newPassword}
                            setData={setDataLogin}
                            disabled={false}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                        />
                        <InputPasswordCommon
                            label="Xác nhận mật khẩu"
                            attribute="confirmPassword"
                            isRequired={true}
                            dataAttribute={dataLogin.confirmPassword}
                            setData={setDataLogin}
                            disabled={false}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                        />

                        <ButtonDesign
                            classColor="green"
                            title="Gửi yêu cầu"
                            onClick={onLoginAsync}
                        />
                        <p className="signup-text">
                            <Link href={ROUTE_PATH.LOGIN} className="gradient-link">
                                Quay lại
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            <FullPageLoading isLoading={loading} />
        </LayoutClient>
    );
};

export default ResetPasswordScreen;
