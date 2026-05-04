import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { sharedImports } from '../../../../../Shared/Imports/shared-imports';
import { AppComponent } from '../../../../../app.component';
import { Subject, takeUntil } from 'rxjs';
import { Screen, ScreenFilter } from '../../Models/screen';
import {
  ScreenStatus,
  ScreenOrientation,
} from '../../../../../Shared/Models/enum.model';
import { ScreenService } from '../../Services/screen.service';
import {
  ApiResponse,
  MvGridConfig,
} from '../../../../../Shared/Models/response-model';
import { ScreenCreateEditComponent } from '../screen-create-edit/screen-create-edit.component';
import { ScreenOperatingHourComponent } from '../screen-operating-hour-create/screen-operating-hour.component';

@Component({
  selector: 'screen',
  standalone: true,
  imports: [
    sharedImports,
    ScreenCreateEditComponent,
    ScreenOperatingHourComponent,
  ],
  templateUrl: './screen.component.html',
  styleUrl: './screen.component.scss',
})
export class ScreenComponent extends AppComponent implements OnInit, OnDestroy {
  private destroy = new Subject<void>();
  screens: Screen[] = [];
  currentPage = 1;
  pageSize = 5;
  totalRows = 0;

  filter: ScreenFilter = {
    tenantId: 1,
    search: undefined,
    status: undefined,
    orientation: undefined,
  };

  ScreenStatus = ScreenStatus;
  ScreenOrientation = ScreenOrientation;
  statusOptions = [
    { label: 'Active', value: ScreenStatus.Active },
    { label: 'Inactive', value: ScreenStatus.Inactive },
    { label: 'Under Maintenance', value: ScreenStatus.UnderMaintenance },
  ];

  orientationOptions = [
    { label: 'Landscape', value: ScreenOrientation.Landscape },
    { label: 'Portrait', value: ScreenOrientation.Portrait },
    { label: 'Square', value: ScreenOrientation.Square },
  ];

  constructor(
    injector: Injector,
    private screenService: ScreenService,
  ) {
    super(injector);
  }

  ngOnInit() {
    this.loadScreens();
  }

  get totalPages(): number {
    return Math.ceil(this.totalRows / this.pageSize);
  }

  get offset(): number {
    return (this.currentPage - 1) * this.pageSize;
  }

  loadScreens() {
    this.screenService
      .getScreen(this.offset, this.pageSize, this.filter)
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: (response: ApiResponse<MvGridConfig<Screen>>) => {
          this.screens = response.data.data ?? [];
          this.totalRows = response.data.totalRows;
        },
        error: (err) => {
          this.showMessage('Error', err.message, 'error');
        },
      });
  }

  onFilter() {
    this.currentPage = 1;
    this.loadScreens();
  }

  onClearFilter() {
    this.filter = {
      tenantId: 0,
      search: undefined,
      status: undefined,
      orientation: undefined,
    };
    ((this.currentPage = 1), this.loadScreens());
  }

  onPageChange(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.loadScreens();
  }

  onSave(submitScreen: Screen) {
    const index = this.screens.findIndex((p) => p.id === submitScreen.id);

    if (index !== -1) {
      this.screens[index] = submitScreen;
      return;
    } 
    else {
      this.loadScreens();
      // this.screens = [submitScreen, ...this.screens]
      // this.totalRows++;
    }
  }

  onDelete(screen: Screen) {
    this.confirmAction({
      message: 'Are you sure you want to delete this screen',
      header: 'Delete Confirmation',
      accept: () => {
        this.screenService
          .deleteScreen({ id: screen.id, deletedBy: 1 })
          .pipe(takeUntil(this.destroy))
          .subscribe({
            next: (response: ApiResponse<Screen>) => {
              this.screens = this.screens.filter(
                (u) => u.id !== response.data.id,
              );
              this.totalRows -= 1;
              this.showMessage(
                'Deleted',
                'Screen deleted successfully',
                'success',
              );
            },
            error: (err) => {
              this.showMessage('Error', err.message, 'error');
            },
          });
      },
      reject: () => {
        this.showMessage('Cancel', 'Product deletion cancelled', 'info');
      },
    });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
