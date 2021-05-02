module.exports = {
  name: "nowplaying",
  description: "Xem bài nhạc đang chạy",
  execute(message) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) {
      return message.channel.send("Không có bài nào đang phát");
    }
    return message.channel.send(`Đang phát: **${serverQueue.songs[0].title}**`);
  },
};
