const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './src/theme.config.tsx',
  staticImage: true
  // latex: true,
  // flexsearch: {
  //   codeblock: false
  // }
})

module.exports = withNextra({
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true }
})
