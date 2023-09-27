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
