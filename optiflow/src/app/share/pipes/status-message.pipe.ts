import { Pipe, PipeTransform } from '@angular/core';
import { ProcessStatus } from '../classes/process-status.enum';

@Pipe({
  name: 'statusMessage'
})
export class StatusMessagePipe implements PipeTransform {
    transform(value: ProcessStatus): string {
        switch (value) {
            case ProcessStatus.Completed:
                return 'completed';
            case ProcessStatus.Active:
                return 'active';
            default:
                return 'active';
        }
    }
}
