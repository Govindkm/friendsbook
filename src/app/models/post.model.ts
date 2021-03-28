export class Post{
    id:number;
    email: string;
    name:string;
    post: string;
    time: string;
    image:string;
    userIcon:string;
    isActive: boolean;

    constructor(id, email, name, post, time, isActive, image?, userIcon?){
        this.id = id;
        this.email = email;
        this.name = name;
        this.post = post;
        this.time = time;
        this.isActive = isActive;
        this.image = image;
        this.userIcon = userIcon;
    }
}