import { AccessPermission } from "./access-permission";

export class Menu {
    constructor(
        public MenuId?: string,
        public MenuCategory?: string,
        public MenuName?: string,
        public MenuUrl?: string,
        public MenuDescription?: string,
        public AccessPermissions?: AccessPermission[],
    ) { }
}
