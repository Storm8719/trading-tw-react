import React from "react";
import {NavLink} from "react-router-dom";

const LinksNav = (props) => {
    return  <nav className="nav-main">
        <div>
            <NavLink to="/">Main</NavLink>
        </div>
        <div>
            <NavLink to="/crypto">Crypto</NavLink>
        </div>
        <div>
            <NavLink to="/investments">Investments</NavLink>
        </div>
    </nav>
}

export default LinksNav