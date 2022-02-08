import styled from 'styled-components/native'

export const LoaderWrapper = styled.View`
  align-items: center;
`

export const EmptyPlaceholder = styled.View`
  flex: 1;

  ${({ theme }) => theme.template.centerContent}
`
