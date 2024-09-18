var express = require('express');
var router = express.Router();
var moment = require('moment');
var Movie = require('../models/MovieSchema');

router.get('/', function(req, res, next) {
    let ListMovies = [];
    Movie.find({}).then(movies => {
        if (movies) {
            for (let data of movies) {
                ListMovies.push({
                    id: data._id,
                    name: data.name,
                    released_on: data.released_on
                });
            }
            res.render('movie/allMovies', {ListMovies})
        } else {
            ListMovies.push({
                id: '',
                name: '',
                released_on: ''
            });
            res.render('movie/allMovies', {ListMovies})
        }
    }).catch(err => {
        console.error(err);
    });
});

router.get('/create', function(req, res, next) {
    res.render('movie/createMovies', { title: 'Halaman create movies' });
});

router.post('/create', function(req, res){
    const {name, date} = req.body;
    let errors = [];

    if (!name || !date) {
        errors.push({msg: 'silahkan lengkapi data'})
    }

    if (errors.length > 0) {
        res.render('movie/createMovies', { errors })
    } else {
        const newMovie = Movie({
            name,
            released_on: date
        });
        newMovie.save().then(
            movie => {
                errors.push({msg: 'data movie berhasil disimpan'});
                res.render('movie/createMovies', {errors});
            }
        ).catch(err => console.log(err));
    }
});

router.get('/update/:movieId', function(req, res, next) {
    // res.render('movie/updateMovies', { 
    //     title: 'Halaman update movies', 
    //     movieId: req.params.movieId 
    // });
    // Movie.findById(req.params.movieId, function(err, movieInfo){
    //     console.log(movieInfo);
    //     if (movieInfo) {
    //         res.render('movie/updateMovies', { 
    //             movies: movieInfo
    //         });
    //     }
    // })
    Movie.findById(req.params.movieId)
    .then((movieInfo) => {
        var newDate = moment(movieInfo.released_on).format('YYYY-MM-DD');
        if (movieInfo) {
            res.render('movie/updateMovies', { 
                movies: movieInfo,
                newDate,
            });
        }
    })
    .catch((err) => {
        console.error('Error edit document:', err);
    });
});

router.post('/create', function(req, res) {
    
});

router.post('/update', function(req, res) {
    let errors = [];
    Movie.findByIdAndUpdate(req.body.id, {name: req.body.name, released_on: req.body.date})
    .then((result) => {
        var newMovies = {_id: req.body.id, name: req.body.name};
        var newDate = moment(req.body.date).format('YYYY-MM-DD');
        errors.push({msg: 'Data berhail update'});
        res.render('movie/updateMovies', {
            movies: newMovies,
            newDate,
            errors,
        })
        console.log('Document updated deleted:', result);
    })
    .catch((err) => {
        console.error('Error updating document:', err);
    });
});

router.get('/delete/:movieId', function(req, res) {
    Movie.findByIdAndDelete(req.params.movieId)
    .then((result) => {
        res.redirect('/movies');
        console.log('Document deleted:', result);
    })
    .catch((err) => {
        console.error('Error deleting document:', err);
    });
});

module.exports = router;