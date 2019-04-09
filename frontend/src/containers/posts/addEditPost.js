import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchCategories } from '../../actions/categories'
import { submitPost } from '../../actions/posts'
import { fetchPost } from '../../actions/posts'
import { editPost } from '../../actions/posts'
import { removePostFromEditList } from '../../actions/posts'
import { toggleAddPostVisibility } from '../../actions/posts'

const CategoryEmptyValue = -1

export class AddEditPost extends Component {

    constructor(props) {
        super(props);

        this.props.id ? this.editMode = true : this.editMode = false

        this.formErrors =
            {
                title: null,
                body: null,
                author: null,
                category: null
            };

        this.state = {
            title: '', body: '', author: '', category: CategoryEmptyValue, formErrors: this.formErrors, formNotValid: !this.editMode
        };

        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);

        this.values = { title: null, body: null, author: null, category: null }
    }

    componentDidMount() {
        this.props.fetchCategories();
        if (this.editMode) {
            fetchPost(this.props.id).then((post) => {
                this.setState({ title: post.title, body: post.body, author: post.author, category: post.category });

                this.values = { title: post.title, body: post.body, author: post.author, category: post.category }
            })
        }
    }

    render() {
        return (
            <div style={{ width: "40%" }}>
                <form onSubmit={this.handleOnSubmit}>
                    {this.props.categories && <select name="category" onChange={this.handleOnChange} value={this.state.category}>
                        <option value={CategoryEmptyValue}>-- Select Category --</option>
                        {this.props.categories.map((category) => <option key={category.name} value={category.name}>{category.name}</option>)}</select>}
                    <span className="error">{this.state.formErrors.category}</span>
                    <div><input type="text" style={{ width: "70%" }} onChange={this.handleOnChange} value={this.state.title} name="title" placeholder="Title"></input>
                        <span className="error">{this.state.formErrors.title}</span>
                    </div>
                    <div>
                        <textarea name="body" style={{ width: "70%" }} onChange={this.handleOnChange} value={this.state.body} rows="4" placeholder="Body" />
                        <span className="error">{this.state.formErrors.body}</span>
                    </div>

                    <div><input type="text" style={{ width: "70%" }} onChange={this.handleOnChange} value={this.state.author} name="author" placeholder="Author" />
                        <span className="error">{this.state.formErrors.author}</span>
                    </div>

                    <div><button type="submit" disabled={this.state.formNotValid}>{!this.editMode ? "Add Post" : "Edit Post"}</button>
                        {this.editMode && <button type="button" onClick={() => this.props.cancelEdit(this.props.id)}>Close</button>}
                    </div>
                </form>
            </div >
        )
    }
    validateFormValues = (values) => (Object.values(values).some(value => (!value || value === CategoryEmptyValue) && value !== "formErrors" && value !== "formNotValid"))

    handleOnChange(event) {

        let formErrors = { ...this.state.formErrors };

        (event.target.value === CategoryEmptyValue) && event.target.name === "category" ?
            formErrors.category = "Category can´t be empty." : formErrors.category = null;

        event.target.value.length === 0 && event.target.name === "title" ?
            formErrors.title = "Title can´t be empty." : formErrors.title = null;

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
            this.props.submitPost({ category: this.state.category, title: this.state.title, body: this.state.body, author: this.state.author });
            this.props.toggleAddPostVisibility();
        }
        else {
            this.props.editPost(this.props.id, { category: this.state.category, title: this.state.title, body: this.state.body, author: this.state.author });
        }
    }
}

const mapDispatchToProps = (dispatch) => ({

    fetchCategories: () => {
        dispatch(fetchCategories())
    },
    submitPost: (post) => {
        dispatch(submitPost(post));
    },
    editPost: (postId, post) => {
        dispatch(editPost(postId, post));
    },
    cancelEdit: (postId) => {
        dispatch(removePostFromEditList(postId));
    },
    toggleAddPostVisibility: () => {
        dispatch(toggleAddPostVisibility())
    }
})

const mapStateToProps = (state) => {
    return state.categories;
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEditPost)