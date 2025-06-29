import React from 'react';
import { Tooltip } from 'antd';
type Props = {
    onClickDetail: Function,
    onClickDelete: Function
}
export const ActionCommon = (props: Props) => {
    const { onClickDetail, onClickDelete } = props;
    return (
        <div className='action-common flex justify-center gap-1 whitespace-nowrap'>
            <Tooltip className="custom-tooltip" color={'#fff'} overlayInnerStyle={{ color: "#475f7b" }} title={"Sửa"}>
                <div onClick={() => onClickDetail()} className='option p-1 cursor-pointer'>
                    <div className='option-select'>
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                    </div>
                </div>
            </Tooltip>
            <Tooltip color={'#fff'} overlayInnerStyle={{ color: "#666666" }} title={"Xóa"}>
                <div onClick={() => onClickDelete()} className='option p-1 cursor-pointer'>
                    <div className='option-select'>
                        <i className="fa fa-trash" aria-hidden="true"></i>
                    </div>
                </div>
            </Tooltip>
        </div>
    )
}
