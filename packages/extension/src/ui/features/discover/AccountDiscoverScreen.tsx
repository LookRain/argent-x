import { CellStack, Empty, H4, SpacerCell, icons } from "@argent/ui"
import { Center } from "@chakra-ui/react"
import { isEmpty } from "lodash-es"
import { FC } from "react"

import { NewsItem } from "../../../shared/discover/schema"
import { NewsItemCardCollection } from "./ui/NewsItemCardCollection"

const { NetworkIcon } = icons

interface AccountDiscoverScreenProps {
  newsItems?: NewsItem[]
}

export const AccountDiscoverScreen: FC<AccountDiscoverScreenProps> = ({
  newsItems,
}) => {
  const hasNewsItems = newsItems && !isEmpty(newsItems)
  return (
    <CellStack flex={1}>
      <Center>
        <H4>Discover</H4>
      </Center>
      <SpacerCell />
      {hasNewsItems ? (
        <NewsItemCardCollection newsItems={newsItems} />
      ) : (
        <Empty
          icon={<NetworkIcon />}
          title={
            <>
              No updates.
              <br />
              Check back soon 👀
            </>
          }
        />
      )}
    </CellStack>
  )
}
