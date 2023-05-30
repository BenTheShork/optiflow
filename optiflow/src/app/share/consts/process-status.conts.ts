import { Lookup } from "../classes/helper/lookup.class";
import { ProcessStatus } from "../classes/process-status.enum";

export const PROCESS_STATUSES: Lookup[] = [
    new Lookup(ProcessStatus.Completed, 'completed'),
    new Lookup(ProcessStatus.Active, 'active')
];
