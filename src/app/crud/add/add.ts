// ...existing code...
import { Component, OnInit } from '@angular/core';
import { Global } from '../../global';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add.html',
  styleUrls: ['./add.css'] // fix property name
})
export class Add implements OnInit {
  name = '';
  company = '';
  editingId: number | null = null;

  constructor(private gblser: Global, public router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.editingId = Number(idParam);
      this.gblser.getSingleRecord('student_placed', this.editingId).subscribe({
        next: (rec) => {
          this.name = rec?.name ?? '';
          this.company = rec?.company ?? '';
        },
        error: (err) => {
          console.error('Could not load record for edit', err);
        }
      });
    }
  }

  submit(): void {
    const payload = {
      name: this.name,
      company: this.company
    };
    if (this.editingId != null) {
      this.gblser.updateRecord('student_placed', payload, this.editingId).subscribe({
        next: () => {
          window.alert('Record updated');
          this.router.navigate(['/crud']);
        },
        error: (err) => {
          console.error('Update failed', err);
          window.alert('Update failed');
        }
      });
    } else {
      this.gblser.addRecord('student_placed', payload).subscribe({
        next: () => {
          window.alert('Record added');
          this.router.navigate(['/crud']);
        },
        error: (err) => {
          console.error('Add failed', err);
          window.alert('Add failed');
        }
      });
    }
  }

  goToCrud() {
    this.router.navigate(['/crud']);
  }
}
// ...existing code...