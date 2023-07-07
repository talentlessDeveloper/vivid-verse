import React from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';

import { CreateFeed } from '@/constant/validation/types';
import Image from 'next/image';

export type PreviewFeedProps = CreateFeed & { content: string };

const PreviewFeed = ({ content, ...feed }: PreviewFeedProps) => {
  const { title, image, imageUrl, tags } = feed;
  return (
    <div className="w-full rounded-md min-h-[480px] shadow-sm border border-solid border-slate-300 bg-white pt-8 pb-10 px-4">
      <div>
        <Image
          src={image ? image : (imageUrl as string)}
          alt=""
          className="w-full  object-cover h-52 lg:h-96"
          width="0"
          height="0"
          unoptimized
        />
        <div className="flex gap-x-2">
          {tags.map((tag, i) => (
            <p key={`p-${tag}-${i}`} className="text-base text-blue-600 mt-2">
              #{tag}
            </p>
          ))}
        </div>
      </div>
      <h2 className="text-2xl md:text-4xl mx-auto text-slate-800 my-8">
        {title}
      </h2>
      <div>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeSanitize]}
          className="text-left prose max-w-prose mx-auto lg:prose-lg"
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default PreviewFeed;
