import { Col, Modal, Row } from 'antd'
import InputTextCommon from '../../../infrastructure/common/components/input/input-text';
import "../../../assets/styles/components/modal.css"
import { CloseOutlined } from '@ant-design/icons';
import teamService from '../../../infrastructure/repositories/team/team.service';
import { useState } from 'react';
import { WarningMessage } from '../../../infrastructure/common/components/toast/notificationToast';
import { ButtonDesign } from '../../../infrastructure/common/components/button/buttonDesign';

type Props = {
    selectedId: any
    handleCancel: Function,
    visible: boolean,
    onDeleteCategoryAsync: () => void,
    onGetListMemberAsync: () => void,
    setLoading: (loading: boolean) => void
    idTeam: Number
}
const ModalAddMember = (props: Props) => {
    const {
        selectedId,
        handleCancel,
        visible,
        onDeleteCategoryAsync,
        onGetListMemberAsync,
        setLoading,
        idTeam
    } = props;

    const [validate, setValidate] = useState<any>({});
    const [submittedTime, setSubmittedTime] = useState<any>();
    const [_dataRequest, _setDataRequest] = useState<any>({});
    const dataRequest = _dataRequest;

    const setDataRequest = (data: any) => {
        Object.assign(dataRequest, { ...data });
        _setDataRequest({ ...dataRequest })
    }
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

    const onAddMemberAsync = async () => {
        await setSubmittedTime(new Date());
        if (isValidData()) {
            try {
                await teamService.AddMember(
                    Number(idTeam),
                    {
                        userKey: dataRequest.userName
                    },
                    () => {
                        onGetListMemberAsync();
                        handleCancel();
                    },
                    setLoading
                ).then(() => { })
            }
            catch (error) {
                console.error(error);
            }
        }
        else {
            WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
        };
    }

    return (
        <Modal
            key={"f-0"}
            centered
            visible={visible}
            closable={true}
            footer={false}
            className='custom-modal'
            onCancel={() => handleCancel()}
            closeIcon={<CloseOutlined />}
        >
            <div>
                <div className='text-[18px] text-[#1e2330] font-semibold text-center mb-5'>Thêm thành viên mới</div>
                <Row gutter={[30, 30]} justify={"center"} className='sm:p-4 p-0'>
                    <Col span={24}>
                        <div className='flex flex-col justify-between h-full'>
                            <Row gutter={[15, 15]}>
                                <Col span={24}>
                                    <InputTextCommon
                                        label={'Tên thành viên'}
                                        attribute={'userName'}
                                        isRequired={true}
                                        setData={setDataRequest}
                                        dataAttribute={dataRequest.userName}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col span={24}>
                        <ButtonDesign
                            classColor={'green'}
                            onClick={onAddMemberAsync}
                            title={"Thêm thành viên"}
                        />
                    </Col>
                    {/* {
                        selectedId
                        &&
                        <Col span={24}>
                            <ButtonDesign
                                classColor={'white'}
                                onClick={onDeleteCategoryAsync}
                                title={"Xóa thành viên"}
                            />
                        </Col>
                    } */}
                </Row>

            </div>

        </Modal>
    )
}

export default ModalAddMember