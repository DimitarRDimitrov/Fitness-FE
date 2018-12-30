import { User } from "../user";

export class Workout {
    public id: number;
    public name: String;
    public duration: number;
    public trainer: any;
    public date: String;
    public time: String;
    public capacity: number;
    public spaceRemaining: number;
    public workoutType: WorkoutType;
    public deleted: boolean;
    public applicants: Set<User>;

    constructor(name: String, duration: number, trainer: String, date: String, time: String, capacity: number, spaceRemaining: number, workoutType: WorkoutType, deleted: boolean, applicants: Set<User>) {
        this.name = name;
        this.duration = duration;
        this.trainer = trainer;
        this.date = date;
        this.time = time;
        this.capacity = capacity;
        this.spaceRemaining = spaceRemaining;
        this.workoutType = workoutType;
        this.deleted = deleted;
        this.applicants = applicants;
    }

}

export class WorkoutType {
    public name: string;

    constructor(name: string){
        this.name = name;
    }
}