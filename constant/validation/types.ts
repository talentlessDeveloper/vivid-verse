import { Timestamp } from 'firebase/firestore';

export type ILogin = {
  email: string;
  password: string;
};

export type ISignUp = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  username: string;
};

export type UserChatter = {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  profilePic?: string;
  userid?: string;
};

export type CreateFeed = {
  title: string;
  image?: null | string;
  imageUrl?: string;
  tags: string[];
};

export type Author = {
  name: string;
  id: string;
};

export type IComment = {
  author: Author;
  body: string;
  createdAt: Timestamp;
  id: string;
  parentId?: string | null;
};

export type Reaction = {
  eyes: number;
  heart: number;
  hooray: number;
  rocket: number;
  thumbsUp: number;
};

export type Feed = {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  createdAt?: Timestamp;
  author: Author;
  comments: IComment[];
  tags: string[];
  reactions?: Reaction;
  bookMarkedBy?: string[];
};

export type Bookmark = Feed & { userId: string };
