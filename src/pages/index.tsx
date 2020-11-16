import React from 'react'
import Link from 'next/link'
import axios from 'axios'
import { GetServerSideProps } from 'next'

export default function Home({ books }) {
  return (
    <div>
      {books.map((book) => (
        <div key={book.id}>
          <h1>{book.title.rendered}</h1>
          <article
            className="entry-content"
            dangerouslySetInnerHTML={{
              __html: book.excerpt.rendered,
            }}
          />
          <Link href={`/book/${book.slug}`}>
            <a>{book.title.rendered}</a>
          </Link>
        </div>
      ))}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const books = await axios.get('http://localhost:80/wp-json/wp/v2/books')
  return {
    props: {
      books: books.data,
    },
  }
}
