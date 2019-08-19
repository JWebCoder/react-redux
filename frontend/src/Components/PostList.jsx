import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "reactstrap";

export default function PostList() {
  const [postState, setPost] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/posts", {
        headers: { Authorization: "Carlos" }
      })
      .then(response => {
        console.log("chartreuse: ", response);
        setPost(response.data);
      });
  }, []);

  return (
    <div>
      {/* <pre>{JSON.stringify(postState, null, 2)}</pre> */}
      {/* just to make sure that no error of undefined of undefined */}

      <div><Table responsive hover borderless>
        <thead>
          <tr>
            <th>#</th>
            <th>Post</th>
          </tr>
        </thead>
        <tbody>
          {postState.length > 0 &&
            postState.map((post,i) => (
              <tr>
                <th scope="row" key={i}>{post.id}</th>
                <td>{post.title} by {post.author}</td>
              </tr>
            ))}
        </tbody>
      </Table>
      </div>
    </div>
  );
}
