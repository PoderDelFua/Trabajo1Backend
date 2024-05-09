const express = require("express")
const router = express.Router()
const {authMiddleware} = require("../middleware/session")
const checkRol = require("../middleware/rol")
const { getItems, getItem, createItem, updateItem, deleteItem, updateRol, createResena, getUsersByCityAndRecieveOffers} = require("../controllers/users")
const { validatorUpdateRol, validatorGetItem,validatorUpdateUser } = require("../validators/users")
/**
 * @openapi
 * /api/auth/users:
 *  get:
 *      tags:
 *      - User
 *      summary: Get users in the System
 *      description: ''
 *      responses:
 *          '200':
 *              description: Returns the users
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.get("/", getItems)
router.get("/:id", getItem)
router.post("/", createItem)
router.post("/createResena",authMiddleware, validatorUpdateUser, createResena)
router.get("/ofertas/:ciudad", getUsersByCityAndRecieveOffers)

router.patch("/:id", authMiddleware, checkRol(['admin']),validatorGetItem, validatorUpdateRol, updateRol)
router.delete("/deleteUser/:id", authMiddleware, validatorGetItem, deleteItem)
router.patch("/updateUser/:id", authMiddleware, validatorUpdateUser, updateItem)
module.exports = router