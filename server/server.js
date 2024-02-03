const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const userRoutes = require("./routes/api/user.routes");
//allow cors

const PORT = 5000;
const app = express();
const http = require("http").createServer(app);

app.use(express.json({ limit: "50mb" }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: false,
  })
);

app.use("/api/user", userRoutes);

connectDB().then((result) => {
  http.listen(PORT, () => {
    console.log("Server Connected");
  });
});
