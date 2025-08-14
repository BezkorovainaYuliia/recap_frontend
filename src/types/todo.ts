export type Status = "OPEN"|"IN_PROGRESS"|"DONE";

export type ToDo= {
    id: string;
    description: string;
    status: Status;
}