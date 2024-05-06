import { siteConfig } from '~constants/site-config'
import GithubIcon from '~icons/github'
import { Avatar, AvatarFallback, AvatarImage } from '~ui/avatar'
import { buttonVariants } from '~ui/button'
import { cn } from '~utils/functions/misc.functions'
import { Link } from 'react-router-dom'

export default function SiteHeader() {
  return (
    <header
      className={
        'sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'
      }
    >
      <div className={'container flex h-14 max-w-screen-2xl items-center'}>
        <Link to={'/'} className={'mr-6 flex items-center space-x-2'}>
          <Avatar className={'h-10 w-10'}>
            <AvatarImage src={'/logo.svg'} alt={'Shaaban'} />
            <AvatarFallback className={'font-normal'}>SN</AvatarFallback>
          </Avatar>
          <span className={'hidden font-bold sm:inline-block'}>
            {siteConfig.siteName}
          </span>
        </Link>

        <div
          className={'flex flex-1 items-center justify-between space-x-2 md:justify-end'}
        >
          <nav className={'flex items-center'}>
            <Link
              to={'https://github.com/Al-Shaaban/shaaban-project'}
              target={'_blank'}
              className={cn(buttonVariants({ variant: 'outline', size: 'icon' }))}
            >
              <GithubIcon className={'h-6 w-6'} />
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
