import type { SVGProps } from 'react'
import type { JSX } from 'react/jsx-runtime'

export type IconType = JSX.IntrinsicAttributes &
  SVGProps<SVGSVGElement> & { className?: string }
