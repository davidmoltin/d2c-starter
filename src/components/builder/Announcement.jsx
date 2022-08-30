import { BuilderComponent, builder } from '@builder.io/react';

// Replace with your Public API Key.
builder.init('b0eaf95136f5471aacdd2e196aa5a102');

export async function getStaticProps({ params }) {
  const urlPath = '/' + (params?.page?.join('/') || '');
  const announce = await builder
    .get('announcement-bar', { userAttributes: { urlPath } })
    .toPromise();

  return {
    props: {
      announce: announce || null,
    },
  };
}

export default function Page({ announce }) {
  return (
    <>
      <BuilderComponent model="announcement-bar" content={announce} />
    </>
  );
}

