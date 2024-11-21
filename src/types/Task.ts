export type Task = {
    description: string;
    finishTask: Date;
    createdAt?: Date;
    title: string;
    done: boolean;
    id?: number;
    term: Date;
}