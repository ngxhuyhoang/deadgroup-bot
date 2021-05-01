const ytdl = require("ytdl-core");

module.exports = {
  name: "queue",
  description: "Xem list nhạc",
  async execute(message) {
    const queue = message.client.queue;
    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue?.songs.length) {
      message.channel.send(`Có bài nào đâu mà clear`);
      return;
    }

    message.channel.send(
      serverQueue.songs
        .map((song, index) => {
          return `(${index + 1})  ${song.title}\n`;
        })
        .join("")
    );
  },
};
