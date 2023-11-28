import { Component } from "react";

export default class Button extends Component {
  render() {
    return (
      <button
        onClick={this.props.handleLikeChange}
        className="btn btn-secondary btn-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={this.props.isLiked ? "#FFFFFF" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-thumbs-up"
        >
          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
        </svg>
        <p className="d-inline mt-5 ms-1">{this.props.like}</p>
      </button>
    );
  }
}

// import { useState } from "react";

// export default function Button() {
//   const [like, setLike] = useState(0);
//   const noun = like > 1 ? "Likes" : "Like";

//   function handleClick() {
//     setLike(like + 1);
//   }

//   return (
//     <button onClick={handleClick} className="btn btn-secondary btn-sm">
//       {noun} ({like})
//     </button>
//   );
// }
