export class User {
    id: string;
    firstName: string;
    lastName: string;
    dob: string;
    gender: string;
    email: string;
    phone: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
    isAdmin: boolean;
    isActive: boolean;
    photoId: string;
    posts:number;
    password:string;

    constructor(id, firstName, lastName,dob, gender, email, posts, password, isAdmin, isActive, phone?, city?, state?, country?, pincode?, photoId?){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dob = dob;
        this.gender = gender;
        this.email = email;
        this.posts = posts;
        this.password = password;
        this.isAdmin = isAdmin;
        this.isActive = isActive;
        this.phone = phone;
        this.city = city;
        this.state = state;
        this.country = country;
        this.pincode = pincode;
        this.photoId = photoId;
    }
}