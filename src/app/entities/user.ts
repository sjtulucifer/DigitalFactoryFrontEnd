import { Role } from "./role";

export class User {
    constructor(
        public UserId?: string,
        public UserLoginName?: string,
        public UserLoginPassword?: string,
        public UserName?: string,
        public UserPhone?: string,
        public UserEmail?: string,
        public UserDescription?: string,
        public Roles?: Array<Role>,
    ) { }
}
