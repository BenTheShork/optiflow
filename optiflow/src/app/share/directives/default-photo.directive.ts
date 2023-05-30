import { Directive, HostBinding, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appDefaultPhoto]'
})
export class DefaultPhotoDirective  implements OnInit{
  @Input() appDefaultPhoto = 'assets/images/profile-image.png';
    @HostBinding('attr.src') src: string;
    @HostListener('error') onError(): void {
        this.src = this.appDefaultPhoto;
    }
    ngOnInit(): void {
        this.src = this.appDefaultPhoto;
    }
}
