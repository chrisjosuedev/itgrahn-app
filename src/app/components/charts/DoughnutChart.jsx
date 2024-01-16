import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

export const DoughnutChart = ({ data: { cash, credit } }) => {
  return (
    <Doughnut
      data={{
        labels: ['Efectivo', 'Crédito'],
        datasets: [
          {
            label: ['L.'],
            data: [cash, credit],
            backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
            borderWidth: 1,
          },
        ],
      }}
    />
  )
}
