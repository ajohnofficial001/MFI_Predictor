import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FinancialDataService {
  private betaApiUrl = 'https://api.newtonanalytics.com/stock-beta';
  private riskFreeRateUrl = 'https://api.stlouisfed.org/fred/series/observations?series_id=DGS10&api_key=d26079fc190512773ac705629a92f8ea&file_type=json';
  private sp500ApiUrl = 'https://api.stlouisfed.org/fred/series/observations?series_id=SP500&api_key=d26079fc190512773ac705629a92f8ea&file_type=json';

  constructor(private http: HttpClient) {}

  getBeta(ticker: string): Observable<number> {
    const url = `${this.betaApiUrl}/?ticker=${ticker}&index=^GSPC&interval=1mo&observations=12`;
    return this.http.get<any>(url).pipe(map(response => response.data));
  }

  getRiskFreeRate(): Observable<number> {
    return this.http.get<any>(this.riskFreeRateUrl).pipe(
      map(response => {
        const observations = response.observations;
        return observations.length > 0 ? parseFloat(observations[observations.length - 1].value) / 100 : 0.02;
      })
    );
  }

  getMarketReturnRate(): Observable<number> {
    return this.http.get<any>(this.sp500ApiUrl).pipe(
      map(response => {
        const observations = response.observations;
        if (observations.length > 1) {
          const firstDayValue = parseFloat(observations[0].value);
          const lastDayValue = parseFloat(observations[observations.length - 1].value);
          return (lastDayValue - firstDayValue) / firstDayValue;
        }
        return 0.08; // Default to 8%
      })
    );
  }

  getFinancialData(ticker: string): Observable<{ beta: number; riskFreeRate: number; marketReturnRate: number }> {
    return forkJoin({
      beta: this.getBeta(ticker),
      riskFreeRate: this.getRiskFreeRate(),
      marketReturnRate: this.getMarketReturnRate()
    });
  }
}
