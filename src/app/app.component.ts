import { afterNextRender, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainContainerComponent } from './main-container/main-container.component';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainContainerComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor() {
    // cuando acaba de hidratarse, una vez, si quieres cada vez usar afterRender
    afterNextRender(() => {
      console.log(window.location.pathname);
    }); 
  }
}
