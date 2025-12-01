const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const nodemailer = require('nodemailer')
let contactRouter = require('./routes/contact.route')
const port = process.env.PORT || 5555

app.use(cors())
app.use(express.urlencoded({extended:true,limit:'50mb'}))
app.use(bodyParser.urlencoded({extended: true,limit:'50mb'}))
app.use(express.json({limit:'50mb'}))


// CONNECT TO MONGODB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

app.use("/api/contact", contactRouter);
const themeRoute = require("./routes/theme.route");
app.use("/api/theme", themeRoute);






app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})