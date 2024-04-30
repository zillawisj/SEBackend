const express = require('express');
const {
    getRestaurantPromos,
    getRestaurantPromo,
    createRestaurantPromo,
    updateRestaurantPromo,
    deleteRestaurantPromo
  } = require("../controllers/restaurantPromos");
  
  const router = express.Router();
  
  const { protect, authorize } = require("../middleware/auth");

  router
    .route("/")
    .get(getRestaurantPromos) 
    .post(protect, authorize("admin"), createRestaurantPromo);
  router
    .route("/:id")
    .get(getRestaurantPromo)
    .put(protect, authorize("admin"), updateRestaurantPromo)
    .delete(protect, authorize("admin"), deleteRestaurantPromo);
  
  module.exports = router;
    /**
 * @swagger
 * components:
 *   schemas:
 *     RestaurantPromo:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the restaurant promotion.
 *           example: 60f17500c7ad8b0039d1053e
 *         name:
 *           type: string
 *           description: The name of the promotion.
 *           example: "Summer Special"
 *         detail:
 *           type: string
 *           description: The details of the promotion.
 *           example: "Enjoy 20% off on selected items!"
 *         restaurant:
 *           type: string
 *           description: The ID of the restaurant associated with the promotion.
 *           example: 60f17452c7ad8b0039d1053d
 *         startDate:
 *           type: string
 *           format: date
 *           description: The start date of the promotion.
 *           example: "2024-05-01"
 *         endDate:
 *           type: string
 *           format: date
 *           description: The end date of the promotion.
 *           example: "2024-05-31"
 *         menu:
 *           type: array
 *           items:
 *             type: string
 *           description: The IDs of the menus associated with the promotion.
 *           example: ["60f17452c7ad8b0039d1053d", "60f17452c7ad8b0039d1053e"]
 *       required:
 *         - name
 *         - detail
 *         - restaurant
 *         - startDate
 *         - endDate
 *         - menu
 */
/**
 * @swagger
 * /promotions:
 *   get:
 *     summary: Get all restaurant promotions.
 *     description: Retrieve all restaurant promotions.
 *     tags: [Restaurant Promotions]
 *     responses:
 *       '200':
 *         description: A list of restaurant promotions.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RestaurantPromo'
 *       '500':
 *         description: Internal server error.
 *   post:
 *     summary: Create a new restaurant promotion.
 *     description: Create a new restaurant promotion.
 *     tags: [Restaurant Promotions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RestaurantPromo'
 *     responses:
 *       '201':
 *         description: Restaurant promotion created successfully.
 *       '401':
 *         description: Unauthorized. User not authenticated.
 *       '403':
 *         description: Forbidden. User not authorized to perform this action.
 *       '500':
 *         description: Internal server error.
 * 
 * /promotions/{id}:
 *   get:
 *     summary: Get a restaurant promotion by ID.
 *     description: Retrieve a restaurant promotion by its ID.
 *     tags: [Restaurant Promotions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the restaurant promotion to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Restaurant promotion found. Returns the promotion details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RestaurantPromo'
 *       '404':
 *         description: Restaurant promotion not found.
 *       '500':
 *         description: Internal server error.
 *   put:
 *     summary: Update a restaurant promotion by ID.
 *     description: Update a restaurant promotion by its ID.
 *     tags: [Restaurant Promotions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the restaurant promotion to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RestaurantPromo'
 *     responses:
 *       '200':
 *         description: Restaurant promotion updated successfully.
 *       '401':
 *         description: Unauthorized. User not authenticated.
 *       '403':
 *         description: Forbidden. User not authorized to perform this action.
 *       '404':
 *         description: Restaurant promotion not found.
 *       '500':
 *         description: Internal server error.
 *   delete:
 *     summary: Delete a restaurant promotion by ID.
 *     description: Delete a restaurant promotion by its ID.
 *     tags: [Restaurant Promotions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the restaurant promotion to delete.
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Restaurant promotion deleted successfully.
 *       '401':
 *         description: Unauthorized. User not authenticated.
 *       '403':
 *         description: Forbidden. User not authorized to perform this action.
 *       '404':
 *         description: Restaurant promotion not found.
 *       '500':
 *         description: Internal server error.
 */