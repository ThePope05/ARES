import "node-fetch";
import { JSDOM } from "jsdom";
import { DaemonWebPage } from "./abstract_classes/daemon_web_page";
import { DiscordService } from "../../../services/discord_service";

class Daemon404 extends DaemonWebPage {
    public override Name: string = "404 daemon";
    public override Interval: number = 1;
    public override Url: string = "";

    public discordService : DiscordService = new DiscordService();

    constructor () {
        super();

        this.discordService = new DiscordService();
    }

    public override async Execute(): Promise<void> {
        if (!this.discordService.isConnected)
            await this.discordService.Connect();

        console.log("Started execute...");

        const html = await fetch(this.Url).then((res) => res.text());
        const dom = new JSDOM(html);
        const doc = dom.window.document;
    
    
        console.log("Not found yet...");
    }
}
export {Daemon404}