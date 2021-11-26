import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import { Helmet } from "react-helmet";
import toast, { Toaster } from "react-hot-toast";
import { updateNameAction } from "../store/actions/ProfileAction";
import { PROFILE_RESET_ERRORS } from "../store/constants/ProfileConstant";
import { useHistory } from "react-router";

export default function UpdateName() {
    const {push} = useHistory()
    const [userName, setUserName] = useState('')
    const {user : {name, _id}} = useSelector((user)=> user.AuthReducer)
    // console.log(name);
    const {loading, redirect}  = useSelector(state => state.PostReducer)
    const {updateErrors } = useSelector(state => state.updateName)
    const dispatch = useDispatch()

    const updateNameMethod = (e)=>{
        e.preventDefault()
        dispatch(updateNameAction({name: userName, id: _id}))
    }
    useEffect(()=>{
        setUserName(name)
        
    },[])

    useEffect(()=>{
        if(updateErrors.length !== 0){
            updateErrors.map(error =>{
                toast.error(error.msg)
            })
            dispatch({type: PROFILE_RESET_ERRORS})
        }
    },[updateErrors])

    useEffect(()=>{
        if(redirect){
            push('/dashboard')
        }
    },[redirect])


  return (
    <div className="container mt-100">
      <Helmet>
        <title>Change your Name</title>
        <meta name="description" content="Edit Name" />
      </Helmet>
      <Toaster
        toastOptions={{
          style: {
            fontSize: "15px",
          },
        }}
      />
      <div className="row ml-minus-15 mr-minus-15">
        <div className="col-3 p-15">
          <Sidebar />
        </div>

        <div className="col-9 p-15 ">
          <div className="card">
            <h3 className="card_h3">Update Name</h3>
            <form onSubmit={updateNameMethod}>
              <div className="group">
                {/* <label htmlFor="">Name</label> */}
                <input
                  type="text"
                  name=""
                  placeholder="Name..."
                  className="group_control"
                  onChange={(e)=>setUserName(e.target.value)}
                  value={userName}
                />
              </div>
              <div className="group">
                <input
                  type="submit"
                  value="Update Name"
                  className="btn btn-default btn-block"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
