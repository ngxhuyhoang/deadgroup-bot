const { getUserFromMention } = require("../util/getUser");

module.exports = {
  name: "userinfo",
  description: "Hiện thông tin người khác",
  execute(message, client) {
    const split = message.content.split(/ +/);
    const args = split.slice(1);

    const user = getUserFromMention(args[0], client);

    message.channel.send(
      `Tên: ${user.username}, ID: ${user.id}, Avatar: ${user.displayAvatarURL({
        dynamic: true,
      })}`
    );
  },
};
