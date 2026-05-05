import fs from 'fs';

async function generateData() {
  const artistsList = ['The Weeknd', 'Taylor Swift', 'Ed Sheeran', 'Post Malone', 'Dua Lipa', 'Emiway Bantai'];
  
  const db = {
    users: [
      {
        id: 'u1',
        name: 'Mohammed Affan Razvi',
        profileImageUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
        likedSongs: []
      }
    ],
    artists: [],
    albums: [],
    tracks: [],
    playlists: []
  };

  let artistIdCounter = 1;
  let albumIdCounter = 1;
  let trackIdCounter = 1;

  for (const artistName of artistsList) {
    try {
      const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(artistName)}&limit=5&entity=song`);
      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        const firstResult = data.results[0];
        
        // Add Artist
        const artistId = `a${artistIdCounter++}`;
        db.artists.push({
          id: artistId,
          name: firstResult.artistName,
          monthlyListeners: Math.floor(Math.random() * 50000000) + 1000000,
          bio: `This is a generated bio for ${firstResult.artistName}. They are an amazing artist with great vocal tracks.`,
          heroImageUrl: firstResult.artworkUrl100.replace('100x100bb', '600x600bb'),
          avatarUrl: firstResult.artworkUrl100.replace('100x100bb', '300x300bb')
        });

        // Add Albums and Tracks
        for (const trackData of data.results) {
          // Check if album exists
          let album = db.albums.find(a => a.title === trackData.collectionName);
          let albumId = '';
          if (!album) {
            albumId = `al${albumIdCounter++}`;
            db.albums.push({
              id: albumId,
              title: trackData.collectionName,
              artistId: artistId,
              coverUrl: trackData.artworkUrl100.replace('100x100bb', '300x300bb'),
              releaseYear: new Date(trackData.releaseDate).getFullYear()
            });
          } else {
            albumId = album.id;
          }

          // Add Track
          const trackId = `t${trackIdCounter++}`;
          db.tracks.push({
            id: trackId,
            title: trackData.trackName,
            artistId: artistId,
            albumId: albumId,
            duration: Math.floor(trackData.trackTimeMillis / 1000) || 30, // Default to 30 if missing
            audioUrl: trackData.previewUrl,
            dateAdded: new Date().toISOString().split('T')[0]
          });
          
          db.users[0].likedSongs.push(trackId);
        }
      }
    } catch (err) {
      console.error(`Failed fetching for ${artistName}`, err);
    }
  }

  // Add Liked Songs Playlist explicitly
  db.playlists.push({
    id: 'p1',
    name: 'Liked Songs',
    creatorId: 'u1',
    coverUrl: 'https://misc.scdn.co/liked-songs/liked-songs-300.png',
    trackIds: db.users[0].likedSongs
  });

  fs.mkdirSync('src/data', { recursive: true });
  fs.writeFileSync('src/data/mockDatabase.json', JSON.stringify(db, null, 2));
  console.log('Mock database generated successfully!');
}

generateData();
