const express = require('express');
const { getReservations,getReservation,addReservation,updateReservation,deleteReservation} = require('../controllers/reservation');

const router = express.Router({ mergeParams: true });

const { protect ,authorize } = require('../middleware/auth');

router.route('/')
    .get(protect,getReservations)
    .post(protect,authorize('admin','user'),addReservation);
router.route('/:id')
    .get(protect,getReservation)
    .put(protect,authorize('admin','user'),updateReservation)
    .delete(protect,authorize('admin','user'),deleteReservation);

module.exports = router;
// Swagger documentation
/**
 * @swagger
 * tags:
 *   name: Reservations
 *   description: Operations related to reservations
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Reservation:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the reservation.
 *           example: 60f17500c7ad8b0039d1053e
 *         rsvDate:
 *           type: string
 *           format: date
 *           description: The date of the reservation.
 *           example: "2024-05-01"
 *         user:
 *           type: string
 *           description: The ID of the user who made the reservation.
 *           example: 60f17452c7ad8b0039d1053d
 *         restaurant:
 *           type: string
 *           description: The ID of the restaurant for the reservation.
 *           example: 60f17452c7ad8b0039d1053d
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the reservation was created.
 *           example: "2024-04-30T12:00:00.000Z"
 *       required:
 *         - rsvDate
 *         - user
 *         - restaurant
 */
/**
 * @swagger
 * securitySchemes:
 *   bearerAuth:
 *     type: http
 *     scheme: bearer
 *     bearerFormat: JWT
 */
/**
 * @swagger
 * /reservations:
 *   get:
 *     summary: Get all reservations.
 *     description: Retrieve all reservations.
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of reservations.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reservation'
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal server error.
 *
 *   post:
 *     summary: Create a new reservation.
 *     description: Create a new reservation.
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reservation'
 *     responses:
 *       '201':
 *         description: Successfully created a reservation.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       '400':
 *         description: Bad Request.
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal server error.
 *
 * /reservations/{id}:
 *   get:
 *     summary: Get a reservation by ID.
 *     description: Retrieve a reservation by its ID.
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Reservation found. Returns the reservation details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       '401':
 *         description: Unauthorized.
 *       '404':
 *         description: Reservation not found.
 *       '500':
 *         description: Internal server error.
 *
 *   put:
 *     summary: Update a reservation by ID.
 *     description: Update a reservation by its ID.
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reservation'
 *     responses:
 *       '200':
 *         description: Reservation updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       '400':
 *         description: Bad Request.
 *       '401':
 *         description: Unauthorized.
 *       '404':
 *         description: Reservation not found.
 *       '500':
 *         description: Internal server error.
 *
 *   delete:
 *     summary: Delete a reservation by ID.
 *     description: Delete a reservation by its ID.
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Reservation deleted successfully.
 *       '401':
 *         description: Unauthorized.
 *       '404':
 *         description: Reservation not found.
 *       '500':
 *         description: Internal server error.
 */