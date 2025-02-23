import { Select } from '@headlessui/react'
import { ChangeEvent, useEffect } from 'react'
import { useTranslation } from "react-i18next"
import { languageCookie } from '../utils/language.cookie'

function LanguageSwticher() {
    const { i18n, t } = useTranslation()

    useEffect(() => {
        const savedLanguage = languageCookie.get()
        if (savedLanguage && savedLanguage !== i18n.language) {
            i18n.changeLanguage(savedLanguage)
        }
    }, [i18n])
    
    const toggleLanguage = (event: ChangeEvent<HTMLSelectElement>) => {
        i18n.changeLanguage(event.target.value)
        languageCookie.set(event.target.value)
    }

    return (
        <Select name="language" aria-label={t("switchLanguage")} onChange={toggleLanguage}>
            <option value="en">{t("optionEn")}</option>
            <option value="es">{t("optionEs")}</option>
        </Select>
    )
}

export default LanguageSwticher