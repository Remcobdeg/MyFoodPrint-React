const { v4: uuid } = require('uuid');
const { validationResult, Result } = require('express-validator');
const mongoose = require('mongoose');
const async_ = require('async');
const fs = require('fs');
const textractOCR = require('../aws/textractOCR');
const HttpError = require('../models/http-error');
const AWS = require("aws-sdk")
const config = require("../aws/config");
const path = require("path");
const Receipt = require('../models/receipt');
AWS.config.update({
    accessKeyId: config.awsAccesskeyID,
    secretAccessKey: config.awsSecretAccessKey,
    region: config.awsRegion
});
const textract = new AWS.Textract();

const fetchDataFromImage = async (req, res, next) => {
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
    var datafs = fs.readFileSync(path.resolve(__dirname, "../images/" + imageName));
    var detectParam = {
        Document: {
            Bytes: Buffer.from(datafs),
        }
    }
    try {
        textract.analyzeExpense(detectParam, async (err, data) => {
            if (err) {
                console.log(err);
                return err;
            }
            else {
                let result = textractOCR.createResult(data.ExpenseDocuments[0]);
                await result.ITEMS.forEach(function (entry) {
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
                    receipt.save();
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
};

const getDateFromImage = async (req, res, next) => {
    const imageName = req.params.imageName;
    var datafs = fs.readFileSync(path.resolve(__dirname, "../images/" + imageName));
    var detectParams = {
        Document: {
            Bytes: Buffer.from(datafs),
        },
        FeatureTypes: ["FORMS"]
    }
    try {
        textract.analyzeDocument(detectParams, async (err, data) => {
            if (err) {
                console.log(err);
                return err;
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
};
exports.fetchDataFromImage = fetchDataFromImage;
exports.getDateFromImage = getDateFromImage;