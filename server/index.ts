import express from 'express'
import { parse } from 'url'
import next from 'next'
const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()
    server.get('*', (request, response) => {
      return handle(request, response)
    })

    // server.post('/book/:slug', (request, response) => {
    //   return response.render('../src/pages/book')
    // })

    server.listen(port, () => console.log(`listening on ${port}`))
  })
  .catch((err) => {
    console.log(err.message)
    process.exit(1)
  })
