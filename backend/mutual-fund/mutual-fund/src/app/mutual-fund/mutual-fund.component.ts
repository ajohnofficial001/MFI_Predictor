import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FinancialDataService } from '../financial-data.service';

@Component({
  selector: 'app-mutual-fund',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mutual-fund.component.html',
  styleUrls: ['./mutual-fund.component.css']
})
export class MutualFundComponent {
  mutualFunds = [
    { ticker: 'VFIAX', name: 'Vanguard 500 Index Fund' },
    { ticker: 'FXAIX', name: 'Fidelity 500 Index Fund' },
    { ticker: 'SPY', name: 'SPDR S&P 500 ETF Trust' }
  ];

  selectedFund: any;
  beta: number | null = null;
  initialInvestment: number = 0;
  timePeriod: number = 0;
  futureValue: number | null = null;
  riskFreeRate: number = 0.02;
  marketReturnRate: number = 0.08;
  expectedReturn: number = 0.01;

  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(private financialDataService: FinancialDataService) {}

  ngOnInit(): void {
    this.selectedFund = this.mutualFunds[0];
    this.fetchFinancialData();
  }

  fetchFinancialData(): void {
    this.isLoading = true;
    this.errorMessage = null;

    if (this.selectedFund) {
      this.financialDataService.getFinancialData(this.selectedFund.ticker).subscribe(
        (response) => {
          this.beta = response.beta / 100;
          this.riskFreeRate = response.riskFreeRate / 100;
          this.marketReturnRate = response.marketReturnRate;
          this.calculateFutureValue();
          this.isLoading = false;

          console.log("Ticker/selectedFund: " + this.selectedFund.ticker)
          console.log("Beta: " + this.beta)
          console.log("RFR  " + this.riskFreeRate)
          console.log("Market Free Rate " + this.marketReturnRate)
        },
        (error) => {
          this.isLoading = false;
          this.errorMessage = 'Failed to fetch financial data.';
        }
      );
    }
  }

  onFundChange(): void {
    this.fetchFinancialData();
  }

  calculateFutureValue() {
    if (this.beta !== null && this.initialInvestment > 0 && this.timePeriod > 0) {
      this.expectedReturn = this.riskFreeRate + this.beta * (this.marketReturnRate - this.riskFreeRate);
      // this.futureValue = this.initialInvestment * Math.pow(1 + expectedReturn, this.timePeriod);
      this.futureValue = this.initialInvestment * Math.pow(1 + this.expectedReturn, this.timePeriod);
      console.log("future value:" + this.futureValue)
      console.log("expected return:" + this.expectedReturn)
      console.log("selected fund:" + this.selectedFund)
    }
  }
}
