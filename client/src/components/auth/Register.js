import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import BgImg from "./BgImg";
// import {useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { postRegister } from "../../store/actions/AuthActions";
import toast, { Toaster } from 'react-hot-toast';



export default function Register(props) {
  const [state, setState] = useState({
    name: '',
    email: '',
    password: ''
  })
  // const navigate=useNavigate();

  const { loading, registerError, user } = useSelector((state) => state.AuthReducer)
  const dispatch = useDispatch()

  const handleInputs = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  


  const userRegistration = async (e) => {
    e.preventDefault()
    // console.log(state)
    dispatch(postRegister(state))
  }
  useEffect(() =>{ 
    //  console.log("register",  registerError)
    if (registerError.length > 0) {
      registerError.map((error) => 
      toast.error(error.msg)
      )
    }
  }, [registerError, user])

 

 
  return (
    <>
      <Helmet>
        <title>User Register</title>
        <meta name="description" content="User Register form" />
      </Helmet>
      <div className="row mt-80">
        <div className="col-8">
          <BgImg />
          <Toaster
            toastOptions={{
              style: {
                fontSize:"15px"
              },
            }} />
        </div>
        <div className="col-4">
          <div className="account">
            <div className="account_section">
              <form action="" onSubmit={userRegistration}>
                <div className="group">
                  <h2 className="form-heading">You have a Create Account</h2>
                </div>
                <div className="group">
                  <input
                    type="text"
                    name="name"
                    className="group_control"
                    placeholder="Enter Your Name"
                    value={state.name}
                    onChange={handleInputs}

                  />
                </div>

                <div className="group">
                  <input
                    type="email"
                    name="email"
                    className="group_control"
                    placeholder="Enter your Email"
                    value={state.email}
                    onChange={handleInputs}


                  />
                </div>

                <div className="group">
                  <input
                    type="password"
                    name="password"
                    className="group_control"
                    placeholder="Create yout Password"
                    value={state.password}
                    onChange={handleInputs}
                  />
                </div>

                <div className="group">
                  <input

                    type="submit"
                    // name="password"
                    className="btn btn-default btn-block"
                    value={loading ? '...' : 'Register'}

                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
