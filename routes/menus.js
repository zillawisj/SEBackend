const express = require("express");
const {
  getMenus,
  getMenu,
  createMenu,
  updateMenu,
  deleteMenu,
} = require("../controllers/menu");

const reviewRouter = require('./menureviews');
const router = express.Router({ mergeParams: true });

const { protect, authorize } = require("../middleware/auth");

router.use('/:menuId/menureviews', reviewRouter);

router
  .route("/")
  .get(getMenus) 
  .post(protect, authorize("admin"), createMenu);

router
  .route("/:id")
  .get(getMenu)
  .put(protect, authorize("admin"), updateMenu)
  .delete(protect, authorize("admin"), deleteMenu);
  
module.exports = router;
/**
 * @swagger
 * components:
 *   schemas:
 *     Menu:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the menu item.
 *           example: 60f17500c7ad8b0039d1053e
 *         name:
 *           type: string
 *           description: The name of the menu item.
 *           example: "Spaghetti Carbonara"
 *         price:
 *           type: number
 *           description: The price of the menu item.
 *           example: 12.99
 *         restaurant:
 *           type: string
 *           description: The ID of the restaurant to which the menu item belongs.
 *           example: 60f17452c7ad8b0039d1053d
 *       required:
 *         - name
 *         - price
 *         - restaurant
 */

/**
 * @swagger
 * tags:
 *   name: Menus
 *   description: API endpoints for managing menus
 */

/**
 * @swagger
 * /restaurants/{id}/menus:
 *   get:
 *     summary: Get all menus.
 *     description: Retrieve all menu items for a restaurant.
 *     tags: [Menus]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the restaurant whose menus are to be retrieved.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A list of menu items.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Menu'
 *       '500':
 *         description: Internal server error.
 *   post:
 *     summary: Create a new menu item.
 *     description: Create a new menu item with the provided details.
 *     tags: [Menus]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the restaurant to which the menu item belongs.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Menu'
 *     responses:
 *       '201':
 *         description: A new menu item is created successfully.
 *       '400':
 *         description: Bad request. Invalid input data.
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal server error.
 */
/**
 * @swagger
 * /restaurants/{id}/menus/{menuId}:
 *   put:
 *     summary: Update a menu item by ID.
 *     description: Update a menu item with the provided ID.
 *     tags: [Menus]
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
 *             $ref: '#/components/schemas/Menu'
 *     responses:
 *       '200':
 *         description: Menu item updated successfully.
 *       '400':
 *         description: Bad request. Invalid input data.
 *       '401':
 *         description: Unauthorized.
 *       '404':
 *         description: Menu item not found.
 *       '500':
 *         description: Internal server error.
 *   delete:
 *     summary: Delete a menu item by ID.
 *     description: Delete a menu item with the provided ID.
 *     tags: [Menus]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the menu item to delete.
 *     responses:
 *       '204':
 *         description: Menu item deleted successfully.
 *       '401':
 *         description: Unauthorized.
 *       '404':
 *         description: Menu item not found.
 *       '500':
 *         description: Internal server error.
 */