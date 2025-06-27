import { Bar } from 'react-chartjs-2'
type Props = {
    statisticsByTime: any
}
const BarChartStatic = (props: Props) => {
    const {
        statisticsByTime,
    } = props;

    return (
        <div className='bar-chart box-common'>
            <p className='title-box'>Biểu đồ thu chi</p>
            <Bar
                data={statisticsByTime}
                options={{
                    responsive: true,
                    plugins: {
                        legend: { display: true },
                        title: {
                            display: false,
                        }
                    },
                    scales: {
                        y: {
                            display: true,
                            beginAtZero: true,
                            ticks: {
                                stepSize: 1000000
                            }
                        }
                    },
                }}
            />
        </div>
    )
}

export default BarChartStatic