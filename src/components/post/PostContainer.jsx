import { Component } from "react";
import Post from "./Post";
import '../../styles/post.css'

class PostContainer extends Component {
    render() {
        const { post } = this.props
        return (
            <div className="comment-thread">
                { <Post id={post.id} post={post} /> }
            </div>
        )
    }
}

export default PostContainer
