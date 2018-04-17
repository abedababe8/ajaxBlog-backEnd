const fs = require('fs')
const path = require('path')
const shortid = require('shortid')

const file = path.join(__dirname, 'db.json')


function getAll(){
  const workableData = fs.readFileSync(file, 'utf-8')
  const posts = JSON.parse(workableData).posts
  return { posts }
}

function getOne(title){
  const workableData = fs.readFileSync(file, 'utf-8')
  const posts = JSON.parse(workableData).posts
  const post = posts.find(post => post.title === title)
  return post ? { data: post } : { error: 'post not Found'}
}

function create(title, contents){
  const errors = []
  if (!title){
    errors.push('please name the post')
  }
  if (!contents){
    errors.push('please include short description')
  }

  if (errors.length > 0){
    return {error: errors}
  }


  const post = {title,
          contents,
        }

  const workableData = fs.readFileSync(file, 'utf-8')
  const newParsedFile = JSON.parse(workableData)
  const posts = newParsedFile.posts
  posts.push(post)
  const json = JSON.stringify(newParsedFile)
  fs.writeFileSync(file, json)
  return { post }
}

function update(title, contents){
  const workableData = fs.readFileSync(file, 'utf-8')
  const wholeFile = JSON.parse(workableData)
  const posts = wholeFile.posts
  const post = posts.find(post => post.title === title)
  if (post){
    if (title){
      post.title = title
    }
    if (contents){
      post.contents = contents
    }
  const json = JSON.stringify(wholeFile)
    fs.writeFileSync(file, json)
    return { data: post }
  } else {
    return { error: 'post does not exist'}
  }
}

function destroy (title){
  const workableData = fs.readFileSync(file, 'utf-8')
  const wholeFile = JSON.parse(workableData)
  const posts = wholeFile.posts
  const post = posts.find(post => post.title === title)
  if (post){
    const deletedPost = posts.splice(posts.indexOf(post), 1)
    const json = JSON.stringify(wholeFile)
      fs.writeFileSync(file, json)
    return {data: deletedPost}
  } else {
    return {error: 'post not found'}
  }
}





module.exports = {getAll, getOne, create, update, destroy}
