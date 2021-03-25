export class Post{
    id:number;
    email: string;
    post: string;
    time: string;
    image:string;
    isActive: boolean;

    constructor(id, email, post, time, isActive, image?){
        this.id = id;
        this.email = email;
        this.post = post;
        this.time = time;
        this.isActive = isActive;
        this.image = image;
    }
}