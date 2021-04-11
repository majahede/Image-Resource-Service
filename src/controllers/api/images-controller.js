/**
 * Module for the ImagesController.
 *
 * @author Maja Hedegärd
 * @version 1.0.0
 */
// import createError from 'http-errors'
// import { Image } from '../../models/image.js'
const token = Buffer.from(process.env.ACCESS_TOKEN_SECRET, 'base64')
/**
 * Encapsulates a controller.
 */
export class ImagesController {
  /**
   * Transforms an Image object to an "safe" object to convert to JSON.
   *
   * @param {object} image - The Image object to convert to a "safe" object.
   * @returns {object} A "safe" object representing the given Image object.
   */
  _transformToSafeImage (image) {
    //
    return image
  }

  /**
   * Provide req.image to the route if :id is present.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @param {string} id - The value of the id for the task to load.
   */
  async loadImage (req, res, next, id) { // Exekveras först, 4 parametrar, id via url.
    try {
      // Image.findOne -- Hitta objectet i databasen. 404 om inget hittas.
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
      //
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
