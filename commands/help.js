const fs = require("fs");

module.exports = {
  name: "help",
  description: "List các lệnh của bot",
  execute(message) {
    let str = "";
    const commandFiles = fs
      .readdirSync("./commands")
      .filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
      const command = require(`./${file}`);
      str += `Tên: ${command.name}, Chú thích: ${command.description} \n`;
    }

    message.channel.send(str);
  },
};
