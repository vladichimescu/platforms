import React, { useState } from "react"
import {
  FormattedDisplayName,
  IntlProvider as ReactIntlProvider,
} from "react-intl"

import en from "./translations/en.json"
import ro from "./translations/ro.json"

const translations = {
  "en-US": en,
  "en-GB": en,
  "ro-RO": ro,
}
const locales = Object.keys(translations)
const defaultLocale = "en-US"

function StateProvider({ children }) {
  const [locale, setLocale] = useState(defaultLocale)

  const messages = {
    ...translations[defaultLocale],
    ...translations[locale],
  }

  return (
    <ReactIntlProvider locale={locale} messages={messages}>
      <div>
        <select
          onChange={(e) => setLocale(e.target.value)}
          defaultValue={locale}
        >
          {locales.map((lang) => (
            <option key={lang}>{lang}</option>
          ))}
        </select>
        <FormattedDisplayName type="language" value={locale} />
      </div>

      {children}
    </ReactIntlProvider>
  )
}

export const IntlProvider = StateProvider
