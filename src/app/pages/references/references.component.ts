import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-references',
  standalone: true,
  templateUrl: './references.component.html',
  styleUrls: ['./references.component.css'],
  imports: [CommonModule, CardModule]
})
export class ReferencesComponent {}
