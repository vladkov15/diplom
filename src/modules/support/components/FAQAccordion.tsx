import React, { FC, useId } from 'react'

import Accordion from '@ui/components/accordion'

import { IFaq } from '../faqs'

import styles from './FAQAccordion.module.scss'

interface FAQAccordionProps {
  items: IFaq[]
}

const FAQAccordion: FC<FAQAccordionProps> = ({ items }: FAQAccordionProps) => {
  const id = useId()

  return (
    <Accordion className={styles.FAQAccordion} defaultActiveKey='0'>
      {items.map((item, index) => (
        <Accordion.Item eventKey={`${index}`} key={`${id}_${index}`}>
          <Accordion.Header>{item.question}</Accordion.Header>
          <Accordion.Body className={styles.FAQAccordion__Body}>{item.answer}</Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  )
}

export default FAQAccordion
