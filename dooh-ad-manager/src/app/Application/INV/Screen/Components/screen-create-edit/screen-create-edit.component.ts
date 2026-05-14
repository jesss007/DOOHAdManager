import {
  Component,
  EventEmitter,
  Injector,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { sharedImports } from '../../../../../Shared/Imports/shared-imports';
import { AppComponent } from '../../../../../app.component';
import { Subject, takeUntil } from 'rxjs';
import { Screen, ScreenInsert, ScreenUpdate } from '../../Models/screen';
import { ScreenService } from '../../Services/screen.service';
import {
  ScreenStatus,
  ScreenOrientation,
  ScreenResolution,
} from '../../../../../Shared/Models/enum.model';
import { ApiResponse } from '../../../../../Shared/Models/response-model';

@Component({
  selector: 'screen-create-edit',
  standalone: true,
  imports: [sharedImports],
  templateUrl: './screen-create-edit.component.html',
  styleUrl: './screen-create-edit.component.scss',
})
export class ScreenCreateEditComponent
  extends AppComponent
  implements OnInit, OnDestroy
{
  @Output() onSave = new EventEmitter<Screen>();

  private destroy = new Subject<void>();
  isActive: boolean = false;
  screenData: Screen | null = null;
  tagInput: string = '';
  screen: Screen = new Screen();
  resolutionOptions = Object.values(ScreenResolution).map((v) => ({
    label: v,
    value: v,
  }));

  constructor(
    injector: Injector,
    private screenService: ScreenService,
  ) {
    super(injector);
  }
  ngOnInit() {}

  show(screen?: Screen) {
    this.screenData = screen || null;
    this.initializeForm();
    this.isActive = true;
  }

  initializeForm() {
    this.tagInput = this.screenData?.tag ? this.screenData.tag.join(',') : '';
    this.screen = {
      id: this.screenData?.id || 0,
      tenantId: this.screenData?.tenantId || 1,
      name: this.screenData?.name || '',
      address: this.screenData?.address || '',
      location: this.screenData?.location || '',
      resolution: this.screenData?.resolution || ScreenResolution.R1920x1080,
      status: this.screenData?.status ?? ScreenStatus.Active,
      orientation: this.screenData?.orientation || ScreenOrientation.Landscape,
      tag: this.screenData?.tag || [],
    };
  }

  onSubmit() {
    if (!this.screen.name.trim()) {
      this.showMessage('Error', 'Name is required', 'error');
      return;
    }
    if (!this.screen.address.trim()) {
      this.showMessage('Error', 'Address is required', 'error');
      return;
    }
    if (!this.screen.resolution) {
      this.showMessage('Error', 'Resolution is required', 'error');
      return;
    }

    if (!this.screen.location?.trim()) {
      this.showMessage('Error', 'Location is required', 'error');
      return;
    }

    const latLngRegex =
      /^-?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*-?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;
    if (!latLngRegex.test(this.screen.location.trim())) {
      this.showMessage(
        'Error',
        'Location must be in latitude,longitude format (e.g. 27.7172,85.3240)',
        'error',
      );
      return;
    }

    this.screen.tag = this.tagInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t !== '');

    if (this.screenData) {
      this.screenService
        .updateScreen(this.screen as ScreenUpdate)
        .pipe(takeUntil(this.destroy))
        .subscribe({
          next: (response: ApiResponse<Screen>) => {
            this.isActive = false;
            this.onSave.emit(response.data);
            this.showMessage(
              'Updated',
              'Screen updated successfully',
              'success',
            );
          },
          error: (err) =>
            this.showMessage('Error', err.error?.message, 'error'),
        });
    } else {
      this.screenService
        .addScreen(this.screen as ScreenInsert)
        .pipe(takeUntil(this.destroy))
        .subscribe({
          next: (response: ApiResponse<Screen>) => {
            if (!response.success) {
              this.showMessage('Error', response.message, 'error');
              return;
            }
            this.isActive = false;
            this.onSave.emit(response.data);
            this.showMessage(
              'Created',
              'Screen created successfully',
              'success',
            );
          },
          error: (err) =>
            this.showMessage('Error', err.error?.message, 'error'),
        });
    }
  }

  onCancel() {
    this.isActive = false;
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
