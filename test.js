const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { fromBase64 } = require("@aws-sdk/util-base64-node");
const express = require('express');

const app = express();
const PORT = 3000;
const s3Client =new S3Client({
    region: 'us-east-1',
    endpoint: 'http://localhost:4566',
    forcePathStyle: true
});

app.post('/images', async (req, res) => {
    const file = req.files ? req.files.image : null;
    if (!file) {
        res.status(400).send('No file provided');
        return;
    }

    const fileName = file.name;
    const fileData = fromBase64(file.data); // Assuming req.files.image contains base64 encoded file data

    const uploadParams = {
        Bucket: 'your-bucket-name', // Replace with your S3 bucket name
        Key: fileName,
        Body: fileData
    };

    try {
        const command = new PutObjectCommand(uploadParams);
        await s3Client.send(command);
        console.log('File uploaded successfully');
        res.status(200).send('File uploaded successfully');
    } catch (err) {
        console.error('Error uploading file:', err);
        res.status(500).send('Internal Server Error');
    }
});
