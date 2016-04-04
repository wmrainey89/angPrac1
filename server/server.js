var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');

var app = express();
app
    .use(express.static('client'))
    .use(bodyParser.json());

app.route('/api/posts')
    .get(all)
    .post(create);
    
app.route('/api/posts/:id')
    .get(read)
    .put(update);
    
app.use(handleError);



app.listen(3000);
console.log('Server listening on port 3000');

function sendResponse(res, data) {
    var statusCode = 200
    var header = {
        'Content-Type': 'application/json'
    };
    res.writeHead(statusCode, header);
    res.end(data);
}

function handleError(err, req, res, next) {
    console.log('handling...');
    console.log(err instanceof Error);
    if (err instanceof Error) {
        var error = {
            code: 500,
            message: err.message
        };
        var header = {
            'Content-Type': 'application/json'
        };
        res.writeHead(500, header);
        res.end(JSON.stringify(error));
    } else {
        throw err;
    }
}

function all(req, res, next){
	var file = path.join(__dirname, 'data.json');
	fs.readFile(file, function(err, data) {
        if (err) {
            var error = new Error('Error reading datastore');
            return next(error);
        } else {
		    sendResponse(res, data);
        }
	});
}

function update(req, res, next) {
    var newPost = req.body,
        id = req.params.id;
    var file = path.join(__dirname, 'data.json');
    fs.readFile(file, function(err, data) {
        if (err) {
            var error = new Error('Error reading datastore');
            return next(error);
        } else {
            var posts;
            try {
                posts = JSON.parse(data);
            } catch (e) {
                var error = new Error('Corrupted datastore');
                return next(error);
            }
            var found = false;
            for (var i = 0; i < posts.length; i++) {
                var post = posts[i];
                if (post.id === id) {
                    post.title = newPost.title;
                    post.author = newPost.author;
                    post.content = newPost.content;
                    found = true;
                    break;
                }
            }
            if (found) {
                fs.writeFile(file, JSON.stringify(posts),'utf8' , function(err){
                    if(err) {
                        var error = new Error('Error writing to datastore');
                        return next(error);
                    } else {
                        sendResponse(res, "{}");
                    }
                });
            } else {
                var error = new Error('Post not found.');
                return next(error);
            }
        }
    });
}

function read(req, res, next) {
    var postid = req.params.id;
    var file = path.join(__dirname, 'data.json');
    fs.readFile(file, function(err, data) {
        if (err) {
            var error = new Error('Error reading datastore');
            return next(error);
        } else {
            var posts;
            try {
                posts = JSON.parse(data);
            } catch (e) {
                var error = new Error('Corrupted datastore');
                return next(error);
            }
            for (var i = 0; i < posts.length; i++) {
                var post = posts[i];
                if (post.id && post.id === postid) {
                    sendResponse(res, JSON.stringify(post));
                    break;
                }
            }
            var error = new Error('Post not found.');
            return next(error);
        }
    });
}

function create(req, res, next) {
    var post = req.body;
    post.createdAt = new Date();
    post.id = crypto.randomBytes(5).toString('hex');
    var file = path.join(__dirname, 'data.json');
    fs.readFile(file, function(err, data) {
        if (err) {
            var error = new Error('Error reading datastore');
            return next(error);
        } else {
            var posts;
            try {
                posts = JSON.parse(data);
            } catch (e) {
                var error = new Error('Corrupted datastore');
                return next(error);
            }
            posts.push(post);
            fs.writeFile(file, JSON.stringify(posts),'utf8' , function(err){
                if(err) {
                    var error = new Error('Error writing to datastore');
                    return next(error);
                } else {
                    sendResponse(res, JSON.stringify({id: post.id}));
                }
            });
        }
    });
}