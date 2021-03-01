const router = require('express').Router();
const { models: { Song, Genre } } = require('../db/data');
const express = require('express');
const { SingleEntryPlugin } = require('webpack');
const app = express();

router.get('/songs', async(req, res, next) => {
  try {
    const songs = await Song.findAll({
      include: [
        { model: Song,
          as: 'featuringArtist',
        }
      ],
    });
    res.send(songs)
  } catch(err) {
    next(err);
  }
});

router.get('/songs/:id', async(req, res, next) => {
  try {
    const song = await Song.findByPk(req.params.id);
    res.send(song);
  } catch(err) {
    next(err);
  }
});

//get featuring artist
router.get('/songs/:id/:id2', async(req, res, next) => {
  try {
    const artist = await Song.findByPk(req.params.id2);
    if (artist) {
      res.send(artist.artist)
    } else {
      res.sendStatus(404)
    }
  } catch(err) {
    next(err);
  }
});

router.get('/genres', async(req, res, next) => {
  try {
    const genres = await Genre.findAll();
    res.send(genres)
  } catch(err) {
    next(err);
  }
});

router.get('/genres/:id', async(req, res, next) => {
  try {
    const song = await Song.findByPk(req.params.id);
    const genreId = song.dataValues.genreId;
    const genre = await Genre.findByPk(genreId)
    res.send(genre);
  } catch(err) {
    next(err);
  }
});

module.exports = router;
