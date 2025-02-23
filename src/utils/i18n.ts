import i18n from "i18next"
import { initReactI18next } from "react-i18next"

// English translations
const enTranslations = {
  welcome: "Welcome to our website",
  about: "About us",
  contact: "Contact",
  switchLanguage: "Switch to Spanish",
  description: "This is a multilingual website example",
}

// Spanish translations
const esTranslations = {
  welcome: "Bienvenido a nuestro sitio web",
  about: "Sobre nosotros",
  contact: "Contacto",
  switchLanguage: "Cambiar a Inglés",
  description: "Este es un ejemplo de sitio web multilingüe",
}

const savedLanguage = localStorage.getItem("language") || "en"

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslations,
    },
    es: {
      translation: esTranslations,
    },
  },
  lng: savedLanguage, // default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
})

i18n.on("languageChanged", (lng) => {
  localStorage.setItem("language", lng)
})

export default i18n

