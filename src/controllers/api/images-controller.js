/**
 * Module for the ImagesController.
 *
 * @author Maja Hedegärd
 * @version 1.0.0
 */
import createError from 'http-errors'
import { Image } from '../../models/image.js'

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
  async loadImage (req, res, next, id) { // Exekveras först, 4 parametrar, id via url.
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
    // vill ha med endast vissa egenskaper - därför skickar man till transfomrtosafe...
    res.json(req.image)
  }

  /**
   * Sends a JSON response containing all images.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async findAll (req, res, next) {
    try {
      const tasks = await Image.getAll()
      res.json(tasks)
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
      //
    } catch (error) {
      next(error)
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
      //
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
    //
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
    //
    } catch (error) {
      next(error)
    }
  }
}
