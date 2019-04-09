import React from 'react';
import VoteButton from '../../components/voteButton';

export const Comment = (props) =>
{
    return (
        <div key={props.id}> Body: {props.body}, Author:{props.author}, TimeStamp: {props.timestamp}, 
            VoteScore: {props.voteScore}
            <VoteButton onClick={props.onVote} entityId={props.id} voteDirection="upVote">Up Vote</VoteButton>
            <VoteButton onClick={props.onVote} entityId={props.id} voteDirection="downVote">Down Vote</VoteButton>
            <button onClick={() => props.onEdit(props.id)}>Edit</button>
            <button onClick={() =>  props.onDelete(props.id)}>Delete</button>
        </div>
    )
}

export default Comment