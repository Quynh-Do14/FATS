import AnimatedNumber from '../../../infrastructure/common/components/controls/AnimatedNumber';

type Props = {
    detailGoal: any
    dailyTotal: number
    dailyIncome: number
    dailySpend: number
    incomeStatistics: any
    spendStatistics: any
    barChartData: any
}
const OverviewPersonalComponent = (props: Props) => {
    const {
        detailGoal,
        dailyTotal,
        dailySpend,
        dailyIncome,
        incomeStatistics,
        spendStatistics,
        barChartData,
    } = props;
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 6000,
        arrows: false,
    }

    return (
        <div className="overview box-common">
            <p className="title-box">Tổng quan </p>
            <div className={`${dailyTotal >= 0 ? "green-bg" : "red-bg"} info`} >
                <div className="flex items-center justify-between">
                    <div>
                        <p className="title">Tổng chi tiêu hôm nay</p>
                        <p className="sum">
                            {dailyTotal >= 0 ? <i className="fa fa-caret-up mr-2" aria-hidden="true"></i> : <i className="fa fa-caret-down" aria-hidden="true"></i>}
                            {dailyTotal ? <AnimatedNumber value={dailyTotal} /> : 0}₫
                        </p>
                    </div>
                </div>
                <div className="more">
                    <div>
                        <p className="">Thu nhập</p>
                        <p className=""><i className="fa fa-caret-up mr-2" aria-hidden="true"></i>{dailyIncome ? <AnimatedNumber value={dailyIncome} /> : 0}₫</p>
                    </div>
                    <div>
                        <p className="">Chi phí</p>
                        <p className=""><i className="fa fa-caret-down mr-2" aria-hidden="true"></i>{dailySpend ? <AnimatedNumber value={dailySpend} /> : 0}₫</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default OverviewPersonalComponent