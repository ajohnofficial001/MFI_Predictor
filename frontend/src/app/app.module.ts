import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';      // <-- IMPORTANT for [(ngModel)]
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],  // Any components, pipes, etc.
  imports: [
    BrowserModule,  // Re-exports CommonModule (which has currency & number pipes)
    FormsModule     // Needed for ngModel
    // CommonModule is optional here if BrowserModule is already imported
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }