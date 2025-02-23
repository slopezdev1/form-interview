import Cookies from "js-cookie"

const COOKIE_NAME = "user-language"
const COOKIE_DURATION = 7

export const languageCookie = {
  get: () => Cookies.get(COOKIE_NAME),

  set: (language: string) => {
    Cookies.set(COOKIE_NAME, language, {
      expires: COOKIE_DURATION,
      path: "/",
      sameSite: "strict",
    })
  },

  remove: () => Cookies.remove(COOKIE_NAME),

  getInitialLanguage: () => {
    const cookieLanguage = Cookies.get(COOKIE_NAME)
    if (cookieLanguage) return cookieLanguage

    const browserLanguage = navigator.language.split("-")[0]
    return ["es", "en"].includes(browserLanguage) ? browserLanguage : "es"
  },
}

