import { createRoot } from 'react-dom/client'
import './css/global.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import i18n from './language/i18n.ts'
import { I18nextProvider } from "react-i18next";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false
        }
    }
})

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={i18n}>
            <App />
        </I18nextProvider>
    </QueryClientProvider>
)
