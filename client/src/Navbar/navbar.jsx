import React from "react"
import "./navbar.scss"
import { NavLink, useHistory } from "react-router-dom";
import Context from "../context";

const Navbar = () => {
    const history = useHistory()
    const auth = React.useContext(Context)
    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push("/")
    }
    return (<nav>
            <div className="nav-wrapper light-blue accent-3">
                <NavLink to="/" className="logo">
                    <img src="pepega.png" alt="icon" className="circle"/>
                </NavLink>
                <ul id="nav-mobile" className="right">
                    <li><a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"> ??? </a></li>
                    <li><NavLink to={"/profile"}>Profile</NavLink></li>
                    <li><NavLink to={"/cart"}>Cart</NavLink></li>
                    <li><a onClick={logoutHandler}> Logout</a></li>
                </ul>
            </div>
        </nav>)
}

export default Navbar;
