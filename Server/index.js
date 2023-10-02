const express = require('express')
const app = express()

app.set('port', 8080)

app.listen(
  app.get('port'), 
  () => console.log(`server listening on ${app.get('port')}`)
)

app.get(
    '/',
    function (req, res) {res.send('/hello takes a name query parameter and:\n'+
          '- random names reply hello [name]\n'+
          '- your own name replies with a short intro of yourself\n\n'+
          'http://localhost:8080/hello?name=name'
          )
          }
          )
app.get(
  '/hello/:name', 
  function (req, res) {
    if(req.params.name === 'Ryan'){
    res.send('Ryan Bagot: '+
      '-24 ans'+
      '-ING4 05'
      )
  }
  else {
    res.send('Hello '+ req.params.name)
  }
  }
)
app.get(
  '/about',
function (req, res){
  if(require('./content/about.json')){ // verify if a JSON file exists in the content folder

        const content=require('./content/about.json')
        res.status(200).json(content)
        
}
})
const db = {
  articles: [
    {
      id: '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
      title: 'My article',
      content: 'Content of the article.',
      date: '04/10/2022',
      author: 'Liz Gringer'
    },
    {
      id: '344',
      title: 'My article',
      content: 'Content of the article.',
      date: '04/10/2022',
      author: 'Liz Gringer'
    },
    // ...
  ],
  comments: [
    {
      id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
      timestamp: 1664835049,
      content: 'Content of the comment.',
      articleId: '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
      author: 'Bob McLaren'
    },
    {
      id: '89',
      timestamp: 1664835049,
      content: 'Content of the comment.',
      articleId: '344',
      author: 'Bob McLaren'
    },
    // ...
  ]
}; 

app.use(express.json())


// afficher tous les articles
app.get(
    '/articles', (req, res) => {
    res.status(200).json(db.articles); 
}); 
    
 // ajouter un article    
app.post('/articles', (req, res) => {
    db.articles.push(req.body); 
    res.status(200).json(db.articles); 
}); 
// afficher un article via id
app.get('/articles/:id', (req, res) =>{
    const articleId= req.params.id 
    const article = db.articles.find(article => article.id === articleId); 
    if (!article){
    return res.status(404).json({error: 'Article not found'})
    }
    res.json(article); 
}); 

app.get(
  '/articles/:articleId/comments',
  function (req, res) {
    const searchId = req.params.articleId
    const comments = db.comments.filter( comment => comment.articleId === searchId)
    res.status(200).json(comments)
  }
)
app.use(express.json())

app.post(
  '/articles/:articleId/comments',
  function (req, res) {
    const searchId = req.params.articleId
    const n_comment=req.body
    n_comment.articleId=searchId
    db.comments.push(req.body)

    const comments = db.comments.filter( comment => comment.articleId === searchId)
    res.status(200).json.stringify(comments)
  }
)

app.get(
  '/articles/:articleId/comments/:commentId',
  function (req, res) {
    const s_ArticleId = req.params.articleId
    const s_CommentId = req.params.commentId

    const comments = db.comments.filter( comment => comment.articleId === s_ArticleId)
    const comment = comments.find(comment => comment.id === s_CommentId)
    res.status(200).json(comment)
  }
)