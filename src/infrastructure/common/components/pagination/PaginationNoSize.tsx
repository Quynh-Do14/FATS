import { Pagination, Select } from "antd";
import "../../../../assets/styles/components/pagination.css"
import Constants from "../../../../core/common/constants";
type Props = {
    total: number,
    currentPage: number,
    onChangePage: any,
    pageSize: number,
}
export const PaginationNoSizeCommon = (props: Props) => {
    const {
        total,
        currentPage = 0,
        onChangePage,
        pageSize,
    } = props


    return (
        <div className="flex justify-between gap-2 flex-wrap container-pagination">
            <Pagination current={currentPage} total={total} showSizeChanger={false} pageSize={pageSize} onChange={onChangePage} />
        </div>
    );
};

