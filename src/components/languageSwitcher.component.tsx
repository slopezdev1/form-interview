import { Fragment, useEffect } from 'react'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react'
import { Check, ChevronDown, Globe2 } from 'lucide-react'
import { useTranslation } from "react-i18next"
import { languageCookie } from '../utils/language.cookie'

const languages = [
    { id: 1, name: 'English', code: 'en', flag: '🇺🇸' },
    { id: 2, name: 'Español', code: 'es', flag: '🇪🇸' }
]

export default function LanguageSelector() {
    const { i18n } = useTranslation()

    useEffect(() => {
        const savedLanguage = languageCookie.get()
        if (savedLanguage && savedLanguage !== i18n.language) {
            i18n.changeLanguage(savedLanguage)
        }
    }, [i18n])

    const getCurrentLanguage = () => {
        return languages.find(lang => lang.code === i18n.language) || languages[0]
    }

    const handleLanguageChange = (selectedLanguage: { id: number, name: string, code: string, flag: string }) => {
        i18n.changeLanguage(selectedLanguage.code)
        languageCookie.set(selectedLanguage.code)
    }

    return (
        <div className="w-48">
            <Listbox value={getCurrentLanguage()} onChange={handleLanguageChange}>
                <div className="relative mt-1">
                    <ListboxButton className="flex items-center justify-between w-full cursor-pointer rounded-lg bg-white px-3 py-2 text-left border border-gray-200 hover:bg-gray-50">
                        <span className="flex items-center gap-2">
                            <Globe2 className="h-4 w-4 text-gray-500" />
                            <span className="block">{getCurrentLanguage().name}</span>
                        </span>
                        <span className="pointer-events-none flex items-center">
                            <ChevronDown
                                className="h-4 w-4 text-gray-400"
                            />
                        </span>
                    </ListboxButton>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <ListboxOptions className="absolute max-h-60 w-full overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black/5">
                            {languages.map((language) => (
                                <ListboxOption
                                    key={language.id}
                                    className={({ active }) =>
                                        `cursor-pointer px-2 py-3 ${active ? 'bg-primary/10 text-primary' : 'text-gray-900'
                                        }`
                                    }
                                    value={language}
                                >
                                    {({ selected }) => (
                                        <>
                                            <div className='flex gap-6 flex-row-reverse items-center justify-center'>
                                                <span className={`flex items-center gap-2 truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                    <span>{language.flag}</span>
                                                    <span>{language.name}</span>
                                                </span>
                                                {selected ? (
                                                    <span className="flex items-center text-primary">
                                                        <Check className="h-4 w-4" />
                                                    </span>
                                                ) : <span className="h-4 w-4"></span>}
                                            </div>
                                        </>
                                    )}
                                </ListboxOption>
                            ))}
                        </ListboxOptions>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}