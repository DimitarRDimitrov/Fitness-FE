export class Workout {
    public id: number;
    public name: String;
    public duration: number;
    public trainer: any;
    public date: String;
    public time: String;
    public capacity: number;
    public spaceRemaining: number;

    constructor(name: String, duration: number, trainer: String, date: String, time: String, capacity: number, spaceRemaining: number) {
        this.name = name;
        this.duration = duration;
        this.trainer = trainer;
        this.date = date;
        this.time = time;
        this.capacity = capacity;
        this.spaceRemaining = spaceRemaining;
    }

}