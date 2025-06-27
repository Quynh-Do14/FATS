import { Col, Modal, Row } from 'antd';
import "../../../../assets/styles/components/modal.css"
import { ButtonDesign } from '../button/buttonDesign';
type Props = {
    title: string,
    message: string,
    titleCancel: string,
    handleCancel: () => void,
    visible: boolean,
    isLoading?: boolean,
}
const DialogNotificationCommon = (props: Props) => {
    const { title, message, titleCancel, handleCancel, visible, isLoading = false } = props;

    return (
        <div>
            <Modal
                key={"f-0"}
                centered
                visible={visible}
                closable={true}
                footer={false}
                // closeIcon={<i className="fa fa-times text-[20px]" aria-hidden="true"></i>}
            >
                <div className='modal-common flex flex-col gap-6 justify-center items-center'>
                    <div className='title'>{title}</div>
                    <div className='message'>{message}</div>
                    <ButtonDesign
                        disabled={isLoading}
                        classColor={'green'}
                        onClick={handleCancel}
                        title={titleCancel}
                    />
                </div>
            </Modal>
        </div>
    )
}
export default DialogNotificationCommon;