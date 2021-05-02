module.exports = {
  name: "fs",
  description: "Bỏ qua một bài nhạc",
  execute(message) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!message.member.voice.channel)
      return message.channel.send(
        "Không ở trong voice channel thì sao bỏ qua được"
      );
    if (!serverQueue) return message.channel.send("Làm gì còn bài nào");
    serverQueue.connection.dispatcher.end();
  },
};
