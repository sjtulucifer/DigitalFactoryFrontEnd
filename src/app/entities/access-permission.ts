import { Menu } from "./menu";
import { Role } from "./role";

export class AccessPermission {
    constructor(
        public AccessPermissionId?: string,
        public AccessPermissionName?: string,
        public AccessPermissionDescription?: string,
        public Menus?: Menu [],
        public Role?: Role,
    ) { }
}
