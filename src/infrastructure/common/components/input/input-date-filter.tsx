import { DatePicker } from "antd";
import dayjs from "dayjs";
import "../../../../assets/styles/components/input.css";

type Props = {
    label: string,
    value: string, // ví dụ: "2025-03-27"
    onChange: (value: string) => void;
};

const InputDateFilterCommon = (props: Props) => {
    const {
        value,
        label,
        onChange
    } = props;

    const onChangeDate = (date: dayjs.Dayjs | null) => {
        if (date) {
            onChange(date.format("YYYY-MM-DD"));
        } else {
            onChange(""); // clear value nếu không chọn gì
        }
    };

    return (
        <div className='input-text-common'>
            <div className='title'>{label}</div>
            <DatePicker
                allowClear={false}
                size="middle"
                className="input-date-common"
                value={value ? dayjs(value, "YYYY-MM-DD") : null}
                placeholder={`Chọn ${label}`}
                onChange={onChangeDate}
                format={"YYYY-MM-DD"}
            />
        </div>
    );
};

export default InputDateFilterCommon;
