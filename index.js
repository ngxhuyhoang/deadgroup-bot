const fs = require("fs");
const Discord = require("discord.js");
const Client = require("./client/Client");
require("dotenv").config();

const client = new Client();
client.commands = new Discord.Collection();

const prefix = "$";

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.once("ready", () => {
  console.log("Ready!");
});

client.once("reconnecting", () => {
  console.log("Reconnecting!");
});

client.once("disconnect", () => {
  console.log("Disconnect!");
});

client.on("message", async (message) => {
  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command = client.commands.get(commandName);

  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  try {
    if (commandName === "ban" || commandName === "userinfo") {
      command.execute(message, client);
    } else {
      command.execute(message);
    }
  } catch (error) {
    console.log(error);
    message.reply("Không có lệnh này đâu");
  }
});

client.login(process.env.TOKEN);
