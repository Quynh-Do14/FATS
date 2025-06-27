import { Doughnut } from 'react-chartjs-2';
type Props = {
    selectedTab: "spend" | "income"
    spendData: any
    incomeData: any
}
const PieChart = (props: Props) => {
    const {
        selectedTab,
        spendData,
        incomeData,
    } = props;
    return (
        <div className='box-common'>
            <p className='title-box'>Biểu đồ thu chi</p>
            <Doughnut data={selectedTab === "spend" ? spendData : incomeData} />
        </div>
    )
}

export default PieChart