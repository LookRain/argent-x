import { accountsEqual } from "./../../utils/accountsEqual"
import { IAccountService } from "../../account/service/interface"
import { ITokenService } from "../../token/__new/service/interface"
import { TokenWithBalance } from "../../token/__new/types/tokenBalance.model"
import { BaseWalletAccount, WalletAccount } from "../../wallet.model"
import { IFeeTokenService } from "./interface"
import { INetworkService } from "../../network/service/interface"
import { Address, isEqualAddress } from "@argent/shared"
import {
  classHashSupportsTxV3,
  feeTokenNeedsTxV3Support,
} from "../../network/txv3"
import { equalToken } from "../../token/__new/utils"
import { FEE_TOKEN_PREFERENCE_BY_SYMBOL } from "../constants"
import { FeeTokenPreference } from "../types/preference.model"
import { pickBestFeeToken } from "../utils"
import { IObjectStore } from "../../storage/__new/interface"

export class FeeTokenService implements IFeeTokenService {
  constructor(
    private readonly tokenService: ITokenService,
    private readonly accountService: IAccountService,
    private readonly networkService: INetworkService,
    private readonly feeTokenPreferenceStore: IObjectStore<FeeTokenPreference>,
  ) {}

  async getFeeTokens(
    account: BaseWalletAccount & Pick<WalletAccount, "classHash">,
  ): Promise<TokenWithBalance[]> {
    const tokens = await this.tokenService.getTokens()
    const classHash =
      account.classHash ??
      (await this.accountService
        .get((x) => accountsEqual(x, account))
        .then(([a]) => a.classHash))
    const network = await this.networkService.getById(account.networkId)
    const networkFeeTokens = tokens.filter((token) =>
      network.possibleFeeTokenAddresses.some((ft) =>
        isEqualAddress(ft, token.address),
      ),
    )

    const accountFeeTokens = networkFeeTokens.filter((token) => {
      if (feeTokenNeedsTxV3Support(token)) {
        return classHashSupportsTxV3(classHash)
      }
      return true
    })
    const feeTokenBalances = await this.tokenService.getTokenBalancesForAccount(
      account,
      accountFeeTokens,
    )
    const feeTokensWithBalances: TokenWithBalance[] = accountFeeTokens.map(
      (token) => {
        const tokenBalance = feeTokenBalances.find((tb) =>
          equalToken(tb, token),
        ) ?? {
          balance: "0",
          account: { address: account.address, networkId: account.networkId },
        }
        return {
          ...token,
          ...tokenBalance,
        }
      },
    )
    // sort by fee token preference defined in FEE_TOKEN_PREFERENCE_BY_SYMBOL
    return feeTokensWithBalances.sort((a, b) => {
      const [aIndex, bIndex] = [a, b].map((token) =>
        FEE_TOKEN_PREFERENCE_BY_SYMBOL.indexOf(token.symbol),
      )
      return aIndex === -1 ? 1 : bIndex === -1 ? -1 : aIndex - bIndex
    })
  }

  async getBestFeeToken(
    account: BaseWalletAccount & Pick<WalletAccount, "classHash">,
  ): Promise<TokenWithBalance> {
    const possibleFeeTokenWithBalances = await this.getFeeTokens(account)
    const { prefer: preferredFeeToken } = await this.getFeeTokenPreference()

    return pickBestFeeToken(possibleFeeTokenWithBalances, {
      prefer: [preferredFeeToken],
    })
  }

  async getFeeTokenPreference(): Promise<FeeTokenPreference> {
    return await this.feeTokenPreferenceStore.get()
  }

  async preferFeeToken(feeTokenAddress: Address): Promise<void> {
    await this.feeTokenPreferenceStore.set({
      prefer: feeTokenAddress,
    })
  }
}
