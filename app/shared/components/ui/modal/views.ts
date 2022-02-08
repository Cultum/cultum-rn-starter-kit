import styled, { css } from 'styled-components/native'

export const MODAL_SIZE = {
  full: 1,
  half: 2,
  oneThird: 3,
}

export type ModalSize = keyof typeof MODAL_SIZE

export const Adornment = styled.View`
  background: #d8d8d8;
  border-radius: 10px;
  top: 10px;
  height: 20px;
  margin: 0 16px;
`

export const Header = styled.View`
  align-items: center;
  flex-direction: row;
  margin-bottom: 20px;
  margin-top: 8px;
`

export const BWrapper = styled.TouchableOpacity`
  border-radius: 10px;
  height: 40px;
  margin-left: auto;
  margin-right: 6px;
  width: 40px;

  ${({ theme }) => theme.template.shadow};
  ${({ theme }) => theme.template.centerContent};
`

export const IWrapper = styled.View<{ height: string; fullscreen: boolean; offsetTop: number }>`
  background-color: ${({ theme }) => theme.color.palette.white};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  height: ${({ height }) => height}px;
  padding: ${({ theme }) => theme.spacing[4]}px;

  ${({ fullscreen, offsetTop }) =>
    fullscreen &&
    css`
      padding: ${offsetTop}px 0 0 0;
    `};
`

export const Wrapper = styled.View`
  background-color: rgba(17, 37, 54, 0.6);
  flex: 1;
  justify-content: flex-end;
`
