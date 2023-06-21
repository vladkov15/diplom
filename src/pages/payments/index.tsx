import { FC, ReactElement } from 'react'
import Image from 'next/image'

import { NextPageWithLayout } from '../_app'

import DefaultLayout from '@/layouts/default'

import Divider from '@ui/components/Divider'

import styles from './PaymentsPage.module.scss'

interface IItem {
  title: string
  description: React.ReactNode
}

const ERIP_PAYMENT: IItem = {
  title:
    '«Система «Расчет» — автоматизированная информационная система единого расчетного и информационного пространства (АИС ЕРИП)',
  description: (
    <>
      <p>Для проведения платежа необходимо:</p>
      <ol>
        <li>
          Выбрать последовательно пункты: <br />{' '}
          <ul>
            <li>Система «Расчет» (ЕРИП) Интернет, Телевидение АйТиВи ООО — ITV.BY</li>
          </ul>
        </li>
        <li>Ввести номер заказа</li>
        <li>Проверить корректность информации</li>
        <li>Совершить платеж</li>
      </ol>
      <p>
        Нахождение услуги в дереве услуг системы «Расчет» (ЕРИП) в некоторых пунктах оплаты может
        отличаться от описанного выше. В связи с этим, в случае возникновения проблем с поиском
        услуги, предлагаем выполнить поиск по УНП: 192563594.
      </p>
      <small>
        *если Вы осуществляете платеж в кассе банка, пожалуйста, сообщите кассиру о необходимости
        проведения оплаты услуги «АйТиВи ООО — ITV.BY» через систему «Расчет» (ЕРИП) и сообщите
        номер заказа.
      </small>
    </>
  ),
}

const IPAY_PAYMENT: IItem = {
  title: 'Система iPay — оплата с баланса мобильного телефона**',
  description: (
    <>
      <p>
        Совершить платеж можно из личного кабинета сайта iPay.by. Для входа в личный кабинет
        используйте свой номер телефона и сеансовый пароль, для получения которого достаточно
        отправить любое SMS- сообщение на номер 5533 (стоимость SMS определяется тарифным планом
        абонента). После успешного входа в личный кабинет можно осуществлять платежи, выбирая услуги
        для оплаты. Кроме того, можно узнать баланс счета мобильного телефона, просмотреть историю
        платежей, при необходимости распечатать чек.
      </p>
      <p>Ссылка на оплату услуги «АйТиВи ООО - ITV.BY» через систему iPay для абонентов:</p>
      <div className='d-flex'>
        <div className='me-4'>
          <Image src='/assets/img/payments/ipay_mts.png' width={115} height={50} alt='iPay МТС' />
        </div>
        <Image src='/assets/img/payments/ipay_life.png' width={115} height={50} alt='iPay life:)' />
      </div>
      <p>Комиссия системы iPay составит для абонентов МТС 3%, life 3,5%.</p>
      <small>
        **исключения составляют номера телефонов, подключенные на корпоративный тариф, Свободный
        life:) и абоненты, использующие оплату услуг сотовой связи по факту. Для осуществления
        операций в Системе iPay доступна не вся сумма баланса лицевого счета: после списания
        итоговой суммы операции на вашем счете должно остаться не менее 10 копеек для абонентов МТС
        и не менее 5 копеек для абонентов life:)
      </small>
    </>
  ),
}

const CARD_PAYMENT: IItem = {
  title: 'Банковская карта',
  description: (
    <>
      <p>
        После выбора системы оплаты вы перейдете на специальную защищенную платежную страницу
        процессинговой системы bePaid.
      </p>
      <p>
        На платежной странице будет указан номер заказа и сумма платежа. Для оплаты вам необходимо
        ввести свои карточные данные и подтвердить платеж, нажав кнопку «Оплатить».
      </p>
      <p>
        Если ваша карта поддерживает технологию 3-D Secure, системой вам будет предложено пройти
        стандартную одноминутную процедуру проверки владельца карты на странице вашего банка (банка,
        который выдал вашу карту).
      </p>
      <strong>
        Мы принимаем платежи по следующим банковским картам: Visa, Visa Electron, MasterCard,
        Maestro, Белкарт
      </strong>
      <p>
        Платежи по банковским картам осуществляются через систему электронных платежей bePaid.
        Платежная страница системы bePaid отвечает всем требованиям безопасности передачи данных
        (PCI DSS Level 1). Все конфиденциальные данные хранятся в зашифрованном виде и максимально
        устойчивы к взлому. Доступ к авторизационным страницам осуществляется с использованием
        протокола, обеспечивающего безопасную передачу данных в Интернетe (SSL/TLS).
      </p>
      <p>
        Возврат денежных средств осуществляется на карту, с которой ранее была произведена оплата.
        Срок поступления денежных средств на карту от 1 до 30 дней с момента осуществления возврата
        ООО &quot;АйТиВи&quot;. Условия возврата описаны в{' '}
        <a href='http://new.itv.by/Agreement.pdf' target='_blank' rel='noopener noreferrer'>
          Публичном договоре
        </a>
        .
      </p>
    </>
  ),
}

interface PaymentsInfoProps {
  title: string
  description: React.ReactNode
}

const PaymentsInfo: FC<PaymentsInfoProps> = ({ title, description }) => {
  return (
    <div className={styles.PaymentsInfo}>
      <div className={styles.PaymentsInfo__Header}>
        <h3 className={styles.PaymentsInfo__Title}>{title}</h3>
      </div>
      <div className={styles.PaymentsInfo__Body}>{description}</div>
    </div>
  )
}

const PaymentsPage: NextPageWithLayout = () => {
  return (
    <div className={styles.PaymentsPage}>
      <PaymentsInfo {...ERIP_PAYMENT} />

      <Divider />

      <PaymentsInfo {...IPAY_PAYMENT} />

      <Divider />

      <PaymentsInfo {...CARD_PAYMENT} />
    </div>
  )
}

PaymentsPage.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout pageTitle='Оплата'>{page}</DefaultLayout>
}

export default PaymentsPage
