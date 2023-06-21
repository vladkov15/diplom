import React, { FC, useState, useEffect } from 'react'

import Form from '@ui/components/form'

import Button from '@ui/components/button'
import { ISelectItem } from '@ui/components/form/FormDropdownSelect'
import { ContentType, Genres } from '@/models/content'

import { Countries } from '@/models/countries'

import { COUNTRIES, GENRES } from '@/config'

import styles from './SearchForm.module.scss'

const YEARS = [2000, 2002, 2004, 2006, 2008, 2010, 2012, 2014, 2016, 2018, 2020, 2022]

export interface ISearchForm {
  searchQuery: string
  contentType: ContentType | null
  genre: Genres | null
  year: number | null
  country: Countries | null
}

interface SearchFormProps {
  busy?: boolean
  onChange?: (form: ISearchForm) => void
  onSubmit?: (form: ISearchForm) => void
}

const SearchForm: FC<SearchFormProps> = ({ busy, onChange, onSubmit }) => {
  const [searchForm, setSearchForm] = useState<ISearchForm>({
    searchQuery: '',
    contentType: ContentType.SERIAL,
    genre: null,
    year: null,
    country: null,
  })

  useEffect(() => {
    onChange?.(searchForm)
  }, [searchForm])

  const handleSubmitForm = () => {
    onSubmit?.(searchForm)
  }

  const handleChangeControlField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleChangeSelectField = (item: ISelectItem, name = '') => {
    setSearchForm((prev) => ({ ...prev, [name]: item.value }))
  }

  return (
    <Form className={styles.SearchForm} onSubmit={handleSubmitForm}>
      <Form.Group style={{ gridArea: 'a' }}>
        <Form.FormControl
          value={searchForm.searchQuery}
          onChange={handleChangeControlField}
          label='Фильмы, жанры'
          name='searchQuery'
          appendInnerContent={
            <Button
              className={styles.SearchForm__SearchButton}
              variant='link'
              type='submit'
              onClick={(e) => e.stopPropagation()}
              size='sm'
              loader={busy}
              loaderProps={{ variant: 'accent' }}
              icon
            >
              <i className='icon-search' />
            </Button>
          }
        />
      </Form.Group>

      <Form.Group style={{ gridArea: 'b' }}>
        <Form.DropdownSelect
          value={searchForm.contentType}
          onChange={handleChangeSelectField}
          name='contentType'
          label='Тип контента'
        >
          <option value={ContentType.SERIAL}>Сериалы</option>
          <option value={ContentType.FILM}>Фильмы</option>
        </Form.DropdownSelect>
      </Form.Group>

      <Form.Group style={{ gridArea: 'c' }}>
        <Form.DropdownSelect
          value={searchForm.genre}
          onChange={handleChangeSelectField}
          label='Жанр'
          name='genre'
        >
          {[...GENRES].map(([genre, info]) => (
            <option value={genre} key={genre}>
              {info.label}
            </option>
          ))}
        </Form.DropdownSelect>
      </Form.Group>

      <Form.Group style={{ gridArea: 'd' }}>
        <Form.DropdownSelect
          value={searchForm.year}
          onChange={handleChangeSelectField}
          label='Год'
          name='year'
          disabled
        >
          {[...YEARS].map((year) => (
            <option value={year} key={year}>
              {year}
            </option>
          ))}
        </Form.DropdownSelect>
      </Form.Group>

      <Form.Group style={{ gridArea: 'e' }}>
        <Form.DropdownSelect
          value={searchForm.country}
          onChange={handleChangeSelectField}
          label='Страна'
          name='country'
          disabled
        >
          {[...COUNTRIES].map(([country, info]) => (
            <option value={country} key={country}>
              {info.label}
            </option>
          ))}
        </Form.DropdownSelect>
      </Form.Group>
    </Form>
  )
}

export default SearchForm
