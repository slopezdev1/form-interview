//react
import { createRoot } from 'react-dom/client'

//resources
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { I18nextProvider } from "react-i18next"
import i18n from './language/i18n.ts'

//components
import App from './App.tsx'

//css
import './css/global.css'
import 'leaflet/dist/leaflet.css'

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
