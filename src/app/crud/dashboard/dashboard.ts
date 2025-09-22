import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Global } from '../../global';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {
  stdData: any[] = [];
  id: any;

  constructor(private gblser: Global, private router: Router) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.gblser.getRecord('student_placed').subscribe({
      next: (res: any) => {
        this.stdData = res;
        console.log(this.stdData);
      },
      error: (err) => {
        console.error('Error fetching data:', err);
      }
    });
  }

  deleteData(id: any): void {
    if (!confirm(`Are you sure to delete the record with id:${id}`)) {
      return;
    }
    this.gblser.deleteRecord('student_placed', id).subscribe({
      next: () => {
        window.alert('Record Deleted Successfully');
        // Option A: refetch the list
        this.fetchData();
        // Option B: navigate or remove locally:
        // this.stdData = this.stdData.filter(s => s.id !== id);
      },
      error: (err) => {
        console.error('Delete failed', err);
        window.alert('Delete failed');
      }
    });
  }
  editData(id: any): void {
    this.router.navigate(['/crud/edit', id]);
  }
}