import type { IconType } from '~types/icons'

const TriangleUpIcon = (props: IconType) => {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      {...props}
    >
      <path d="M4 9H11L7.5 4.5L4 9Z" />
    </svg>
  )
}

export default TriangleUpIcon
