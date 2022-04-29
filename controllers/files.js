const File = require("../models/files");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/uploads/");
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname);
    },
});

const upload = multer({ storage: storage });

module.exports.index = async(req, res) => {
    // const { id } = req.params;
    const file = await File.find({ path: "/" });
    const id = "default";
    res.render("files/index", { file, id });
};

module.exports.delete = async(req, res) => {
    const { id } = req.params;
    const file = await File.deleteOne({ _id: id });
    res.redirect("/");
};

module.exports.indexByID = async(req, res) => {
    // const products = await Product.find({});
    let { id } = req.params;
    console.log("id: ", id);

    const files = await File.findOne({ _id: id });

    const path = files.path + files.name + "/";
    console.log("path: ", path);
    const file = await File.find({ path: path });
    console.log("file: ", file);
    res.render("files/index", { file, id });
};

module.exports.renderUploads = async(req, res) => {
    const { id } = req.params;
    res.render(`files/uploads`, { id });
};

module.exports.uploads = async(req, res, next) => {
    try {
        const { id } = req.params;
        let pathParent = "";
        if (id === "default") {
            let pathParent = "/";

            const file = await File.create({
                name: req.file.originalname,
                path: pathParent,
                type: req.file.mimetype,
                size: `${req.file.size / 1000} KB`,
            });
            req.flash("success", "File Uploaded Successfully!");
            res.redirect(`/`);
        } else {
            const findFile = await File.findOne({ _id: id });
            pathParent = findFile.path + findFile.name + "/";

            const file = await File.create({
                name: req.file.originalname,
                path: pathParent,
                type: req.file.mimetype,
                size: `${req.file.size / 1000} KB`,
            });
            req.flash("success", "File Uploaded Successfully!");
            res.redirect(`/${id}`);
        }
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/");
    }
};

module.exports.renderUploadFolders = async(req, res) => {
    const { id } = req.params;
    res.render(`files/uploadFolders`, { id });
};

module.exports.uploadFolders = async(req, res, next) => {
    try {
        // const { email, username, password } = req.body;
        // const user = new User({ email, username });
        // const registeredUser = await User.register(user, password);
        // req.login(registeredUser, err => {
        //     if (err) return next(err);
        //     req.flash('success', 'Welcome to my Website!');
        //     res.redirect('/');
        // })
        const { name } = req.body;
        const { id } = req.params;
        let pathParent = "/";
        if (id === "default") {
            pathParent = "/";

            const file = await File.create({
                name: name,
                path: pathParent,
                type: "folder",
                size: "",
            });
            res.redirect(`/`);
        } else {
            const findFile = await File.findOne({ _id: id });
            pathParent = findFile.path + findFile.name + "/";
            const file = await File.create({
                name: name,
                path: pathParent,
                type: "folder",
                size: "",
            });
            res.redirect(`/${id}`);
        }

        req.flash("success", "File Uploaded Successfully!");
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/");
    }
};