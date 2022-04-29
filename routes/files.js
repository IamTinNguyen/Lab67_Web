const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const files = require("../controllers/files");
const { isLoggedIn } = require("../middleware");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/uploads/");
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

router.route("/").get(isLoggedIn, catchAsync(files.index));
router.route("/:id").get(isLoggedIn, catchAsync(files.indexByID));

router
    .route("/uploads")
    .get(isLoggedIn, catchAsync(files.renderUploads))
    .post(isLoggedIn, upload.single("imgs"), catchAsync(files.uploads));

router
    .route("/uploads/:id")
    .get(isLoggedIn, catchAsync(files.renderUploads))
    .post(isLoggedIn, upload.single("imgs"), catchAsync(files.uploads));

router
    .route("/folders/:id")
    .get(isLoggedIn, catchAsync(files.renderUploadFolders))
    .post(isLoggedIn, catchAsync(files.uploadFolders));

router.route("/delete/:id").get(isLoggedIn, catchAsync(files.delete));

module.exports = router;