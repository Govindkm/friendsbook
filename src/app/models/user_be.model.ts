export class User_BE{
    loginId : string;
    password : string;
    firstName: string;
    isAdmin : boolean;

    constructor(loginId : string,
                password : string,
                firstName : string,
                isAdmin : boolean){
        this.loginId = loginId;
        this.password = password;
        this.firstName = firstName;
        this.isAdmin = isAdmin;            
    }
}