const express = require('express');
const bmiRoutes = require('./routes/bmiRoutes'); 
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use('/', bmiRoutes);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
