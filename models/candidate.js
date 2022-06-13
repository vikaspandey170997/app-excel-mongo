var mongoose = require('mongoose');

var candidateSchema = new mongoose.Schema({
    NameoftheCandiate: {
        type: String
    },
    Email: {
        type: String
    },
    MobileNo: {
        type: Number
    },
    DateofBirth: {
        type: String
    },
    WorkExperience: {
        type: String
    },
    ResumeTitle: {
        type: String
    },
    CurrentLocation: {
        type: String
    },
    PostalAddress: {
        type: String
    },
    CurrentEmployer: {
        type: String
    },
    CurrentDesignation: {
        type: String
    }
});

module.exports = mongoose.model('candidate', candidateSchema);