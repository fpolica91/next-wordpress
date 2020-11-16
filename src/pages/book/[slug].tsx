import React, { useState, useEffect, useCallback } from 'react'
import { Button } from '@wordpress/components'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import axios from 'axios'

const Book = ({ book }) => {
  if (!book) return <p>...loading</p>
  return (
    <div>  
      <article
        dangerouslySetInnerHTML={{
          __html: book[0].content.rendered,
        }}
      />
    </div>
  )
}

export default Book

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params
  try {
    const book = await axios.get(
      `http://localhost:80/wp-json/wp/v2/books?slug=${slug}`
    )

    return {
      props: {
        book: book.data,
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
