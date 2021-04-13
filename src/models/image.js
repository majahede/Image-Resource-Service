/**
 * Mongoose model Image.
 *
 * @author Maja Hedegärd
 * @version 1.0.0
 */

import mongoose from 'mongoose'

// Create a schema.
const imageSchema = new mongoose.Schema({
  imageUrl: {
    type: String
  },
  description: {
    type: String,
    trim: true,
    minlength: 1
  },
  location: {
    type: String
  },
  user: {
    type: String
  }
}, {
  timestamps: true,
  versionKey: false,
  toJSON: {
    /**
     * Performs a transformation of the resulting object to remove sensitive information.
     *
     * @param {object} doc - The mongoose document which is being converted.
     * @param {object} ret - The plain object representation which has been converted.
     */
    transform: function (doc, ret) {
      delete ret._id
    },
    virtuals: true // ensure virtual fields are serialized
  }
})

imageSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

/**
 * Gets all images.
 *
 * @returns {Promise<Image[]>} The Promise to be fulfilled.
 */
imageSchema.statics.getAll = async function () {
  return this.find({})
}

/**
 * Gets an image by ID.
 *
 * @param {string} id - The value of the id for the image to get.
 * @returns {Promise<Image>} The Promise to be fulfilled.
 */
imageSchema.statics.getById = async function (id) {
  return this.findOne({ _id: id })
}

/**
 * Inserts a new image.
 *
 * @param {object} imageData - ...
 * @param {string} imageData.description - ...
 * @param {string} imageData.imgUrl - ...
 * @param {string} imageData.location - ...
 * @param {string} imageData.id - ...
 * @returns {Promise<Image>} The Promise to be fulfilled.
 */
imageSchema.statics.insert = async function (imageData) {
  const image = new Image(imageData)
  return image.save()
}

/**
 * Updates an image.
 *
 * @param {object} imageData - ...
 * @param {string} imageData.description - ...
 * @param {string} imageData.imgUrl - ...
 * @param {string} imageData.location - ...
 * @param {string} imageData.id - ...
 * @returns {Promise} The Promise to be fulfilled.
 */
imageSchema.methods.update = async function (imageData) {
  //
  return this.save()
}

/**
 * Deletes an image.
 *
 * @returns {Promise} The Promise to be fulfilled.
 */
imageSchema.methods.delete = async function () {
  return this.remove()
}

// Create a model using the schema.
export const Image = mongoose.model('Image', imageSchema)
