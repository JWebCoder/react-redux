import React, { useEffect, useState } from "react";

import axios from "axios";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

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

    axios.post(
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
    .then((response)=> {
      console.log(response)
      setForm({
        title: "",
        author: "",
        category: "",
        content: ""
      })
    })
    .catch(err => console.log(err))
  }



  return (
    <div>
      <pre>{JSON.stringify(formState, null, 2)}</pre>
      <pre>{JSON.stringify(fetchState, null, 2)}</pre>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="title">Title</Label>
          <Input
            type="text"
            name="title"
            id="title"
            onChange={handleChange}
            value={formState.title}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label for="exampleSelect">Author</Label>
          <Input
            type="select"
            name="author"
            id="exampleSelect"
            value={formState.author}
            onChange={handleChange}
            required
          >
            <option value="">-</option>
            {fetchState.authors.map((author, i) => (
              <option key={i}> {author}</option>
            ))}
          </Input>
        </FormGroup>

        {/* <FormGroup>
          <Label for="exampleSelect">Select</Label>
          <Input type="select" name="select" id="exampleSelect">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Input>
        </FormGroup> */}

        <Button>Submit</Button>
      </Form>
    </div>
  );
}
