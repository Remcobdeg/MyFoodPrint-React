// Load dependencies
require('dotenv').config();
const aws = require('aws-sdk');
const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
const HttpError = require('../models/http-error');

const ENDPOINT = process.env.DOSPACE_ENDPOINT;
const ACCESS_KEY = process.env.DOSPACE_ACCESS_KEY;
const ACCESS_SECRET = process.env.DOSPACE_ACCESS_SECRET;
const BUCKET_NAME = process.env.DOSPACE_BUCKET_NAME;

aws.config.update({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: ACCESS_SECRET,
});

// Set S3 endpoint to DigitalOcean Spaces
const spacesEndpoint = new aws.Endpoint(ENDPOINT);
const s3 = new aws.S3({
  endpoint: spacesEndpoint,
});

// upload file to DigitalOcean Spaces
const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: BUCKET_NAME,
      metadata: function (req, file, cb) {
        cb(null, {fieldName: 'Receipt'}); file.fieldname
      },
      key: function (req, file, cb) {
        console.log(file);
        cb(null, 'image-' + req.params.userId + "-" + Date.now() + '.jpg');
      }
    })
  })

  const download_in_backend = async (req, res, next) => {

    const params = {
        Bucket: BUCKET_NAME,
        Key: req.params.imageName
    };

    // await new Promise((resolve, reject) => {
    //     s3.getObject(params)
    //     .createReadStream()
    //     .on('end', () => { 
    //         return resolve(); 
    //     }).on('error', (error) => { 
    //         return reject(error); 
    //     }).pipe(file)});

        const response = await s3.getObject(params).promise() // await the promise
        return(response);

  }

  const download = async function(req, res, next) {

    try {
        const file = await download_in_backend(req, res, next);
        res.status(200).send(file.Body);
    } catch (error) {
        console.log(error);
        return next(new HttpError('Could not download file', 500));
    }

    // const params = {
    //     Bucket: BUCKET_NAME,
    //     Key: req.params.imageName
    // };

    // console.log(params.Bucket, params.Key);

    // try {
    //     const response = await s3.getObject(params).promise() // await the promise
    //     // console.log(response);
    //     const fileContent = response.Body.toString('utf-8');
    //     res.status(200).send(response.Body);
    // } catch (error) {
    //     console.log(error);
    //     return next(new HttpError('Could not download file', 500));
    // }
  };


  exports.upload = upload;
  exports.download_in_backend = download_in_backend;
  exports.download = download;