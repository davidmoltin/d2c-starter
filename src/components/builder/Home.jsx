import { builder, BuilderComponent } from '@builder.io/react'

builder.init('b0eaf95136f5471aacdd2e196aa5a102')

export const getStaticProps = async (context) => {
  const content = await builder.get('home-content', { url: context.resolvedUrl }).promise();

  return { 
    props: { content }, 
    revalidate: true,
    notFound: !content
  }
}

const Content = (props) => (
  <BuilderComponent
    content={props.content}
    model="home-content" />
) 

export default Content;