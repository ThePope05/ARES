import { ARES } from "./data_models/classes/ares";
import { DaemonSteam } from "./data_models/classes/daemon_classes/daemon_steam";

console.log("Starting app...");
// var steamDaemon = new DaemonSteam();

// steamDaemon.Start();

var ares : ARES = new ARES();
ares.Start();