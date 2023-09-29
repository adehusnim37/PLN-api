const mongoose = require('mongoose');
const app = require('./app');

mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true, useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Database telah terkonek');
    })
    .catch((err) => {
        console.log(err.message);
    });
app.listen(process.env.PORT, () => {
    console.log(`Aplikasi Berjalan di port ${process.env.PORT}`);
});
