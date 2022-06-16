import { BigNumber } from "@ethersproject/bignumber"
import { FC } from "react"
import styled, { css, keyframes } from "styled-components"

import { IconButton } from "../../components/IconButton"
import { TokenIcon } from "./TokenIcon"
import {
  convertTokenBalanceToPrice,
  toTokenView,
  useTokenPricing,
} from "./tokens.service"
import { TokenDetailsWithBalance } from "./tokens.state"

export const TokenWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 24px;
  cursor: pointer;

  transition: all 200ms ease-in-out;

  &:hover,
  &:focus {
    outline: 0;
    background: rgba(255, 255, 255, 0.05);
  }
`

export const TokenDetailsWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const TokenTextGroup = styled.div`
  display: flex;
  flex-direction: column;
`

export const TokenTitle = styled.h3`
  font-weight: 600;
  font-size: 17px;
  line-height: 22px;
  margin: 0;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 250px;
`
export const TokenSubtitleContainer = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  /* number of lines to show */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
`

export const TokenSubtitle = styled.p`
  font-size: 13px;
  line-height: 18px;
  color: #8f8e8c;
  margin: 0;
`

const PulseAnimation = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`

export const TokenBalance = styled.p<{
  isLoading?: boolean
}>`
  font-weight: 600;
  font-size: 17px;
  line-height: 22px;
  text-align: right;
  max-width: 64px;
  min-width: 52px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  opacity: 1;
  ${({ isLoading }) =>
    isLoading &&
    css`
      animation: ${PulseAnimation} 1s ease-in-out infinite;
    `}
`

export const AddTokenIconButton = styled(IconButton)`
  &:hover,
  &:focus {
    background-color: rgba(255, 255, 255, 0.15);
    outline: 0;
  }
`

export type TokenAction =
  | { type: "MINT"; amount: BigNumber }
  | { type: "TRANSFER"; to: string; amount: BigNumber }

interface TokenListItemProps {
  token: TokenDetailsWithBalance
  isLoading?: boolean
}

export const TokenListItem: FC<TokenListItemProps> = ({
  token,
  isLoading = false,
  ...props
}) => {
  const { name, symbol, balance, image } = toTokenView(token)
  const pricing = useTokenPricing(token)

  if (pricing) {
    // console.log({ token, pricing })
    // const displayFiatValue =
    //   pricing && balance
    //     ? convertTokenBalanceToPrice({
    //         balance: token.balance || 0,
    //         decimals: token.decimals || 0,
    //         price: pricing.ccyValue,
    //       })
    //     : "–"
    // console.log({ displayFiatValue })
  }
  return (
    <TokenWrapper {...props}>
      <TokenIcon url={image} name={name} />
      <TokenDetailsWrapper>
        <TokenTextGroup>
          <TokenTitle>{symbol}</TokenTitle>
          <TokenSubtitleContainer>
            <TokenSubtitle>{name}</TokenSubtitle>
          </TokenSubtitleContainer>
        </TokenTextGroup>
        <TokenBalance isLoading={isLoading}>{balance}</TokenBalance>
        (unit ${pricing?.ccyValue})
      </TokenDetailsWrapper>
    </TokenWrapper>
  )
}
