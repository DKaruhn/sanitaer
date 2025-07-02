import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    CalendarModule,
    CheckboxModule,
    FormsModule,
    ToastModule
  ],
  providers: [MessageService]
})
export class HomeComponent {
  heroImages = [
    '/assets/hero/hero-0.jpg',
    '/assets/hero/hero-1.jpg',
    '/assets/hero/hero-2.jpg',
    '/assets/hero/hero-3.jpg',
    '/assets/hero/hero-4.jpg'
  ];

  currentImageIndex = 0;

  bookingDialogVisible = false;
  appointmentName = '';
  appointmentDate: Date | null = null;
  address = '';
  selectedServices: string[] = [];
  customServiceText = '';

  services = [
    { label: 'Heizungswartung', value: 'Heizungswartung' },
    { label: 'Badsanierung', value: 'Badsanierung' },
    { label: 'Rohrverstopfung', value: 'Rohrverstopfung' },
    { label: 'Klimaanlage', value: 'Klimaanlage' },
    { label: 'Sonstiges', value: 'Sonstiges' }
  ];

  constructor(private messageService: MessageService) {
    setInterval(() => {
      this.currentImageIndex =
        (this.currentImageIndex + 1) % this.heroImages.length;
    }, 8000);
  }

  confirmAppointment() {
    if (this.appointmentName && this.appointmentDate && this.address) {
      const selected = this.selectedServices.join(', ');
      const extra = this.customServiceText ? ` (${this.customServiceText})` : '';
      const serviceText = selected ? `Anliegen: ${selected}${extra}` : 'Kein Anliegen angegeben.';

      this.messageService.add({
        severity: 'success',
        summary: 'Termin gespeichert',
        detail: `Für ${this.appointmentName} am ${this.appointmentDate.toLocaleDateString()} bei ${this.address}. ${serviceText}`,
        life: 5000
      });

      this.bookingDialogVisible = false;
      this.appointmentName = '';
      this.appointmentDate = null;
      this.address = '';
      this.selectedServices = [];
      this.customServiceText = '';
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Fehlende Angaben',
        detail: 'Bitte Name, Datum und Adresse eingeben.',
        life: 4000
      });
    }
  }
}
