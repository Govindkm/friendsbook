export class Post{
<<<<<<< Updated upstream
    id: string;
    post: string;
    userId: string;
    userPhotoId: string;
    postImageId: string;
    userName: string;
    isAdmin: boolean;
    isActive: boolean;
    postTimer: string;
=======
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
>>>>>>> Stashed changes
}