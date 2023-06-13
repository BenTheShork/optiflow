
export class User {
    public username: string = null;
    public token: string = null;
    public id: string = null;
    public created_at: string = null;
    public updated_at: string = null;
    

    constructor(userShape?: Partial<User>) {

        if (userShape.username != null) {
            if (userShape.username != null) {
                this.username = userShape.username;
            }
            if (userShape.token != null) {
                this.token = userShape.token;
            }
            if (userShape?.id != null) {
                this.id = userShape.id;
              }
              if (userShape?.created_at != null) {
                this.created_at = userShape.created_at;
              }
              if (userShape?.updated_at != null) {
                this.updated_at = userShape.updated_at;
              }
           
        }
    }
}
