
const express = require('express');
const cors = require('cors');
const http = require('http');
const connectToMongo = require('./db');
const app = express();

require("dotenv").config();


app.set('view engine','ejs')
app.use(express.static('public'))


// Middleware
app.use(express.json());
app.use(cors({
    origin: "*",
  credentials: true

}

));

// Connect to MongoDB
connectToMongo();

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/reviews', require('./routes/reviews'));
app.use("/api/user", require("./routes/user"));
app.use("/api/reports", require("./routes/reports"));

app.get('/', (req, res) => {
    res.send('Hello World!');
});


  // Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running`));