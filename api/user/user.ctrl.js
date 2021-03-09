// api 로직
// const { where } = require('sequelize/types');
// const { response } = require('../../express.js');
const models = require('../../models.js');

const index = (req, res) => {
    req.query.limit = req.query.limit || 10;
    const limit = parseInt(req.query.limit, 10); //query 값으로 들어오는 숫자는 Str "2"이기 때문에 Int로 바꿔줘야 함
    if (Number.isNaN(limit)) { // limit가 숫자가 아니면
        return res.status(400).end();
    }
    models.User.findAll({
        limit: limit
        })
        .then(users => {
            res.json(users);
        })
}

const show = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
        return res.status(400).end();
    }

    models.User.findOne({where: {id}})
        .then(user => {
            if (!user) {
                return res.status(404).end();
            }
            res.json(user);
        })
}

const destroy = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
        return res.status(400).end();
    }
    models.User.destroy({
        where: {id}
    }).then(() => {
        res.status(204).end()
    })
}

const create = function (req, res) {
    console.log(req.body);
    const name = req.body.name;
    if (!name) { return res.status(400).end() }

    models.User.create({name})
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            if(err.message === "Validation error"){
                return res.status(409).end();
            }
            res.status(500).end();
        })
}

const update = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if(Number.isNaN(id)){ return res.status(400).end(); }
  
    const name = req.body.name;
    if(!name) {  return res.status(400).end(); }

    models.User.findOne({where : {id}})
        .then(user =>  {
            if(!user){
                return res.status(404).end();
            }
            user.name = name;
            user.save()
                .then(_ => {
                    res.json(user);
                })
                .catch(err => {
                    if(err.message === "Validation error"){
                        return res.status(409).end();
                    }
                })
        })
  }

module.exports = {
    index: index,
    show: show,
    destroy: destroy,
    create: create,
    update: update
}