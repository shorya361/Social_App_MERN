const express = require('express');
const connectDB = require('./config/db');
const app = express();
// connect DB
connectDB();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => res.send('API Running!!!'));
app.listen(PORT, () => {
  console.log('Server started at port ' + PORT);
});

// Define Route
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
