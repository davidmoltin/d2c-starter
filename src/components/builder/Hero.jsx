import { BuilderComponent, builder } from '@builder.io/react';

// Replace with your Public API Key.
builder.init('b0eaf95136f5471aacdd2e196aa5a102');

export async function getStaticProps({ params }) {
  const urlPath = '/' + (params?.page?.join('/') || '');
  const announce = await builder
    .get('hero-home', { userAttributes: { urlPath } })
    .toPromise();

  return {
    props: {
      hero: hero || null,
    },
  };
}

export default function Page({ hero }) {
  return (
    <>
      <BuilderComponent model="hero-home" content={hero} />
    </>
  );
}

