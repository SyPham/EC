import { PeriodType, JobType } from '../enum/task.enum';

export class Task {

    private ID: number;
    get _ID(): number {
        return this.ID;
    }
    set _ID(value: number) {
        this.ID = value || 0;
    }
    private From: string;
    get _From(): string {
        return this.From;
    }
    set _From(value: string) {
        this.From = value || '';
    }
    private OCID: number;
    get _OCID(): number {
        return this.OCID;
    }
    set _OCID(value: number) {
        this.OCID = value || 0;
    }

    private JobName: string;
    get _JobName(): string {
        return this.JobName;
    }
    set _JobName(value: string) {
        this.JobName = value || '';
    }

    private CreatedBy: number;
    get _CreatedBy(): number {
        return this.CreatedBy || 0;
    }
    set _CreatedBy(value: number) {
        this.CreatedBy = value || 0;
    }

    private ProjectID: number;
    get _ProjectID(): number {
        return this.ProjectID;
    }
    set _ProjectID(value: number) {
        this.ProjectID = value || 0;
    }

    private ParentID: number;
    get _ParentID(): number {
        return this.ParentID;
    }
    set _ParentID(value: number) {
        this.ParentID = value || 0;
    }
    private SpecificDate: string;
    get _SpecificDate(): string {
        return this.SpecificDate;
    }
    set _SpecificDate(value: string) {
        this.SpecificDate = value || '';
    }
    private Status: boolean;
    get _Status(): boolean {
        return this.Status;
    }
    set _Status(value: boolean) {
        this.Status = value || false;
    }
    private FromWhoID: number;
    get _FromWhoID(): number {
        return this.FromWhoID;
    }
    set _FromWhoID(value: number) {
        this.FromWhoID = value || 0;
    }
    private DueDateDaily: string;
    get _DueDateDaily(): string {
        return this.DueDateDaily;
    }
    set _DueDateDaily(value: string) {
        this.DueDateDaily = value || '';
    }
    private DueDateWeekly: string;
    get _DueDateWeekly(): string {
        return this.DueDateWeekly;
    }
    set _DueDateWeekly(value: string) {
        this.DueDateWeekly = value || '';
    }
    private DueDateMonthly: string;
    get _DueDateMonthly(): string {
        return this.DueDateMonthly;
    }
    set _DueDateMonthly(value: string) {
        this.DueDateMonthly = value || '';
    }
    private DateOfWeekly: string;
    get _DateOfWeekly(): string {
        return this.DateOfWeekly;
    }
    set _DateOfWeekly(value: string) {
        this.DateOfWeekly = value || '';
    }
    private DueDateYearly: string;
    get _DueDateYearly(): string {
        return this.DueDateYearly;
    }
    set _DueDateYearly(value: string) {
        this.DueDateYearly = value || '';
    }
    private DueDateQuarterly: string;
    get _DueDateQuarterly(): string {
        return this.DueDateQuarterly;
    }
    set _DueDateQuarterly(value: string) {
        this.DueDateQuarterly = value || '';
    }
    private Priority: string;
    get _Priority(): string {
        return this.Priority;
    }
    set _Priority(value: string) {
        this.Priority = value || '';
    }
    private PIC: any;
    get _PIC(): any {
        if (this.PIC === 0) {
            return [];
        } else {
           return this.PIC;
        }
    }
    set _PIC(value: any) {
        if (value === 0) {
            this.PIC =  [];
        } else {
            this.PIC = value;
        }
    }
    private Deputies: any;
    get _Deputies(): any {
        if (this.Deputies === 0) {
            return [];
        } else {
           return this.Deputies;
        }
    }
    set _Deputies(value: any) {
        if (value === 0) {
            this.Deputies =  [];
        } else {
            this.Deputies = value;
        }
    }
    private JobTypeID: JobType;
    get _JobTypeID(): JobType {
        return this.JobTypeID;
    }
    set _JobTypeIDID(value: JobType) {
        this.JobTypeID = value || 0;
    }
    private periodtype: PeriodType;
    get _periodtype(): PeriodType {
        return this.periodtype;
    }
    set _periodtype(value: PeriodType) {
        this.periodtype = value || 0;
    }
    private DepartmentID: number;
    get _DepartmentID(): number {
        return this.DepartmentID;
    }
    set _DepartmentID(value: number) {
        this.DepartmentID = value || 0;
    }
    createNewTask(
        ID: number = 0,
        taskname: string = 'Task Demo',
        PIC: any = 0,
        who: number = 0,
        where: number = 0,
        SpecificDate: string = '',
        daily: string = new Date().toLocaleDateString(),
        weekly: string = '',
        monthly: string = '',
        quarterly: string = '',
        yearly: string = '',
        Status: boolean = true,
        Priority: string = 'M',
        ParentID: number = 0,
        periodtype: PeriodType = PeriodType.Daily,
        ProjectID: number = 0,
        JobTypeID: JobType = JobType.Routine,
        DateOfWeekly: string = '',
        Deputies: any = [],
        OCID: number = 0
        )
        {
            const task = new Task();
            task.ID = ID;
            task.JobName = taskname;
            task.FromWhoID = who;
            task.DepartmentID = where;
            task.DueDateWeekly = weekly;
            task.DueDateMonthly = monthly;
            task.DueDateQuarterly = quarterly;
            task.DueDateYearly = yearly;
            task.Status = Status;
            task.Priority = Priority;
            task.ParentID = ParentID;
            task.periodtype = periodtype;
            task.JobTypeID = JobTypeID;
            task.PIC = PIC;
            task.DueDateDaily = daily;
            task.ProjectID = ProjectID;
            task.SpecificDate = SpecificDate;
            task.DateOfWeekly = DateOfWeekly;
            task.Deputies = Deputies;
            task.OCID = OCID;
            return task;
        }
}
