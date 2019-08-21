import React, { useEffect, useState } from "react";

import axios from "axios";
import { Button, Form, FormGroup, Input, } from "reactstrap";

export default function CreatePost() {
  const [formState, setForm] = useState({
    title: "",
    author: "",
    category: "",
    content: ""
  });

  const [fetchState, setFetch] = useState({
    authors: [],
    categories: []
  });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:3001/categories", {
        headers: { Authorization: "Carlos" }
      }),
      axios.get("http://localhost:3001/posts", {
        headers: { Authorization: "Carlos" }
      })
    ]).then(([categories, posts]) => {
      console.log(categories, posts);
      setFetch({
        authors: posts.data.map(post => post.author),
        categories: categories.data.categories.map(category => category.name)
      });
    });
  }, []);

  function handleChange(e) {
    setForm({
      ...formState,
      [e.target.name]: e.target.value
      //  title: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post(
        "http://localhost:3001/posts",
        {
          id: Math.floor(Math.random() * 1000),
          timestamp: Date.now(),
          title: formState.title,
          body: formState.content,
          author: formState.author,
          category: formState.category
        },
        {
          headers: { Authorization: "Carlos" }
        }
      )
      .then(response => {
        console.log(response);
        setForm({
          title: "",
          author: "",
          category: "",
          content: ""
        });
      })
      .catch(err => console.log(err));
  }

  return (
    <div style={{backgroundImage: "linear-gradient(90deg, black, black)", opacity:"0.40",marginTop:"-10px", marginBottom:"-15px"}}>
    <div className="container" >
      {/* <pre>{JSON.stringify(formState, null, 2)}</pre>
      <pre>{JSON.stringify(fetchState, null, 2)}</pre> */}

      <Form onSubmit={handleSubmit}>
        <h3 style={{zIndex:10, color:"white", fontWeight:"bold", marginTop:"20px", textShadow:"2px 2px 3px grey" }}>Write a Post!</h3>
        <div
          className=" d-flex"
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            
          }}
        >
          <FormGroup style={{paddingRight:"15px"}}>
            {/* <Label for="title">Title</Label> */}
            <Input
              type="text"
              name="title"
              id="title"
              placeholder="Enter title"
              onChange={handleChange}
              value={formState.title}
              required
            />
          </FormGroup>

          <FormGroup style={{paddingRight:"15px"}}>
            {/* <Label for="author">Author</Label> */}
            <Input
              type="text"
              name="author"
              id="author"
              placeholder="Enter author"
              onChange={handleChange}
              value={formState.author}
              required
            />
          </FormGroup>
          <FormGroup>
            {/* <Label for="exampleSelect">Category</Label> */}
            <Input
              type="select"
              name="category"
              id="exampleSelect"
              value={formState.category}
              onChange={handleChange}
              required
            >
              <option value="">Category</option>
              {fetchState.categories.map((category, i) => (
                <option key={i}> {category}</option>
              ))}
            </Input>
          </FormGroup>
        </div>

        <FormGroup>
          {/* <Label for="content">Content</Label> */}
          <Input
            type="textarea"
            name="content"
            id="content"
            placeholder="Enter content"
            onChange={handleChange}
            value={formState.content}
            required
          />
        </FormGroup>

        <div
          className=" d-flex"
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "flex-end"
          }}
        >
              
          <Button className="btn-md" style={{marginBottom:"10px", color:"white"}}>Submit</Button>
        </div>
      </Form>
    </div>
    </div>
  );
}
