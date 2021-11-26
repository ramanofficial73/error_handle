import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import toast, { Toaster } from 'react-hot-toast';
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import { updateImageAction } from "../store/actions/PostAction";
import { RESET_UPDATE_IMAGE_ERRORS } from "../store/constants/PostConstant";


const EditImage = (props) => {
	const { id } = useParams();
	const { push } = useHistory();
	const dispatch = useDispatch();
	const { updateImageErrors } = useSelector((state) => state.UpdateImage);
	const { redirect } = useSelector(state => state.PostReducer);
	const [state, setState] = useState({
		img: '',
		imgPreview: '',
		imgName: 'Choose image',
	});

	const fileHandle = (e) => {
		if (e.target.files.length !== 0) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setState({
					...state,
					imgPreview: reader.result,
					img: e.target.files[0],
					imgName: e.target.files[0].name,
				});
			};
			reader.readAsDataURL(e.target.files[0]);
		}
	};


  const updateImg = (e)=>{
    e.preventDefault()
    const formData = new FormData;
    formData.append('id', id)
    formData.append('img', state.img)
    dispatch(updateImageAction(formData))
  }

  useEffect(()=>{
    if(updateImageErrors.length !==0){
      updateImageErrors.map(error =>{
        toast.error(error.msg)
      })
      dispatch({type: RESET_UPDATE_IMAGE_ERRORS})
    }
  },[updateImageErrors])

  useEffect(()=>{
    if(redirect){
      props.history.push('/dashboard')
    }
  },[redirect])

  
  return (
    <div className="container mt-100">
      <Helmet>
        <title>Update Image</title>
        <meta name="description" content="Update Image" />
      </Helmet>
      <Toaster
        toastOptions={{
          style: {
            fontSize: "15px",
          },
        }}
      />
      <div className="row">
        <div className="col-6">
          <div className="card">
            <div className="card_h3">Upade Image</div>
            <form onSubmit={updateImg}>
              <div className="group">
                <label htmlFor="img" className="img_label">
                  {state.imgName}
                </label>
                <input
                  type="file"
                  name="img"
                  id="img"
                  className="group_control input_file"
                  onChange={fileHandle}
                />
              </div>
              
              <div className="group">
                  <div className="imgPreview">
                  {state.imgPreview ? <img src={state.imgPreview}  /> : ''}
                  </div>
                </div>

                <div className="group">
                  <input
                    type="submit"
                    value="Update Image"
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

export default EditImage;






























