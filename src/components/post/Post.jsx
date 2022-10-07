import { Component } from "react"

class Post extends Component {
    render() {
        const { id, children, text, title, author, url, points, created_at: createdAt } = this.props.post
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
        const dateString = new Date(createdAt).toLocaleDateString('en-US', options)
        let red = Math.floor(Math.random() * 256)
        let green = Math.floor(Math.random() * 256)
        let blue = Math.floor(Math.random() * 256)

        if (red > 160) red -= 100
        if (blue > 160) blue -= 100
        if (green > 160) green -= 100

        return (
            <details open className="comment" id={"comment-" + id}>
                <a href={"#comment-" + id} className="comment-border-link">
                    <span className="sr-only">Jump to this comment</span>
                </a>
                <summary>
                    <div className="comment-heading">
                        <div className="comment-info">
                            <a href={"/?author=" + author} className="comment-author"  style={{ color: `rgb(${red}, ${green}, ${blue})` }}>{author}</a>
                            <p className="m-0">
                                <span style={{ fontWeight: 'bold', color: 'black' }}>{points !== null ? 
                                    points + ' points • ' : null}</span>{dateString}
                            </p>
                        </div>
                    </div>
                </summary>

                {!!title ? <div className="comment-body" style={{ fontWeight: "bolder" }}
                    dangerouslySetInnerHTML={{ __html: title }}>
                </div> : null}
                <div className="comment-body" dangerouslySetInnerHTML={{ __html: text }}>
                </div>
                <div className="comment-body">
                {!!url ? <a className="button" href={url}>{url}</a> : null}
                </div>

                <div className="replies">
                    {(!!children && children.length > 0) ?
                        children.map(child => <Post key={child.id} post={child} />) : null }
                </div>
            </details>
        )
    }
}

export default Post
