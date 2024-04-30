const express = require("express");
const {
  getRestaurants,
  getRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  searchRestaurants,
  getRestaurantslimitfour,
} = require("../controllers/restaurant");

const reservationRouter = require("./reservations");
const reviewRouter = require('./reviews');
const menuRouter = require('./menus');
const router = express.Router();

const { protect, authorize } = require("../middleware/auth");


router.use('/:restaurantId/reservations', reservationRouter);
router.use('/:restaurantId/reviews', reviewRouter);
router.use('/:restaurantId/menus', menuRouter);
router
.route("/limit")
.get(getRestaurantslimitfour)
router
  .route("/")
  .get(getRestaurants) 
  .post(protect, authorize("admin"), createRestaurant);
  
router
  .route("/search/:searchId")
  .get(searchRestaurants);
  
router
  .route("/:id")
  .get(getRestaurant)
  .put(protect, authorize("admin"), updateRestaurant)
  .delete(protect, authorize("admin"), deleteRestaurant);
  
module.exports = router;
/**
 * @swagger
 * tags:
 *   name: Restaurants
 *   description: Operations related to restaurants
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Restaurant:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the restaurant.
 *           example: 60f17500c7ad8b0039d1053e
 *         name:
 *           type: string
 *           description: The name of the restaurant.
 *           example: "Restaurant ABC"
 *         address:
 *           type: string
 *           description: The address of the restaurant.
 *           example: "123 Main Street"
 *         tel:
 *           type: string
 *           description: The telephone number of the restaurant.
 *           example: "123-456-7890"
 *         openingtime:
 *           type: string
 *           description: The opening time of the restaurant.
 *           example: "09:00 AM"
 *         priceRange:
 *           type: number
 *           description: The price range of the restaurant (1-5).
 *           example: 4
 *       required:
 *         - name
 *         - address
 *         - tel
 *         - openingtime
 *         - priceRange
 */

/**
 * @swagger
 * /restaurants:
 *   get:
 *     summary: Get all restaurants.
 *     description: Retrieve all restaurants.
 *     tags: [Restaurants]
 *     responses:
 *       '200':
 *         description: A list of restaurants.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Restaurant'
 *       '500':
 *         description: Internal server error.
 *   post:
 *     summary: Create a new restaurant.
 *     description: Create a new restaurant with the provided details.
 *     tags: [Restaurants]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Restaurant'
 *     responses:
 *       '201':
 *         description: A new restaurant is created successfully.
 *       '400':
 *         description: Bad request. Invalid input data.
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal server error.
 * 
 * /restaurants/limit:
 *   get:
 *     summary: Get four restaurants.
 *     description: Retrieve four restaurants.
 *     tags: [Restaurants]
 *     responses:
 *       '200':
 *         description: A list of four restaurants.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Restaurant'
 *       '500':
 *         description: Internal server error.
 * 
 * /restaurants/{id}:
 *   get:
 *     summary: Get a restaurant by ID.
 *     description: Retrieve a restaurant by its ID.
 *     tags: [Restaurants]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the restaurant to get.
 *     responses:
 *       '200':
 *         description: Restaurant found. Returns the restaurant details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Restaurant'
 *       '404':
 *         description: Restaurant not found.
 *       '500':
 *         description: Internal server error.
 *   put:
 *     summary: Update a restaurant by ID.
 *     description: Update a restaurant with the provided ID.
 *     tags: [Restaurants]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the restaurant to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Restaurant'
 *     responses:
 *       '200':
 *         description: Restaurant updated successfully.
 *       '400':
 *         description: Bad request. Invalid input data.
 *       '401':
 *         description: Unauthorized.
 *       '404':
 *         description: Restaurant not found.
 *       '500':
 *         description: Internal server error.
 *   delete:
 *     summary: Delete a restaurant by ID.
 *     description: Delete a restaurant with the provided ID.
 *     tags: [Restaurants]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the restaurant to delete.
 *     responses:
 *       '204':
 *         description: Restaurant deleted successfully.
 *       '401':
 *         description: Unauthorized.
 *       '404':
 *         description: Restaurant not found.
 *       '500':
 *         description: Internal server error.
 * 
 */