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
    'assets/hero/hero-0.jpg',
    'assets/hero/hero-1.jpg',
    'assets/hero/hero-2.jpg',
    'assets/hero/hero-3.jpg',
    'assets/hero/hero-4.jpg'
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


  googleReviews = [
    {
      name: 'Wo Wu',
      text: `Nachdem mich die "Fachfirma", bei der ich seit mehreren Jahren Kunde war (inklusive Wartungsvertrag) nach mehreren Wochen (!) des Herumeierns von jetzt auf gleich schmählich im Stich gelassen hatte, sorgte Herr Kortschak innerhalb kürzester Zeit dafür, dass meine Viessmann-Heizung (eine harte Nuss!) wieder lief. Herr Kortschak ist buchstäblich ein Meister seines Fachs, zuverlässig und geradezu unglaublich hartnäckig auch und gerade bei schwereren Fällen wie diesem. Ich kann mich der Einschätzung meines "Leidensgenossens" Herrn Schuberth nur anschließen: Herr Kortschak ist die ERSTE WAHL. Leider kann ich nur fünf Sterne vergeben. Deshalb ist hier noch einer: *`
    },
    {
      name: 'Horst Schuberth',
      text: `Es ging um eine Öl-Brennwert-Heizung. Keine 2 Jahre alt. Die Heizung hatte keine Lust mehr zu funktionieren. Eine Fehlersuche ergab, dass zuerst die Ölpumpe und nach dieser Reparatur auch noch der Zündtrafo defekt waren. Dann lief endlich die Anlage. Mehrere Tests (An/Aus) wurden durchgeführt. Mein Urteil: Vertrauenswürdig, kompetent, schnell, engagiert und zuverlässig. Herr Kortschak ist die ERSTE WAHL`
    },
    {
      name: 'Sylvia Kipry',
      text: `Absoluter zuverlässig, leistet top Arbeit. Auf jeden Fall weiter zuempfehlen !!!!`
    },
    {
      name: 'Markus Unger',
      text: `Hatten bei unser doch relativ alten Vailant Heizung (von 1999) eine Störung und mehrere Probleme, so dass die Heizung sich nach wenigen Minuten von selbst ausgeschaltet hat. Der Herr Kortschak war nach einem kurzen Telefongespräch am nächsten Tag vor Ort und konnte alles beheben. Super freundlich und großartige Arbeit. Eine klare Empfehung!`
    }
  ];


  constructor(private messageService: MessageService) {
    setInterval(() => {
      this.currentImageIndex =
        (this.currentImageIndex + 1) % this.heroImages.length;
    }, 8000);
  }

  selectedReview: any = null;
  reviewDialogVisible = false;

  openReviewDialog(review: any) {
    this.selectedReview = review;
    this.reviewDialogVisible = true;
  }

  closeReviewDialog() {
    this.reviewDialogVisible = false;
    this.selectedReview = null;
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
