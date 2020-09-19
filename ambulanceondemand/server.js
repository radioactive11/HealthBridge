const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const requestModel = require("././model/request");
const myMethods = require("./routes/ambulance");
const method = myMethods.method;
const otherMethod = myMethods.otherMethod;
const dotenv = require("dotenv");

dotenv.config({
    path : ".env"
})

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser : true,
    useUnifiedTopology: true,
    useCreateIndex : true})
.then(() => console.log('Database connected'))
.catch((err) => {
    console.log(err);
})

app.use(cors());

const PORT = process.env.PORT || 4000;

var server = app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});

//for url encoding
app.use(express.urlencoded({
    extended : false
}));

app.use(bodyParser.json());

//Initializing Routes
app.use('/api/ambulance',method);

//Initializing the server instance
var io =require("socket.io")(server);

