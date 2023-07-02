import { CreateFeed } from '@/constant/validation/types';
import React, { useState, useCallback, Dispatch, SetStateAction } from 'react';

type TagInputProps = {
  tags: string[];
  setFeed: Dispatch<SetStateAction<CreateFeed>>;
  error: string;
  setError: Dispatch<
    React.SetStateAction<{
      image: string;
      content: string;
      title: string;
      tags: string;
    }>
  >;
};

const TagInput = ({ tags, setFeed, error, setError }: TagInputProps) => {
  const [input, setInput] = useState('');
  const [isKeyReleased, setIsKeyReleased] = useState(true);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    const trimmedInput = input.trim();
    if (tags.length >= 3) {
      setError((prev) => ({
        ...prev,
        tags: 'Maximum tags reached',
      }));
      return;
    }

    if (key === ',' && trimmedInput.length && !tags.includes(trimmedInput)) {
      e.preventDefault();
      const newTags = [...tags, trimmedInput];
      setFeed((prev) => ({
        ...prev,
        tags: newTags,
      }));
      setInput('');
    }

    if (key === 'Backspace' && !input.length && tags.length && isKeyReleased) {
      const tagsCopy = [...tags];
      const poppedTag = tagsCopy.pop();
      e.preventDefault();
      setFeed((prev) => ({
        ...prev,
        tags: tagsCopy,
      }));
      setInput(poppedTag || '');
    }

    setIsKeyReleased(false);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError((prev) => ({
      ...prev,
      tags: '',
    }));
    setInput(e.target.value);
  };

  const deleteTag = (index: number) => {
    setError((prev) => ({
      ...prev,
      tags: '',
    }));
    const newTags = tags.filter((tag, i) => i !== index);
    setFeed((prev) => ({
      ...prev,
      tags: newTags,
    }));
  };
  const onKeyUp = () => {
    setIsKeyReleased(true);
  };

  return (
    <div className="mt-8">
      <label htmlFor="tags" className="sr-only">
        Tags
      </label>
      <div>
        <input
          value={input}
          placeholder="Add up to 3 comma seperated tags e.g webdev,movies,JavaScript"
          onKeyDown={onKeyDown}
          onChange={onChange}
          onKeyUp={onKeyUp}
          id="tags"
          className="text-slate-900 w-10/12 bg-transparent border border-solid border-gray-700 px-3 py-4 rounded-md "
        />
        {error && <p className="text-red-500 mt-1 text-sm">{error}</p>}
      </div>
      <div className="flex">
        {tags.map((tag, i) => (
          <div key={`${i}-${tag}`} className="flex items-center  m-1">
            <button className="px-3 text-sm py-[2] bg-slate-800 text-slate-100 hover:bg-slate-900">
              #{tag}
            </button>
            <button
              onClick={() => deleteTag(i)}
              className="ml-1 text-red-500 font-bold"
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagInput;
