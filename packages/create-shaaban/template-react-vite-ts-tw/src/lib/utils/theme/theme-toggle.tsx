import MoonIcon from '~icons/moon'
import SunIcon from '~icons/sun'
import { Button } from '~ui/button'
import { useTheme } from '~utils/theme/theme-provider'

export function ThemeToggle() {
  const { setTheme } = useTheme()

  return (
    <Button variant="outline" size="icon">
      <SunIcon
        onClick={() => setTheme('dark')}
        className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      />
      <MoonIcon
        onClick={() => setTheme('light')}
        className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
