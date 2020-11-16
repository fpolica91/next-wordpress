
import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import axios from 'axios'

const Post = ({ post }) => {
  console.log(post, 'the post')
  if (!post) return <p>...loading</p>
  return (
    <div>  
      <article
        dangerouslySetInnerHTML={{
          __html: post[0].content.rendered,
        }}
      />
    </div>
  )
}

export default Post





export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params
  try {
    const post = await axios.get(
      `http://localhost:80/wp-json/wp/v2/posts?slug=${slug}`
    )

    return {
      props: {
        post: post.data,
      },
    }
  } catch (err) {
    throw new Error(err.message)
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    // fallback will try to find any page that has not been created
    // if fallback false, will return not found.
    paths: [],
    fallback: true,
  }
}
