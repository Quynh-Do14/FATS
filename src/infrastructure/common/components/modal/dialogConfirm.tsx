import { Col, Modal, Row } from 'antd';
import "../../../../assets/styles/components/modal.css"
import { ButtonDesign } from '../button/buttonDesign';
type Props = {
    title: string,
    message: string,
    titleCancel: string,
    titleOk: string,
    handleOk: Function,
    handleCancel: Function,
    visible: boolean,
    isLoading?: boolean,
}
const DialogConfirmCommon = (props: Props) => {
    const { title, message, titleCancel, titleOk, handleOk, handleCancel, visible, isLoading = false } = props;

    return (
        <div>
            <Modal
                key={"f-0"}
                centered
                visible={visible}
                closable={true}
                footer={false}
                onCancel={() => handleCancel()}
                closeIcon={<i className="fa fa-times text-[20px]" aria-hidden="true"></i>}
            >
                <div className='modal-common'>
                    <div className='title'>{title}</div>
                    <div className='message'>{message}</div>
                    <div className='flex gap-2 justify-center'>
                        <ButtonDesign
                            classColor={'transparent'}
                            onClick={() => handleCancel()}
                            title={titleCancel}
                            width={120}
                        />

                        <ButtonDesign
                            disabled={isLoading}
                            classColor={'green'}
                            onClick={() => handleOk()}
                            title={titleOk}
                            width={120}
                        />
                    </div>
                </div>
            </Modal>
        </div>
    )
}
export default DialogConfirmCommon;