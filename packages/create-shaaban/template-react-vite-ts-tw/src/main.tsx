import '~styles/globals.css'

import React from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '~utils/functions/misc.functions'
import { ThemeProvider } from '~utils/theme/theme-provider.tsx'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider defaultTheme={'system'} storageKey={'vite-ui-theme'}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
)
