import "node-fetch";
import { JSDOM } from "jsdom";
import { DaemonWebPage } from "./abstract_classes/daemon_web_page";
import { DiscordService } from "../../../services/discord_service";

class DaemonSteam extends DaemonWebPage {
    public override Name: string = "Steam daemon";
    public override Interval: number = 1;
    public override Url: string = "https://steamcommunity.com/market/search?appid=730&category_730_Weapon%5B%5D=tag_weapon_knife_butterfly#p1_price_asc";

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
        console.log(doc);
    
        const target : Element | null = doc.querySelector("span.normal_price span.normal_price");
    
        if (target != null) {
            console.log("Element found...");
            let name : string | null | undefined = doc.querySelector(".market_listing_item_name")?.textContent;
            console.log(`Lowest current price : ${name} - ${target.textContent}`);
            await this.discordService.SendMessage(`Lowest current price : ${name} - ${target.textContent}`);

            // stop the loop
            this.Stop();
            return;
        }
    
        console.log("Not found yet...");
    }
}
export {DaemonSteam}