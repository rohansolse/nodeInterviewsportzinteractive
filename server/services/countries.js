

const multer = require('multer');
const fs = require("fs");
const { responseData } = require('../routes/responseHandler')
const countriesList = require('../data/data.json')

module.exports.countries = function (req, res) {
    return new Promise((resolve, reject) => {
        let countries = countriesList.countries.sort((a, b) => {
            if (a.rank < b.rank) { return -1 }
            if (a.rank > b.rank) { return 1 }
            return 0
        })
        resolve(responseData(res, true, 200, "success", countries))
    })
}

module.exports.getcountry = function (req, res) {
    return new Promise((resolve, reject) => {
        let country = countriesList.countries.filter((data) => {
            if (data.rank == Number(req.params.id)) { return data }
        })
        resolve(responseData(res, true, 200, "success", country[0]))
    })
}

module.exports.checkExistingRank = function (req, res) {
    return new Promise((resolve, reject) => {
        let isRankFound = countriesList.countries.some((country) => req.params.rank == country.rank)
        resolve(responseData(res, isRankFound, 200, "success",))
    })
}

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'images')
    },
    filename: async (req, file, callBack) => {
        file = await fileNameHandler(file)
        callBack(null, file.newImageName)
    }
})

function fileNameHandler(file) {
    return new Promise((resolve, reject) => {
        file.formatedName = file.originalname.replace(/\s/g, '_')
        let separation = file.formatedName.split('.')
        let extension = separation.pop()
        file.newImageName = `${separation.join('.')}-${Date.now()}.${extension}`
        // console.log("files ", file);
        resolve(file)
    })
}

const upload = multer({
    storage: storage,
    limits: { fileSize: 4194304 },
    fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|png)$/)) {
            return callback(new Error('Only .jpg & .png Images are allowed !'), false)
        }
        else {
            callback(null, true);
        }
    },
}).single('file')

module.exports.insertImage = function (req, res) {
    return new Promise((resolve, reject) => {
        upload(req, res, function (err) {
            // console.log("files: ", req.file);
            if (err) {
                console.log("Error while file uploading : ", err.message);
                if (err.message.includes('File too large')) {
                    return responseData(res, false, 200, "File size must be less than 4mb and file type must be .png or .jpg")
                }
                else {
                    return responseData(res, false, 200, err.message)
                }
            }
            else {
                console.log("Image Uploaded Successfully");
                return responseData(res, true, 200, "success", { filePath: "images/" + req.file.newImageName })
            }
        })
    })
}

module.exports.insertCountry = function (req, res) {
    return new Promise((resolve, reject) => {
        let data = req.body
        countriesList.countries.push(data);
        // console.log(countriesList);
        fs.writeFile("data/data.json", JSON.stringify(countriesList), err => {
            if (err) throw err;
            console.log("Done writing"); // Success
            resolve(responseData(res, true, 200, "success", {}))
        });
    })
}