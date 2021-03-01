const { Sequelize, DataTypes, Model } = require('sequelize');

const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/songs_db', { logging: false });

class Song extends Model {};
Song.init({
  artist: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
  },
}, { sequelize: db, modelName: 'songs' });

class Genre extends Model{};
Genre.init({
  name: {
    type: DataTypes.STRING
  }
}, { sequelize: db, modelName: 'genres' });

//get genre of song
Song.belongsTo(Genre);

//1 artist can be featured in other songs
Song.belongsTo(Song, { as: 'featuringArtist'});

const syncAndSeed = async() => {
  try {
    await db.sync({ force: true });
    const [hip_hop, pop, RnB] = await Promise.all(
      ['hip_hop', 'pop', 'RnB'].map(name => Genre.create({ name }))
    );
    const [song1, song2, song3, song4, song5, song6] = await Promise.all(
      [
        ['Controlla', 'Drake'],
        ['Going Bad', 'Meek Mill'],
        ['positions', 'Ariana Grande'],
        ['off the table', 'Ariana Grande'],
        ['Starboy', 'The Weeknd'],
        ['Moment 4 Life', 'Nicki Minaj']
      ].map(([name, artist]) => Song.create({ name, artist }))
    );

    song1.genreId = hip_hop.id;
    song2.genreId = hip_hop.id;
    song3.genreId = pop.id;
    song4.genreId = pop.id;
    song5.genreId = RnB.id;
    song6.genreId = hip_hop.id;
    song2.featuringArtistId = song1.id;
    song4.featuringArtistId = song5.id;
    song6.featuringArtistId = song1.id;

    await Promise.all([
      song1.save(), song2.save(), song3.save(), song4.save(), song5.save(), song6.save()
    ]);

  } catch(err) {
    console.log(err);
  }
};

module.exports = {
  db,
  syncAndSeed,
  models: { Song, Genre }
}
