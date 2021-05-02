module.exports = {
  name: "clear",
  description: "Xóa list nhạc",
  async execute(message) {
    const queue = message.client.queue;
    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue?.songs.length) {
      return message.channel.send("Không có bài nào để xóa");
    }

    serverQueue.songs = [];
    return message.channel.send("Đã xóa");
  },
};
