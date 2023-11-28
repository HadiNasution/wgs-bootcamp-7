export default function Thumbnails({ videos, playVideo }) {
  const slicedVideos = videos.slice(1);
  return (
    <>
      {slicedVideos.map((video) => (
        <div
          className="video-list mb-4"
          key={video.id.videoId}
          onClick={() => playVideo(video)}
        >
          <div className="d-flex" role="button">
            <img
              className="rounded"
              src={video.snippet.thumbnails.default.url}
              alt={video.snippet.description}
            />
            <h3 className="d-inline ms-2 w-100">{video.snippet.title}</h3>
            <p>{new Date(video.snippet.publishedAt).toLocaleDateString()}</p>
          </div>
          <p>
            <b>{video.snippet.channelTitle}</b> <br></br>
            {video.snippet.description}
          </p>
        </div>
      ))}
    </>
  );
}
