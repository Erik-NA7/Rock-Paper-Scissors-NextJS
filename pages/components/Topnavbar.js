import Link from "next/link";
import cookie from "js-cookie";
import User from "../../controller/UserController";
import { useRouter } from "next/router";
import useSWR from "swr";
import { FaBars, FaWindowClose } from "react-icons/fa";
import style from "./Topnavbar.module.css";
import { useState } from "react";

const getData = (url) => cookie.get(url)

function Navbar() {
  const { data }  = useSWR("profile", getData)
  const email = cookie.get("email");
  const user = email || data ? true : null;
  const router = useRouter();

  const [ navIsMobile, setNavIsMobile ] = useState(false)
  
  const navToggle = () => {
    setNavIsMobile(!navIsMobile)
  }  

  const handleLogout = async () => {
    await User.logOut().then(router.reload())
  }
  
  let navMenuStyle = navIsMobile ? style["navmenu-mobile"] : style["nav-menu"]
  let navButtonStyle = navIsMobile ? style["nav-button-container-mobile"] : style["nav-button-container"] 

  const NavButton = () => {
    return (
      <div className={navButtonStyle}>
      { user ? ( 
        <button className={style["nav-button"]} onClick={handleLogout}>Logout</button>   
      ) : (
      <>
        <Link href="/signup" passHref>
          <button className={style["nav-button"]}>Sign Up</button>
        </Link>
        <Link href="/login" passHref>
          <button className={style["nav-button"]}>Login</button>
        </Link>
      </>              
      )}  
    </div>
    )
  }

  return (
    <nav className={style.navbar}>
      <div className={style["nav-container"]}>
        <div className={style["nav-brand"]}></div>
        <div className={navMenuStyle}>
          <li className={style["navmenu-item"]}>
            <Link href="/home" passHref>Home</Link>
          </li>
          <li className={style["navmenu-item"]}>
            <a>Work</a>
          </li>
          <li className={style["navmenu-item"]}>
            <a>Contact</a>
          </li>
          <li className={style["navmenu-item"]}>
            <a>About</a>
          </li>
          <NavButton/>
        </div>
        

        {navIsMobile ?
        <FaWindowClose className={style["toggler-close"]} onClick={navToggle}/> :
        <FaBars className={style["nav-toggler"]} onClick={navToggle}/>
        }
      </div>
    </nav>
  );
}

export default Navbar;