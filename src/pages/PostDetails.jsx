import axios from "axios";
import React, { Component } from "react";
import PageLoader from "../components/common/PageLoader";
import PostContainer from "../components/post/PostContainer";
import { parsePathParams } from "../utils/url";

class PostDetails extends Component {

  constructor() {
    super()
    this.state = {
      loading: true,
      message: '',
      post: null
    }
  }

  componentDidMount() {
    const objectID = parsePathParams( window.location.pathname ).pop()
    const searchUrl = `https://hn.algolia.com/api/v1/items/${objectID}`
    axios.get(searchUrl, {})
    .then(res => {
      this.setState({ post: res.data, loading: false })
    })
    .catch(error => {
      if (axios.isCancel(error) || error) {
        this.setState({
          loading: false,
          message: error
        })
      }
    })
  }

  render() {
    return (
      <>
        {this.state.loading ? <PageLoader /> : 
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="topbar">
            <a href="/" className="topbar-link">Back to Search Page</a>
          </div>
          <PostContainer post={this.state.post}/>
        </div>}
      </>
    )
  }
}

export default PostDetails
