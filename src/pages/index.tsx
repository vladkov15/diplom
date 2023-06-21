import type { NextPage } from 'next'

import HomeLayout from '@/layouts/home'

import MainSection from '@/modules/home/components/MainSection'
import WhySection from '@/modules/home/components/WhySection'
import InstallSection from '@/modules/home/components/InstallSection'
import QuestionSection from '@/modules/home/components/QuestionSection'
import SubscribeSection from '@/modules/home/components/SubscribeSection'

const Home: NextPage = () => {
  return (
    <HomeLayout>
      <div className='home-page'>
        <MainSection />
        {/* <WhySection />
        <SubscribeSection />
        <InstallSection />
        <QuestionSection /> */}
      </div>
    </HomeLayout>
  )
}

export default Home
