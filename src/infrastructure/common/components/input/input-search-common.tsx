import { SearchOutlined } from "@ant-design/icons";
import "../../../../assets/styles/components/input.css";

type Props = {
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled: boolean;
};

export const InputSearchCommon = (props: Props) => {
    const {
        placeholder,
        value,
        onChange,
        disabled,
    } = props;

    return (
        <div className="search-container">
            <input
                type="text"
                className="search-input"
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                disabled={disabled}
            />
            <span className="search-icon">
                <SearchOutlined />
            </span>
        </div>
    );
};
