import styled from 'styled-components/native'

export const Wrapper = styled.View<{ width: number; height: number; borderColor: string }>`
  background-color: ${({ borderColor }) => borderColor};
  width: ${({ width }) => width}px;
  width: ${({ height }) => height}px;
  border-radius: ${({ width }) => width * 0.5}px;

  ${({ theme }) => theme.template.centerContent};
`
