const express = require('express');

const app = express();
const PORT = 3000;
const { S3Client, ListObjectsV2Command, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const fileUpload = require('express-fileupload');

const s3Client = new S3Client({
    region: 'us-east-1',
    endpoint: 'http://localhost:4566',
    forcePathStyle: true
});

const listObjectsParams = {
    Bucket: 'my-cool-local-bucket'
};

listObjectsCmd = new ListObjectsV2Command(listObjectsParams);

s3Client.send(listObjectsCmd);

//root path to show message when the application is working
app.get('/', (req,res) => {
    req.status(200);
    res.send('Hello World')
});

//return images that are located in S3 bucket
app.get('/images', (req,res) => {
    listObjectsParams ={
        Bucket: my-cool-local-bucket
    }
    s3Client.send(new ListObjectsV2Command(listObjectsParams))
        .then((listObjectsResponse) => {
            res.send(listObjectsResponse)
        })
});

//uploads a file and returns a response
app.post('/images', (req,res) => {
    const file = req.files.image
    const fileName = req.files.imgage.name
    const tempPath = `${UPLOAD_TEMP_PATH}/${fileName}`
    file.mv(tempPath, (err) => {res.status(500)})
})

app.listen(PORT, (error) => {
    if(!error)
        console.log('The app is a success!');
    else 
        console.log('Something is terribly wrong!', error);
});