import axios from "axios";
import Thumbnails from "./Thumbnails";
import VideoFrame from "./VideoFrame";
import Search from "./Search";
import Comment from "./Comment";
import { faker } from "@faker-js/faker";
import { useState } from "react";

const data = [
  {
    id: 1,
    avatar: faker.image.avatar(),
    name: faker.person.fullName(),
    date: faker.date.anytime(),
    comment: faker.lorem.paragraph({ min: 1, max: 3 }),
  },
  {
    id: 2,
    avatar: faker.image.avatar(),
    name: faker.person.fullName(),
    date: faker.date.anytime(),
    comment: faker.lorem.paragraph({ min: 1, max: 3 }),
  },
  {
    id: 3,
    avatar: faker.image.avatar(),
    name: faker.person.fullName(),
    date: faker.date.anytime(),
    comment: faker.lorem.paragraph({ min: 1, max: 3 }),
  },
  {
    id: 4,
    avatar: faker.image.avatar(),
    name: faker.person.fullName(),
    date: faker.date.anytime(),
    comment: faker.lorem.paragraph({ min: 1, max: 3 }),
  },
  {
    id: 5,
    avatar: faker.image.avatar(),
    name: faker.person.fullName(),
    date: faker.date.anytime(),
    comment: faker.lorem.paragraph({ min: 1, max: 3 }),
  },
  {
    id: 6,
    avatar: faker.image.avatar(),
    name: faker.person.fullName(),
    date: faker.date.anytime(),
    comment: faker.lorem.paragraph({ min: 1, max: 3 }),
  },
  {
    id: 7,
    avatar: faker.image.avatar(),
    name: faker.person.fullName(),
    date: faker.date.anytime(),
    comment: faker.lorem.paragraph({ min: 1, max: 3 }),
  },
];

export default function PhotosContainer() {
  const [videos, setVideos] = useState([]);
  const [video, setVideo] = useState([]);

  function playVideo(selectedVideo) {
    setVideo(selectedVideo);
  }

  async function getVideos(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const query = formData.get("query");
    const apiKey = "AIzaSyCC3KTnBDB5lPYxm0wXTthjmqI8O2vMcqA";
    const config = {
      params: { part: "snippet", maxResults: 10, q: query, key: apiKey },
    };

    try {
      const result = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        config
      );
      // console.log(result.data.items);
      setVideos(result.data.items);
      setVideo(result.data.items);
    } catch (error) {
      console.log(error.response);
    }
  }

  return (
    <>
      <div className="row">
        <Search search={getVideos} />
      </div>
      {video.length == 0 ? (
        ""
      ) : (
        <div className="row">
          <div className="col-md-7">
            <VideoFrame videos={videos} video={video} />
            <Comment data={data} />
          </div>
          <div className="col-md-5">
            <Thumbnails videos={videos} playVideo={playVideo} />
          </div>
        </div>
      )}
    </>
  );
}
