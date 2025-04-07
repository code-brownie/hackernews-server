import { appDocs } from './swagger';

const openApiSpec = appDocs.getOpenAPIDocument({
    openapi: '3.1.0',
    info: {
        title: 'Social Media API',
        version: '1.0.0',
        description: 'API for a social media application'
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Local development server'
        }
    ]
});