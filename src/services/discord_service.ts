import { Client, GatewayIntentBits, TextChannel } from "discord.js";
import "dotenv/config";

class DiscordService {
    public defaultChannelId : string = "1442113120909922405";
    public isConnected : boolean = false;
    
    private client : Client = new Client({
        intents: [
            GatewayIntentBits.Guilds, // basic guild access
            GatewayIntentBits.GuildMessages, // read messages
            GatewayIntentBits.MessageContent, // read message text
        ],
    });
    
    public async Connect() : Promise<void> {
        await this.client.login(process.env.TOKEN);
        console.log("Connected to discord...");
        this.isConnected = true;
    }
    
    public async SendMessage(text : string) : Promise<void> {
        const channel : TextChannel = await this.client.channels.fetch(this.defaultChannelId) as TextChannel;
        await channel?.send(text);
    }
    
    public async SendMessageToChannel(channel : TextChannel, text : string) : Promise<void> {
        await channel?.send(text);
    }

    public OnEvent(eventName : string, func : any)
    {
        this.client.on(eventName, func);
    }
    
    public OnceEvent(eventName : string, func : any)
    {
        this.client.once(eventName, func);
    }
}

export {DiscordService};