const express = require('express');
const route = require('./Routes/routes')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express();
const PORT = 8000;

mongoose.connect('mongodb://127.0.0.1:27017/myMedico')
.then(()=>{
    console.log("MongoDB IS CONNECTED")
})
.catch((err)=>{
    console.log("Unable to connect to db", err)
})
app.get('/', (req, res) => {
    res.send("Server Started");
});

app.use(cors())
app.use(express.json())

app.use('/', route)
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
