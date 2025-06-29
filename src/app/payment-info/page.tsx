'use client'
import { useEffect, useState } from 'react'
import "@/assets/styles/page/payment.css"
import LayoutClient from '@/infrastructure/common/Layouts/Client-Layout'
import InputTextCommon from '@/infrastructure/common/components/input/input-text'
import { FullPageLoading } from '@/infrastructure/common/components/controls/loading'
import { ButtonDesign } from '@/infrastructure/common/components/button/buttonDesign'
import { ROUTE_PATH } from '@/core/common/appRouter'
import BannerCommon from '@/infrastructure/common/components/banner/BannerCommon'
import paymentService from '@/infrastructure/repositories/payment/payment.service'
import InputSelectCategoryCommon from '@/infrastructure/common/components/input/select-category-common'
import { formatCurrencyVND } from '@/infrastructure/helper/helper'
import { isTokenStoraged } from '@/infrastructure/utils/storage'
import banner4 from '@/assets/images/banner/banner4.png'
import { useRecoilValue } from 'recoil'
import { ProfileState } from '@/core/atoms/profile/profileState'
import { useRouter } from 'next/navigation'
const PaymentPage = () => {
    const [validate, setValidate] = useState<any>({});
    const [submittedTime, setSubmittedTime] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const [remember, setRemember] = useState<boolean>(true);
    const [packageList, setPackageList] = useState<any[]>([]);
    const storage = isTokenStoraged();
    const profileState = useRecoilValue(ProfileState).user;
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

    useEffect(() => {
        if (profileState) {
            setDataRequest({
                name: profileState.name,
                email: profileState.email,
                phoneNumber: profileState.phoneNumber,
            })
        }
    }, [profileState])
    const onPaymentAsync = async () => {
        try {
            await paymentService.Subscription(
                dataRequest.package,
                setLoading
            ).then((res) => {
                window.open(res.vnpayUrl, '_blank');
            })
        }
        catch (error) {
            console.error(error);
        }
    }
    const onGetAllPackage = async () => {
        try {
            await paymentService.Package(
                setLoading
            ).then((response) => {
                const map = response?.map((item: any) => {
                    const result = {
                        ...item,
                        name: `${item.name} - ${item.duration} - ${formatCurrencyVND(item.price)}`
                    }
                    return result;
                })
                setPackageList(map)
            })
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        onGetAllPackage().then(() => { });
    }, [])
    return (
        <LayoutClient>
            <BannerCommon
                title={'Thanh toán'}
                sub={'Dịch vụ tài chính'}
                backgroundUrl={banner4}
            />
            <div className='payemnt-page'>
                <div className='content'>

                    <div>
                        <h2>Biểu mẫu thanh toán !</h2>
                        <h3>Vui lòng điền tất cả thông tin cần thiết theo biểu mẫu dưới đây</h3>
                    </div>
                    <div className='flex flex-col gap-5'>
                        <div className='method'>Gói người dùng</div>
                        <InputSelectCategoryCommon
                            label={""}
                            attribute={"package"}
                            isRequired={true}
                            dataAttribute={dataRequest.package}
                            setData={setDataRequest}
                            disabled={false}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                            listDataOfItem={packageList}
                            nameOfValue='id'
                            nameOfLabel='name'
                        />
                        {
                            !storage
                            &&
                            <p className="signup-text">
                                Bạn chưa có tài khoản?
                                <a href={ROUTE_PATH.REGISTER} className="gradient-link">Đăng kí ngay</a>
                            </p>
                        }

                        <div className='method'>Thông tin thanh toán</div>
                        <InputTextCommon
                            label={"Họ tên"}
                            attribute={"name"}
                            isRequired={true}
                            dataAttribute={dataRequest.name}
                            setData={setDataRequest}
                            disabled={true}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                        />
                        <InputTextCommon
                            label={"Email"}
                            attribute={"email"}
                            isRequired={true}
                            dataAttribute={dataRequest.email}
                            setData={setDataRequest}
                            disabled={true}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                        />
                        <InputTextCommon
                            label={"Điện thoại"}
                            attribute={"phoneNumber"}
                            isRequired={true}
                            dataAttribute={dataRequest.phoneNumber}
                            setData={setDataRequest}
                            disabled={true}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                        />
                        <ButtonDesign
                            classColor={'green'}
                            title={'Thanh toán'}
                            onClick={onPaymentAsync}
                        />

                    </div>
                </div>
            </div>
            <FullPageLoading isLoading={loading} />
        </LayoutClient>
    )
}

export default PaymentPage