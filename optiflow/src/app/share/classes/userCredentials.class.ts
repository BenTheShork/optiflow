import { User } from "./user.class";

export class UserCredentials {
    public id: string = null;
    public username: string = null;
    public created_at: string = null;
    public updated_at: string = null;
  
    constructor(userShape?: Partial<UserCredentials>) {
      if (userShape?.id != null) {
        this.id = userShape.id;
      }
      if (userShape?.username != null) {
        this.username = userShape.username;
      }
      if (userShape?.created_at != null) {
        this.created_at = userShape.created_at;
      }
      if (userShape?.updated_at != null) {
        this.updated_at = userShape.updated_at;
      }
    }
}