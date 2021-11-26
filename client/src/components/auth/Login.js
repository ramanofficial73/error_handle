import React from 'react'
import { useState ,useEffect } from 'react'
import { Helmet } from 'react-helmet'
import BgImg from './BgImg'
import {useSelector, useDispatch} from 'react-redux'
import { postLogin } from '../../store/actions/AuthActions'
import toast, { Toaster } from 'react-hot-toast';



export default function Login() {
    const  dispatch = useDispatch()
  const { loading, loginError, user } = useSelector((state) => state.AuthReducer)

    const [state, setState] = useState({
        email:'',
        password:''
    })

    const handleInput=(e)=>{
        setState({
            ...state,
            [e.target.name] : e.target.value
        })
    }

    const userLogin = (e) =>{
        e.preventDefault()
        // console.log(state)
        dispatch(postLogin(state))
    }
    useEffect(() =>{ 
        if(loginError.length>0) {
            
          loginError.map((error) => 
          toast.error(error.msg)
          )
        }
      }, [loginError,user])
     
    return (
        <>
        
            <Helmet>
                <title>User Login</title>
                <meta name="description" content="User Login form" />
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
                            <form onSubmit={userLogin} >

                                <div className="group">
                                    <h2 className="form-heading">Login</h2>
                                </div>
                                <div className="group">
                                    <input type="email" name="email" value={state.email} onChange={handleInput} className="group_control" placeholder="Enter your Email" />
                                </div>

                                <div className="group">
                                    <input type="password" name="password" value={state.password} onChange={handleInput} className="group_control" placeholder="Create yout Paste" />
                                </div>

                                <div className="group">
                                    <input type="submit" className="btn btn-default btn-block" value={loading ? ' ...' : 'Login' } />
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
