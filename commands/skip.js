module.exports = {
  name: "skip",
  description: "Skip a song!",
  execute(message) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!message.member.voice.channel)
      return message.channel.send(
        "You have to be in a voice channel to stop the music!"
      );
    if (!serverQueue) return message.channel.send("Làm gì còn bài nào");
    serverQueue.connection.dispatcher.end();
  },
};
