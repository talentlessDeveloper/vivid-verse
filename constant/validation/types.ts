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
