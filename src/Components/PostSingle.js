import React from 'react';
import { deletePost } from '../api';
import { useNavigate } from 'react-router-dom';
import './postSingle.css'

const PostSingle = ({post, token, children, posts, setPosts, newPosts}) => {
  //children only goes one level
  //if multiple levels  are needed to do drilldown
  //use the useContext hook;
  // const {post, token, children, posts, setPosts, newPosts} = props;
  const navigate = useNavigate();
  // const params = useParams()
  
  const handleDelete = async () => {
    try {
      await deletePost(token, post._id); //the specific fetch call only updates the backend through a frontend event such as a click
      const newPosts = posts.filter((element) => {
        return element._id !== post._id;
      });
      setPosts(newPosts);

    } catch (error) {
      console.error(error);
    }
  };

  
  return post 
    ? <div style={{margin: '.2rem'}}>
        <h3>title: {post.title}</h3>
        <div>Description: {post.description}</div>
        <div>price: {post.price}</div>
        <div>Location: {post.location}</div>
        {post.isAuthor && <button onClick={handleDelete}>DELETE</button>}
        {!post.isAuthor && <button onClick={() => {navigate(`/posts/${post._id}/messages`)}}>Message</button>}
        {post.messages.map((elem) => {
          return (
            <div>
              {elem.fromUser.username} : {elem.content}
            </div>
          )
        })}
      </div>
    : 'Loading...'
}

export default PostSingle;

