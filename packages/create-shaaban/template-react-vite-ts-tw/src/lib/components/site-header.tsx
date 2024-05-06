import { Avatar, AvatarFallback, AvatarImage } from '~ui/avatar'

export default function SiteHeader() {
  return (
    <div>
      <Avatar className={'h-10 w-10'}>
        <AvatarImage src={'/logo.svg'} alt={'Shaaban'} />
        <AvatarFallback className={'font-normal'}>SN</AvatarFallback>
      </Avatar>
    </div>
  )
}
