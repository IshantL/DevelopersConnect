const express = require('express');

const app =express();
app.get('/',(req,res)=> res.send('API RUNNING'));

// Define Route
app.use('/api/users',require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/posts', require('./routes/api/posts'))


const PORT = process.env.PORT || 5000;
app.listen(PORT,()=> console.log(`server is running on Port ${PORT}`));