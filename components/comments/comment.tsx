import { auth } from '@/firebase/config';
import { convertDate } from '@/utils/convertDate';
import CommentForm from './commentForm';
import Image from 'next/image';

const Comment = ({
  author,
  body,
  createdAt,
  id,
  replies,
  activeComment,
  setActiveComment,
  addComment,
  updateComment,
  deleteComment,
  parentId = null,
}: any) => {
  const { currentUser } = auth;

  const canReply = Boolean(currentUser?.uid);
  const fiveMinutes = 300000;
  const timePassed =
    new Date().getTime() - new Date(createdAt.toDate()).getTime() > fiveMinutes;
  // console.log({
  //   timePassed,
  //   createdAt,
  //   converted: createdAt.toDate(),
  // });

  const canEdit = currentUser?.uid === author.id && !timePassed;
  const canDelete = currentUser?.uid === author.id && !timePassed;

  const isReplying =
    activeComment &&
    activeComment.type === 'replying' &&
    activeComment.id === id;
  const isEditing =
    activeComment &&
    activeComment.type === 'editing' &&
    activeComment.id === id;

  const replyId = parentId ? parentId : id;

  return (
    <div className="flex items-start my-4">
      <div className="flex-shrink-0">
        <Image
          src={
            currentUser?.photoURL
              ? currentUser?.photoURL
              : 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
          }
          alt="avatar"
          className="w-10 aspect-square rounded-full object-cover"
          width={0}
          height={0}
          unoptimized
        />
      </div>
      <div className="ml-4">
        <div className="flex items-center">
          <span className="font-bold">{author.name}</span>
          <span className="ml-2 text-gray-600 text-sm">
            {convertDate(createdAt)}
          </span>
        </div>

        {!isEditing && <p className="text-gray-800">{body}</p>}
        {isEditing && (
          <CommentForm
            submitLabel="Update"
            hasCancelButton
            initialText={body}
            onSubmit={(text: string) => updateComment(text, id)}
            handleCancel={() => setActiveComment(null)}
          />
        )}
        <div className="flex gap-x-3 mt-1">
          {canReply && (
            <button
              className="text-sm text-slate-500"
              onClick={() =>
                setActiveComment({
                  id,
                  type: 'replying',
                })
              }
            >
              Reply
            </button>
          )}
          {canEdit && (
            <button
              className="text-sm text-slate-500"
              onClick={() => {
                console.log(id);
                setActiveComment({
                  id,
                  type: 'editing',
                });
              }}
            >
              Edit
            </button>
          )}
          {canDelete && (
            <button
              className="text-sm text-slate-500"
              onClick={() => deleteComment(id)}
            >
              Delete
            </button>
          )}
        </div>
        {isReplying && (
          <div className="mt-3 w-full max-w-3xl">
            <CommentForm
              submitLabel={'Reply'}
              onSubmit={(text: string) => addComment(text, replyId)}
            />
          </div>
        )}
        {replies.length > 0 && (
          <div className="ml-8">
            {replies.map(
              (reply: {
                id: string;
                author: string;
                body: string;
                createdAt: Date;
              }) => {
                return (
                  <Comment
                    key={reply.id}
                    author={reply.author}
                    body={reply.body}
                    id={reply.id}
                    createdAt={reply.createdAt}
                    replies={[]}
                    parentId={id}
                    addComment={addComment}
                    updateComment={updateComment}
                    deleteComment={deleteComment}
                    activeComment={activeComment}
                    setActiveComment={setActiveComment}
                  />
                );
              }
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
