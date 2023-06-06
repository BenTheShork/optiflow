
export class User {
    public username: string = null;
    public token: string = null;
    

    constructor(userShape?: Partial<User>) {

        if (userShape.username != null) {
            if (userShape.username != null) {
                this.username = userShape.username;
            }
            if (userShape.token != null) {
                this.token = userShape.token;
            }
           
        }
    }
}
