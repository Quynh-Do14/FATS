/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { DatePicker } from 'antd';
import { MessageError } from '../controls/MessageError';
import dayjs, { Dayjs } from 'dayjs';
import { validateFields } from '../../../helper/helper';
type Props = {
    label: string,
    attribute: string,
    isRequired: boolean,
    setData: Function,
    dataAttribute: string,
    disabled: boolean,
    validate: any,
    setValidate: Function,
    submittedTime: any,
    // disabledToDate: any,
    showTime?: boolean,
    showHour?: boolean,
}
const InputDateCommon = (props: Props) => {
    const {
        label,
        attribute,
        setData,
        validate,
        setValidate,
        isRequired,
        disabled = false,
        dataAttribute,
        submittedTime,
        // disabledToDate = null,
        showTime = false,
        showHour = false,
    } = props;
    const [value, setValue] = useState<Dayjs | null>(null);

    // const disabledDate = (current: any) => {
    //     if (disabledToDate == true) {
    //         return current && current < moment().startOf('day');
    //     }
    //     else if (disabledToDate == false) {
    //         return current && current >= moment().startOf('day');
    //     }
    //     else {
    //         return
    //     }
    // };

    const onChange = async (dateString: any) => {
        setValue(dateString || null);
        setData({
            [attribute]: dateString || ''
        });
    }
    let labelLower = label.toLowerCase();
    const onBlur = (isImplicitChange = false) => {
        if (isRequired) {
            validateFields(isImplicitChange, attribute, !value, setValidate, validate, !value ? `Vui lòng nhập ${labelLower}` : "");
        }
    }
    useEffect(() => {
        if (dataAttribute) {
            const parsedDate = dayjs(dataAttribute);
            if (parsedDate.isValid()) {
                setValue(parsedDate);
            } else {
                console.error('Invalid date format:', dataAttribute);
            }
        }
    }, [dataAttribute]);
    useEffect(() => {
        if (submittedTime != null) {
            onBlur(true);
        }
    }, [submittedTime]);


    return (
        <div className='input-text-common'>
            <label className='title' htmlFor={`${attribute}-input`}>
                {label}
            </label>
            <div>
                <DatePicker
                    allowClear={false}
                    size="middle"
                    className={`${validate[attribute]?.isError ? "input-error" : ""} w-full input-date-common`}
                    value={value}
                    placeholder={`Chọn ${label}`}
                    // onChange={(values) => setValue(values)}
                    onChange={onChange}
                    // disabledDate={disabledDate}
                    disabled={disabled}
                    format={`${showHour ? "DD/MM/YYYY hh:mm:ss" : "DD/MM/YYYY"}`}
                    onBlur={() => onBlur(false)}
                    showTime={showTime}
                />

                <MessageError isError={validate[attribute]?.isError || false} message={validate[attribute]?.message || ""} />
            </div>
        </div >
    );

};
export default InputDateCommon;