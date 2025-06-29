/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import { validateFields } from '../../../helper/helper';
import { MessageError } from '../controls/MessageError';
import "../../../../assets/styles/components/input.css"

const { TextArea } = Input

type Props = {
    label: string,
    attribute: string,
    isRequired: boolean,
    setData: Function,
    dataAttribute: any,
    disabled: boolean,
    validate: any,
    setValidate: Function,
    submittedTime: any,
    placeholder: string
}
const InputTextAreaCommon = (props: Props) => {
    const {
        label,
        attribute,
        isRequired,
        setData,
        dataAttribute,
        disabled = false,
        validate,
        setValidate,
        submittedTime,
        placeholder
    } = props;

    const [value, setValue] = useState<string>("");

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value || "");
        setData({
            [attribute]: e.target.value || ''
        });
    };
    let labelLower = label?.toLowerCase();
    const onBlur = (isImplicitChange = false) => {
        if (isRequired) {
            validateFields(isImplicitChange, attribute, !value, setValidate, validate, !value ? `Vui lòng nhập ${labelLower}` : "");
        }

    };

    useEffect(() => {
        setValue(dataAttribute || '');

    }, [dataAttribute]);

    useEffect(() => {
        if (submittedTime != null) {
            onBlur(true);
        }
    }, [submittedTime, onBlur]);

    return (
        <div className='input-text-common'>
            <label className='title' htmlFor={`${attribute}-input`}>
                {label}
            </label>
            <div>
                <textarea
                    placeholder={placeholder}
                    value={value ? value : ""}
                    onChange={onChange}
                    onBlur={() => onBlur(false)}
                    disabled={disabled}
                    style={{ borderRadius: "8px !important", height: 160 }}
                    className={`${validate[attribute]?.isError ? "input-error" : ""}`}
                />
                <MessageError isError={validate[attribute]?.isError || false} message={validate[attribute]?.message || ""} />
            </div>
        </div>
    )
};
export default InputTextAreaCommon;