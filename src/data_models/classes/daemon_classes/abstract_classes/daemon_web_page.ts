import { Daemon } from "./daemon";

abstract class DaemonWebPage extends Daemon {
    public Url : string = "";
}

export {DaemonWebPage}