const express = require('express');
const fileUpload = require('express-fileupload');
const { S3Client, PutObjectCommand, ListObjectsV2Command } = require('@aws-sdk/client-s3');

const app = express();
const PORT = 3000;
const UPLOAD_TEMP_PATH = 'temp'; // Replace with the actual path
const s3Client = new S3Client({
    region: 'us-east-1',
    endpoint: 'http://localhost:4566',
    forcePathStyle: true
});
const BUCKET_NAME = 'my-cool-local-bucket'; // Replace with your bucket name

app.use(fileUpload());

app.get('/', (req, res) => {
    res.status(200).send('Hello World');
});

app.get('/images', async (req, res) => {
    try {
        const listObjectsParams = {
            Bucket: BUCKET_NAME
        };
        const listObjectsResponse = await s3Client.send(new ListObjectsV2Command(listObjectsParams));
        res.send(listObjectsResponse);
    } catch (error) {
        console.error('Error listing objects:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/images', async (req, res) => {
    const file = req.files ? req.files.image : null;
    if (!file) {
        res.status(400).send('No file provided');
        return;
    }

    const fileName = file.name;

    const uploadParams = {
        Bucket: BUCKET_NAME,
        Key: fileName,
        Body: file.data
    };

    try {
        const command = new PutObjectCommand(uploadParams);
        await s3Client.send(command);
        console.log('File uploaded successfully');
        res.status(200).send('File uploaded successfully');
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, (error) => {
    if (!error)
        console.log('The app is a success!');
    else
        console.log('Something is terribly wrong!', error);
});
