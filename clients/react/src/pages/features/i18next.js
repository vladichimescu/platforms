import React, { Fragment, useState } from "react"
import { Trans, useTranslation } from "react-i18next"

import { I18NextProvider } from "@platforms/react-components"
import { GENDERS } from "@platforms/utils"

function I18Next() {
  const [date] = useState(Date.now())
  const [money, setMoney] = useState(3)
  const [discount, setDiscount] = useState(1)
  const [gender, setGender] = useState(GENDERS.MALE)
  const [genders] = useState(Object.values(GENDERS))

  const { t, i18n } = useTranslation()

  return (
    <I18NextProvider>
      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <input
          type="number"
          defaultValue={money}
          onChange={(e) => setMoney(e.target.value)}
        />
        <br />

        <input
          type="number"
          defaultValue={discount}
          onChange={(e) => setDiscount(e.target.value)}
        />
        <br />

        <select
          onChange={(e) => setGender(e.target.value)}
          defaultValue={gender}
        >
          {genders.map((g) => (
            <option key={g}>{g}</option>
          ))}
        </select>
      </div>

      {t("date", { d: date })}
      <br />

      {t("time", { t: date })}
      <br />

      {new Intl.NumberFormat(i18n.language, {
        style: "currency",
        currency: "USD",
      })
        .formatToParts(money)
        .reduce(
          (acc, { type, value }) => {
            let newEl
            switch (type) {
              case "currency":
                newEl = <i>{value}</i>
                break
              case "integer":
              case "group":
                newEl = <b>{value}</b>
                break
              case "fraction":
              case "decimal":
                newEl = <small>{value}</small>
                break
              default:
                newEl = value
            }

            return (
              <Fragment>
                {acc}
                {newEl}
              </Fragment>
            )
          },
          <Fragment />
        )}
      <br />

      <Trans i18nKey="gradeStatus" values={{ grade: money }} />
      <br />

      <Trans i18nKey="cartStatus" values={{ items: money }} />
      <br />

      <Trans i18nKey="responseStatus" values={{ gender }} />
      <br />

      <Trans
        i18nKey="discount"
        values={{
          fullPrice: new Intl.NumberFormat(i18n.language, {
            style: "currency",
            currency: "USD",
          }).format(money),
          discount: new Intl.NumberFormat(i18n.language, {
            style: "currency",
            currency: "USD",
          }).format(discount),
          price: new Intl.NumberFormat(i18n.language, {
            style: "currency",
            currency: "USD",
          }).format(money - discount),
          pct: new Intl.NumberFormat(i18n.language, {
            style: "percent",
          }).format(discount / money),
        }}
        components={{
          small: <small></small>,
          strike: <strike></strike>,
          b: <b></b>,
          red: <span style={{ color: "red" }}></span>,
        }}
      />
      <br />

      <Trans i18nKey="noMagic" />
    </I18NextProvider>
  )
}

export default I18Next
