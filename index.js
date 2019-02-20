const express = require('express');
const helmet = require('helmet');

const app = express();

app.use(express.json());
app.use(helmet());



app.listen(4000, () => {console.log('Listening on port 4000...')})