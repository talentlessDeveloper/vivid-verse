import React, { Dispatch, SetStateAction, useState } from 'react';
import { useRouter } from 'next/router';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { v4 } from 'uuid';
import { getAuth } from 'firebase/auth';
import { doc, updateDoc, serverTimestamp, Timestamp } from 'firebase/firestore';

import Image from 'next/image';

import { useAuth } from '@/hooks/useAuth';
import { convertDate } from '@/utils/convertDate';
import { deleteDocApi } from '@/utils/deleteDocApi';

import Comment from '@/components/comments/comment';
import CommentForm from '@/components/comments/commentForm';
import Reactions from '@/components/comments/reactions';

import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import { IComment, Feed, Reaction } from '@/constant/validation/types';

import { feedCol } from '@/firebase/typedCollections';

type FeedPageProps = {
  feed: Feed;
  comments: IComment[];
  emojis: Reaction;
  id: string;
  setComments: Dispatch<SetStateAction<IComment[]>>;
  setEmojis: Dispatch<SetStateAction<Reaction>>;
};

export type ActiveComment = {
  id: string;
  type: 'editing' | 'replying';
};

const FeedPage = ({
  feed,
  comments,
  emojis,
  id,
  setComments,
  setEmojis,
}: FeedPageProps) => {
  const [activeComment, setActiveComment] = useState<ActiveComment | null>(
    null
  );

  const { user } = useAuth();
  const { currentUser } = getAuth();
  const router = useRouter();

  const rootComments = comments.filter(
    (comment: any) => comment.parentId === null
  );

  const addComment = async (text: string, parentId: string | null = null) => {
    const commentData = {
      id: v4(),
      author: {
        name: currentUser?.displayName!,
        id: currentUser?.uid!,
        profilePic: currentUser?.photoURL!,
      },
      createdAt: Timestamp.now(),
      body: text,
      parentId,
    };
    console.log(commentData);

    const commentsData = [commentData, ...comments];
    const feedData = {
      ...feed,
      comments: [...comments, commentData],
    };

    try {
      const docId = id;
      const feedRef = doc(feedCol, docId);

      await updateDoc(feedRef, feedData);

      setComments(commentsData);
      console.log(commentsData);
    } catch (e: any) {
      console.log(e.message);
    }

    setActiveComment(null);
  };

  const updateComment = async (text: string, commentId: string) => {
    const updated = comments.map((b: any) => {
      if (b.id === commentId) {
        return { ...b, body: text };
      }
      return b;
    });

    const postData = {
      ...feed,
      comments: [...updated],
    };

    try {
      const docId = id;
      const feedRef = doc(feedCol, docId);
      await updateDoc(feedRef, postData);
      // onSnapshot(feedRef, (snapshot) => {
      //   console.log(snapshot.data());
      // });

      setComments(updated);
    } catch (e: any) {
      console.log(e.message);
    }

    setActiveComment(null);
  };

  const deleteComment = async (commentId: string) => {
    if (window.confirm('Delete?')) {
      const updated = comments.filter((b: IComment) => b.id !== commentId);

      const postData = {
        ...feed,
        comments: [...updated],
      };

      try {
        const docId = id;
        const feedRef = doc(feedCol, docId);
        await updateDoc(feedRef, postData);
        // onSnapshot(feedRef, (snapshot) => {
        //   console.log(snapshot.data());
        // });

        setComments(updated);
      } catch (e: any) {
        console.log(e.message);
      }
    }
  };

  const deletePost = async () => {
    try {
      const docId = id;
      const feedRef = doc(feedCol, docId);
      await deleteDocApi(feedRef);
      router.push('/feeds');
    } catch (e: any) {
      console.log(e.message);
    }
  };

  const getReplies = (commentId: string) => {
    return comments
      .filter((c: any) => c.parentId === commentId)
      .sort(
        (a: any, b: any) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  };

  const addReactions = async (name: any) => {
    console.log(name);

    setEmojis((em) => ({
      ...em,
      [name]: em[name as keyof typeof emojis]++,
    }));

    try {
      const docId = id;
      const feedRef = doc(feedCol, docId);
      await updateDoc(feedRef, {
        ...feed,
        reactions: {
          ...emojis,
        },
      });
    } catch (e: any) {
      console.log(e.message);
    }
  };

  const canDelete = user && currentUser?.uid === feed?.author?.id;

  return (
    <div className="container mx-auto mt-3 px-3 py-2 relative">
      {canDelete ? (
        <button
          onClick={deletePost}
          className="bg-red-500 absolute right-0 bottom-0 text-white px-4 py-2"
        >
          Delete Post
        </button>
      ) : null}
      <div className="flex gap-2">
        <div className="w-[10%]">
          <Reactions emojis={emojis} addReactions={addReactions} />
        </div>
        <div className="w-[90%]">
          <div className="mb-3">
            <button
              className="px-4 py-1 bg-slate-800 hover:bg-slate-950 text-slate-100"
              onClick={() => router.back()}
            >
              {' '}
              Go Back
            </button>
          </div>
          <Image
            src={feed?.imageUrl!}
            width="0"
            height="0"
            alt=""
            unoptimized
            className="w-full  object-cover"
          />
          <div className="flex gap-x-2 py-3">
            {feed?.tags?.map((tag, i) => (
              <p key={`p-${tag}-${i}`} className="text-base text-blue-600 mt-2">
                #{tag}
              </p>
            ))}
          </div>
          <h1 className="text-2xl text-gray-900 text-center mt-3">
            {feed?.title}
          </h1>
          <div className="space-y-2 mt-2">
            <p className=" text-sm">
              Created By :
              <span className="font-bold">{feed?.author?.name}</span>
            </p>
            <p className="text-xs italic">
              CreatedAt: {convertDate(feed.createdAt)}
            </p>
          </div>
          <div className="mt-7">
            {' '}
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeSanitize]}
              className="text-left prose max-w-prose mx-auto lg:prose-lg"
            >
              {feed.content}
            </ReactMarkdown>
          </div>
          <div className="mt-8">
            <CommentForm onSubmit={addComment} />
          </div>
          <div className="mt-5">
            {rootComments.length > 0 &&
              rootComments.map((comment: IComment) => {
                const { author, body, createdAt, id } = comment;
                return (
                  <Comment
                    key={comment.id}
                    author={author}
                    body={body}
                    createdAt={createdAt}
                    id={id}
                    replies={getReplies(id)}
                    activeComment={activeComment}
                    setActiveComment={setActiveComment}
                    addComment={addComment}
                    updateComment={updateComment}
                    deleteComment={deleteComment}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedPage;
