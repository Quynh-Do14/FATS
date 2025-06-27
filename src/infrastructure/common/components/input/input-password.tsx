import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import "../../../../assets/styles/components/input.css"
import { MessageError } from '../controls/MessageError';
import { validateFields } from '../../../helper/helper';
import { validatePassword6Word } from '../../../helper/validate';
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
    data?: any
    onEnterPress?: () => void,
}
const InputPasswordCommon = (props: Props) => {
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
        data,
        onEnterPress
    } = props;
    const [value, setValue] = useState<string>("");
    const [show, setShow] = useState<boolean>(false);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    }, [submittedTime]);

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && onEnterPress) {
            onEnterPress(); // Gọi props onEnterPress khi nhấn Enter
        }
    };

    return (
        <div>
            <div className='input-text-common'>
                <label className='title' htmlFor={`${attribute}-input`}>
                    {label}
                </label>
                <div>
                    <div className='relative'>
                        <input
                            type={show ? "text" : "password"}
                            id={`${attribute}-input`}
                            value={value ? value : ""}
                            onChange={onChange}
                            onBlur={() => onBlur(false)}
                            disabled={disabled}
                            placeholder={`Nhập ${labelLower}`}
                            className={`${validate[attribute]?.isError ? "input-error" : ""}`}
                            onKeyDown={handleKeyDown}
                        />
                        <i
                            onClick={() => setShow(!show)}
                            className={show ? "fa fa-eye" : "fa fa-eye-slash"} aria-hidden="true"></i>
                    </div>

                    <MessageError isError={validate[attribute]?.isError || false} message={validate[attribute]?.message || ""} />
                </div>
            </div>
        </div>
    )
};
export default InputPasswordCommon;