import React, { useState } from 'react';
import confirmIcon from '@/assets/images/confirm.png';
import inConfirmIcon from '@/assets/images/inconfirm.png';
import teamLogService from '@/infrastructure/repositories/team/teamLog.service';
import DialogConfirmCommon from '@/infrastructure/common/components/modal/dialogConfirm';
import { Tooltip } from 'antd';

type Props = {
    dataTable: any[]
    setLoading: (loading: boolean) => void
}
const TeamLogComponent = (props: Props) => {
    const {
        dataTable,
        setLoading
    } = props;

    const [isModalConfirm, setIsModalConfirm] = useState<boolean>(false);
    const [idConfirm, setIdConfirm] = useState<string>("");
    const [typeConfirm, setTypeConfirm] = useState<boolean>(false);


    const onOpenModalConfirm = (id: string, confirm: boolean) => {
        setIdConfirm(id);
        setTypeConfirm(confirm);
        setIsModalConfirm(!isModalConfirm)
    }
    const onCloseModalConfirm = () => {
        setIsModalConfirm(false)
    }

    const onConfirmAsync = async () => {
        try {
            await teamLogService.UpdateTeamLog(
                String(idConfirm),
                typeConfirm,
                () => { },
                setLoading
            ).then((res) => {
                onCloseModalConfirm()
            })
        }
        catch (error) {
            console.error(error);
        }

    }
    return (
        <div className='box-common'>
            <p className='title-box'>Giao dịch đang chờ</p>
            <table>
                <thead className="bg-[#cce5ff]">
                    <tr className="text-[16px]">
                        <th className="px-6 py-4 text-left">Nội dung</th>
                        <th className="px-6 py-4 min-w-[150px] text-left">Danh mục</th>
                        <th className="px-6 py-4 min-w-[150px] text-left">Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        dataTable.map((item, index) => {
                            return (
                                <tr
                                    className={`${index % 2 === 0 ? "bg-[#ccf2dd]" : "bg-[#cce5ff]"
                                        } hover:bg-[#b3d8ff]`}
                                >
                                    <td className="px-6 py-4">{item.message}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{
                                        item.type == "dong_gop"
                                            ?
                                            "Đóng góp"
                                            :
                                            item.type == "rut_tien"
                                                ?
                                                "Rút tiền"
                                                :
                                                ""
                                    }</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {
                                            !item.active
                                            &&
                                            <div className='flex flex-col gap-2 items-center'>
                                                <Tooltip title="Đồng ý" placement='topLeft'>

                                                    <div className='cursor-pointer' onClick={() => onOpenModalConfirm(item.id, true)}>
                                                        <img src={confirmIcon.src}
                                                            alt="FATS"
                                                        />
                                                    </div>
                                                </Tooltip>
                                                <Tooltip title="Từ chối" placement='topLeft'>
                                                    <div className='cursor-pointer' onClick={() => onOpenModalConfirm(item.id, false)}>
                                                        <img src={inConfirmIcon.src}
                                                            alt="FATS"
                                                        />
                                                    </div>
                                                </Tooltip>
                                            </div>
                                        }

                                    </td>
                                </tr>
                            )
                        })}
                </tbody>
            </table>
            <DialogConfirmCommon
                title={"Xác nhận"}
                message={"Bạn muốn xác nhận?"}
                titleCancel={"Hủy"}
                titleOk={"Đồng ý"}
                handleOk={onConfirmAsync}
                handleCancel={onCloseModalConfirm}
                visible={isModalConfirm}
            />
        </div >
    )
}

export default TeamLogComponent