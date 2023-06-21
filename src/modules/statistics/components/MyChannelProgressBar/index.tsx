import React from 'react'
import styled, { keyframes, css } from 'styled-components'

import { useGetMyChannelStatusQuery } from '@/modules/statistics/statistics.api'

import Image from '@ui/components/Image'

import styles from './MyChannelProgressBar.module.scss'

const MyChannelProgressBar = () => {
  const { data: myChannelStatus } = useGetMyChannelStatusQuery()

  if (!myChannelStatus) return null

  const status = myChannelStatus.status
  const timeLeft = myChannelStatus.ut_time_left / 3600
  const timeFull = myChannelStatus.ut_time_full / 3600
  const timeWatched = myChannelStatus.ut_time_watched / 3600

  const percentage = (timeWatched * 100) / timeFull

  return (
    <div className={styles.MyChannelProgressBar}>
      <div className={styles.MyChannelProgressBar__InnerContainer}>
        <div className={styles.MyChannelProgressBar__Logo}>
          <Image
            style={{ objectFit: 'contain' }}
            src='/assets/img/mychannel_icon.png'
            width={75}
            height={75}
            objectFit='contain'
            alt='My Channel Icon'
          />
        </div>
        <div className={styles.MyChannelProgressBar__Body}>
          <h2 className={styles.MyChannelProgressBar__Title}>
            <span>Мой канал</span>
            {status === 0 && (
              <Image
                style={{ objectFit: 'contain' }}
                src='/assets/img/icons/locked.png'
                width={25}
                height={25}
                alt='Locked Icon'
              />
            )}
          </h2>

          {status === 0 && <p>Осталось насмотреть {timeLeft} часов</p>}
          {status === 1 && <p>Новые рекомендации уже доступны в «Моем канале»</p>}
        </div>
      </div>
      <div className={styles.MyChannelProgressBar__MainProgressContainer}>
        <FullProgressStyled percentage={percentage} />
      </div>
      <div className={styles.MyChannelProgressBar__LinearProgressContainer}>
        <LinearProgressStyled percentage={percentage} />
      </div>
    </div>
  )
}

interface FullProgressStyledProps {
  percentage: number | string
}

const MainProgressAnimationKeyframe = keyframes`
  0%, 100% {
    clip-path: polygon(0 0, 99% 0, 99% 13%, 100% 23%, 99% 34%, 100% 45%, 98% 57%, 100% 68%, 99% 80%, 99% 93%, 100% 100%, 0 100%)
  }

  50% {
    clip-path: polygon(0 0, 100% 0, 99% 15%, 99% 26%, 100% 37%, 98% 48%, 100% 57%, 99% 68%, 100% 78%, 99% 90%, 100% 100%, 0 100%)
  }
`

const FullProgressStyled = styled.div<FullProgressStyledProps>`
  width: ${({ percentage }) => percentage + '%'};
  height: 100%;
  background-color: #01aee1;
  &:hover {
    cursor: ${({ percentage }) => (percentage == 100 ? 'pointer' : 'unset')};
  }
  animation: ${({ percentage }) => {
    return percentage < 100
      ? css`
          ${MainProgressAnimationKeyframe} 4s ease-in-out infinite
        `
      : 'none'
  }};
`

interface LinearProgressStyledProps {
  percentage: number | string
}

const LinearProgressStyled = styled.div<LinearProgressStyledProps>`
  width: ${({ percentage }) => percentage + '%'};
  height: 100%;
  background-color: #fdfdfe;
`

export default MyChannelProgressBar
