import Link from 'next/link';
import React, { Dispatch, SetStateAction } from 'react';

const CreateHeader = ({
  setPreview,
}: {
  setPreview: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <header>
      <nav className="w-10/12 mx-auto flex justify-between py-4">
        <div>
          <Link href="/feeds">𝓥𝓲𝓿𝓲𝓭𝓥𝓮𝓻𝓼𝓮</Link>
        </div>
        <ul className="flex gap-x-4">
          <li>
            <button onClick={() => setPreview(false)}>Edit</button>
          </li>
          <li>
            <button onClick={() => setPreview(true)}>Preview</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default CreateHeader;
