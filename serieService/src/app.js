const express = require('express');
const multer = require('multer');
var fs = require('fs');
const cors = require('cors');



//Save file with original name
const storage = multer.diskStorage( {
    destination: '../../img/',
    filename: function(req, file, callback){
        var name = file.originalname.split(file.mimetype);
        callback(null, '/' +Date.now() + name[name.length - 1])
    }

} );

const upload = multer( { storage: storage} );


const app = express();

app.use(cors());

var db = require('./db');

db.connect(function (err) {
    if (err) {
        throw err;
    } else {
        console.log("Connected!")
    }
});

// Query Function
function query(sql, req, res) {

    db.query(sql, (err, rows, fields) => {
        if (err) res.status(400).send(err);

        res.status(200).json(rows[0]);
    });
}


//GET
app.get('/api/serie', (req, res) => {
    var sql = "CALL GetAllSerie";
    query(sql, req, res);
});

app.get('/api/serie/:id', (req, res) => {
    var id = req.params.id;
    var sql = "CALL getSerieById(" + id + ")";
    query(sql, req, res);
});

app.get('/api/series/myseries', (req, res) => {
    var id = req.body.id;
    var sql = "CALL getAllSeriesCreatedByUserWithId(" + id + ");";
    query(sql, req, res);
});

app.get('/api/katalog', (req, res)=>{
    var sql = "CALL katalog";
    query(sql, req, res);
})

app.get('/api/slider', (req, res)=> {
    var sql = "CALL slider";
    query(sql, req, res);
})

app.get('/api/newto', (req, res)=>{
    // var sql = `SELECT s.id, s.thumbnail, s.genre1, s.genre2, s.title, s.sumary, s.expliciteContent, s.dataKrijimit,
	// k.id as 'idKategorie', k.titulli as 'titulliKategorie'
	// FROM Serie s, kategori k
	// Where s.genre1 = k.id
	// ORDER by s.id desc
    // Limit 4;`;
    
    var sql = "CALL newTo"
    query(sql, req, res);
})

app.get('/api/genres/:kategori', (req, res)=>{
    var sql = "CALL genres('"+req.params.kategori+"');";
    query(sql, req, res);
})
//POST
app.post('/api/serie', upload.single('thumbnail'), (req, res) => {
    
    var idUser = req.body.userId;
    var thumbnail = req.file.path;
    var genre1 = req.body.genre1;
    var genre2 = req.body.genre2;
    var title = req.body.title;
    var sumary = req.body.sumary;
    var expliciteContent = parseInt(req.body.expliciteContent);

    var sql = "call insert_Serie(" + idUser + ",'" + thumbnail + "','" + genre1 + "','" + genre2 + "', '" + title + "','" + sumary + "'," + expliciteContent + ");";
    query(sql, req, res);
    res.redirect('http://localhost:8080/create/episodes');
});

app.post('/upload', (req, res)=>{
    var form = new formidable.IncomingForm();

    console.log(req.body.text)

    form.parse(req);

    form.on('fileBegin', function (name, file) {

        var pathName = __dirname + '/../../' + '/img/' + file.name;
        

        file.path = pathName;

    });

    form.on('file', function (name, file) {
        console.log("Uploaded " + file.name)
        

    });

    form.on('error', function (name, file) {
        console.log(name);
    })


})

//PUT
app.put('/api/serie/:id', (req, res) => {

    var serieParam = {
        id: req.params.id,
        thumbnail: req.body.thumbnail,
        genre1: req.body.genre1,
        genre2: req.body.genre2,
        title: req.body.title,
        sumary: req.body.sumary,
        expliciteContent: req.body.expliciteContent,
    };
    var sql = "CALL updateSerie(" + serieParam.id + ", '" + serieParam.thumbnail + "', '" + serieParam.genre1 + "', '" + serieParam.genre2 + "', '" + serieParam.title + "', '" + serieParam.sumary + "', " + serieParam.expliciteContent + ");";
    query(sql, req, res);
});

//DELETE
app.delete('/api/serie/:id', (req, res) => {
    var i = req.params.id;
    var sql = "call delete_serie(" + i + ");";
    query(sql, req, res);
});

//Kategori
app.get('/api/category', (req, res) => {
    query('CALL getAllKategori()', req, res);
});

app.timeout = 1000;

var PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Now listening on port: ", PORT));