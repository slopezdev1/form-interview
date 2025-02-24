import type { ReactNode } from "react"

//Components
import LanguageSelector from "../components/languageSelector.component"

//Hook
import { useTranslation } from "react-i18next"

interface LayoutProps {
    children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
    const { t } = useTranslation()

    return (
        <div className="min-h-screen flex flex-col">
            <header className="fixed top-0 left-0 right-0 h-16 border-b bg-background/80 backdrop-blur-sm z-50">
                <div className="container h-full mx-auto px-4 flex items-center justify-between">
                    <h1 className="text-xl font-semibold">{t("titleHeader")}</h1>
                    <LanguageSelector />
                </div>
            </header>

            <main className="flex-1 bg-gradient-to-br from-orange-50">{children}</main>

            <footer className="fixed bottom-0 left-0 right-0 h-16 border-t bg-background/80 backdrop-blur-sm">
                <div className="container h-full mx-auto px-4 flex items-center justify-center">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} {t("descriptionFooter")}
                    </p>
                </div>
            </footer>
        </div>
    )
}
