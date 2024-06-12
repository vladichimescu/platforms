import i18n from "i18next"
import ICU from "i18next-icu"
import React, { Fragment, useEffect, useState } from "react"
import { initReactI18next, useTranslation } from "react-i18next"

import en from "./translations/en.json"
import ro from "./translations/ro.json"

const translations = {
  "en-US": {
    translation: en,
  },
  "en-GB": {
    translation: en,
  },
  "ro-RO": {
    translation: ro,
  },
}
const locales = Object.keys(translations)
const defaultLocale = "en-US"

i18n.use(initReactI18next).use(ICU).init({
  resources: translations,
  lng: defaultLocale,
  fallbackLng: "en-US",
})

function localeDisplayName(locale) {
  try {
    return new Intl.DisplayNames([locale], { type: "language" }).of(locale)
  } catch (err) {
    console.error(err)
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames#Browser_compatibility
  }
}

function StateProvider({ children }) {
  const [locale, setLocale] = useState(defaultLocale)
  const { i18n } = useTranslation()

  useEffect(() => {
    i18n.changeLanguage(locale)
  }, [i18n, locale])

  return (
    <Fragment>
      <div>
        <select
          onChange={(e) => setLocale(e.target.value)}
          defaultValue={locale}
        >
          {locales.map((lang) => (
            <option key={lang}>{lang}</option>
          ))}
        </select>
        {localeDisplayName(locale)}
      </div>

      {children}
    </Fragment>
  )
}

export const I18NextProvider = StateProvider
