import React from "react";
import {NavLink} from "react-router-dom";
import s from "./Navbar.module.css"

const Navbar = (props) => {
    return  <nav className={s.navbar+" navbar"}>
        <div className={s.navItem}>
            <NavLink className={s.navLink} to="/">Main</NavLink>
        </div>
        <div className={s.navItem}>
            <NavLink className={s.navLink} to="/crypto">Crypto</NavLink>
        </div>
        <div className={s.navItem}>
            <NavLink className={s.navLink} to="/investments">Investments</NavLink>
        </div>
    </nav>
}

export default Navbar