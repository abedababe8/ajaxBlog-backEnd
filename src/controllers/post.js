const model = require('../models/post')

function getAll (req, res, next) {
  res.status(200).send( model.getAll() )
}

function getOne (req, res, next) {
  const post = model.getOne(req.params.id)
  if(post.data){
    return res.status(200).send({ data: post.data })
  }
  else if(post.error){
    return next({ status: 404, message: post.error })
  }
}

function create (req, res, next) {
  const post = model.create(req.body.title, req.body.contents)
  if (post.error){
    return res.status(400).send({data: post.error})
  }
  if (post.data){
    return res.status(201).send({data: post.data})
  }
}

function update (req, res, next) {
  const post = model.update(req.params.id, req.body.title, req.body.contents)
  if(post.data){
    return res.status(200).send({ data: post.data })
  }
  else if(post.error){
    return next({ status: 404, message: post.error })
  }
}

function destroy (req, res, next) {
  const post = model.destroy(req.params.id)
  if(post.data){
    return res.status(200).send({ data: post.data })
  }
  else if(post.error){
    return next({ status: 404, message: post.error })
  }
}

module.exports = {getAll, getOne, create, update, destroy}
