const model = require('../models/post')

function getAll (req, res, next) {
  res.status(200).send( model.getAll() )
}

function getOne (req, res, next) {
  const book = model.getOne(req.params.title)
  if(book.data){
    return res.status(200).send({ data: book.data })
  }
  else if(book.error){
    return next({ status: 404, message: book.error })
  }
}

function create (req, res, next) {
  const book = model.create(req.body.title, req.body.contents)
  if (book.error){
    return res.status(400).send({data: book.error})
  }
  if (book.data){
    return res.status(201).send({data: book.data})
  }
}

function update (req, res, next) {
  const book = model.update(req.body.title, req.body.contents)
  if(book.data){
    return res.status(200).send({ data: book.data })
  }
  else if(book.error){
    return next({ status: 404, message: book.error })
  }
}

function destroy (req, res, next) {
  const book = model.destroy(req.params.title)
  if(book.data){
    return res.status(200).send({ data: book.data })
  }
  else if(book.error){
    return next({ status: 404, message: book.error })
  }
}

module.exports = {getAll, getOne, create, update, destroy}
