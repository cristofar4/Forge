# Music

Songs played by the robot live here. Each entry in `lib/audio.ts` (the `SONGS`
array) points to a file in this folder, for example `/music/all-my-life.mp3`.

To add a song:
1. Drop the `.mp3` in this folder (a short, simple file name with no spaces is best).
2. Add an entry to `SONGS` in `lib/audio.ts`:
   `{ id: "my-song", name: "My Song", artist: "Artist", style: "afro", file: "/music/my-song.mp3" }`
   `style` controls the dance: `hiphop`, `trap`, `afro`, or `amapiano`.

If a file cannot load, the site plays a genre matched beat instead so the dance
always has music. Only use music you have the rights to use.
