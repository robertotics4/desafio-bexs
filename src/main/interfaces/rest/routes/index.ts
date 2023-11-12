import { Router } from 'express';
import { Joi, Segments, celebrate } from 'celebrate';
import { CreateRouteController, ListRoutesController } from '../controllers';
import { FindBestPathController } from '../controllers/FindBestPathController';

const router = Router();

const createRouteController = new CreateRouteController();
const listRoutesController = new ListRoutesController();
const findBestPathController = new FindBestPathController();

/**
 * @swagger
 * components:
 *   schemas:
 *     Route:
 *       type: object
 *       properties:
 *         origin:
 *           type: string
 *           description: The origin location code (e.g., "GRU").
 *         destination:
 *           type: string
 *           description: The destination location code (e.g., "BRC").
 *         price:
 *           type: number
 *           description: The price for the route.
 *       example:
 *         origin: "GRU"
 *         destination: "BRC"
 *         price: 10
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PathRequest:
 *       type: object
 *       properties:
 *         origin:
 *           type: string
 *           minLength: 3
 *           maxLength: 3
 *           pattern: '^[A-Z]{3}$'
 *           description: The origin location code (e.g., "GRU").
 *         destination:
 *           type: string
 *           minLength: 3
 *           maxLength: 3
 *           pattern: '^[A-Z]{3}$'
 *           description: The destination location code (e.g., "CDG").
 *       example:
 *         origin: "GRU"
 *         destination: "CDG"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PathResponse:
 *       type: object
 *       properties:
 *         routes:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Route'
 *           description: List of routes forming the best path.
 *         price:
 *           type: number
 *           description: Total price for the best path.
 *         formatted:
 *           type: string
 *           description: Formatted string representing the best path and total price.
 *       example:
 *         routes:
 *           - origin: "GRU"
 *             destination: "BRC"
 *             price: 10
 *           - origin: "BRC"
 *             destination: "SCL"
 *             price: 5
 *           - origin: "SCL"
 *             destination: "ORL"
 *             price: 20
 *           - origin: "ORL"
 *             destination: "CDG"
 *             price: 5
 *         price: 40
 *         formatted: "GRU - BRC - SCL - ORL - CDG > $40"
 */

/**
 * @swagger
 * /routes:
 *   post:
 *     summary: Create a new route
 *     tags:
 *       - Route
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Route'
 *     responses:
 *       '201':
 *         description: Route successfully created
 *         content:
 *           application/json:
 *             $ref: '#/components/schemas/Route'
 *       '400':
 *         description: Bad request. Validation error in the request body.
 *         content:
 *           application/json:
 *             example:
 *               message: "Validation error"
 *               details: [
 *                 {
 *                   context: {
 *                     key: "origin"
 *                   },
 *                   message: "Invalid origin"
 *                 },
 *                 {
 *                   context: {
 *                     key: "price"
 *                   },
 *                   message: "Price must be a positive number with precision 2"
 *                 }
 *               ]
 */
router.post(
  '/routes',
  celebrate({
    [Segments.BODY]: {
      origin: Joi.string().length(3).uppercase().required(),
      destination: Joi.string().length(3).uppercase().required(),
      price: Joi.number().positive().precision(2).required(),
    },
  }),
  createRouteController.handle,
);

/**
 * @swagger
 * /routes:
 *   get:
 *     summary: Retrieve all available routes
 *     tags:
 *       - Route
 *     responses:
 *       '200':
 *         description: Successful response with a list of routes
 *         content:
 *           application/json:
 *             example:
 *               count: 7
 *               rows:
 *                 - $ref: '#/components/schemas/Route'
 */
router.get('/routes', listRoutesController.handle);

/**
 * @swagger
 * /path:
 *   post:
 *     summary: Find the best path between two locations
 *     tags:
 *       - Path
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PathRequest'
 *     responses:
 *       '200':
 *         description: Successful response with the best path and pricing details
 *         content:
 *           application/json:
 *             $ref: '#/components/schemas/PathResponse'
 *       '400':
 *         description: Bad request. Validation error in the request body.
 *         content:
 *           application/json:
 *             example:
 *               message: "Validation error"
 *               details: [
 *                 {
 *                   context: {
 *                     key: "origin"
 *                   },
 *                   message: "Invalid origin"
 *                 },
 *                 {
 *                   context: {
 *                     key: "destination"
 *                   },
 *                   message: "Invalid destination"
 *                 }
 *               ]
 */
router.post(
  '/path',
  celebrate({
    [Segments.BODY]: {
      origin: Joi.string().length(3).uppercase().required(),
      destination: Joi.string().length(3).uppercase().required(),
    },
  }),
  findBestPathController.handle,
);

export { router };
