import React from 'react'

import Tabs from '@ui/components/tabs'
import FAQAccordion from './FAQAccordion'

import faqs from '../faqs'

export const tabs = [
  {
    key: 'commonFaqs',
    label: 'Общие вопросы',
    faqs: <FAQAccordion items={faqs.commonFaqs} />,
  },
  {
    key: 'smartTvFaqs',
    label: 'SMART TV',
    faqs: <FAQAccordion items={faqs.smartTvFaqs} />,
  },
  {
    key: 'boxTvFaqs',
    label: 'ТВ-приставка',
    faqs: <FAQAccordion items={faqs.boxTvFaqs} />,
  },
  {
    key: 'tabletFaqs',
    label: 'Планшет',
    faqs: <FAQAccordion items={faqs.tabletFaqs} />,
  },
  {
    key: 'phoneFaqs',
    label: 'Телефон',
    faqs: <FAQAccordion items={faqs.phoneFaqs} />,
  },
]

const FAQTabs = () => {
  return (
    <Tabs defaultActiveKey='commonFaqs'>
      {tabs.map((tab) => (
        <Tabs.Tab id={tab.key} eventKey={tab.key} title={tab.label} key={tab.key}>
          {tab.faqs}
        </Tabs.Tab>
      ))}
    </Tabs>
  )
}

export default FAQTabs
