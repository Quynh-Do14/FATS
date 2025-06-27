import React, { useEffect, useState } from "react";
import { Select } from "antd";
import "../../../../assets/styles/components/input.css"
import { validateFields } from '../../../helper/helper';
import { MessageError } from '../controls/MessageError';

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
    listDataOfItem: Array<any>,
    nameOfValue?: string
    nameOfLabel?: string
}
const InputSelectCategoryCommon = (props: Props) => {
    const {
        dataAttribute,
        setData,
        attribute,
        disabled,
        listDataOfItem,
        setValidate,
        validate,
        submittedTime,
        isRequired,
        label,
        nameOfValue = "value",
        nameOfLabel = "label"
    } = props;

    const [value, setValue] = useState("");

    const onChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        setValue(e.target.value || "");
        setData({
            [attribute]: e.target.value
        });
    };

    let labelLower = label.toLowerCase();
    const validateBlur = (isImplicitChange = false) => {
        validateFields(isImplicitChange, attribute, !value, setValidate, validate, !value ? `Vui lòng chọn ${labelLower}` : "");
    };

    const onBlur = () => {
        validateBlur(false);
    };

    useEffect(() => {
        if (dataAttribute) {
            setValue(dataAttribute);
        }
        if (typeof dataAttribute == "boolean") {
            setValue(String(dataAttribute))
        }
    }, [dataAttribute]);


    useEffect(() => {
        if (submittedTime != null) {
            validateBlur(true);
        }
    }, [submittedTime]);

    return (
        <div className='input-text-common'>
            {
                label
                &&
                <div className='title'>{label}</div>
            }
            <div>
                <select
                    disabled={disabled}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    className={`${validate[attribute]?.isError ? "input-error" : ""} w-full text-left`}
                >
                    <option
                        value={""}
                    >
                        Chọn {labelLower}
                    </option>
                    {
                        listDataOfItem && listDataOfItem.length && listDataOfItem.map((item, index) => {
                            return (
                                <option
                                    key={index}
                                    value={item[nameOfValue]}
                                    title={item[nameOfLabel]}
                                >
                                    {item[nameOfLabel]}
                                </option>
                            )
                        })
                    }
                </select>
                <MessageError isError={validate[attribute]?.isError || false} message={validate[attribute]?.message || ""} />
            </div>
        </div>
    );
}
export default InputSelectCategoryCommon;