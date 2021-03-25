export class User_BE{
    userId:number;
    loginId : string;
    password : string;
    firstName: string;
    isAdmin : boolean;

    constructor(
                loginId : string,
                password : string,
                firstName : string,
                isAdmin : boolean,
                userId? : number){
        this.loginId = loginId;
        this.password = password;
        this.firstName = firstName;
        this.isAdmin = isAdmin;  
        this.userId = userId;          
    }
}