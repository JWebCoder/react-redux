# PROJECT SPECIFICATION

## Readable

### Application Setup

CRITERIA                                                                             | MEETS SPECIFICATIONS
------------------------------------------------------------------------------------ | -----------------------------------------------------------------------------------------------------------------------
Is the application easy to install and start?                                        | The application requires only npm install and npm start to install and launch.
Does the application include README with clear installation and launch instructions? | A README is included with the project. The README includes clear instructions for installing and launching the project.

### State Management

CRITERIA                                 | MEETS SPECIFICATIONS
---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Is application state managed by Redux?   | Most application state is managed by the Redux store. State-based props are mapped from the store rather than stored as component state.Form inputs and controlled components may have some state handled by the component.
Does application state update correctly? | Updates are triggered by dispatching action creators to reducers. Reducers and actions are written properly and correctly return updated state to the store.

### Application Functionality

### Are posts listed correctly and have the desired functionality in a list view?

Listed posts are displayed with the following:

1. Title
2. Author
3. Number of comments
4. Current score
5. Voting mechanism to upvote or downvote the post
6. Buttons or links for editing or deleting that post

The comment count, edit/delete, and upvote/downvote features are required on this page in order to enable the user to manage the posts without navigating away.

The voting mechanism works and correctly displays the new vote score after clicking.

List posts link to the detail page for that post.

All posts are listed at the root.

All posts for a category are listed at /:category

List pages (root or category) include a mechanism for sorting by date or by score (at a minimum), and the sort works properly.

List pages include a button to add a new post.

All available categories are visible in any list view.

### Does the post detail page have desired functionality?

Post detail is available at /:category/:post_id

Post is displayed with the following:

1. Title
2. Body
3. Author
4. Number of comments
5. Current score
6. Voting mechanism to upvote or downvote the post
7. Buttons or links for editing or deleting that post

Listed comments are displayed with the following:

1. Author
2. Current score
3. Voting mechanism to upvote or downvote the comment
4. Buttons or links for editing or deleting that comment

The voting mechanism works and correctly displays the new vote score after clicking for both the post and comments.

All comments for a post are displayed below the post body.

A mechanism for adding a new comment is visible on the detail page and functional.

### Can users add new posts?

Application has a form for creating a new post. Submitting the form properly adds the post to the correct category.

### Can users add comments?

Application has a form for adding comments to a post. Submitting the form properly adds the comment to the correct post.

### Can users edit posts/comments?

Edit buttons for posts/comments open a form with existing data pre-populated. Submitting the form correctly updates the data for the comment/post.

### Can users delete posts/comments?

A mechanism for deleting posts and comments exists. Clicking the button/link correctly removes the post/comment from list view and makes post inaccessible at its URL. When a user goes to a deleted post's URL, a 404 page is displayed.

### Is the application navigable?

User is able to navigate between categories, main page and post detail pages without typing address in the address bar.
