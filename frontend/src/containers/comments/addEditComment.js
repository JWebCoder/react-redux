import React, { Component } from 'react';
import { connect } from 'react-redux'
import { submitComment } from '../../actions/comments'
import { fetchComment } from '../../actions/comments'
import { removeCommentFromEditList } from '../../actions/comments'
import { editComment } from '../../actions/comments'
import './addEditComment.css'

class AddEditComment extends Component {

    constructor(props) {
        super(props);

        this.props.id ? this.editMode = true : this.editMode = false

        this.formErrors =
            {
                author: null,
                body: null
            };

        this.state = {
            author: '', body: '', formErrors: this.formErrors, formNotValid: !this.editMode
        };

        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);

        this.values = { author: null, body: null }

    }

    componentDidMount() {
        if (this.editMode) {
            fetchComment(this.props.id).then((comment) => {

                this.setState({ author: comment.author, body: comment.body });
                this.values = { author: comment.author, body: comment.body };
            });
        }
    }

    render() {
        return (
            <div style={{ width: "40%" }}>
                <form onSubmit={this.handleOnSubmit}>

                    <div><textarea name="body" style={{ width: "70%" }} onChange={this.handleOnChange} value={this.state.body} rows="4" placeholder="Body" />
                        <span className="error">{this.state.formErrors.body}</span>
                    </div>

                    <div><input type="text" style={{ width: "70%" }} onChange={this.handleOnChange} value={this.state.author} name="author" placeholder="Author" />
                        <span className="error">{this.state.formErrors.author}</span>
                    </div>
                    <div><button type="submit" disabled={this.state.formNotValid}>{!this.editMode ? "Add Comment" : "Edit Comment"}</button>
                        {this.editMode && <button type="button" onClick={() => this.props.cancelEdit(this.props.id)}>Close</button>}
                    </div>
                </form>
            </div>
        )
    }

    validateFormValues = (values) => (Object.values(values).some(value => !value && value !== "formErrors" && value !== "formNotValid"))

    handleOnChange(event) {

        let formErrors = { ...this.state.formErrors };

        event.target.value.length === 0 && event.target.name === "body" ?
            formErrors.body = "Body can´t be empty." : formErrors.body = null;

        event.target.value.length === 0 && event.target.name === "author" ?
            formErrors.author = "Author can´t be empty." : formErrors.author = null;

        this.values[event.target.name] = event.target.value;

        this.setState({
            formErrors: formErrors, [event.target.name]: event.target.value,
            formNotValid: this.validateFormValues(this.values)
        })
    }

    handleOnSubmit(event) {

        event.preventDefault();

        if (!this.editMode) {
            this.props.submitComment(this.props.postId, { body: this.state.body, author: this.state.author, parentId: this.props.postId, timestamp: Date.now() });
        }
        else {
            this.props.editComment(this.props.id, { category: this.state.category, title: this.state.title, body: this.state.body, author: this.state.author });
        }
    }
}

const mapDispatchToProps = (dispatch) => ({
    submitComment: (postId, comment) => {
        dispatch(submitComment(postId, comment));
    },
    fetchComment: (commentId) => {
        dispatch(fetchComment(commentId));
    },
    cancelEdit: (commentId) => {
        dispatch(removeCommentFromEditList(commentId));
    },
    editComment: (commentId, comment) => {
        dispatch(editComment(commentId, comment));
    },
})

export default connect(null, mapDispatchToProps)(AddEditComment)