import React from 'react'
import classes from './Header.module.scss'
import Logo from '../../images/logo.svg'
const Header = () => {
  return (
    <header className={classes.header}>
        <img src={Logo} alt='Logo of Splitter' className={classes.header__logo}/>
    </header>
  )
}

export default Header