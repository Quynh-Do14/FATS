import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import styles from "@/assets/styles/components/input.module.css";
import 'react-quill/dist/quill.snow.css';
import { validateFields } from '@/infrastructure/helper/helper';
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
}

const TextEditorCommon = (props: Props) => {
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
    } = props;

    const [editorValue, setEditorValue] = useState<string>('');

    const onChange = (value: any) => {
        setEditorValue(value);
        setData({
            [attribute]: value || ''
        });
    };
    useEffect(() => {
        setEditorValue(dataAttribute || '');

    }, [dataAttribute]);
    const labelLower = label?.toLowerCase();
    useEffect(() => {
        if (submittedTime != null) {
            validateFields(true, attribute, !editorValue, setValidate, validate, !editorValue ? `Vui lòng nhập ${labelLower}` : "");
        }
    }, [submittedTime]);

    return (
        <div className={styles.input_common}>
            <div className={styles.title_content}>
                <span>
                    <label className={styles.label}>{label}</label>
                    <span className={styles.is_required}>{isRequired ? "*" : ""} </span>
                </span>
            </div>
            <MessageError isError={validate[attribute]?.isError || false} message={validate[attribute]?.message || ""} />
            <ReactQuill
                theme="snow"
                value={editorValue}
                onChange={onChange}
                modules={{
                    toolbar: [
                        [{ header: [1, 2, 3, 4, 5, 6, false] }],
                        [{ font: [] }],
                        [{ size: ['small', false, 'large', 'huge'] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        ['blockquote', 'code-block'],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        [{ script: 'sub' }, { script: 'super' }],
                        [{ indent: '-1' }, { indent: '+1' }],
                        [{ direction: 'rtl' }],
                        [{ color: [] }, { background: [] }],
                        [{ align: [] }],
                        ['link', 'image', 'video'],
                        ['clean'],
                    ],
                }}
                formats={[
                    'header',
                    'font',
                    'size',
                    'bold',
                    'italic',
                    'underline',
                    'strike',
                    'color',
                    'background',
                    'list',
                    'bullet',
                    'align',
                    'link',
                    'image',
                    'video',
                    'code-block',
                ]}
                style={{ height: 500 }}
                readOnly={disabled} // Đặt readOnly nếu disabled
            />
        </div>
    );
};

export default TextEditorCommon;
