import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import { Helmet } from "react-helmet";
import toast, { Toaster } from "react-hot-toast";
import { updatePasswordAction } from "../store/actions/ProfileAction";
import Loader from './Loader'
import { useHistory } from 'react-router-dom';
import { PROFILE_RESET_ERRORS } from "../store/constants/ProfileConstant";


export default function ChangePassword() {
    const { push } = useHistory();
	const [state, setState] = useState({
		current: '',
		newPassword: '',
		userId: null,
	});
	const dispatch = useDispatch();
	const { loading, redirect } = useSelector((state) => state.PostReducer);
	const { updateErrors } = useSelector((state) => state.updateName);
	const {
		user: { _id },
	} = useSelector((state) => state.AuthReducer);

    const updatePassword = (e) => {
		e.preventDefault();
		dispatch(
			updatePasswordAction({
				current: state.current,
				newPassword: state.newPassword,
				userId: _id,
			})
		);
	};

    useEffect(() => {
		if (updateErrors.length !== 0) {
			updateErrors.map((error) => toast.error(error.msg));
			dispatch({ type: PROFILE_RESET_ERRORS });
		}
	}, [updateErrors]);
	useEffect(() => {
		if (redirect) {
			push('/dashboard');
		}
	}, [redirect]);

    return !loading ? <div className="container mt-100">
        <Helmet>
        <title>Change your Password</title>
        <meta name="description" content="Edit Password" />
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
                    <Sidebar/>
                </div>

                <div className="col-9 p-15">
                   
                        <div className="card">
                            <h3 className="card_h3">
                                Change Password
                            </h3>
                            <form onSubmit={updatePassword} >
                                <div className="group">
                                    <input
                                     type="password"
                                      name=""
                                       className="group_control"
                                        placeholder="Current Password...."
                                        onChange={(e)=> setState({...state, current: e.target.value})}
                                        value = {state.current}
                                         />
                                </div>

                                <div className="group">
                                    <input
                                     type="password"
                                      name=""
                                       className="group_control"
                                        placeholder="New Password...."
                                        onChange={(e)=> setState({...state, newPassword: e.target.value})}
                                        value = {state.newPassword}
                                         />
                                </div>
                                <div className="group">
                                <input
                                type="submit"
                                value="Update Password"
                                className="btn btn-default btn-block"
                                />
                            </div>
                  

                            </form>
                        </div>
                    
                </div>
            </div>
        </div> : <Loader/>
}
