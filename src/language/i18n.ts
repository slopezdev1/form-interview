import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import { enTranslations } from "./translations/english.translation"
import { esTranslations } from "./translations/spanish.translation"
import { languageCookie } from "../utils/language.cookie"

const resources = {
    en: {
        translation: enTranslations
    },
    es: {
        translation: esTranslations
    },
}
i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: "es",
        detection: {
            order: ["cookie", "navigator"],
            lookupCookie: "user-language",
            caches: ["cookie"],
        },
        interpolation: {
            escapeValue: false,
        },
    })

const initialLanguage = languageCookie.getInitialLanguage()
i18n.changeLanguage(initialLanguage)
languageCookie.set(initialLanguage)

export default i18n

