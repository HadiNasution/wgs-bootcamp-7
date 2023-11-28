import { Component } from "react";
import Button from "./Button";

export default class CommentContainer extends Component {
  state = {
    like: 0,
    isLiked: false,
  };

  handleLikeChange = () => {
    this.setState({
      like: this.state.isLiked ? (this.state.like = 0) : (this.state.like = 1),
      isLiked: !this.state.isLiked,
    });
  };

  render() {
    return (
      <div className="ui comments p-3 mt-3">
        <div className="comment">
          <a className="avatar" href="/">
            <img
              className="rounded-circle"
              src={this.props.avatar}
              alt="avatar"
            ></img>
          </a>
          <div className="content">
            <a className="author" href="/">
              {this.props.name}
            </a>
            <div className="metadata">
              <span className="date">
                {new Date(this.props.date).toLocaleDateString()}
              </span>
            </div>
            <div className="text">
              <p>{this.props.comment}</p>
            </div>
            <div className="actions">
              <Button
                className="d-inline"
                handleLikeChange={this.handleLikeChange}
                isLiked={this.state.isLiked}
                like={this.state.like}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// class Comment extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       count: 0,
//     };
//   }

//   render() {
//     return this.props.data.map((dataComment, index) => (
//       <div className="commentContainer" key={index}>
//         <CommentContainer
//           avatar={dataComment.avatar}
//           name={dataComment.name}
//           date={dataComment.date}
//           comment={dataComment.comment}
//         />
//       </div>
//     ));
//   }
// }

/*
export default function Comment() {
  const commentList = comments.map((comment) => (
    <div className="ui container comments" id={comment.id}>
      <div className="comment">
        <a className="avatar" href="/">
          <img src={comment.avatar} alt="avatar"></img>
        </a>
        <div className="content">
          <a className="author" href="/">
            {comment.name}
          </a>
          <div className="metadata">
            <span className="date">
              {new Date(comment.date).toLocaleDateString()}
            </span>
          </div>
          <div className="text">{comment.comment}</div>
          <div className="actions">
            <Button />
          </div>
        </div>
      </div>
    </div>
  ));
  return commentList;
}
*/
