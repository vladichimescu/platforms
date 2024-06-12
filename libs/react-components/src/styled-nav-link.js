import React from "react"
import { NavLink } from "react-router-dom"

const styles = {
  link: {
    textDecoration: "none",
  },
  active: {
    color: "orange",
  },
}

function StyledNavLink({ children, style, to }) {
  return (
    <NavLink
      style={({ isActive }) => ({
        ...styles.link,
        ...(isActive ? styles.active : {}),
        ...style,
      })}
      to={to}
    >
      {children}
    </NavLink>
  )
}

export default StyledNavLink
