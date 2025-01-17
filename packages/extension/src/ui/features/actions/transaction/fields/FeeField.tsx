import { L1, TextWithAmount } from "@argent/ui"
import { Box } from "@chakra-ui/react"
import { FC } from "react"

import { Field, FieldKey, LeftPaddedField } from "../../../../components/Fields"
import { useDisplayTokenAmountAndCurrencyValue } from "../../../accountTokens/useDisplayTokenAmountAndCurrencyValue"
import { useToken } from "../../../accountTokens/tokens.state"
import { Address } from "@argent/shared"

interface FeeFieldProps {
  title?: string
  feeTokenAddress: Address
  fee: string
  networkId: string
}

export const FeeField: FC<FeeFieldProps> = ({
  title = "Network fee",
  feeTokenAddress,
  fee,
  networkId,
}) => {
  const feeToken = useToken({ address: feeTokenAddress, networkId })
  const { displayAmount, displayValue } = useDisplayTokenAmountAndCurrencyValue(
    { amount: fee, tokenAddress: feeTokenAddress },
  )
  if (!feeToken) {
    return null
  }
  return (
    <Field>
      <FieldKey>{title}</FieldKey>
      <LeftPaddedField>
        <TextWithAmount amount={fee} decimals={feeToken.decimals}>
          <Box textAlign={"right"}>{displayAmount}</Box>
        </TextWithAmount>
        {displayValue && <L1 color={"neutrals.400"}>{displayValue}</L1>}
      </LeftPaddedField>
    </Field>
  )
}
