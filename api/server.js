//IMPORTS
const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const loginRoutes = require('./server/routes/LoginRoutes');
const userRoutes = require('./server/routes/UserRoutes');
const noteRoutes = require('./server/routes/NoteRoutes');
const NoteController=require('./server/controllers/NoteController');
const moment = require('moment');


const app = express();
const PORT = 3000;


//Cors configuration
const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
};
//Cors and BodyParser
app.use(cors(corsOptions));
app.use(express.json());

//Routes
app.use('', loginRoutes);
app.use('', userRoutes);
app.use('', noteRoutes);

cron.schedule('* * * * *', () => {
    const currentDateAndTime=moment().format('YYYY-MM-DD HH:mm:ss');
    NoteController.sendNotification(currentDateAndTime)
});

//Server
app.listen(PORT, () => console.log(`Express Server is running at port no:${PORT}`));
