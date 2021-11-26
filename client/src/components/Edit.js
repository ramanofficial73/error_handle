import React,{useState, useEffect} from "react";
import "./EditEdit.css";
import { Link, useParams , useHistory} from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { useDispatch, useSelector} from "react-redux";
import { fetchPost, updateAction } from "../store/actions/PostAction";
import { POST_RESET, RESET_UPDATE_ERRORS } from "../store/constants/PostConstant";
import { Helmet } from "react-helmet";
import toast, { Toaster } from 'react-hot-toast';
import Loader from "./Loader";

export default function Edit() {
  const { id } = useParams();
  const {push} = useHistory()
 const [value, setValue] = useState('')
 const [state, setState] = useState({
     title: '',
     description: ''
 })

 const dispatch = useDispatch()
 const {loading, redirect} = useSelector(state => state.PostReducer)
 const {post, postStatus} = useSelector(state => state.FetchPost)
 const {editErrors} = useSelector(state => state.UpdatePost)
 useEffect(()=>{
     if(postStatus){
         setState({
             title: post.title,
             description : post.description
         })
         setValue(post.body)
         dispatch({type : POST_RESET})
     }
     else{
         dispatch(fetchPost(id))
     }
 },[post])

const updatePost = (e)=>{
  e.preventDefault()
  dispatch(updateAction({
    title: state.title,
    body: value,
    description: state.description,
    id: post._id,
  }))
  console.log(id)
}

useEffect(()=>{
  if(editErrors.length !== 0 ){
    editErrors.map((error) =>{
      toast.error(error.msg)
    })
    dispatch({type: RESET_UPDATE_ERRORS})
  }
},[editErrors])

useEffect(()=>{
  if(redirect){
    push('/dashboard')
  }
},[redirect])

  return !loading ? 
  <div className="mt-100">
  <Helmet>
    <title>Edit Post</title>
    <meta name="description" content="Edit Post" />
  </Helmet>
  <Toaster
        toastOptions={{
          style: {
            fontSize:"15px"
          },
        }} />

  <div className="container">
    <div className="row">
      <div className="col-6">
        <div className="card">
          <h3 className="card_h3">Edit Post</h3>
          <form onSubmit={updatePost}>

          
            <div className="group">
              <label htmlFor="title">Post Title</label>
              <input
                type="text"
                name="title"
                id="title"
                value={state.title}
                onChange={(e)=> setState({...state, title: e.target.value})}
                className="group_control"
                placeholder="Edit your  post title"
              />
            </div>

            <div className="group">
              <label htmlFor="body">Post Body</label>
              <ReactQuill
                theme="snow"
                id="body"
                placeholder="Post Body..."
                value={value}
                onChange={setValue}
              />
            </div>

            <div className="group">
              <label htmlFor="description">Meta Description</label>
              <textarea
                name="description"
                className="group_control"
                id="description"
                defaultValue={state.description}
                onChange={(e)=>setState({...state, description: e.target.value})}
                placeholder="Meta Description ...."
                maxLength="500"
                cols="30"
                rows="10"
                onKeyUp={(e)=>setState({...state, description: e.target.value})}
              ></textarea>
              <p className="length">
                {state.description ? state.description.length : 0}
              </p>
            </div>

            <div className="group">
              <input
                type="submit"
                value="Update post"
                className="btn btn-default btn-block"
              />
            </div>

          </form>
        </div>
      </div>
    </div>
  </div>
</div> :<Loader/>
}
