import { faker } from "@faker-js/faker";
import Button from "./Button";

const comments = [
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
];

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
