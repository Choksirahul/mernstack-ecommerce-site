const router = require("express").Router();
const cloudinary = require("cloudinary").v2;
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const fs = require("fs");

// Direct config for testing – confirm these match your Cloudinary dashboard
cloudinary.config({
  cloud_name: "dxphbtwko",
  api_key: "751376964182527",
  api_secret: "3t9ZhidzanqSI2lFPAOgWrPweYA",
});

router.post("/upload", auth, authAdmin, (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0)
      return res.status(400).send({ msg: "No files were uploaded" });

    const file = req.files.file;
    console.log("Received file:", file.name);
    console.log("Temporary path:", file.tempFilePath);

    if (file.size > 1024 * 1024) {
      removeTmp(file.tempFilePath);
      return res.status(400).json({ msg: "Size too large" });
    }

    if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
      removeTmp(file.tempFilePath);
      return res.status(400).json({ msg: "File format is incorrect" });
    }

    cloudinary.uploader.upload(
      file.tempFilePath,
      { folder: "test" },
      (err, result) => {
        if (err) {
          console.error("Cloudinary upload error:", err);
          return res.status(500).json({ msg: "Cloudinary upload failed" });
        }

        removeTmp(file.tempFilePath);
        res.json({ public_id: result.public_id, url: result.secure_url });
      }
    );
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.post("/destroy", auth, authAdmin, (req, res) => {
  try {
    const { public_id } = req.body;
    if (!public_id) return res.status(400).json({ msg: "No image selected" });

    cloudinary.uploader.destroy(public_id, (err, result) => {
      if (err) {
        console.error("Cloudinary destroy error:", err);
        return res.status(500).json({ msg: "Failed to delete image" });
      }

      res.json({ msg: "Deleted" });
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) console.error("Failed to remove temp file:", err);
  });
};

module.exports = router;
