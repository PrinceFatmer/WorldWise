import { NavLink } from "react-router-dom";
import style from "./PageNav.module.css"
import Logo from './Logo'
export default function PageNav() {
  return (
    <nav className={style.nav}>
      <Logo/>
      <ul>
        <li >
            <NavLink to="/">Homepage</NavLink>
        </li>
        <li>
            <NavLink to="/product">Product</NavLink>
        </li>
        <li>
            <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
            <NavLink to="/login">Login</NavLink>
        </li>
      </ul>
    </nav>
  )
}
