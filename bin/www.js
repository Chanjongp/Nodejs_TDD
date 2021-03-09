const app = require('../express.js');
const syncDb = require('./sync-db.js');

syncDb().then(_ => {
    console.log('Sync database!');
    app.listen(3000, () => {
        console.log('Server is running on 3000 port');
    });
})



