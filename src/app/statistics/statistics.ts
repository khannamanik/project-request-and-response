import { Component, inject } from '@angular/core';
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Employee } from '../employee';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.html',
  styleUrl: './statistics.css',
})
export class Statistics {
  service = inject(Employee);
  list: any[] = [];
  barChart: any;

  label = ['Total Users', 'Newly Added (2025)'];
  count = 0;
  recently = 0;

  ngOnInit() {
    this.getUsers();
  }

  
  ngAfterViewInit() {
    this.getUsers();
  }

  getUsers() {
    this.service.userlist().subscribe({
      next: (val) => {
        this.list = val;
        this.processData();
      },
    });
  }

  processData() {
    const currentYear = 2025;
    this.count = 0;
    this.recently = 0;

    this.list.forEach((user) => {
      const createdYear = new Date(user.date).getFullYear();
      if (createdYear === currentYear) this.recently++;
      this.count++;
    });

    const barData = [this.count, this.recently];

    
    setTimeout(() => this.showBarChart(barData));
  }

  showBarChart(data: any) {
    if (this.barChart) this.barChart.destroy();

    this.barChart = new Chart('barChart', {
      type: 'bar',
      data: {
        labels: this.label,
        datasets: [
          {
            label: 'User Statistics',
            data,
            backgroundColor: ['#0d6efd', '#20c997'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: { y: { beginAtZero: true } },
      },
    });
  }
}
