import { useState } from "react";

export default function Button() {
  const [like, setLike] = useState(0);
  const noun = like > 1 ? "Likes" : "Like";

  function handleClick() {
    setLike(like + 1);
  }

  return (
    <button onClick={handleClick} className="btn btn-secondary btn-sm">
      {noun} ({like})
    </button>
  );
}
