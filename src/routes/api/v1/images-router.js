/**
 * API version 1 routes.
 *
 * @author Maja Hedegärd.
 * @version 1.0.0
 */

import express from 'express'
import jwt from 'jsonwebtoken'
import createError from 'http-errors'
import { ImagesController } from '../../../controllers/api/images-controller.js'

export const router = express.Router()

const controller = new ImagesController()

/**
 * Authenticates requests.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const authenticateJWT = (req, res, next) => {
  const authorization = req.headers.authorization?.split(' ')

  if (authorization?.[0] !== 'Bearer') {
    next(createError(401))
    return
  }

  try {
    const token = Buffer.from(process.env.ACCESS_TOKEN_SECRET, 'base64')
    req.jwt = jwt.verify(authorization[1], token)

    req.user = {
      email: req.jwt.email
    }
    next()
  } catch (err) {
    next(createError(403))
  }
}

/**
 * Authorize requests.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const hasPermission = (req, res, next) => {
  if (req.user.email === req.image.user) {
    next()
  } else {
    next(createError(403))
  }
}

// Provide req.image to the route if :id is present in the route path.
router.param('id', (req, res, next, id) => controller.loadImage(req, res, next, id))

// GET images
router.get('/', authenticateJWT, (req, res, next) => controller.findAll(req, res, next))

// POST images
router.post('/', authenticateJWT, (req, res, next) => controller.create(req, res, next))

// GET images/:id
router.get('/:id', authenticateJWT, (req, res, next) => hasPermission(req, res, next), (req, res, next) => controller.find(req, res, next))

// PUT images/:id
router.put('/:id', authenticateJWT, (req, res, next) => hasPermission(req, res, next), (req, res, next) => controller.update(req, res, next))

// PATCH images/:id
router.patch('/:id', authenticateJWT, (req, res, next) => hasPermission(req, res, next), (req, res, next) => controller.partiallyUpdate(req, res, next))

// DELETE tasks/:id
router.delete('/:id', authenticateJWT, (req, res, next) => hasPermission(req, res, next), (req, res, next) => controller.delete(req, res, next))
