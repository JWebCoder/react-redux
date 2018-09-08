import React, { Component } from 'react';

const ListPosts = props =>(

       props.posts.map(p => (
           <div>

        <div>
            body: {p.body}
        </div>
        <div>
            category: {p.category}
        </div>
        <div>
            commentCount: {p.commentCount}
        </div>
        <div>
            deleted: {p.deleted}
        </div>
        <div>
            id: {p.id}
        </div>
        <div>
            title: {p.title}
        </div>
           </div>
    ))
        )

export default ListPosts