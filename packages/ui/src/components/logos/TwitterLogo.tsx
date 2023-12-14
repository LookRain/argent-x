import { chakra } from "@chakra-ui/react"
import type { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M20.7477 7.45029C20.7611 7.64423 20.7611 7.83818 20.7611 8.03391C20.7611 13.998 16.2208 20.8764 7.91863 20.8764V20.8728C5.46614 20.8764 3.06459 20.1739 1 18.8494C1.35661 18.8923 1.71501 18.9137 2.0743 18.9146C4.10672 18.9164 6.08105 18.2344 7.67999 16.9787C5.74857 16.9421 4.05489 15.6827 3.46321 13.8443C4.13979 13.9748 4.83693 13.948 5.501 13.7665C3.39529 13.3411 1.88036 11.491 1.88036 9.34238C1.88036 9.32272 1.88036 9.30395 1.88036 9.28518C2.50778 9.63464 3.21028 9.82859 3.92886 9.85004C1.9456 8.52459 1.33427 5.8862 2.53191 3.82339C4.82352 6.64322 8.20463 8.35746 11.8342 8.53889C11.4704 6.97123 11.9674 5.32849 13.14 4.22648C14.9579 2.5176 17.8171 2.60519 19.5259 4.42221C20.5368 4.2229 21.5056 3.85199 22.3922 3.32646C22.0553 4.37127 21.3501 5.25878 20.4081 5.82274C21.3027 5.71728 22.1768 5.47775 23 5.1122C22.394 6.02026 21.6308 6.81124 20.7477 7.45029Z"
      fill="white"
    />
  </svg>
)
export default chakra(SvgComponent)
