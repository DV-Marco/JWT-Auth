const mongoose = require('mongoose');

const URI = "mongodb://localhost/jwt-rest";

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('Database is conected'))