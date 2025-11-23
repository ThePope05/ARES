import { Client, GatewayIntentBits } from "discord.js";
import "dotenv/config";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,             // basic guild access
    GatewayIntentBits.GuildMessages,      // read messages
    GatewayIntentBits.MessageContent,     // read message text
  ],
});

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag} 😎`);
});

// Respond to messages
client.on("messageCreate", (msg) => {
  if (msg.author.bot) return; // ignore itself/other bots

  if (msg.content.toLowerCase() === "ares") {
    msg.channel.send("At your service");
  }
  
  if (msg.content.toLowerCase().startsWith("/ares ")) {
    msg.channel.send("Command recognized");
  }
});

client.login(process.env.TOKEN);
