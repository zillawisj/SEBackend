const express = require('express');
const { getReviews,getReview,addReview,deleteReview, updateReview} = require('../controllers/menureview');

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
 * components:
 *   schemas:
 *     MenuReview:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the menu item.
 *           example: 60f17500c7ad8b0039d1053e
 *         rating:
 *           type: number
 *           description: The rate of the menu item.
 *           example: 4.5
 *         comment:
 *           type: string
 *           description: The comment of the menu item.
 *           example: "Delicious"
 *         user:
 *           type: string
 *           description: The ID of user to which the review item belongs.
 *           example: 60f17452c7ad8b0039d1053d
 *         menu:
 *           type: string
 *           description: The ID of menu to which the review item belongs.
 *           example: 60f17452c7ad8b000c7ad8b0
 *       required:
 *         - rating
 *         - comment
 *         - user
 *         - menu
 */
/**
 * @swagger
 *  /restaurants/{id}/menus/{menuId}/menureviews:
 *   get:
 *     summary: Get all menu reviews.
 *     description: Retrieve all menu reviews for a specific menu item.
 *     tags: [Menu Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the restaurant.
 *         schema:
 *           type: string
 *       - in: path
 *         name: menuId
 *         required: true
 *         description: ID of the menu item.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A list of menu reviews.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MenuReview'
 *       '500':
 *         description: Internal server error.
 *   post:
 *     summary: Add a new menu review.
 *     description: Add a new review for a menu item.
 *     tags: [Menu Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the restaurant.
 *         schema:
 *           type: string
 *       - in: path
 *         name: menuId
 *         required: true
 *         description: ID of the menu item.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MenuReview'
 *     responses:
 *       '201':
 *         description: Menu review added successfully.
 *       '401':
 *         description: Unauthorized. User not authenticated.
 *       '403':
 *         description: Forbidden. User not authorized to perform this action.
 *       '500':
 *         description: Internal server error.
 * /restaurants/{id}/menus/{menuId}/menureviews/{reviewId}:
 *   get:
 *     summary: Get a menu review by ID.
 *     description: Retrieve a menu review by its ID.
 *     tags: [Menu Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the restaurant.
 *         schema:
 *           type: string
 *       - in: path
 *         name: menuId
 *         required: true
 *         description: ID of the menu item.
 *         schema:
 *           type: string
 *       - in: path
 *         name: reviewId
 *         required: true
 *         description: ID of the menu review.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Menu review found. Returns the menu review details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MenuReview'
 *       '404':
 *         description: Menu review not found.
 *       '500':
 *         description: Internal server error.
 *   put:
 *     summary: Update a menu review by ID.
 *     description: Update a menu review with the provided ID.
 *     tags: [Menu Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the restaurant.
 *         schema:
 *           type: string
 *       - in: path
 *         name: menuId
 *         required: true
 *         description: ID of the menu item.
 *         schema:
 *           type: string
 *       - in: path
 *         name: reviewId
 *         required: true
 *         description: ID of the menu review to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MenuReview'
 *     responses:
 *       '200':
 *         description: Menu review updated successfully.
 *       '400':
 *         description: Bad request. Invalid input data.
 *       '401':
 *         description: Unauthorized. User not authenticated.
 *       '403':
 *         description: Forbidden. User not authorized to perform this action.
 *       '404':
 *         description: Menu review not found.
 *       '500':
 *         description: Internal server error.
 *   delete:
 *     summary: Delete a menu review by ID.
 *     description: Delete a menu review with the provided ID.
 *     tags: [Menu Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the restaurant.
 *         schema:
 *           type: string
 *       - in: path
 *         name: menuId
 *         required: true
 *         description: ID of the menu item.
 *         schema:
 *           type: string
 *       - in: path
 *         name: reviewId
 *         required: true
 *         description: ID of the menu review to delete.
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Menu review deleted successfully.
 *       '401':
 *         description: Unauthorized. User not authenticated.
 *       '403':
 *         description: Forbidden. User not authorized to perform this action.
 *       '404':
 *         description: Menu review not found.
 *       '500':
 *         description: Internal server error.
 */