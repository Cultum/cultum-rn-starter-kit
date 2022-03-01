import * as React from 'react'
// libs
import { useIsFocused } from '@react-navigation/native'
// components
import { Loader, Text } from '@md-shared/components'
import { FlatList, FlatListProps } from 'react-native'
// other
// views
import { LoaderWrapper, EmptyPlaceholder } from './views'
// utils
import { uniqBy } from 'lodash'

export interface FlatListPropsExt<T> extends FlatListProps<T> {
  data: T[] | undefined
  perPage?: number
  loadData: (page: number, shouldLoadMore?: boolean) => Promise<unknown>
  dataCount?: number
  isLoading: boolean
  resetList?: boolean
  emptyDataMsg?: string
  useRefreshControl?: boolean
  listHeaderComponent?: React.ReactElement
}

const FLAT_LIST_STYLE = { flexGrow: 1 }

const ListLoader = () => (
  <LoaderWrapper>
    <Loader />
  </LoaderWrapper>
)

const PaginatedList = <T extends Record<string, unknown>>({
  data,
  loadData,
  dataCount = 0,
  resetList = false,
  isLoading,
  emptyDataMsg = 'No data found!',
  ...rest
}: FlatListPropsExt<T>) => {
  const isFocused = useIsFocused()

  // state
  const [page, setPage] = React.useState(1)
  const [listData, setListData] = React.useState<T[]>([])

  const listRef: React.MutableRefObject<FlatList | null> = React.useRef(null)

  React.useEffect(() => {
    if (isFocused) {
      loadData(page, page > 1)
    }

    if (!isFocused && resetList) {
      listRef.current?.scrollToOffset({ animated: false, offset: 0 })
    }
  }, [page, isFocused])

  React.useEffect(() => {
    if (data) {
      setListData((prev) => (page > 1 ? uniqBy([...prev, ...data], 'id') : data))
    }
  }, [data])

  // methods

  const loadMoreData = () => {
    if (listData?.length < dataCount && !isLoading) {
      setPage((prev) => prev + 1)
    }
  }

  const renderListHeader = React.useCallback(() => {
    if (!listData?.length && isLoading) {
      return <ListLoader />
    }

    return null
  }, [isLoading])

  const renderListFooter = React.useCallback(() => {
    if (!!listData?.length && isLoading) {
      return <ListLoader />
    }

    return null
  }, [listData, isLoading])

  const renderListEmpty = React.useCallback(() => {
    if (!listData.length && !isLoading) {
      return (
        <EmptyPlaceholder>
          <Text preset={'header'}>{emptyDataMsg}</Text>
        </EmptyPlaceholder>
      )
    }

    return null
  }, [listData, isLoading, emptyDataMsg])

  const keyExtractor = React.useCallback((item) => item.id, [])

  return React.useMemo(
    () => (
      <FlatList
        {...rest}
        ref={listRef}
        data={listData}
        onEndReachedThreshold={0}
        onEndReached={loadMoreData}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderListEmpty}
        ListFooterComponent={renderListFooter}
        ListHeaderComponent={renderListHeader}
        contentContainerStyle={FLAT_LIST_STYLE}
      />
    ),
    [listData, isLoading],
  )
}

export { PaginatedList }
