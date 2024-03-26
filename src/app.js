import express from 'express';
import cors from "cors"
import cookieParser from "cookie-parser"



const app = express()
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}))

// Middleware
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(cookieParser())

// Swagger documentation route
//

//router import 
import pricingRoutes from '../src/routes/pricing.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.js';

// Routes
app.use('/api/v1/pricing', pricingRoutes);
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

export { app }