import { useRecoilValue } from 'recoil'
import { ProfileState } from '../../../../core/atoms/profile/profileState'
import AnimatedNumber from '../controls/AnimatedNumber';
import { BudgetState } from '../../../../core/atoms/budget/budgetState';
import { ROUTE_PATH } from '../../../../core/common/appRouter';
import staticService from '../../../repositories/static/static.service';
import { useEffect, useState } from 'react';
const BudgetInfo = () => {
    const profileState = useRecoilValue(ProfileState).user;
    const budget = useRecoilValue(BudgetState).data;
    const [staticSpend, setStaticSpend] = useState<any>({});

    const onGetSpendPersonalByGoalStatisticalDaily = async () => {
        try {
            await staticService.PersonalStatisticalByGoal(
                String(""),
                "",
                "",
                "monthly",
                () => { }
            ).then((res) => {
                // setStaticSpend(res.incomeStatistics.totalIncome - res.spendStatistics.totalSpend);
                setStaticSpend(res);
            })
        }
        catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        onGetSpendPersonalByGoalStatisticalDaily().then(() => { });
    }, [])
    return (
        <div className='budget-info'>
            <div className="budget-info__items">
                <div className="budget-item">
                    <div className="budget-item__icon">
                        <i className="fa fa-piggy-bank" aria-hidden="true"></i>
                    </div>
                    <div className="budget-item__content">
                        <p className="budget-item__label">Tổng ngân sách</p>
                        <p className="budget-item__value">
                            <AnimatedNumber value={budget?.totalIncome || 0} /> VNĐ
                        </p>
                    </div>
                </div>

                <div className="budget-item">
                    <div className="budget-item__icon">
                        <i className="fa fa-money" aria-hidden="true"></i>
                    </div>
                    <div className="budget-item__content">
                        <p className="budget-item__label">Tổng thu trong tháng</p>
                        <p className="budget-item__value">
                            <AnimatedNumber value={staticSpend?.incomeStatistics?.totalIncome || 0} /> VNĐ
                        </p>
                    </div>
                </div>

                <div className="budget-item">
                    <div className="budget-item__icon">
                        <i className="fa fa-wallet" aria-hidden="true"></i>
                    </div>
                    <div className="budget-item__content">
                        <p className="budget-item__label">Tổng chi trong tháng</p>
                        <p className="budget-item__value">
                            <AnimatedNumber value={staticSpend?.spendStatistics?.totalSpend || 0} /> VNĐ
                        </p>
                    </div>
                </div>

            </div>
            <a href={ROUTE_PATH.PROFILE} className="redirect">
                Cập nhật ngân sách
            </a>
        </div>
    )
}

export default BudgetInfo