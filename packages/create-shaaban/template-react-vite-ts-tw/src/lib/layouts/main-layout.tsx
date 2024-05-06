import type { PropsWithChildren } from 'react'
import SiteHeader from '~components/site-header'

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className={'m-auto flex w-full max-w-screen-2xl flex-col'}>
      <SiteHeader />
      <div
        className={'container flex h-full min-h-full w-full flex-col gap-7 p-12 pt-14'}
      >
        {children}
      </div>
    </div>
  )
}
