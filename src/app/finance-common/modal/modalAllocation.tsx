import { CloseOutlined } from '@ant-design/icons';
import { Col, Modal, Row } from 'antd';
import React, { useEffect, useState } from 'react'
import InputNumberCommon from '../../../infrastructure/common/components/input/input-number';
import goalService from '../../../infrastructure/repositories/goal/goal.service';
import { WarningMessage } from '../../../infrastructure/common/components/toast/notificationToast';
import { ButtonDesign } from '../../../infrastructure/common/components/button/buttonDesign';
type Props = {
    handleCancel: Function,
    visible: boolean,
    newlistGoal: any[]
    setLoading: (loading: boolean) => void
    onGetListGoalAsync: Function
}
const ModalAllocation = (props: Props) => {
    const {
        handleCancel,
        visible,
        newlistGoal,
        setLoading,
        onGetListGoalAsync
    } = props;
    const [newAllocationArray, setNewAllocationArray] = useState<any[]>([])
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


    useEffect(() => {
        const newArrayList = newlistGoal.filter(item => item.startDate !== null)
        if (newArrayList.length) {
            const newData: any = {};

            newArrayList.forEach(item => {
                newData[`allocationPercentage${item.id}`] = (item.allocationPercentage) || 0;
            });
            setDataRequest(newData); // sẽ gộp vào state hiện tại
        }
        setNewAllocationArray(newArrayList);
    }, [newlistGoal]);

    const onAllocateAsync = async () => {
        await setSubmittedTime(new Date());

        const data = newAllocationArray.map((item) => {
            const result = {
                goalId: item.id,
                allocationPercentage: dataRequest[`allocationPercentage${item.id}`]
            };
            return result;
        })
        if (isValidData()) {
            try {
                await goalService.AllocationGoalPersonal(
                    data,
                    () => {
                        onGetListGoalAsync();
                        handleCancel();
                    },
                    setLoading
                ).then(() => { })
            }
            catch (error) {
                console.error(error)
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
                <div className='text-[18px] text-[#1e2330] font-semibold text-center mb-5'>Phân bổ mục tiêu</div>
                <Row gutter={[30, 30]} justify={"center"} className='sm:p-4 p-0'>
                    {
                        newAllocationArray.map((item, index) => {
                            return (
                                <Col span={24} key={index}>
                                    <InputNumberCommon
                                        label={`${item.name} (%)`}
                                        attribute={`allocationPercentage${item.id}`}
                                        isRequired={false}
                                        setData={setDataRequest}
                                        dataAttribute={dataRequest[`allocationPercentage${item.id}`]}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                        min={0}
                                        max={100}
                                        percent
                                    />
                                </Col>
                            )
                        })
                    }
                    <Col span={20}>
                        <ButtonDesign
                            classColor={'green'}
                            onClick={onAllocateAsync}
                            title={'Thêm mục tiêu'}
                        />
                    </Col>
                </Row>
            </div>
        </Modal>
    )
}

export default ModalAllocation