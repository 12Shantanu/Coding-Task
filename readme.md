Certainly! Let's create API documentation detailing endpoints, request/response formats, and error handling for the final code provided. Additionally, I'll provide setup instructions for setting up the project and database locally.

### API Documentation

#### Endpoints:

1. **Calculate Delivery Cost**
   - Endpoint: `POST /api/v1/pricing/calculate_delivery_cost`
   - Description: Calculates delivery cost based on various factors such as organization, item type, zone, and total distance.
   - Request Body:
     ```json
     {
       "organization_id": 1,
       "item_id": 1,
       "zone": "central",
       "total_distance": 12,
       "item_type": "perishable"
     }
     ```
   - Response:
     ```json
     {
       "total_price": 20.5
     }
     ```
   - Error Handling:
     - 400 Bad Request: Invalid request payload or missing required parameters.
     - 404 Not Found: Organization or item not found.
     - 500 Internal Server Error: Unexpected server error.

#### Request/Response Formats:

- **Request**: JSON format with required parameters specified in the API documentation.
- **Response**: JSON format containing the calculated total price or error message.

#### Error Handling:

- The API handles various types of errors and provides appropriate HTTP status codes and error messages.
- Error messages are returned in JSON format with details about the encountered error.

### Setup Guide

1. **Clone Repository**: 
   Clone the project repository from the GitHub repository.

2. **Install Dependencies**:
   Run `npm install` to install all the project dependencies.

3. **Environment Variables**:
   Create a `.env` file in the project root directory and configure environment variables such as `PORT`, `CORS_ORIGIN`, `HOST`, `POSTGRESQLPORT`, `DATABASE`, `USER`, `PASSWORD` for local development.

4. **Database Setup**:
   - Create a PostgreSQL database locally with the specified schema.
   - `Schema`
   - 
   - CREATE TABLE organizations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50) NOT NULL CHECK (type IN ('perishable', 'non-perishable')),
    description VARCHAR(255) NOT NULL
);

CREATE TABLE pricings (
    organization_id INT REFERENCES organizations(id),
    item_id INT REFERENCES items(id),
    zone VARCHAR(50) NOT NULL,
    base_distance_in_km INT NOT NULL CHECK (base_distance_in_km > 0),
    km_price DECIMAL NOT NULL CHECK (km_price >= 0),
    fix_price DECIMAL NOT NULL CHECK (fix_price >= 0),
    PRIMARY KEY (organization_id, item_id, zone)
);


   - Run the provided SQL script to create the required tables: `organizations`, `items`, and `pricings`.
   - Populate the tables with sample data as needed for testing.

5. **Start the Server**:
   Run `npm run dev` to start the Node.js server. The server will start listening on the specified port.

6. **Access API Documentation**:
   - Once the server is running, access the Swagger documentation at `http://localhost:<port>/api/v1/docs` to explore the API endpoints and test them interactively.

7. **Test API Endpoints**:
   - Use tools like Postman or cURL to test the API endpoints.
   - Ensure that all endpoints function as expected and handle errors gracefully.

By following these setup instructions, you should be able to set up the project and database locally and access the API documentation to understand the endpoints, request/response formats, and error handling.

