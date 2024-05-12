const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './src/theme.config.tsx',
  staticImage: true,
  defaultShowCopyCode: true
  // latex: true,
  // flexsearch: {
  //   codeblock: false
  // }
})

module.exports = withNextra({
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  distDir: 'out',
  output: 'export',
  images: {
    unoptimized: true
  }
})
