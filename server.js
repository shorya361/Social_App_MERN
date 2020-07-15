const express = require('express');
const connectDB = require('./config/db');
const app = express();
const cors = require('cors');
// connect DB
connectDB();

// Init middleware
app.use(express.json({ extended: false }));
app.use(cors());
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => res.send('API Running!!!'));
app.listen(PORT, () => {
  console.log('Server started at port ' + PORT);
});

// Define Route
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/comment', require('./routes/api/comments'));
app.use('/api/Arts', require('./routes/api/Arts'));
