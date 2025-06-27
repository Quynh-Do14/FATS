import { Col, Modal, Row } from 'antd'
import InputTextCommon from '../../../infrastructure/common/components/input/input-text';
import "../../../assets/styles/components/modal.css"
import { CloseOutlined } from '@ant-design/icons';
import category from '../../../assets/images/category/another.png'
import { configImageURL } from '../../../infrastructure/helper/helper';
import { ButtonDesign } from '../../../infrastructure/common/components/button/buttonDesign';
type Props = {
    selectedId: any
    selectedTab: 'spend' | 'income'
    handleOk: () => void,
    handleCancel: Function,
    visible: boolean,
    data: any,
    setData: Function,
    validate: any,
    setValidate: Function,
    submittedTime: any,
    onDeleteCategoryAsync: () => void,
    setIsOpenDrawerCategory: Function
}
const ModalCreateCategory = (props: Props) => {
    const {
        selectedId,
        selectedTab,
        handleOk,
        handleCancel,
        visible,
        data,
        setData,
        validate,
        setValidate,
        submittedTime,
        onDeleteCategoryAsync,
        setIsOpenDrawerCategory
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
                {
                    selectedId
                        ?
                        <div className='text-[18px] text-[#1e2330] font-semibold text-center mb-5'>
                            {selectedTab == 'spend' ? "Cập nhật danh mục chi phí" : "Cập nhật danh mục thu nhập"}
                        </div>
                        :
                        <div className='text-[18px] text-[#1e2330] font-semibold text-center mb-5'>
                            {selectedTab == 'spend' ? "Thêm danh mục chi phí" : "Thêm danh mục thu nhập"}
                        </div>
                }
                <Row gutter={[30, 30]} justify={"center"} align={"bottom"} className='sm:p-4 p-0'>
                    <Col xs={6} sm={4} md={3} lg={2}>
                        <img
                            src={data?.imageCode ? configImageURL(data?.imageCode) : category.src}
                            alt=""
                            onClick={() => setIsOpenDrawerCategory(true)}
                            className='cursor-pointer'
                        />
                    </Col>
                    <Col xs={18} sm={20} md={21} lg={22}>
                        <div className='flex flex-col justify-between h-full'>
                            <Row gutter={[15, 15]}>
                                <Col span={24}>
                                    <InputTextCommon
                                        label={'Tên danh mục'}
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
                            </Row>
                        </div>
                    </Col>
                    <Col span={24}>
                        <ButtonDesign
                            classColor={'green'}
                            onClick={handleOk}
                            title={selectedId ? "Cập nhật danh mục" : "Thêm danh mục"}
                        />
                    </Col>
                    {
                        selectedId
                        &&
                        <Col span={24}>
                            <ButtonDesign
                                classColor={'transparent'}
                                onClick={onDeleteCategoryAsync}
                                title={"Xóa danh mục"}
                            />
                        </Col>
                    }
                </Row>

            </div>

        </Modal>
    )
}

export default ModalCreateCategory