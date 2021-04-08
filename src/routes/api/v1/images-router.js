/**
 * API version 1 routes.
 *
 * @author Maja Hedegärd.
 * @version 1.0.0
 */

import express from 'express'
import { ImagesController } from '../../../controllers/api/images-controller.js'

export const router = express.Router()

const controller = new ImagesController()

// Provide req.image to the route if :id is present in the route path.
router.param('id', (req, res, next, id) => controller.loadImage(req, res, next, id))

// GET images
router.get('/', (req, res, next) => controller.findAll(req, res, next))

// POST images
router.post('/', (req, res, next) => controller.create(req, res, next))

// GET images/:id
router.get('/:id', (req, res, next) => controller.find(req, res, next))

// PUT images/:id
router.put('/:id', (req, res, next) => controller.update(req, res, next))

// PATCH images/:id
router.patch('/:id', (req, res, next) => controller.updateDescription(req, res, next))

// DELETE tasks/:id
router.delete('/:id', (req, res, next) => controller.delete(req, res, next))
