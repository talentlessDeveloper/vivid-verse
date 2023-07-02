/* eslint-disable react/prop-types */
import { AuthContext } from '@/context/authContext';
import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import SignInModal from './signInModal';
import { useAuth } from '@/hooks/useAuth';

const CommentForm = ({
  onSubmit,
  submitLabel = 'Submit',
  initialText = '',
  hasCancelButton,
  handleCancel,
}: any) => {
  const [comment, setComment] = useState(initialText);

  const [modal, setModal] = useState(false);

  const { user } = useAuth();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    console.log('active');
    event.preventDefault();
    if (!user) {
      console.log('modal');
      setModal(true);
      return;
    }

    if (!comment) {
      console.log('empty');
      return;
    }

    onSubmit(comment);
    setComment('');
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (!user) {
      setModal(true);
    }
    setComment(event.target.value);
  };

  const closeModal = () => setModal(false);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-2 mb-2 border border-gray-300 rounded-lg"
          placeholder="Write your comment..."
          value={comment}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="cursor-pointer px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          disabled={!comment}
        >
          {submitLabel}
        </button>
        {hasCancelButton && (
          <button
            type="button"
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            onClick={handleCancel}
          >
            Cancel
          </button>
        )}
      </form>
      {modal ? <SignInModal onClose={closeModal} /> : null}
    </>
  );
};

export default CommentForm;
