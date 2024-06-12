import React from "react"

import classes from "./styled-nav-bar.module.css"

function StyledNavBar({ children }) {
  return <div className={classes.navs}>{children}</div>
}

export default StyledNavBar
