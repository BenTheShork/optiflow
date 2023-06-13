import { Lookup } from "../classes/helper/lookup.class";
import { VersionStatus } from "../classes/version-status.enum";

export const VERSION_STATUSES: Lookup[] = [
    new Lookup(VersionStatus.Inactive, 'inactive'),
    new Lookup(VersionStatus.Active, 'active')
];
