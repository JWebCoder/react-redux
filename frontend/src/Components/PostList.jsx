import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "reactstrap";
import LikeButton from "./LikeButton";
import Circle from './Circle'




export default function PostList() {
  const [postState, setPost] = useState([]);
  

  useEffect(() => {
    axios
      .get("http://localhost:3001/posts", {headers: { Authorization: "Carlos" }
      })
      .then(response => {
        console.log("carlos: ", response);
        setPost(response.data);
      });
  }, []);


 


  function handleDelete(indexToRemove) {
    let copyPosts = [...postState]
    copyPosts.splice(indexToRemove, 1) 
    setPost(copyPosts)
  }

  return (
    <div>
      {/* <pre>{JSON.stringify(postState, null, 2)}</pre>  */}
      {/* just to make sure that no error of undefined of undefined */}

      <div><Table className="container"  size hover bordered striped>
        <thead>
          <tr>
            
            <th>title</th>
            <th >C/A</th>
            <th>Content</th>
            <th >Likes</th>


          </tr>
        </thead>
        <tbody>
          {postState.length > 0 &&
            postState.map((post,i) => (
              <tr>
                <th scope="row" key={i}>{post.title}</th>
                <td >{post.category} by {post.author}</td>
                <td>{post.body} </td>
                <td ><LikeButton/> </td>
 <td><button onClick={() => handleDelete(i)}>Delete</button></td> 

                

              </tr>
            ))}
        </tbody>
      </Table>
      </div>
    </div>
  );
}
