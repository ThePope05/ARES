abstract class Daemon {
    public Name : string = "";
    public Interval : number = 1;

    protected processId : NodeJS.Timeout | null = null;

    public async Execute() : Promise<void> {}

    public async Start() : Promise<void> {
        this.Execute();
        this.processId = setInterval(this.Execute, this.CalculateIntervalInMiliSeconds());
    }

    public Stop() : void {
        if (this.processId == null) {
            console.log(`Couldn't find process id to stop daemon : ${this.Name}...`);
            return;
        }

        clearInterval(this.processId);
    }

    protected CalculateIntervalInMiliSeconds() : number {
        return this.Interval * 60 * 1000;
    }
}
export {Daemon}