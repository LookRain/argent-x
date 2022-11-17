import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    {...props}
  >
    <path
      d="M12.271 1a11.268 11.268 0 0 0-3.493 21.982h.272a.938.938 0 0 0 .996-.996v-1.22a.47.47 0 0 0-.188-.31.468.468 0 0 0-.395-.094c-2.516.545-3.051-1.033-3.089-1.136a4.357 4.357 0 0 0-1.615-2.057 1.084 1.084 0 0 0-.14-.103.592.592 0 0 1 .356-.066 1.38 1.38 0 0 1 1.08.827 2.817 2.817 0 0 0 3.756 1.089.47.47 0 0 0 .272-.338c.036-.434.222-.843.526-1.155a.47.47 0 0 0-.254-.817c-2.225-.254-4.497-1.033-4.497-4.873-.019-.965.334-1.9.986-2.61a.47.47 0 0 0 .084-.498 3.305 3.305 0 0 1 .01-2.254 5.202 5.202 0 0 1 2.366 1.08.46.46 0 0 0 .394.066 9.962 9.962 0 0 1 2.573-.348c.872 0 1.74.118 2.582.348a.46.46 0 0 0 .385-.066 5.25 5.25 0 0 1 2.367-1.08 3.351 3.351 0 0 1 0 2.235.47.47 0 0 0 .084.497c.645.705.997 1.628.986 2.583 0 3.84-2.282 4.61-4.517 4.864a.469.469 0 0 0-.253.826 2.064 2.064 0 0 1 .573 1.634v2.986a.997.997 0 0 0 .338.78 1.128 1.128 0 0 0 .995.178A11.268 11.268 0 0 0 12.271 1Z"
      fill="#fff"
    />
  </svg>
)
export default SvgComponent