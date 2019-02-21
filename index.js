const express = require('express');
const helmet = require('helmet');

const app = express();

app.use(express.json());
app.use(helmet());

const studentsRouter = require('./routes/students');
const cohortsRouter = require('./routes/cohorts');
app.use('/students', studentsRouter);
app.use('/api/cohorts', cohortsRouter);



app.listen(4000, () => {console.log('Listening on port 4000...')})