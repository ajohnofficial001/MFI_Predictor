import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  mutualFunds: string[] = [
    'Mutual Fund 1',
    'Mutual Fund 2',
    'Mutual Fund 3'
  ];

  // Default Inputs
  selectedFund: string = this.mutualFunds[0];
  initialInvestment: number = 10000;
  timeHorizon: number = 10;
  returnRate: number = 15.72; // in %
  riskFreeRate: number = 4.57; // in %
  beta: number = 1;

  // Outputs
  earnings: number = 0;
  totalBalance: number = 0;
  showResults: boolean = false;

  calculate(): void {
    // Convert percentage to decimal
    const rateDecimal = this.returnRate / 100;

    /*
      Simple compound interest calculation:
      finalAmount = principal * (1 + rate)^years
      earnings = finalAmount - principal
      (You can adjust this formula to incorporate
       risk-free rate, beta, or advanced models)
    */
    const finalAmount = this.initialInvestment * Math.pow((1 + rateDecimal), this.timeHorizon);

    this.earnings = finalAmount - this.initialInvestment;
    this.totalBalance = finalAmount;
    this.showResults = true;
  }
}
