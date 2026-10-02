const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const {
  getProfile,
  getAllUsers,
  updateUser,
  deleteUser
} = require('../controllers/userController');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management endpoints (Protected)
 */

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get profile of logged-in user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 */
router.get('/profile', protect, getProfile);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get list of all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of registered users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 2
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 */
router.get('/', protect, getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a user's details
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Johnathan Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john.updated@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 6
 *                 example: newsecret123
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Validation error or email conflict
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.put('/:id', protect, updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User with ID 1 deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.delete('/:id', protect, deleteUser);

module.exports = router;
