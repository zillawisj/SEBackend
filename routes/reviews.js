const express = require('express');
const { getReviews,getReview,addReview,deleteReview, updateReview} = require('../controllers/review');

const router = express.Router({ mergeParams: true });

const { protect ,authorize } = require('../middleware/auth');

router.route('/')
    .get(getReviews)
    .post(protect,authorize('admin','user'),addReview);
router.route('/:id')
    .get(getReview)
    .put(protect,authorize('admin','user'),updateReview)
    .delete(protect,authorize('admin','user'),deleteReview);

module.exports = router;
/**
 * @swagger
 * tags:
 *   name: Restaurant Reviews
 *   description: Operations related to restaurant reviews
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the review.
 *           example: 60f17500c7ad8b0039d1053e
 *         rating:
 *           type: number
 *           description: The rating given for the restaurant.
 *           example: 4.5
 *         comment:
 *           type: string
 *           description: The comment for the restaurant.
 *           example: "Great restaurant, excellent service!"
 *         user:
 *           type: string
 *           description: The ID of the user who submitted the review.
 *           example: 60f17452c7ad8b0039d1053d
 *         restaurant:
 *           type: string
 *           description: The ID of the restaurant being reviewed.
 *           example: 60f17452c7ad8b0039d1053d
 *       required:
 *         - rating
 *         - comment
 *         - user
 *         - restaurant
 */

/**
 * @swagger
 * /restaurants/{id}/reviews:
 *   get:
 *     summary: Get all reviews.
 *     description: Retrieve all review items for a restaurant.
 *     tags: [Restaurant Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the restaurant whose reviews are to be retrieved.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A list of review items.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       '500':
 *         description: Internal server error.
 *   post:
 *     summary: Create a new review.
 *     description: Create a new review item for a restaurant.
 *     tags: [Restaurant Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the restaurant to which the review belongs.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       '201':
 *         description: A new review item is created successfully.
 *       '400':
 *         description: Bad request. Invalid input data.
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal server error.
 * /restaurants/{id}/reviews/{reviewId}:
 *   put:
 *     summary: Update a review.
 *     description: Update an existing review item for a restaurant.
 *     tags: [Restaurant Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the restaurant to which the review belongs.
 *         schema:
 *           type: string
 *       - in: path
 *         name: reviewId
 *         required: true
 *         description: ID of the review to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       '200':
 *         description: Review updated successfully.
 *       '400':
 *         description: Bad request. Invalid input data.
 *       '401':
 *         description: Unauthorized.
 *       '404':
 *         description: Review not found.
 *       '500':
 *         description: Internal server error.
 *   delete:
 *     summary: Delete a review.
 *     description: Delete an existing review item for a restaurant.
 *     tags: [Restaurant Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the restaurant to which the review belongs.
 *         schema:
 *           type: string
 *       - in: path
 *         name: reviewId
 *         required: true
 *         description: ID of the review to delete.
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Review deleted successfully.
 *       '401':
 *         description: Unauthorized.
 *       '404':
 *         description: Review not found.
 *       '500':
 *         description: Internal server error.
 */