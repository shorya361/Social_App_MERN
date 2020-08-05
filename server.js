const express = require('express');
const connectDB = require('./config/db');
const app = express();
const cors = require('cors');
const path = require('path');
// connect DB
connectDB();

// Init middleware
app.use(express.json({ extended: false }));
app.use(cors());
const PORT = process.env.PORT || 5000;

// app.get('/', (req, res) => res.send('API Running!!!'));

app.listen(PORT, () => {
  console.log('Server started at port ' + PORT);
});

// Define Route
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/comment', require('./routes/api/comments'));
app.use('/api/Posts', require('./routes/api/Posts'));

//Serve static assets in productions
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
