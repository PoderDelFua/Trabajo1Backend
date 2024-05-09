const express = require("express")
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage")
const { createItem } = require("../controllers/storage")
const {authMiddleware} = require("../middleware/session");



/**
 * @openapi
 * /api/storage:
 *  post:
 *      tags:
 *      - Storage
 *      summary: Create a new item
 *      description: ''
 *      requestBody:
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          image:
 *                              type: string
 *                              format: binary
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 */
router.post("/", authMiddleware, uploadMiddleware.single("image"), createItem)
module.exports = router;