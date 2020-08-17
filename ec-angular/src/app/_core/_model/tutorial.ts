export interface Tutorial {
    ID: number;
    Name: string;
    TaskID: number;
    URL: string;
    Level: number;
    Path: string;
    ParentID: number;
    ProjectID: number;
    HasChildren: boolean;
    children: Tutorial[];
}
