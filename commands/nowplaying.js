module.exports = {
  name: "np",
  description: "Get the song that is playing.",
  execute(message) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) {
      return message.channel.send("Không có bài nào đang phát");
    }
    return message.channel.send(`Đang phát: **${serverQueue.songs[0].title}**`);
  },
};
