import { Bookmark, Feed } from '@/constant/validation/types';
import { User } from 'firebase/auth';
import {
  CollectionReference,
  DocumentData,
  collection,
  getFirestore,
} from 'firebase/firestore';
import { db } from './config';

const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(db, collectionName) as CollectionReference<T>;
};

export const usersCol = createCollection<User>('users');
export const feedCol = createCollection<Feed>('Feeds');
export const bookmarkCol = createCollection<Bookmark>('Bookmarks');
// export const authorsCol = createCollection<Author>('authors');
// export const booksCol = createCollection<Book>('books');
