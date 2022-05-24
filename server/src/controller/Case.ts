class Case {
    C_ID: number
    HB_ID: number
    caseNumber: string
    createdDate: Date
    closedDate: Date
    ownerID: number
    supportID: number
    caseToken: string

    constructor(cID: number, hbID: number, caseNumber: string, createdDate: Date, closedDate: Date, 
        ownerID: number, supportID: number, caseToken: string){
        this.C_ID = cID;
        this.HB_ID = hbID;
        this.caseNumber =  caseNumber;
        this.createdDate = createdDate;
        this.closedDate = closedDate;
        this.ownerID = ownerID;
        this.supportID = supportID;
        this.caseToken = caseToken;
    }
}