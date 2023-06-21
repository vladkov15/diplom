import SectionTitle from '../common/SectionTitle'
import WhySubSection from './WhySubSection'

import styles from './WhySection.module.scss'

const WhySection = () => {
  return (
    <section className={`${styles.WhySection} container`}>
      <SectionTitle label='Почему нас выбирают' withUnderline />

      <WhySubSection image='/assets/img/home/choice.png' title='Большой выбор'>
        <ul className={styles.BigChoiceList}>
          <li>
            Более <br /> <span>100</span> <br /> ТВ-каналов
          </li>
          <li>
            Более <br /> <span>100 000</span> <br /> серий сериалов
          </li>
          <li>
            Более <br /> <span>5 000</span> <br /> фильмов
          </li>
        </ul>
      </WhySubSection>

      <WhySubSection
        image='/assets/img/home/convenience.png'
        title='Удобство'
        description='Можно смотреть на 5 различных устройствах'
        direction='row-reverse'
      >
        <ul className={styles.DeviceList}>
          <li>Телевизор</li>
          <li>Смартфон</li>
          <li>Планшет</li>
        </ul>
      </WhySubSection>

      <WhySubSection image='/assets/img/home/i_mary.png' title='Дополнительные возможности'>
        <ul className={styles.AdditionalFeatureList}>
          <li>Статистика просмотров</li>
          <li>Мой канал</li>
          <li>Рекомендательный модуль iМаша</li>
          <li>ITV-ассистент и др.</li>
        </ul>
      </WhySubSection>
    </section>
  )
}

export default WhySection
