import swaggerJSDoc from 'swagger-jsdoc';

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: 'Food Delivery API',
            version: '1.0.0',
            description: 'API documentation for the Food Delivery App',
            contact: {
                name: "Shantanu Sameer",
                email: "shantanu.sameer12@gmail.com",
            },
        },
        basePath: '/',
        servers: [
            {
                url: "https://coding-task.onrender.com/",
            },
        ],
    },
    apis: ['./src/routes/*.js'], // Path to the API routes folder
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;