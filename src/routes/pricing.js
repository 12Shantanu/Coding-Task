/**
 * @swagger
 * tags:
 *   name: Pricing
 *   description: Operations related to pricing and delivery cost calculation
 */

/**
 * @swagger
 * /api/v1/pricing/calculate_delivery_cost:
 *   post:
 *     summary: Calculate delivery cost based on various factors
 *     tags: [Pricing]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               organization_id:
 *                 type: integer
 *               item_id:
 *                 type: integer
 *               zone:
 *                 type: string
 *               total_distance:
 *                 type: number
 *               item_type:
 *                 type: string
 *                 enum: ['perishable', 'non-perishable']
 *     responses:
 *       '200':
 *         description: Successful response with the calculated total price
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total_price:
 *                   type: number
 */

import { Router } from "express";
import { calculateDeliveryCost } from "../controllers/pricingController.js";


const router = Router();

//secured Routes
router.route('/calculate_delivery_cost').post(calculateDeliveryCost)

export default router;
