const express = require('express')
const app = express()

app.set('port', 8080)
app.listen(
  app.get('port'), 
  () => console.log(`server listening on ${app.get('port')}`)
)

const db = {
  articles: [
    {
      id: '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
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
    // ...
  ]
}; 

app.get(
    '/api/articles', (req, res)  {
    res.json(db.articles); 
}); 
    
    
app.post('/api/articles', (req, res) => {
    const newArticle = rep.body; 
    db.articles.push(newArticle); 
    res.status(201).json(newArticle); 
}); 

app.get('/api/articles/:id', (req, res) =>{
    const articleId= req.params.id; 
    const article = db.articles.find(article => article.id === articleID); 
    if (!article){
    return res.status(404).json({error: 'Article not found'})
    }
    res.json(article); 
}); 

const port = process.env.PORT || 8080; 
app.listen(port, () => {
    console.log('Server is running on port ${port}'); 
    }); 
