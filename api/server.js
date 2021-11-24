//IMPORTS
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;
const authorRoutes = require('./server/routes/NoteRoutes');
const loginRoutes = require('./server/routes/LoginRoutes');
const userRoutes = require('./server/routes/UserRoutes');
const noteRoutes = require('./server/routes/NoteRoutes');

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
//Server
app.listen(PORT, () => console.log(`Express Server is running at port no:${PORT}`));
