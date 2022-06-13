var candidate = require('../models/candidate');
var excelToJson = require('convert-excel-to-json');
var asyncEachSeries = require('async-each-series');

// Import Excel File to MongoDB database/
const importExcelData2MongoDB = function(filePath, res) {
    // -> Read Excel File to Json Data
    const excelData = excelToJson({
        sourceFile: './public/uploads/' + 'Candidates.xlsx',
        sheets: [{
            // Excel Sheet Name
            name: 'Sheet1',
            // Header Row -> be skipped and will not be present at our result object.
            header: {
                rows: 1
            },
            // Mapping columns to keys
            columnToKey: {
                A: 'NameoftheCandiate',
                B: 'Email',
                C: 'MobileNo',
                D: 'DateofBirth',
                E: 'WorkExcperience',
                G: 'CurrentLocation',
                H: 'PostalAddress',
                I: 'CurrentEmployer',
                J: 'CurrentDesignation'
            }
        }]
    });

    // insert data to mongo db

    //Async-each-series

    asyncEachSeries(excelData.Sheet1, function(element, next) {
        candidate.find({ Email: element.Email }, function(err, docs) {
            if (err) {
                console.log(err);
            } else {
                if (docs.length == 0) {
                    candidate.create(element, (err, data) => {
                        if (err) {
                            console.log(err);
                        } else {

                        }
                    });

                }
            }
        });
        next();

        //   setTimeout(function () {
        //     console.log(el);
        //     next();
        //   }, Math.random() * 5000);
    }, function(err) {
        res.send("Successfully imported the input Excel File");
    });

    //Sync for each method

    // excelData.Sheet1.forEach(element => {

    //     candidate.find({ Email: element.Email }, function(err, docs) {
    //         if (err) {
    //             console.log(err);
    //         } else {
    //             if (docs.length == 0) {
    //                 candidate.create(element, (err, data) => {
    //                     if (err) {
    //                         console.log(err);
    //                     } else {

    //                     }
    //                 });

    //             }
    //         }
    //     });
    // });
    // res.send("Successfully imported the input Excel File");
    // Deletes the File 
    //fs.unlinkSync(filePath);
}

module.exports = {
    importExcelData2MongoDB
};