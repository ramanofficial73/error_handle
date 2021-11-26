import React, {useEffect, useState} from 'react'
import { Helmet } from "react-helmet";
import { useSelector , useDispatch } from 'react-redux';
import { CLOSE_LOADER, REDIRECT_FALSE, REMOVE_MESSAGE, SET_LOADER, SET_MESSAGE } from '../store/constants/PostConstant';
import toast, { Toaster } from 'react-hot-toast';
import { fetchPosts } from '../store/actions/PostAction';
import { Link ,useParams,useHistory} from 'react-router-dom';
import './Dashboard.css'
import { BsPencil ,BsArchive, BsImage} from "react-icons/bs";
import Loader from './Loader';
import Sidebar from './Sidebar';
import Pagination from './Pagination';
import axios from 'axios';
import moment from 'moment'

export default function Dashboard() {
    const {redirect, message, loading} = useSelector(state=>state.PostReducer)
    const {user: {_id}, token} = useSelector((state)=>state.AuthReducer)
    // console.log(_id)
    // const { posts } = useSelector((state) => state.FetchPosts)
    const { posts, count, perPage } = useSelector((state) => state.FetchPosts)


    console.log( posts)

    let {page} = useParams()
    if(page === undefined){
        page = 1
    }

    const dispatch = useDispatch()

    const history=useHistory();
    const deletePost =async (id)=>{
        const confirm  = window.confirm("Are you realy want to Delete this post")
        if(confirm){
            dispatch({type: SET_LOADER})
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const {
                    data : {msg}
                    } = await axios.get(`/delete/${id}`, config)
                dispatch(fetchPosts(_id, page))
                dispatch({type: SET_MESSAGE, payload: msg})
                history.push('/dashboard');

            } catch (error) {
            dispatch({type: CLOSE_LOADER})
                // console.log(error)
            }
        }
    }

    
    useEffect(()=>{
        if(redirect){
            dispatch({type:REDIRECT_FALSE})
        }
        if(message){
            toast.success(message)
            dispatch({type:REMOVE_MESSAGE})
        }
    },[message])

useEffect(()=>{
    dispatch(fetchPosts(_id, page))

},[page])


    return (
        <div>
            <Helmet>
                <title>Dashboard User</title>
                <meta name="description" content="User Dashboard" />
            </Helmet>
            <Toaster
            toastOptions={{
              style: {
                fontSize:"15px"
              },
            }} />
            
            <div className="container mt-100 ">
                <div className="row ml-minus-15 mr-minus-15">
                    <div className="col-3 p-15">
                        <Sidebar/>
                    </div>

                    <div className="col-9 p-15">
                        {!loading 
                         ? posts.length > 0 
                            ? posts.map(post=>(
                            <div key={post._id} className="dashboard_post">
                                <div className="dashboard_post_title">
                                    <Link to={`/details/${post.slug}`}>{post.title}</Link>
                                    <spna className="time_span">Published {moment(post.updatedAt).fromNow()}</spna>
                                </div>

                          <div className="dashboard_post_links">
                          <Link to={`/updateImage/${post._id}`} className="icons"><BsImage/></Link>
                          <Link to={`/edit/${post._id}`} className="icons"><BsPencil/></Link>
                          <Link to="/" className="icons"><BsArchive onClick={()=>{deletePost(post._id)}} /></Link>
                          </div>

                            </div>
                        )) 
                        :"You dont have any post" 
                    : <Loader/>}


                    <Pagination path="dashboard" page={page} perPage={perPage} count={count} />

                    </div>


                </div>
            </div>
            
        </div>
    )
}


