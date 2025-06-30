import React from 'react'
import { useRecoilValue } from 'recoil'
import { ProfileState } from '../../../../core/atoms/profile/profileState'
import alert from "../../../../assets/images/alert.png"
import { ROUTE_PATH } from '../../../../core/common/appRouter'
import { BudgetState } from '../../../../core/atoms/budget/budgetState'
const AlertBudget = () => {
    const profileState = useRecoilValue(ProfileState).data;
    const budgetState = useRecoilValue(BudgetState).data;
    return (
        <div className='alert-common'
            style={{
                background: profileState?.budgetAlert?.level == 1
                    ? "#006699"
                    : profileState?.budgetAlert?.level == 2
                        ?
                        "#c37816f5"
                        :
                        profileState?.budgetAlert?.level == 3
                            ?
                            "#eb001bcc"
                            :
                            "#006699"
            }}
        >
            <img src={alert.src} alt="" />
            <div className='level'>
                <div className="budget-info__level">
                    Mức độ: {profileState?.budgetAlert?.level}
                </div>
                <p>{budgetState.totalIncome == 0 ? <a href={ROUTE_PATH.PROFILE}>Tạo ngân sách. {" "} </a> : null} {profileState?.budgetAlert?.alert}</p>
            </div>
        </div>
    )
}

export default AlertBudget