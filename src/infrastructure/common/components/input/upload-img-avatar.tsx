import { Upload } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { configImageURL, getBase64, validateFields } from '../../../helper/helper';

type Props = {
    label: string,
    attribute: string,
    isRequired: boolean,
    setData: Function,
    dataAttribute: any,
    validate: any,
    setValidate: Function,
    submittedTime: any,
}

function UploadImageAvatar(props: Props) {
    const {
        label,
        attribute,
        isRequired,
        setData,
        dataAttribute,
        validate,
        setValidate,
        submittedTime,
    } = props;
    const [value, setValue] = useState<string>("")
    const handleChange = (event: any) => {
        getBase64(event.target.files[0], (url: any) => {
            setData({
                [attribute]: event.target.files[0] || '',
            });
            setValue(url)
        });
    };
    let labelLower = label.toLowerCase();
    const onBlur = (isImplicitChange = false) => {
        if (isRequired) {
            validateFields(isImplicitChange, attribute, !value, setValidate, validate, !value ? `Vui lòng nhập ${labelLower}` : "");
        }
    }

    useEffect(() => {
        if (submittedTime != null) {
            onBlur(true);
        }
    }, [submittedTime]);


    useEffect(() => {
        if (dataAttribute == null) {
            setValue("")
        }
        else if (value) {
            setValue(value)
        }
        else if (dataAttribute) {
            setValue(dataAttribute)
        }
    }, [value, dataAttribute])

    return (
        <div className='flex justify-center items-center h-full'>

            {
                value
                    ?
                    <label
                        className='cursor-pointer absolute bottom-2 right-2 text-center border border-[#4f4d4d] z-10 bg-[#0d9e6d] rounded-full p-2'
                        htmlFor="upload"
                    >
                        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z" fill="#FFF" />
                        </svg>
                    </label>
                    :
                    <label
                        className='cursor-pointer flex items-center gap-1 text-center bg-[#0d9e6d] rounded-[8px] p-2'
                        htmlFor="upload"
                    >
                        <div className='text-[1
                        px] text-[#ffffff] font-medium'>Tải ảnh lên</div>
                        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8 10C8 7.79086 9.79086 6 12 6C14.2091 6 16 7.79086 16 10V11H17C18.933 11 20.5 12.567 20.5 14.5C20.5 16.433 18.933 18 17 18H16C15.4477 18 15 18.4477 15 19C15 19.5523 15.4477 20 16 20H17C20.0376 20 22.5 17.5376 22.5 14.5C22.5 11.7793 20.5245 9.51997 17.9296 9.07824C17.4862 6.20213 15.0003 4 12 4C8.99974 4 6.51381 6.20213 6.07036 9.07824C3.47551 9.51997 1.5 11.7793 1.5 14.5C1.5 17.5376 3.96243 20 7 20H8C8.55228 20 9 19.5523 9 19C9 18.4477 8.55228 18 8 18H7C5.067 18 3.5 16.433 3.5 14.5C3.5 12.567 5.067 11 7 11H8V10ZM15.7071 13.2929L12.7071 10.2929C12.3166 9.90237 11.6834 9.90237 11.2929 10.2929L8.29289 13.2929C7.90237 13.6834 7.90237 14.3166 8.29289 14.7071C8.68342 15.0976 9.31658 15.0976 9.70711 14.7071L11 13.4142V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V13.4142L14.2929 14.7071C14.6834 15.0976 15.3166 15.0976 15.7071 14.7071C16.0976 14.3166 16.0976 13.6834 15.7071 13.2929Z" fill="#ffffff" />
                        </svg>
                    </label>
            }

            {value
                &&
                <img src={value} alt="avatar" className="w-full h-full rounded-[15px]" />
            }
            <input type="file" className='hidden' id='upload' onChange={handleChange} />
        </div>
    )
}

export default UploadImageAvatar;
