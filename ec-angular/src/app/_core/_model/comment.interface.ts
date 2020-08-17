export interface IComment {
    Content: string;
    TaskID: number;
    ParentID: number;
    UserID: number;
}
export interface ICommentTreeView {
     ID: number;
     Username: string;
     UserID: number;
     TaskID: number;
     Content: string;
     ParentID: number;
     ImageBase64: string;
     CreatedTime: string;
     Seen: boolean;
     HasChildren: boolean;
     children: ICommentTreeView[];
}