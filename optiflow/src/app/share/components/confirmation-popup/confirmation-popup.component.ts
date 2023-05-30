import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-popup',
  templateUrl: './confirmation-popup.component.html',
  styleUrls: ['./confirmation-popup.component.scss']
})
export class ConfirmationPopupComponent {

  @Input() popupVisible: boolean;
  @Input() title: string;
  @Input() description: string;
  @Input() previousValue: string;
  @Input() newValue: string;

  @Output() changeConfirmed = new EventEmitter<void>();
  @Output() popupVisibleChange = new EventEmitter<boolean>();

  constructor() { }

  confirmationClick() {
      this.changeConfirmed.emit();
      this.closePopup();
  }

  closePopup() {
      this.popupVisible = !this.popupVisible;
      this.popupVisibleChange.emit();
  }
}
