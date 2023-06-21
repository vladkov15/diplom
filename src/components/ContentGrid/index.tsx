import { FC } from 'react'

import Button from '@ui/components/button'

import { IContent } from '@/models/content'

import styles from './ContentGrid.module.scss'

interface LoadMoreButtonProps {
  busy: boolean
  currentPage: number
  perPage: number
  totalPages: number | null
  totalItems: number | null
  onChangePage?: (currentPage: number, perPage: number) => void
}

const LoadMoreButton: FC<LoadMoreButtonProps> = ({
  busy,
  currentPage,
  totalItems,
  perPage,
  onChangePage,
}) => {
  const handleClickLoadMore = () => onChangePage?.(currentPage + 1, perPage)

  if (totalItems && currentPage * perPage >= totalItems) return null

  return <Button label='Показать еще' onClick={handleClickLoadMore} loader={busy} disabled={busy} />
}

interface ContentGridProps {
  loading: boolean
  items: IContent[]
  itemRenderFn: (item: IContent, index: number, items: IContent[]) => React.ReactNode
  loadMore?: LoadMoreButtonProps
}

const ContentGrid: FC<ContentGridProps> = ({ loading, items, loadMore, itemRenderFn }) => {
  return (
    <div className={styles.ContentGrid}>
      <div className={styles.ContentGrid__Body}>{items.map(itemRenderFn)}</div>
      <div className={styles.ContentGrid__Footer}>
        {loadMore && <LoadMoreButton {...loadMore} />}
      </div>
    </div>
  )
}

export default ContentGrid
