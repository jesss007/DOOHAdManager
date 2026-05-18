import { Component, Injector } from '@angular/core';
import { sharedImports } from '../../../../../Shared/Imports/shared-imports';
import { AppComponent } from '../../../../../app.component';
import {
  DayOfWeek,
  ScreenStatus,
  ScreenOrientation,
} from '../../../../../Shared/Models/enum.model';
import { MvScreen } from '../../Models/screen';
import { ScreenService } from '../../Services/screen.service';
import {
  ApiResponse,
  MvGridConfig,
} from '../../../../../Shared/Models/response-model';

@Component({
  selector: 'screen-info',
  standalone: true,
  imports: [sharedImports],
  templateUrl: './screen-info.component.html',
  styleUrl: './screen-info.component.scss',
})
export class ScreenInfoComponent extends AppComponent {
  isVisible = false;
  selectedScreen: MvScreen | null = null;

  ScreenStatus = ScreenStatus;
  ScreenOrientation = ScreenOrientation;
  DayOfWeek = DayOfWeek;

  constructor(
    injector: Injector,
    private screenService: ScreenService,
  ) {
    super(injector);
  }

  show(id: number) {
    this.isVisible = true;
    this.selectedScreen = null;

    this.screenService.getScreenById(id).subscribe({
      next: (response: ApiResponse<MvGridConfig<MvScreen>>) => {
        this.selectedScreen = response.data.data?.[0] ?? null;
      },
      error: (err) => {
        this.showMessage('Error', err.message, 'error');
        this.isVisible = false;
      },
    });
  }
  hide() {
    this.isVisible = false;
    this.selectedScreen = null;
  }
}
