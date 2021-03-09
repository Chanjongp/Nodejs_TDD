const models = require('../models.js');



// module.exporsss = () => {
//     return models.sequelize.sync({force : true});
// }

module.exports = () => {
    return models.sequelize.sync({force : true});
}