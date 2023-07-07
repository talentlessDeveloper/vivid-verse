import { Timestamp } from 'firebase/firestore';
import { User } from 'firebase/auth';

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

export type MyUser = User;

export type CreateFeed = {
  title: string;
  image?: null | string;
  imageUrl?: string;
  tags: string[];
};

export type Author = {
  name: string;
  id: string;
  profilePic?: string;
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
  id?: string;
  title: string;
  content: string;
  imageUrl: string;
  createdAt: Timestamp;
  author: Author;
  comments?: IComment[];
  tags: string[];
  reactions?: Reaction;
  bookMarkedBy?: string[];
};

export type Bookmark = Feed & { userId: string };

export type UpdateProfile = {
  firstName: string;
  lastName: string;
};
