import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "reactstrap";
import LikeButton from "./LikeButton";


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


  // useEffect(()=> {
  //   axios.delete("http://localhost:3001/posts:" + id, {headers: { Authorization: "Carlos" }
  // })
  // .then(response => {
  //   console.log("carlos: ", response);
  //   setPost(response.data);
  // });
  // }, []);



  function handleDelete(indexToRemove) {
    let copyPosts = [...postState]
    copyPosts.splice(indexToRemove, 1) 
    setPost(copyPosts)
  }

  return (
    <div>
      {/* <pre>{JSON.stringify(postState, null, 2)}</pre>  */}
      {/* just to make sure that no error of undefined of undefined */}

      <div><Table className="container"  size hover bordered >
        <thead>
          <tr style={{backgroundColor:"bisque", opacity:"0.75",color:"grey",textShadow: "4px 4px 3px white" }}>
            
              <th >Title</th>
              <th >Category</th>
             <th>Content</th>
             <th >Likes</th>
         


          </tr>
        </thead>
        <tbody>
          {postState.length > 0 &&
            postState.map((post,i) => (
              <tr>
                <th scope="row" key={i} style={{textShadow: "0.5px 1px 2px grey"}}>{post.title}</th>
                <td >{post.category} by <em style={{color:"slategrey"}}>{post.author}</em></td>
                <td>{post.body} </td>
                <td ><LikeButton/> </td>
 <td><button style={{backgroundColor:"slategrey",opacity:"0.4", fontSize:"12px", color:"white", borderRadius:"20px"}} onClick={() => handleDelete(i)}>Delete</button></td> 

                

              </tr>
            ))}
        </tbody>
      </Table>
      </div>
    </div>
  );
}
