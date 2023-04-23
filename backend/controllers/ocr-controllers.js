require('dotenv').config();
const { v4: uuid } = require('uuid');
const { validationResult, Result } = require('express-validator');
const mongoose = require('mongoose');
const async_ = require('async');
const fs = require('fs');
const textractOCR = require('../aws/textractOCR');
const HttpError = require('../models/http-error');
const AWS = require("aws-sdk")
// const config = require("../aws/config");
const path = require("path");
const Receipt = require('../models/receipt');
const remoteFileStoreControllers = require('../controllers/file-uploader-s3');
const awsScanFunctions = require('../aws/awsScanFunctions');


// AWS.config.update({
//     accessKeyId: process.env.AWSACCESSKEYID,
//     secretAccessKey: process.env.AWSSECRETACCESSKEY,
//     region: process.env.AWSREGION
// });
// const textract = new AWS.Textract();

const fetchDataFromImage = async (req, res, next) => {

    console.log("fetchDataFromImage called");

    // conducts a AWS call for OCR and stores the data in a receipt item
    let receipt;
    const imageName = req.body.name;
    let dateReceipt = req.body.date;
    let timeReceipt = "NA";
    if(req.body.date.includes(" && ")) {
        dateReceipt = req.body.date.split(" && ")[0];
        timeReceipt = req.body.date.split(" && ")[1];
    }
    const imageDate = imageName.replace(".jpg", "").split("-")[2];
    const imageUser = imageName.replace(".jpg", "").split("-")[1];

    //get file from digital ocean storage
    try {
        const file = await remoteFileStoreControllers.download_in_backend(imageName, res, next);

        AWS.config.update({
            accessKeyId: process.env.AWSACCESSKEYID,
            secretAccessKey: process.env.AWSSECRETACCESSKEY,
            region: process.env.AWSREGION
        });

        const textract = new AWS.Textract();
        
        const detectParams = {
            Document: {
                Bytes: Buffer.from(file.Body),
            }
        }

        try {
            textract.analyzeExpense(detectParams, async (err, data) => {
                if (err) {
                    console.log("Something went wrong, could not retrieve textract data from AWS: ",err);
                    const error = new HttpError(
                        'Something went wrong, could not retrieve textract data from AWS.',
                        500
                    );
                    return next(error);
                }
                else {
                    let result = textractOCR.createResult(data.ExpenseDocuments[0]);
                    await result.ITEMS.forEach(async function (entry) {
                        let itemName = "NA", price = 0.00, quantity = 1;
                        Object.values(entry)[0].filter(obj => {
                            if ('NAME' in obj)
                                itemName = obj['NAME'];
                            if ('QUANTITY' in obj) {
                                quantity = obj['QUANTITY'].replace(/[^\d.-]/g, '');
                            }
                            if ('PRICE' in obj) {
                                price = obj['PRICE'].replace(',', '.');
                                price = price.replace(/[^\d.-]/g, '');
                            }
                        });
                        receipt = new Receipt({
                            date: dateReceipt,
                            time: timeReceipt,
                            store: ((result.VENDOR_NAME === "" || result.VENDOR_NAME === undefined) ? "NA" : result.VENDOR_NAME),
                            store_branche: "NA",
                            item_group: "NA",
                            item_subgroup: "NA",
                            item_receipt_desc: itemName,
                            item_product: "NA",
                            item_product_detail: "NA",
                            item_footprint_g_100g: 0,
                            item_kcal_100g: 0,
                            item_weight_g: 0,
                            item_unit_price_gbp: ((price === "") ? 0 : price),
                            item_units: quantity,
                            item_footprint_sourcenote: "NA",
                            date_recorded: new Date(parseInt(imageDate)),
                            is_checked_off: false,
                            user: imageUser
                        });
                        try {
                            await receipt.save();
                        } catch (err) {
                            console.log(err);
                            const error = new HttpError(
                                'Something went wrong, could not save receipt.',
                                500
                            );
                            return next(error);
                        }
                    });
                    return res.end("success");
                }
            });

        } catch (err) {
            console.log(err);
            const error = new HttpError(
                'Something went wrong, could not perform OCR analysis.',
                500
            );
            return next(error);
        }

    } catch (error) {
        console.log(error);
        return next(new HttpError('Could not access file for text analysis', 500));
    }
};

const getDateFromImage = async (req, res, next) => {

    const imageName = req.params.imageName;

    //get file from digital ocean storage
    try {
        const file = await remoteFileStoreControllers.download_in_backend(imageName, res, next);

        // sending to AWS for text analysis

        AWS.config.update({
            accessKeyId: process.env.AWSACCESSKEYID,
            secretAccessKey: process.env.AWSSECRETACCESSKEY,
            region: process.env.AWSREGION
        });

        const textract = new AWS.Textract();

        const detectParams = {
            Document: {
                Bytes: Buffer.from(file.Body),
            },
            FeatureTypes: ["FORMS"]
        }

        try {
            textract.analyzeDocument(detectParams, async (err, data) => {
                if (err) {
                    console.log("Something went wrong, could not retrieve textract data from AWS: ",err);
                    const error = new HttpError(
                        'Something went wrong, could not retrieve textract data from AWS.',
                        500
                    );
                    return next(error);
                }
                else {
                    let dateReceipt = await textractOCR.getDate(data);
                    return res.end(dateReceipt);
                }
            });
        } catch (err) {
            console.log(err);
            const error = new HttpError(
                'Something went wrong, could not delete receipt.',
                500
            );
            return next(error);
        }

    } catch (error) {
        console.log(error);
        return next(new HttpError('Could not access file for text analysis', 500));
    }

};
exports.fetchDataFromImage = fetchDataFromImage;
exports.getDateFromImage = getDateFromImage;