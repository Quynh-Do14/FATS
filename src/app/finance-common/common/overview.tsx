import RoundChartMiniCommon from '../../../infrastructure/common/components/mini-chart/round-chart'
import { convertDateOnlyShow } from '../../../infrastructure/helper/helper'
import AnimatedNumber from '../../../infrastructure/common/components/controls/AnimatedNumber';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type Props = {
    detailGoal: any
    dailyTotal: number
    dailyIncome: number
    dailySpend: number
    incomeStatistics: any
    spendStatistics: any
    barChartData: any
}
const OverviewComponent = (props: Props) => {
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
            <div className='flex justify-between gap-2 flex-wrap'>
                <p className="title-box">{detailGoal.name} </p>

                {
                    detailGoal.currentAmount >= detailGoal.goalAmount
                        ?
                        <div className='is-done'>Hoàn thành</div>
                        :
                        <div className='is-not-done'>Chưa hoàn thành</div>
                }


            </div>
            <div className='target'>
                <div className="label">Số tiền mục tiêu</div>
                <div className="value"> <AnimatedNumber value={Number(detailGoal.goalAmount) || 0} />₫</div>

            </div>
            <Slider {...settings} className='slider'>
                <div className='content'>
                    <div>
                        <div className="label">Số dư hiện tại</div>
                        <div className="value"><AnimatedNumber value={Number(detailGoal.currentAmount) || 0} />₫</div>
                    </div>
                    <div className="label">Thời hạn: {convertDateOnlyShow(detailGoal.startDate)} - {convertDateOnlyShow(detailGoal.endDate)}</div>
                </div>
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
                <div className="content">
                    <RoundChartMiniCommon
                        completed={Number(((detailGoal.currentAmount / detailGoal.goalAmount) * 100).toFixed(2))}
                        total={100}
                    />
                </div>
            </Slider>

        </div>
    )
}

export default OverviewComponent