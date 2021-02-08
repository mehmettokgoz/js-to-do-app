let express = require('express')
let mongodb = require('mongodb')

let app = express()
let db

let connectionString = 'mongodb+srv://mehmet:tokgoz123@cluster0.aorgo.mongodb.net/ToDoApp?retryWrites=true&w=majority'

mongodb.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
    db = client.db()
    app.listen(3000)
})

app.use(express.urlencoded({extended: false}))

app.get('/', function(req, res){
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
            <form action="/create-item" method="POST">
                <div class="d-flex align-items-center">
                <input name="item" autofocus autocomplete="off" class="form-control mr-3" type="text" style="flex: 1;">
                <button class="btn btn-primary">Add New Item</button>
                </div>
            </form>
            </div>
            
            <ul class="list-group pb-5">
            <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
                <span class="item-text">Fake example item #1</span>
                <div>
                <button class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
                <button class="delete-me btn btn-danger btn-sm">Delete</button>
                </div>
            </li>
            <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
                <span class="item-text">Fake example item #2</span>
                <div>
                <button class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
                <button class="delete-me btn btn-danger btn-sm">Delete</button>
                </div>
            </li>
            <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
                <span class="item-text">Fake example item #3</span>
                <div>
                <button class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
                <button class="delete-me btn btn-danger btn-sm">Delete</button>
                </div>
            </li>
            </ul>
            
        </div>
        
        </body>
    </html>
    `)
})

app.post('/create-item', function(req, res){
    let item = req.body.item
    db.collection('items').insertOne({text: item}, function() {
        res.send("Thax for submit.")
    })
    
})





