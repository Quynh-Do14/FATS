import { useState } from "react";
import SelectFilterCommon from "../input/select-filter";
import Constants from "../../../../core/common/constants";
import InputDateFilterCommon from "../input/input-date-filter";

import { ButtonDesign } from "../button/buttonDesign";

// Interface cho TimeFilter
interface TimeFilterProps {
    setTimeRange: (value: string) => void;
    startDate: string;
    endDate: string;
    setStartDate: (value: string) => void;
    setEndDate: (value: string) => void;
    fetchData: () => void;
}

const TimeFilter: React.FC<TimeFilterProps> = ({ setTimeRange, startDate, endDate, setStartDate, setEndDate, fetchData }) => {
    const [isCustom, setIsCustom] = useState(false);

    const handleTimeRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setTimeRange(value);
        setIsCustom(value === ""); // Kiểm tra nếu chọn "Lựa chọn thời gian"
    };
    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="relative">
                <SelectFilterCommon
                    label={"Lọc theo thời gian"}
                    listDataOfItem={Constants.TimeFilter.List}
                    onChange={handleTimeRangeChange}
                />
            </div>

            {isCustom && (
                <div className="flex flex-wrap gap-4 items-end">
                    <InputDateFilterCommon
                        label={"Thời gian bắt đầu"}
                        value={startDate}
                        onChange={setStartDate}
                    />
                    <InputDateFilterCommon
                        label={"Thời gian kết thúc"}
                        value={endDate}
                        onChange={setEndDate}
                    />
                    <ButtonDesign
                        title="Lọc"
                        classColor="green"
                        onClick={fetchData}
                        width={120}
                    />
                </div>
            )}
        </div>
    );
};

export default TimeFilter;