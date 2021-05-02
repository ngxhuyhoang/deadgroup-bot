const ytdl = require("ytdl-core");
const ytsr = require("ytsr");
const SoundCloud = require("soundcloud-scraper");

const soundCloudClient = new SoundCloud.Client();

module.exports = {
  name: "play",
  description: "Phát nhạc",
  async execute(message) {
    try {
      const args = message.content.split(" ");
      const queue = message.client.queue;
      const serverQueue = message.client.queue.get(message.guild.id);

      const voiceChannel = message.member.voice.channel;
      if (!voiceChannel) {
        return message.channel.send("Phải vào voice channel mới mở được");
      }
      const permissions = voiceChannel.permissionsFor(message.client.user);
      if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
        return message.channel.send("Không có quyền không mở được");
      }
      const keywords = message.content.substring(6);
      const isUrl = keywords.startsWith("https");

      !isUrl && message.channel.send(`Đang tìm: **${keywords}**`);

      const searchResult = await ytsr(keywords);

      let songInfo = null;
      let song = null;

      if (!args[1].includes("soundcloud")) {
        songInfo = await ytdl.getInfo(
          isUrl ? args[1] : searchResult.items[0].url
        );
        song = {
          title: songInfo.videoDetails.title,
          url: ytdl(songInfo.videoDetails.video_url),
        };
      }

      if (args[1].includes("soundcloud")) {
        const soundCloudSong = await soundCloudClient.getSongInfo(args[1]);
        songInfo = soundCloudSong;
        song = {
          title: soundCloudSong.title,
          url: await soundCloudSong.downloadProgressive(),
        };
      }

      if (!serverQueue) {
        const queueContruct = {
          textChannel: message.channel,
          voiceChannel: voiceChannel,
          connection: null,
          songs: [],
          volume: 5,
          playing: true,
        };

        queue.set(message.guild.id, queueContruct);

        queueContruct.songs.push(song);

        try {
          var connection = await voiceChannel.join();
          queueContruct.connection = connection;
          this.play(message, queueContruct.songs[0]);
        } catch (err) {
          console.log(err);
          queue.delete(message.guild.id);
          return message.channel.send(err);
        }
      } else {
        serverQueue.songs.push(song);
        return message.channel.send(
          `**${song.title}** đã được thêm vào hàng chờ`
        );
      }
    } catch (error) {
      console.log(error);
      message.channel.send(error.message);
    }
  },

  play(message, song) {
    const queue = message.client.queue;
    const guild = message.guild;
    const serverQueue = queue.get(message.guild.id);

    if (!song) {
      setTimeout(() => {
        serverQueue.voiceChannel.leave();
      }, 300_000);
      queue.delete(guild.id);
      return;
    }

    const dispatcher = serverQueue.connection
      // .play(ytdl(song.url))
      .play(song.url)
      .on("finish", () => {
        serverQueue.songs.shift();
        this.play(message, serverQueue.songs[0]);
      })
      .on("error", (error) => message.reply(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    serverQueue.textChannel.send(`Đang phát: **${song.title}**`);
  },
};
