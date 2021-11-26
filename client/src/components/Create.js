import React from "react";
import { Helmet } from "react-helmet";
import "./create.css";
import { useState ,useEffect} from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import {useSelector, useDispatch } from 'react-redux'
import PostAction from "../store/actions/PostAction";
import { body } from "express-validator";
import toast, { Toaster } from 'react-hot-toast';
import Loader from './Loader'

export default function Create(props) {
  const {createErrors, redirect, loading} = useSelector(state =>state.PostReducer)
  const [currentImg, setCurrentImg] = useState("Choose Images");
  const [imgPreview, setImgPreview] = useState("");
  const dispatch = useDispatch()
  const {user} = useSelector(state => state.AuthReducer)
//   console.log(user);
const {_id, name} = user
// console.log(_id,name);

  const fileHandle = (e) => {
    // console.log(e.target.files[0].name);
    if(e.target.files.length !==0 ){
    setCurrentImg(e.target.files[0].name);
    setState({
      ...state,
      [e.target.name]: e.target.files[0],
    });
    const reader = new FileReader();
    reader.onloadend = () => {
      setImgPreview(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  }
  };

  const [value, setValue] = useState("");
  const [state, setState] = useState({
    title: "",
    description: "",
    img: "",
  });

  const handleDescription = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const [slug, setSlug] = useState("");
  const [slugButton, setSlugButton] = useState(false);
  const slugHandle = (e) => {
    setSlugButton(true);
    setSlug(e.target.value);
  };

  const handleURL = (e) => {
    e.preventDefault();
    setSlug(slug.trim().split(" ").join("-"));
  };

  const handleInput = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    const createSlug = e.target.value.trim().split(" ").join("-");
    setSlug(createSlug);
  };

  const createPost = (e) => {
    e.preventDefault();
    // console.log(state);
    // console.log(slug);
    // console.log(value);

    const {title, description, img} = state
    const formData = new FormData()
    formData.append('title', title)
    formData.append('body', value)
    formData.append('img', img)
    formData.append('description', description)
    formData.append('slug', slug)
    formData.append('name', name)
    formData.append('id', _id)

    dispatch(PostAction(formData))
  };

  useEffect(()=>{
    if(redirect){
      props.history.push('/dashboard')
    }
    if(createErrors.length !==0){
      createErrors.map(error=>{
        toast.error(error.msg)
      })
    }
  },[createErrors, redirect])


  return (
    <div className="create">
      <Helmet>
        <title>Create New Post</title>
        <meta name="description" content="Create New Post" />
      </Helmet>
      <Toaster
            toastOptions={{
              style: {
                fontSize:"15px"
              },
            }} />

            {!loading ?  <div className="container">
        <form onSubmit={createPost}>
          <div className="row">
            <div className="col-6 p-15 ml-minus-15 mr-minus-15">
              <div className="card">
                <h3 className="card_h3">Create A New Post</h3>

                <div className="group">
                  <label htmlFor="title">Post Title</label>
                  <input
                    type="text"
                    className="group_control"
                    value={state.title}
                    onChange={handleInput}
                    name="title"
                    id="title"
                    placeholder="Post Title"
                  />
                </div>

                <div className="group">
                  <label htmlFor="img" className="img_label">
                    {currentImg}
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
                    onChange={handleDescription}
                    placeholder="Meta Description ...."
                    maxLength="500"
                    cols="30"
                    rows="10"
                  ></textarea>
                  <p className="length">
                    {state.description ? state.description.length : 0}
                  </p>
                </div>


              </div>
            </div>

            <div className="col-6 p-15">
              <div className="card">

                <div className="group">
                  <label htmlFor="slug">Post Url</label>
                  <input
                    type="text"
                    name="slug"
                    id="slug"
                    value={slug}
                    onChange={slugHandle}
                    className="group_control"
                    placeholder="Post URL ..."
                  />
                </div>
                
                <div className="group">
                  {slugButton ? (
                    <button
                      className="btn btn-default btn-block"
                      onClick={handleURL}
                    >
                      Update Slug
                    </button>
                  ) : (
                    ""
                  )}
                </div>

                <div className="group">
                  <div className="imgPreview">
                    {imgPreview ? <img src={imgPreview} /> : ""}
                  </div>
                </div>
                

                <div className="group">
                  <input
                    type="submit"
                    value="create post"
                    className="btn btn-default btn-block"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div> : <Loader/>}
    </div>
  );
}
