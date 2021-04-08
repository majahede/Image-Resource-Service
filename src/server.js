import express from 'express'
import logger from 'morgan'
import helmet from 'helmet'
import { router } from './routes/router.js'
import { connectDB } from './config/mongoose.js'

/**
 * The main function of the application.
 */
const main = async () => {
  // Connect to database.
  await connectDB()

  const app = express()

  // Set up a morgan logger.
  app.use(logger('dev'))

  // Set HTTP headers.
  app.use(helmet())

  // Parse requests of the content type application/json.
  app.use(express.json())

  // register routes
  app.use('/', router)

  // Error handler.
  app.use(function (err, req, res, next) {
    err.status = err.status || 500

    if (req.app.get('env') !== 'development') {
      res
        .status(err.status)
        .json({
          status: err.status,
          message: err.message
        })
      return
    }
    // Development only!
    // Only providing detailed error in development.
    return res
      .status(err.status)
      .json(err)
  })

  app.listen(process.env.PORT, () => {
    console.log(`Server running now at http://localhost:${process.env.PORT}`)
    console.log('Press Ctrl-C to terminate...')
  })
}

main().catch(console.error)
