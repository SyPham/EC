export interface Manager {
  users: number;
  ProjectID: number;
}
export interface Member {
  users: number;
  ProjectID: number;
}
export interface User {
  Username: string;
  ID: number;
}

export class Detail {
  selectedManager: User[];
  status: boolean;
  createdBy: number;
  selectedMember: User[];
  title: string;
}
