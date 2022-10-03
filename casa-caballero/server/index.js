const express = require('express');
const port = 8080;
const app =express();
const cors = require('cors');

// API Routes
const roomRoute = require('./routes/room');
// API Endpoints
app.use('/api/rooms',roomRoute);

app.use(cors());
app.use(express.json());
app.listen(port,()=>{
    console.log(`Express server running on port ${port}`)
})