import { Component, Injector } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { NavBarComponent } from './Shared/NavBar/nav-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent],
  providers: [MessageService, ConfirmationService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'dooh-ad-manager';

  protected messageService : MessageService;
  protected confirmationService: ConfirmationService;

  constructor (protected injector: Injector){
    this.messageService = this.injector.get(MessageService);
    this.confirmationService = this.injector.get(ConfirmationService);
  }

  protected showMessage (
    summary: string,
    detail: string,
    severity: 'success' | 'info' | 'warn' | 'error' = 'info',
  ){
    this.messageService.add({severity, summary, detail});
  }

  protected confirmAction(config: {
    message: string;
    header?: string;
    accept:() => void;
    reject?: () => void;
  }){
    this.confirmationService.confirm(config);
  }
}


