const express = require('express');
const multer = require('multer');
const cors = require('cors');
const app = express();

app.use(express.urlencoded());
app.use(cors());

var db = require('./db');


db.connect((err) => {
    if (err) throw err;
    console.log("Connected to database..");
});

////////////////////

const storage = multer.diskStorage({
    destination: '../../img/',
    filename: function (req, file, callback) {
        var name = file.originalname.split(file.mimetype);
        callback(null, '/' + Date.now() + name[name.length - 1])
    }

});

const upload = multer( { storage: storage} );

// Query Function
function query(sql, req, res) {

    db.query(sql, (err, rows, fields) => {

        if (err) res.status(400).send(err);

        res.status(200).json(rows[0]);

    });

}

//Episode

app.get('/api/episode', cors(), (req, res) => {
    query("CALL getAllPublishedEpisodes();", req, res);
});

app.get('/api/episode/:id', (req, res) => {
    var id = req.params.id;
    query("CALL getEpisodeById(" + id + ");", req, res);


});

app.post('/api/episode', upload.array('files', 20), (req, res) => {
    
    var thumbnail = req.files[0].path;
    var title = req.body.title;
    var files = '';
    var creatorsNote = req.body.creatorsNote;
    var published = req.body.published;
    var active = req.body.active;
    var id_seria = req.body.id_seria;
    
    
    try{
        for(var i = 1; i < req.files.length; i++){
            files += req.files[i].path+';'
        }
    }catch(error){
        console.log(error);
        res.send(400);
    }

    // res.send(files)

    var sql = `CALL insert_episodes('` + thumbnail + `', '` + title + `', '` + files + `', '` + creatorsNote + `
    ',`+ published + `, ` + id_seria + `);`;

    query(sql, req, res);

});

app.put('/api/episode/:id', (req, res) => {
    var epDetails = {
        id: req.params.id,
        thumbnail: req.body.thumbnail,
        title: req.body.title,
        files: req.body.files,
        creatorsNote: req.body.creatorsNote,
        published: req.body.published,
        id_seria: req.body.id_seria
    };

    var sql = `CALL updateEpisode(` + epDetails.id + `, '` + epDetails.thumbnail + `', '` + epDetails.title + `', '` + epDetails.files + `', '` + epDetails.creatorsNote + `
    ','`+ epDetails.published + `', '` + epDetails.id_seria + `');`;

    query(sql, req, res);
});

app.delete('/api/episode/:id', (req, res) => {
    var id = req.params.id;
    query("CALL delete_episode(" + id + ");", req, res);
});




//Likes
app.post('/api/episode/like', (req, res) => {
    var userId = req.body.userId;
    var episodeId = req.body.episodeId;
    query("CALL like_episode(" + userId + ", " + episodeId + ");", req, res);
});

app.delete('/api/episode/unlike', (req, res) => {

    var userId = req.body.userId;
    var episodeId = req.body.episodeId;
    query("CALL unlike_episode(" + userId + ", " + episodeId + ");", req, res);
});

//Comments
app.get('/api/comment', (req, res) => {
    query('CALL getAllActiveComment()', req, res);
});


app.post('/api/comment', (req, res) => {
    var userId = req.body.userId;
    var episodeId = req.body.episodeId;
    var text = req.body.text;
    var sql = "CALL insert_comment(" + userId + ", " + episodeId + ", '" + text + "');";
    query(sql, req, res);
});

app.delete('/api/comment/:id', (req, res) => {
    query("CALL delete_comment(" + req.params.id + ");", req, res);
});

var PORT = process.env.PORT || 7000;
app.listen(PORT);
console.log("Now listening on port: http://localhost:"+ PORT);