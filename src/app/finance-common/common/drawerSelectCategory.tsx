import { Col, Drawer, Modal, Row } from 'antd'
import "../../../assets/styles/components/modal.css"
import { CloseOutlined } from '@ant-design/icons';
import iconService from '../../../infrastructure/repositories/icon/icon.service';
import { useEffect, useState } from 'react';
import { configImageURL } from '../../../infrastructure/helper/helper';
type Props = {
    handleCancel: Function,
    visible: boolean,
    data: any,
    setData: Function,
}
const DrawerSelectCategory = (props: Props) => {
    const {
        handleCancel,
        visible,
        data,
        setData,
    } = props;
    const [listIcon, setListIcon] = useState<any[]>([]);
    const [selectIcon, setSelectIcon] = useState<number>(1);

    const onGetListIconAsync = async () => {
        try {
            await iconService.GetIcon(
                () => { }
            ).then((res) => {
                setListIcon(res)
            })
        }
        catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        onGetListIconAsync().then(() => { });
    }, [])

    const onSelectCategory = (item: any) => {
        setData({
            ["iconId"]: item.id || 1,
            ["imageCode"]: item.imageCode || ""
        });
        setSelectIcon(item.id);
        handleCancel();
    }
    return (
        <Drawer
            placement="left"
            onClose={() => handleCancel()}
            open={visible}
            headerStyle={{
                background: "#1d9b5e",
            }}
            closeIcon={<i className="fa fa-arrow-left text-[#FFF] text-[20px]" aria-hidden="true"></i>}
        >
            <div className='modal-select'>
                <Row gutter={[20, 20]}>
                    {
                        listIcon?.map((item, index) => {
                            return (
                                <Col xs={8} sm={8} md={4} key={index}>
                                    <div className={`flex justify-center`}>
                                        <div
                                            onClick={() => onSelectCategory(item)}
                                            className={`content ${selectIcon == item.id ? "select" : ""}`}
                                        >
                                            <img src={configImageURL(item.imageCode)} alt="" />
                                        </div>
                                    </div>
                                </Col>
                            )
                        })
                    }

                </Row>
            </div>
        </Drawer>
    )
}

export default DrawerSelectCategory