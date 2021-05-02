module.exports = {
  name: "stop",
  description: "Dừng mở nhạc",
  execute(message) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!message.member.voice.channel)
      return message.channel.send(
        "Không ở trong voice channel thì sao dừng được"
      );
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
  },
};
