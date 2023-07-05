// describe('feeds.cy.tsx', () => {
//   it('playground', () => {
//     // cy.mount()
//   });
// });

import SingleFeed from '@/components/feeds/feed';
import { FieldValue, Timestamp, serverTimestamp } from 'firebase/firestore';

describe('<SingleFeed />', () => {
  const customTimestamp = {
    seconds: 1634800000,
    nanoseconds: 0,
    toDate: () => new Date(1634800000 * 1000),
  };

  const feed = {
    id: 'kdncjndkcjdkcdk',
    title: 'test',
    content: 'test content',
    imageUrl:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    createdAt: customTimestamp as Timestamp,
    author: {
      name: 'Ade',
      id: 'AdeIsHere',
    },
    tags: ['web', 'java', 'css'],
    comments: [
      {
        author: {
          name: 'Ade',
          id: 'AdeIsHere',
        },
        body: 'comment1',
        createdAt: customTimestamp as Timestamp,
        id: 'hcbjhdcjhdj',
        parentId: null,
      },
    ],
  };
  const feedCopy = {
    ...feed,
    id: 'sbjhsjhjhjhdhcjdjbc',
  };

  const feeds = [feed, feedCopy];
  it('should render and display expected content', () => {
    // Mount the React component for the About page
    const setStateMock = cy.stub().as('setState');
    cy.mount(<SingleFeed feed={feed} feeds={feeds} setFeeds={setStateMock} />);

    cy.get('h2').contains('test');

    // The new page should contain an h1 with "About page"
    // cy.get('h1').contains('About Page');

    // // Validate that a link with the expected URL is present
    // // *Following* the link is better suited to an E2E test
    // cy.get('a[href="/"]').should('be.visible');
  });
});
