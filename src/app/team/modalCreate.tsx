import { Col, Modal, Row } from 'antd'
import InputTextCommon from '../../infrastructure/common/components/input/input-text';
import InputNumberCommon from '../../infrastructure/common/components/input/input-number';
import "../../assets/styles/components/modal.css"
import { CloseOutlined } from '@ant-design/icons';
import UploadImageAvatar from '../../infrastructure/common/components/input/upload-img-avatar';
import { ButtonDesign } from '../../infrastructure/common/components/button/buttonDesign';

type Props = {
    handleOk: () => void,
    handleCancel: Function,
    visible: boolean,
    data: any,
    setData: Function,
    validate: any,
    setValidate: Function,
    submittedTime: any,
}
const ModalCreateTeam = (props: Props) => {
    const {
        handleOk,
        handleCancel,
        visible,
        data,
        setData,
        validate,
        setValidate,
        submittedTime
    } = props;

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
                <div className='text-[18px] text-[#1e2330] font-semibold text-center mb'>{data.id ? 'Cập nhật nhóm' : "Thêm nhóm mới"}</div>
                <Row gutter={[30, 30]} justify={"center"} className='sm:p-4 p-0'>
                    <Col xs={24} sm={12} lg={12}>
                        <div className='rounded-[15px] bg-[#f3f3f1] border-[1px] border-blue-100 h-full min-w-[110px] min-h-[200px] relative'>
                            <UploadImageAvatar
                                label={'Ảnh'}
                                attribute={'image'}
                                isRequired={true}
                                setData={setData}
                                dataAttribute={data.image}
                                validate={validate}
                                setValidate={setValidate}
                                submittedTime={submittedTime}
                            />
                        </div>
                    </Col>
                    <Col xs={24} md={12} lg={12}>
                        <InputTextCommon
                            label={'Tên nhóm'}
                            attribute={'name'}
                            isRequired={true}
                            setData={setData}
                            dataAttribute={data.name}
                            disabled={false}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                        />
                    </Col>
                    <Col span={24}>
                        <ButtonDesign
                            classColor={'green'}
                            onClick={handleOk}
                            title={data.id ? "Cập nhật nhóm" : 'Thêm nhóm mới'}
                        />
                    </Col>
                </Row>

            </div>

        </Modal>
    )
}

export default ModalCreateTeam