import { User } from "../user";

export class Workout {
    public id: number;
    public name: string;
    public duration: number;
    public trainer: any;
    public date: string;
    public time: string;
    public capacity: number;
    public spaceRemaining: number;
    public workoutType: WorkoutType;
    public deleted: boolean;
    public applicants: Array<User>;

    constructor(name: string, duration: number, trainer: any, date: string, time: string, capacity: number, spaceRemaining: number, workoutType: WorkoutType, deleted: boolean, applicants: Array<User>) {
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