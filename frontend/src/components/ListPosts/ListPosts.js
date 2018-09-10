import React, { Component } from 'react';
import {Row, Col} from 'reactstrap';
import moment from 'moment';
import './style.css';
import {Link} from 'react-router-dom';
import DropdownEdit from "../DropdownEdit/DropdownEdit";
const ListPosts = props =>(
    <div className='container-fluid'>
        {props.posts.map(p => (
       <Row className='post'>
           <Col className='col-1'>
               <Row>
                   <div className='divVote'>
                       <div className='voteScore'>{p.voteScore}</div>
                       <div className='voteLabel'>vote</div>
                   </div>
               </Row>
           </Col>
           <Col className='col-10'>
               <Row>
                   <Link to={`/${p.category}/${p.id}`}>
                   <h5 className='title'>{p.title}</h5>
                   </Link>
               </Row>
               <Row className='criteriaPost'>
                   <Col className='col-3'>Date: <b>{moment(p.timestamp).format('LLL')}</b></Col>
                   <Col className='col-2'>Author: <b>{p.author}</b></Col>
                   <Col  className='col-2'>Category: <b>{p.category}</b></Col>
                   <Col  className='col-2'>Nb comment: <b>{p.commentCount}</b></Col>
               </Row>
               <Row>
                   <div>
                       {p.body}
                   </div>
               </Row>
           </Col>
           <Col className='col-1'>
               <DropdownEdit {...p}/>
           </Col>
          </Row>
        ))}
    </div>
    )

export default ListPosts