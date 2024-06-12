import React, { useEffect, useRef } from "react"

function DebounceInput({ debounce = 700, onChange: change, ...props }) {
  const timer = useRef(0)

  useEffect(() => () => clearTimeout(timer.current), [])

  return (
    <input
      onChange={(...args) => {
        clearTimeout(timer.current)

        timer.current = setTimeout(() => change?.apply(null, args), debounce)
      }}
      {...props}
    />
  )
}

export default DebounceInput
