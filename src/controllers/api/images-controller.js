/**
 * Module for the ImagesController.
 *
 * @author Maja Hedegärd
 * @version 1.0.0
 */
import createError from 'http-errors'
import { Image } from '../../models/image.js'
import fetch from 'node-fetch'

/**
 * Encapsulates a controller.
 */
export class ImagesController {
  /**
   * Provide req.image to the route if :id is present.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @param {string} id - The value of the id for the image to load.
   */
  async loadImage (req, res, next, id) {
    try {
      // Get the image.
      const image = await Image.getById(id)

      // If no image found send a 404 (Not Found).
      if (!image) {
        next(createError(404))
        return
      }
      // Provide the image to req.
      req.image = image
      // Next middleware.
      next()
    } catch (error) {
      next(error)
    }
  }

  /**
   * Sends a JSON response containing an image.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async find (req, res, next) {
    try {
      console.log(req.image)
      const image = {
        imageUrl: req.image.imageUrl,
        location: req.image.location,
        description: req.image.description,
        createdAt: req.image.createdAt,
        updatedAt: req.image.updatedAt,
        id: req.image.id
      }
      res.json(image)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Sends a JSON response containing the users images.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async findAll (req, res, next) {
    try {
      const images = await Image.getAll()
      const userImages = []
      images.forEach(image => {
        if (req.user.email === image.user) {
          const img = {
            imageUrl: image.imageUrl,
            location: image.location,
            description: image.description,
            createdAt: image.createdAt,
            updatedAt: image.updatedAt,
            id: image.id
          }
          userImages.push(img)
        }
      })
      res.json(userImages)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Creates a new image.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async create (req, res, next) {
    try {
      const requestData = {
        data: req.body.data,
        contentType: req.body.contentType
      }

      const response = await fetch(process.env.IMAGE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'PRIVATE-TOKEN': process.env.PERSONAL_ACCESS_TOKEN
        },
        body: JSON.stringify(requestData)
      })
      const data = await response.json()

      const image = await Image.insert({
        imageUrl: data.imageUrl,
        description: req.body.description,
        location: req.body.location,
        user: req.user.email,
        imageId: data.id
      })

      const imageRes = {
        imageUrl: image.imageUrl,
        location: image.location,
        description: image.description,
        createdAt: image.createdAt,
        updatedAt: image.updatedAt,
        id: image.id
      }

      res
        .status(201)
        .json(imageRes)
    } catch (error) {
      let err = error
      if (error.name === 'ValidationError') {
        // Validation error(s).
        err = createError(400)
        err.innerException = error
      }
      next(err)
    }
  }

  /**
   * Updates a specific image.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   *
   */
  async update (req, res, next) {
    try {
      const payload = {
        data: req.body.data,
        contentType: req.body.contentType
      }

      await fetch(`${process.env.IMAGE_URL}/${req.image.imageId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'PRIVATE-TOKEN': process.env.PERSONAL_ACCESS_TOKEN
        },
        body: JSON.stringify(payload)
      })

      await req.image.update({
        description: req.body.description,
        location: req.body.location
      })

      res
        .status(204)
        .end()
    } catch (error) {
      next(error)
    }
  }

  /**
   * Partially updates a specific image.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async partiallyUpdate (req, res, next) {
    try {
      await req.image.update({
        description: req.body.description,
        location: req.body.location
      })
      res
        .status(204)
        .end()
    } catch (error) {
      next(error)
    }
  }

  /**
   * Deletes a specific image.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   *
   */
  async delete (req, res, next) {
    try {
      await fetch(`${process.env.IMAGE_URL}/${req.image.imageId}`, {
        method: 'DELETE',
        headers: {
          'PRIVATE-TOKEN': process.env.PERSONAL_ACCESS_TOKEN
        }
      })

      await req.image.delete()

      res
        .status(204)
        .end()
    } catch (error) {
      next(error)
    }
  }
}
