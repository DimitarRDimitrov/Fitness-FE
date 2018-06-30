export class Workout {

    public name: String;
    public duration: Number;
    public trainer: String;
    public date: String;
    public time: String;

    constructor(name: String, duration: Number, trainer: String, date: String, time: String) {
        this.name = name;
        this.duration = duration;
        this.trainer = trainer;
        this.date = date;
        this.time = time;
    }

}