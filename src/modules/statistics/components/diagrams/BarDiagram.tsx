import React, { FC } from 'react'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  ChartData,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

import { useGetStatisticsGenresQuery } from '@/modules/statistics/statistics.api'
import { COLORS } from './constants'

import Legend from './Legend'

import styles from './BarDiagram.module.scss'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip)

interface BarDiagramProps {
  interval: number
}

const OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: { display: false },
    y: { display: false },
  },
}

const BarDiagram: FC<BarDiagramProps> = ({ interval }) => {
  const { data: categories } = useGetStatisticsGenresQuery({ interval })

  if (!categories) return <div>Loading...</div>

  const labels = categories.map((category) => `${category.name} ${category.percent_string}`)
  const barData = categories.map((category) => category.percent || 1)

  const data: ChartData<'bar', (number | [number, number] | null)[], unknown> = {
    labels,
    datasets: [
      {
        data: barData,
        backgroundColor: COLORS,
        borderWidth: 2,
        borderColor: 'white',
        barPercentage: 1,
        borderSkipped: false,
        categoryPercentage: 1,
      },
    ],
  }

  return (
    <div>
      <div className={styles.BarDiagram}>
        <div className={styles.BarDiagram__Container}>
          <Bar data={data} options={OPTIONS} />
        </div>
        <Legend items={labels.map((label, index) => ({ label, color: COLORS[index] }))} />
      </div>
    </div>
  )
}

export default BarDiagram
