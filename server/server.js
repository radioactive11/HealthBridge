const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

//Requiring routes
const patientAuth = require("./routes/patientAuth");
const doctorAuth = require("./routes/doctorAuth");
const prescription = require("./routes/prescription");
const appointment = require("./routes/appointment");
const donor = require("./routes/donor");

const db = process.env.MONGODB_URL;

mongoose.connect(db, {useNewUrlParser : true,
    useUnifiedTopology: true,
    useCreateIndex : true})
.then(() => console.log('Database connected'))
.catch((err) => {
    console.log(err);
})

app.use(express.urlencoded({
    extended : false
}));

app.use(bodyParser.json());

app.use(cors());

//Definning routes
app.use("/patient",patientAuth);
app.use("/doctor",doctorAuth);
app.use("/prescription",prescription);
app.use("/appointment",appointment);
app.use("/donor",donor);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});