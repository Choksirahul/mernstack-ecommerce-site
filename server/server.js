const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.get("/", (req, res) => {
  res.json({ msg: "This is an example" });
});

app.listen(PORT, () => {
  console.log("Server is running...!");
});

// Routes
app.use("/user", require("./routes/useRouter"));
app.use("/api", require("./routes/categoryRouter"));
app.use("/api", require("./routes/upload"));
app.use("/api", require("./routes/productRouter"));

/* Connect MongoDB */

const URI = process.env.MONGODB_URL;

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB Connected Successfully!");
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
  });

mongoose.connection.on("error", (err) => {
  console.error("❌ Mongoose Connection Error:", err);
});
