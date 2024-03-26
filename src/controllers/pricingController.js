import pool from "../db/db.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const calculateDeliveryCost = asyncHandler(async (req, res) => {
  try {
    // Validate request body
    const { organization_id, item_id, zone, total_distance, item_type } =
      req.body;


    if (
      !organization_id ||
      !item_id ||
      !zone ||
      !total_distance ||
      !item_type
    ) {
      throw new ApiError(
        400,
        "Missing required parameters in the request body."
        )
    }


    // Fetch pricing details from the database
    const query = `
            SELECT km_price, fix_price
            FROM pricings
            WHERE organization_id = $1 AND zone = $2
        `;
    const { rows } = await pool.query(query, [organization_id, zone]);

    if (rows.length === 0) {
      return res
        .status(404)
        .json(
            new ApiResponse(400, rows, "Pricing not found for the specified organization and zone.")
           );
    }

    const { km_price, fix_price } = rows[0];

    // Convert km_price and fix_price to numbers
    const kmPriceNumber = parseFloat(km_price);
    const fixPriceNumber = parseFloat(fix_price);

    // Check if the conversion was successful
    if (isNaN(kmPriceNumber) || isNaN(fixPriceNumber)) {
      return res
        .status(500)
        .json(
            new ApiResponse(501, kmPriceNumber, "Invalid pricing data retrieved from the database.")
           );
    }

    // Calculate total price
    let total_price = fixPriceNumber; // Initialize total_price with fix_price

    if (total_distance > 5) {

      const extra_distance = total_distance - 5;
      const additional_price =
        item_type === "perishable"
          ? extra_distance * kmPriceNumber
          : extra_distance * 1;

      total_price += additional_price; // Add additional_price to total_price
    }
    else {
        throw new ApiError(100, "Bad Input , Choose Total_distance above base_distance")
    }
   

    res.json({ total_price });
    total_price = 0;


  } catch (error) {
    
    throw new ApiError(401, error?.message  || "Error calculating delivery cost:");

  }
});


export {
    calculateDeliveryCost
};
