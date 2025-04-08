const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");

const { connectToMongoDB } = require("./config");
const userRoutes = require("./routes/userRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const { notFound, errorHandler } = require("./middleware");

const app = express(); // Use express js in our app
app.use(express.json()); // Accept JSON data
dotenv.config({ path: path.join(__dirname, "./.env") }); // Specify a custom path if your file containing environment variables is located elsewhere
connectToMongoDB(); // Connect to Database
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors(corsOptions));
app.use("/api/users", userRoutes);
app.use("/api/appointments", appointmentRoutes);

// --------------------------DEPLOYMENT------------------------------

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./client/build")));

  app.get("*", (req, res) => {
    return res.sendFile(
      path.resolve(__dirname, "client", "build", "index.html")
    );
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

// --------------------------ERROR HANDLING------------------------------

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));