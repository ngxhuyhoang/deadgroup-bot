const { getUserFromMention } = require("../util/getUser");

module.exports = {
  name: "ban",
  description: "Cấm một người",
  execute(message, client) {
    const split = message.content.split(/ +/);
    const args = split.slice(1);

    const member = getUserFromMention(args[0], client);

    if (!member) {
      return message.reply(
        "You need to mention the member you want to ban him"
      );
    }

    if (!message.member.permissions.has("BAN_MEMBERS")) {
      return message.reply("Không thể cấm người này");
    }

    return message.guild.members
      .ban(member)
      .then(() => message.reply(`${member.username} đã bị cấm`))
      .catch((error) => message.reply("Có lỗi rồi: " + error));
  },
};
