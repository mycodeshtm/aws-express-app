const request = require('supertest');
const app = require('./app.js'); // Replace with the actual filename of your Express app

describe('GET /', () => {
    it('responds with "Hello World"', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Hello World');
    });
});

describe('GET /images', () => {
    it('responds with a list of S3 objects', async () => {
        // Mock the S3Client response here if needed
        const s3ClientMock = {
            send: jest.fn(() => Promise.resolve({ Contents: [{ Key: 'image1.jpg' }, { Key: 'image2.jpg' }] })),
        };
        app.locals.s3Client = s3ClientMock;

        const response = await request(app).get('/images');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ Contents: [{ Key: 'image1.jpg' }, { Key: 'image2.jpg' }] });
    });
});

// Add more tests for other endpoints and functionalities as needed
