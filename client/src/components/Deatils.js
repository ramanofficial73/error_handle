import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";
import Helmet from "react-helmet";
import Loader from "./Loader";
import './Details.css'
import Comments from './Comments';
import { postComment, postDetails } from "../store/actions/PostAction";

const Details = () => {
  const { id } = useParams();
  const [comment, setComment] = useState('');
  const { user } = useSelector((state) => state.AuthReducer);
  const { loading, details, comments } = useSelector((state) => state.PostReducer);

  const dispatch = useDispatch();

  const addComment = (e) => {
  	e.preventDefault();
      console.log(comment);
  	dispatch(postComment({ id: details._id, comment, userName: user.name }));
  	setComment('');
  	dispatch(postDetails(id));
  };
  useEffect(() => {
    dispatch(postDetails(id));
  }, [id]);
  return (
    <div className="container">
      <div className="row mt-100">
        <div className="col-8">
          {!loading ? (
            <div className="post_details">
            <Helmet>
				<title>{details.title}</title>
				<meta
					name='description'
					content='Learn HTML, CSS, JavaScript, React, Vue, Flutter etc'
				/>
			</Helmet>
              <div className="post_header">
                <div className="post_avatar">
                  {details.userName ? details.userName[0] : ""}
                </div>
                <div className="post_user">
                  <span>{details.userName}</span>
                  <span>{moment(details.updatedAt).format("MMM Do YY")}</span>
                </div>
              </div>

              <div className="post_body">
                <h1 className="post_title">
                  {details.title}
                </h1>
                <div className="post_details">
                  {ReactHtmlParser(details.body)}
                </div>
                <div className='post__img'>
					<img src={`/imges/${details.img}`} alt={details.img} />
				</div>
                
              </div>
              {user ? 
              <>
              <div className="post_comment">
                    <form onSubmit={addComment} >
                    <div className="group">
                        <input type="text" name="" id="" onChange={(e)=> setComment(e.target.value)} value = {comment} className="group_control" placeholder="Write a comment..." />
                    </div>
                    <div className="group">
                        <input type="submit" value="Post Comment" className="btn btn-default btn-block" />
                    </div>
                    </form>
              </div> 
              <Comments comments={comments}  />
              </>
               : ''}
            
            </div>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
};
export default Details;
