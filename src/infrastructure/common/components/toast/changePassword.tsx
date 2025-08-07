'use client'
import { Col, Modal, Row } from 'antd'
import React, { useState } from 'react'
import authService from '../../../repositories/auth/service/auth.service'
import { WarningMessage } from './notificationToast'
import InputPasswordCommon from '../input/input-password'
import { ROUTE_PATH } from '@/core/common/appRouter'
import { ButtonDesign } from '../button/buttonDesign'
import { useRouter } from 'next/navigation'
type Props = {
    // handleOk: Function,
    handleCancel: () => void,
    visible: boolean,
    isLoading?: boolean,
}
const ChangePasswordModal = (props: Props) => {
    const { handleCancel, visible, isLoading } = props;
    const [validate, setValidate] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [submittedTime, setSubmittedTime] = useState<any>();

    const router = useRouter();

    const [_data, _setData] = useState<any>({});
    const changePassword = _data;

    const setchangePassword = (data: any) => {
        Object.assign(changePassword, { ...data });
        _setData({ ...changePassword });
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

    const onUpdateProfile = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await authService.changePassword(
                {
                    oldPassword: changePassword.oldPassword,
                    newPassword: changePassword.newPassword,
                    confirmPassword: changePassword.confirmPassword,
                },
                async () => {
                    handleCancel();
                    await authService.logout(
                        setLoading

                    ).then(() => {
                        router.push(ROUTE_PATH.HOME_PAGE);
                        window.location.reload();
                    });
                },
                setLoading,
            )
        }
        else {
            WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
        };
    };

    return (
        <Modal
            key={"f-0"}
            centered
            visible={visible}
            closable={true}
            footer={false}
            onCancel={() => handleCancel()}
            className='custom-modal'
            closeIcon={<i className="fa fa-times text-[20px]" aria-hidden="true"></i>}
        >
            <div className='flex flex-col gap-4'>
                <div className="">
                    <p className="text-center font-semibold text-[28px] text-[#787878]">Thay đổi mật khẩu</p>
                </div>
                <Row gutter={[10, 10]}>
                    <Col span={24}>
                        <InputPasswordCommon
                            label={"Mật khẩu hiện tại"}
                            attribute={"oldPassword"}
                            isRequired={true}
                            dataAttribute={changePassword.oldPassword}
                            setData={setchangePassword}
                            disabled={false}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                        />
                    </Col>
                    <Col span={24}>
                        <InputPasswordCommon
                            label={"Mật khẩu mới"}
                            attribute={"newPassword"}
                            isRequired={true}
                            dataAttribute={changePassword.newPassword}
                            setData={setchangePassword}
                            disabled={false}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                            data={changePassword}
                        />
                    </Col>
                    <Col span={24}>
                        <InputPasswordCommon
                            label={"Xác nhận mật khẩu"}
                            attribute={"confirmPassword"}
                            isRequired={true}
                            dataAttribute={changePassword.confirmPassword}
                            setData={setchangePassword}
                            disabled={false}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                            data={changePassword}
                        />
                    </Col>
                </Row>
                <div className='flex gap-2 justify-center'>
                    <ButtonDesign
                        onClick={handleCancel}
                        classColor="transparent"
                        width={120}
                        title={'Quay lại'}
                    />
                    <ButtonDesign
                        onClick={onUpdateProfile}
                        classColor="green"
                        width={120}
                        title={'Cập nhật'}
                    />
                </div>
            </div>

        </Modal>
    )
}

export default ChangePasswordModal