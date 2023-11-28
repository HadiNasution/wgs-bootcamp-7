import { Component } from "react";
import CommentContainer from "./CommentContainer";

export default class Data extends Component {
  render() {
    return this.props.data.map((data, index) => (
      <div className="data" key={index}>
        <CommentContainer
          avatar={data.avatar}
          name={data.name}
          date={data.date}
          comment={data.comment}
        />
      </div>
    ));
  }
}
