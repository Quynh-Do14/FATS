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
import { useRouter } from 'next/navigation';
const ForgotPasswordScreen = () => {
    const [validate, setValidate] = useState<any>({});
    const [submittedTime, setSubmittedTime] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

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
                await authService.forgotPassword(
                    {
                        email: dataLogin.email,
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

    return (
        <LayoutClient>
            <BannerCommon
                title={'Quên mật khẩu'}
                sub={'Thành viên'}
                backgroundUrl={banner3.src}
            />
            <div className='auth-screen'>
                <div className='content'>
                    <div>
                        <h2>Bạn đã quên mật khẩu !</h2>
                        <h3>Vui lòng nhập thông tin Email để đặt lại mật khẩu</h3>
                    </div>
                    <div className='flex flex-col gap-5'>
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

                        <ButtonDesign
                            classColor={'green'}
                            title={'Gửi yêu cầu'}
                            onClick={onLoginAsync}
                        />
                        <p className="signup-text">
                            <a href={ROUTE_PATH.LOGIN} className="gradient-link">Quay lại</a>
                        </p>
                    </div>
                </div>
            </div>
            <FullPageLoading isLoading={loading} />
        </LayoutClient>
    )
}

export default ForgotPasswordScreen