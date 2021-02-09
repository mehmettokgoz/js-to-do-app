let express = require('express')
let mongodb = require('mongodb')

let app = express()
let db

app.use(express.static('public'))

let connectionString = 'mongodb+srv://mehmet:tokgoz123@cluster0.aorgo.mongodb.net/ToDoApp?retryWrites=true&w=majority'

mongodb.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
    db = client.db()
    app.listen(3000)
})

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', function(req, res){
    db.collection('items').find().toArray(function(err, items){
        res.send(`
        <!DOCTYPE html>
        <html>
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Simple To-Do App</title>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
            </head>
            <body>
            <div class="container">
                <h1 class="display-4 text-center py-1">Simple To-Do App!</h1>
                <p class="text-center mb-0">You can save your works to-do here and don't forget about them.</p>
                <p class="text-center mt-0">You know, it is just for learning. I know you have tons of option for to-do app. :D</p>
                
                <div class="jumbotron p-3 shadow-sm">
                <form id="create-form" action="/create-item" method="POST">
                    <div class="d-flex align-items-center">
                    <input id="create-field" name="item" autofocus autocomplete="off" class="form-control mr-3" type="text" style="flex: 1;">
                    <button class="btn btn-primary">Add New Item</button>
                    </div>
                </form>
                </div>
                
                <ul id="item-list" class="list-group pb-5">
                
                </ul>
                
            </div>
            <script>
            let items = ${JSON.stringify(items)}
            </script>
            <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
            <script src="/browser.js"></script>
            </body>
        </html>
        `)
    })
    
})

app.post('/create-item', function(req, res){
    db.collection('items').insertOne({text: req.body.text}, function(err, info) {
        res.json(info.ops[0])
    })
    
})

app.post('/update-item', function(req, res){
    
    db.collection('items').findOneAndUpdate({_id: new mongodb.ObjectId(req.body.id)}, {$set: {text: req.body.text}}, function(){
        res.send("It is updated successfully")
    })
    
})

app.post('/delete-item', function(req,res) {

    db.collection('items').deleteOne({_id: new mongodb.ObjectId(req.body.id)}, function(){
        res.send("It is deleted successfully")
    })
})





