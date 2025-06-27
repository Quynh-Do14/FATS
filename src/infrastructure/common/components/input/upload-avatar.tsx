import { Upload } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import "../../../../assets/styles/components/input.css"
import { UploadListType } from 'antd/es/upload/interface'
import { getBase64 } from '../../../helper/helper'

type Props = {
  label: string
  dataAttribute: any
  setData: Function
  attribute: string
  listType: UploadListType
  shape: 'circle' | 'card'
}

function UploadAvatar(props: Props) {
  const { label, dataAttribute, setData, attribute, listType, shape } = props
  const [value, setValue] = useState<string>('')
  const inputRef = useRef(null)

  const handleChange = (event: any) => {
    getBase64(event.file, (url: any) => {
      setData({
        [attribute]: event.file || ''
      })
      setValue(url)
    })
  }

  useEffect(() => {
    if (value) {
      setValue(value)
    } else if (dataAttribute) {
      setValue(dataAttribute)
    }
  }, [value, dataAttribute])
  return (
    <div className="upload-common">
      <Upload
        name='avatar'
        listType={listType}
        className={`${shape} custom`}
        showUploadList={false}
        beforeUpload={() => false}
        onChange={handleChange}
        id='upload'
        accept="image/png, image/jpeg"
      >
        {value ? (
          <img
            src={value}
            alt='avatar'
            className={`${shape}`}
            width={100}
            height={100}
          />
        ) : (
          <div ref={inputRef}>
            <PlusOutlined />
          </div>
        )}
      </Upload>
    </div>
  )
}

export default UploadAvatar
