import {DiscordService} from "../../services/discord_service";
import { Daemon } from "./daemon_classes/abstract_classes/daemon";
import { Daemon404 } from "./daemon_classes/daemon_404";
import { DaemonSteam } from "./daemon_classes/daemon_steam";

class ARES {
    private aresChannelId : string = "1442113120909922405";

    private discordService : DiscordService;

    private daemonList : Array<Daemon> = [
        new DaemonSteam(), 
        new Daemon404()
    ];

    constructor() {
        this.discordService = new DiscordService();
        this.discordService.defaultChannelId = this.aresChannelId;

        this.discordService.OnceEvent("clientReady", () => { this.onReady() });
        this.discordService.OnEvent("messageCreate", (msg : any) => { this.onMessage(msg) });
    }

    public async Start() : Promise<void> {
        await this.discordService.Connect();
    }
    
    private onReady() {
        this.discordService.SendMessage("ARES online...");
    }

    private onMessage(msg : any) {
        if (msg.content.toLowerCase().startsWith("/ares ")) {
            let commandParts = msg.content.toLowerCase().split(" ");
            console.log("Command registered...", typeof(msg));
            if (msg.content.toLowerCase().contains("daemon")) {
                if (msg.content.toLowerCase().endsWith(" --list")) {
                    let result = "Available Daemons: \n";
                    
                    this.daemonList.forEach(daemon => {
                        result += `${daemon.Name} \n`;
                    });
                    
                    this.discordService.SendMessage(result);
                }
            }
        }
        if (msg.content.toLowerCase() == "hello ares") {
            this.discordService.SendMessage(`Hello ${msg.author.globalName}`);
        }
    }
}

export {ARES}