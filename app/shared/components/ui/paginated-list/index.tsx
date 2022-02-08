import * as React from 'react'
// libs
import { useIsFocused } from '@react-navigation/native'
// components
import { Loader, Text } from '@md-shared/components'
import { FlatList, FlatListProps, RefreshControl } from 'react-native'
// other
import { theme } from '@md-shared/theme'
import { palette } from '@md-shared/theme/palette'
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
  isLoadMore: boolean
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
  perPage = 6,
  loadData,
  dataCount = 0,
  resetList = false,
  isLoading,
  isLoadMore,
  emptyDataMsg = 'No data found!',
  useRefreshControl = true,
  listHeaderComponent,
  ...rest
}: FlatListPropsExt<T>) => {
  const isFocused = useIsFocused()

  // state
  const [page, setPage] = React.useState(1)
  const [listData, setListData] = React.useState<T[]>([])
  const [refreshing, setRefreshing] = React.useState(false)

  const listRef: React.MutableRefObject<FlatList | null> = React.useRef(null)

  // effects
  React.useEffect(() => {
    if (isFocused) {
      if (useRefreshControl && listData?.length && page === 1) {
        setRefreshing(true)
      }

      loadData(page, page > 1).then(() => setRefreshing(false))
    } else {
      if (resetList) {
        listRef.current?.scrollToOffset({ animated: false, offset: 0 })
      }
    }
  }, [page, perPage, isFocused])

  React.useEffect(() => {
    if (data) {
      setListData((prev) => (page > 1 ? uniqBy([...prev, ...data], 'id') : data))
    }
  }, [data])

  // methods
  const onRefresh = React.useCallback(() => {
    if (page > 1) {
      setPage(1)
    } else {
      setRefreshing(true)
      loadData(1).then(() => setRefreshing(false))
    }
  }, [page])

  const loadMoreData = () => {
    if (listData?.length >= perPage && listData?.length < dataCount && !isLoadMore) {
      setPage((prev) => prev + 1)
    }
  }

  const renderListHeader = React.useCallback(() => {
    if (listHeaderComponent) {
      return listHeaderComponent
    }

    if (!listData?.length && isLoading && !refreshing) {
      return <ListLoader />
    }

    return null
  }, [isLoading])

  const renderListFooter = React.useCallback(() => {
    if (isLoadMore) {
      return <ListLoader />
    }

    return null
  }, [isLoadMore])

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
        refreshControl={
          useRefreshControl ? (
            <RefreshControl
              onRefresh={onRefresh}
              refreshing={refreshing}
              tintColor={palette.blue300}
              colors={[theme.color.primary]}
            />
          ) : undefined
        }
        {...rest}
      />
    ),
    [listData, isLoading, isLoadMore, refreshing, useRefreshControl],
  )
}

export { PaginatedList }
