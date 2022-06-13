import { AccessPermission } from "./access-permission";
import { User } from "./user";

export class Role {
    constructor(
        public RoleId?: string,
        public RoleName?: string,
        public RoleDescription?: string,
        public Users?: User [],
        public APermission?: AccessPermission,
    ) { }
}
