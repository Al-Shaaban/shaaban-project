import { usePathname } from 'next/navigation'
import { useRouter } from 'next/router'
import { useConfig } from 'nextra-theme-docs'

import { Logo as ShaabanLogo } from './components/icons'
import { Pre } from './components/Pre'

const Head = () => {
  const { asPath, defaultLocale, locale } = useRouter()
  const { frontMatter } = useConfig()
  const url = `https://developer.alshaaban.com${defaultLocale === locale ? asPath : `/${locale}${asPath}`}`

  return (
    <>
      <meta property="og:url" content={url} />
      <meta property="og:title" content={frontMatter.title || 'Shaaban Developer'} />
      <meta
        property="og:description"
        content={frontMatter.description || 'Docs for Shaaban packages and projects.'}
      />
      {/* <meta name="twitter:image" content="https://developer.alshaaban.com/og.jpg" /> */}
    </>
  )
}

export const Logo = () => {
  return (
    <span className={'flex flex-row items-start gap-1 text-2xl font-bold'}>
      <ShaabanLogo />
      <span className={'hover:cursor-pointer'}>Developer</span>
    </span>
  )
}

/* eslint sort-keys: error */
/**
 * @type {import('nextra-theme-docs').DocsThemeConfig}
 */
const config = {
  darkMode: true,
  editLink: { component: () => null },
  feedback: { content: () => null },
  footer: { component: () => null },
  components: { pre: Pre },
  head: Head,
  logo: Logo,
  navigation: false,
  nextThemes: { defaultTheme: 'light' },
  primaryHue: 36, // orange: 36, blue: 216
  project: {
    link: 'https://github.com/Al-Shaaban/shaaban-project'
  },
  useNextSeoProps() {
    const currentUrl = usePathname()
    return {
      additionalLinkTags: [
        {
          href: '/apple-icon-icon.png',
          rel: 'apple-touch-icon',
          sizes: '180x180'
        },
        {
          href: '/android-icon-192x192.png',
          rel: 'icon',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          href: '/favicon-32x32.png',
          rel: 'icon',
          sizes: '32x32',
          type: 'image/png'
        },
        {
          href: '/favicon-16x16.png',
          rel: 'icon',
          sizes: '16x16',
          type: 'image/png'
        }
      ],
      additionalMetaTags: [
        { content: 'en', httpEquiv: 'Content-Language' },
        { content: 'Shaaban Developer', name: 'apple-mobile-web-app-title' }
      ],
      description: 'Docs for Shaaban packages and projects.',
      openGraph: {
        // images: [{ url: 'https://developer.alshaaban.com/og.jpg?random=aaaaaaaaaaaaa' }]
      },
      canonical: `https://developer.alshaaban.com${currentUrl}`,
      noindex: process.env.NO_INDEX === 'true',
      titleTemplate: '%s | Shaaban Developer',
      twitter: {
        cardType: 'summary_large_image',
        site: 'https://developer.alshaaban.com'
      }
    }
  }
}

export default config
