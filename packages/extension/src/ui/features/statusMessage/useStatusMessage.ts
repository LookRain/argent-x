import { useMemo } from "react"

import {
  ARGENT_X_STATUS_ENABLED,
  ARGENT_X_STATUS_URL,
} from "../../../shared/api/constants"
import { statusMessageStore } from "../../../shared/statusMessage/storage"
import { IStatusMessage } from "../../../shared/statusMessage/types"
import { useKeyValueStorage } from "../../hooks/useStorage"
import { argentApiFetcher } from "../../services/argentApiFetcher"
import {
  useConditionallyEnabledSWR,
  withPolling,
} from "../../services/swr.service"
import { getMessageForVersion } from "./statusMessageVisibility"
import { RefreshInterval } from "../../../shared/config"

export const useLastDismissedMessageId = () =>
  useKeyValueStorage(statusMessageStore, "lastDismissedMessageId")

export const useLastFullScreenMessageClosedId = () =>
  useKeyValueStorage(statusMessageStore, "lastFullScreenMessageClosedId")

export const useStatusMessageEnabled = () => {
  return ARGENT_X_STATUS_ENABLED
}

export const useStatusMessage = () => {
  const statusMessageEnabled = useStatusMessageEnabled()
  const { data } = useConditionallyEnabledSWR<
    IStatusMessage | IStatusMessage[]
  >(
    statusMessageEnabled,
    ARGENT_X_STATUS_URL,
    argentApiFetcher,
    withPolling(RefreshInterval.SLOW * 1000) /** 5 minutes */,
  )
  const statusMessage = useMemo(() => {
    return getMessageForVersion({ statusMessage: data })
  }, [data])
  return statusMessage
}

// Uncomment the functions below to test messages locally

// import statusMessages from "../../../../../storybook/src/features/statusMessage/__fixtures__/status-messages.json"

// export const useStatusMessageEnabled = () => {
//   return true
// }

// export const useStatusMessage = () => {
//   return statusMessages.upgrade as IStatusMessage
//   return statusMessages.danger as IStatusMessage
//   return statusMessages.warn as IStatusMessage
//   return statusMessages.info as IStatusMessage
// }
