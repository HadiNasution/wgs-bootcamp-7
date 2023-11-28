export default function VideoFrame({ videos, video }) {
  const videoData = video.length > 1 ? videos[0] : video;

  return (
    <>
      {videoData.length > 0 || (
        <div className="frame">
          <iframe
            width="560"
            height="315"
            className="rounded w-100"
            src={`https://www.youtube.com/embed/${videoData.id?.videoId || ""}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
          <hr></hr>
          <div className="info">
            <h3>{videoData.snippet?.channelTitle || ""}</h3>
            <p>{videoData.snippet?.description || ""}</p>
          </div>
        </div>
      )}
    </>
  );
}
