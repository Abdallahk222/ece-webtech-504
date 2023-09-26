// ./handles.js
// Necessary imports
const url = require('url')
const qs = require('querystring')

module.exports = {
  
  serverHandle: function (req, res) {
    const route = url.parse(req.url)
    const path = route.pathname 
    const params = qs.parse(route.query)

    res.writeHead(200, {'Content-Type': 'text/plain'})

    if (path==='/'){ // Instructions /hello
      res.write('/hello takes a name query parameter and:\n'+
      '- random names reply hello [name]\n'+
      '- your own name replies with a short intro of yourself\n\n'+
      'http://localhost:8080/hello?name=name'
      )
    }

    else if (path === '/hello' && 'name' in params) {

      if(params['name']==='Abdallah'){ // exemple pour Abdallah
        res.write('Abdallah Kadir:\n'+
        '- 21 ans\n'+
        '- ING4 G05'
        )
      }
      else{
        res.write('Hello ' + params['name'])
      }

    }
    else if(path === '/about'){
      
      if(require('./content/about.json')){ // verify if a JSON file exists in the content folder

        const content=require('./content/about.json')
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.write(JSON.stringify(content))

      } else{
        res.write('404 code : url not found')
      } 
      
    }

    else{
      res.write('404 code : url not found')
    }
    
    res.end()
  } 
}