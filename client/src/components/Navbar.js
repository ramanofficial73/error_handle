import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LOGOUT } from "../store/constants/UserConstant";

export default function Navbar() {
  const { user } = useSelector(state => state.AuthReducer)
  const dispatch = useDispatch()

  const logout = () => {
    localStorage.removeItem('myToken')
    dispatch({ type: LOGOUT })
  }
  const Links = user ?
    <div className="navbar_right">
      <li>
        <Link to="/create" >Create Post</Link>
      </li>
      <li>
        <Link to="dashboard/1" >{user.name}</Link>
      </li>
      <li>
        <span onClick={logout}>LogOut</span>
        {/* <Link to="/logout">Logout</Link> */}
      </li>

    </div> : <div className="navbar_right">

      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/register">SignUp</Link>
      </li>

    </div>
  return (
    <>
      <nav className="navbar">
        <div className="container">
          <div className="navbar_row">
            <div className="navbar_left">
              {/* <Router> */}
              <Link to="/">
                <img src="/imges/logo.png" alt="" />
              </Link>
              {/* </Router> */}
            </div>
            {Links}
          </div>
        </div>
      </nav>
    </>
  );
}
