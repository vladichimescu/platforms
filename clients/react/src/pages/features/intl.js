import React, { useState } from "react"
import {
  FormattedMessage,
  FormattedNumber,
  FormattedNumberParts,
  FormattedRelativeTime,
} from "react-intl"

import { IntlProvider } from "@platforms/react-components"
import { GENDERS } from "@platforms/utils"

function Intl() {
  const [date] = useState(Date.now())
  const [money, setMoney] = useState(3)
  const [discount, setDiscount] = useState(1)
  const [gender, setGender] = useState(GENDERS.MALE)
  const [genders] = useState(Object.values(GENDERS))

  return (
    <IntlProvider>
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

      <FormattedRelativeTime numeric="auto" updateIntervalInSeconds={5} />
      <br />

      <FormattedMessage id="date" values={{ d: date }} />
      <br />

      <FormattedMessage id="time" values={{ t: date }} />
      <br />

      {/* eslint-disable-next-line */}
      <FormattedNumberParts value={money} style="currency" currency="USD">
        {(parts) =>
          parts.map(({ type, value }, i) => {
            switch (type) {
              case "currency":
                return <i key={i}>{value}</i>
              case "integer":
              case "group":
                return <b key={i}>{value}</b>
              case "fraction":
              case "decimal":
                return <small key={i}>{value}</small>
              default:
                return value
            }
          })
        }
      </FormattedNumberParts>
      <br />

      <FormattedMessage id="gradeStatus" values={{ grade: money }} />
      <br />

      <FormattedMessage id="cartStatus" values={{ items: money }} />
      <br />

      <FormattedMessage id="responseStatus" values={{ gender }} />
      <br />

      <FormattedMessage
        id="discount"
        values={{
          fullPrice: (
            <FormattedNumber
              value={money}
              // eslint-disable-next-line
              style="currency"
              currency={"USD"}
            />
          ),
          discount: (
            <FormattedNumber
              value={discount}
              // eslint-disable-next-line
              style="currency"
              currency={"USD"}
            />
          ),
          price: (
            <FormattedNumber
              value={money - discount}
              // eslint-disable-next-line
              style="currency"
              currency={"USD"}
            />
          ),
          pct: (
            <FormattedNumber
              value={discount / money}
              // eslint-disable-next-line
              style="percent"
            />
          ),
          small: (d) => <small>{d}</small>,
          strike: (d) => <strike>{d}</strike>,
          b: (d) => <b>{d}</b>,
          red: (d) => <span style={{ color: "red" }}>{d}</span>,
        }}
      />
      <br />

      <FormattedMessage id="noMagic" />
    </IntlProvider>
  )
}

export default Intl
