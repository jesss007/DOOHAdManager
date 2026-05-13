import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { sharedImports } from '../../../../../Shared/Imports/shared-imports';
import { AppComponent } from '../../../../../app.component';
import {
  ScreenOperatingHour,
  ScreenOperatingHourInsert,
} from '../../Models/screen-operating-hour';
import { Subject, takeUntil } from 'rxjs';
import { ScreenOperatingHourService } from '../../Services/screen-operating-hour.service';
import { ApiResponse } from '../../../../../Shared/Models/response-model';
import { DayOfWeek } from '../../../../../Shared/Models/enum.model';

@Component({
  selector: 'screen-operating-hour',
  standalone: true,
  imports: [sharedImports],
  templateUrl: './screen-operating-hour.component.html',
  styleUrl: './screen-operating-hour.component.scss',
})
export class ScreenOperatingHourComponent
  extends AppComponent
  implements OnInit, OnDestroy
{
  operatingHour: ScreenOperatingHour[] = [];
  private destroy = new Subject<void>();
  isVisible = false;
  DayOfWeek = DayOfWeek;
  startTimeDate: Date | null = null;
  endTimeDate: Date | null = null;

  newSlot: ScreenOperatingHourInsert = new ScreenOperatingHourInsert();

  dayOptions = [
    { label: 'Everyday', value: DayOfWeek.Everyday },
    { label: 'Sunday', value: DayOfWeek.Sunday },
    { label: 'Monday', value: DayOfWeek.Monday },
    { label: 'Tuesday', value: DayOfWeek.Tuesday },
    { label: 'Wednesday', value: DayOfWeek.Wednesday },
    { label: 'Thursday', value: DayOfWeek.Thursday },
    { label: 'Friday', value: DayOfWeek.Friday },
    { label: 'Saturday', value: DayOfWeek.Saturday },
  ];

  constructor(
    injector: Injector,
    private screenOperatingHourService: ScreenOperatingHourService,
  ) {
    super(injector);
  }

  ngOnInit() {}

  show(screenId: number) {
    this.isVisible = false;
    this.newSlot = new ScreenOperatingHourInsert();
    this.newSlot.screenId = screenId;
    this.startTimeDate = null;
    this.endTimeDate = null;
    setTimeout(() => {
      this.isVisible = true;
      this.loadOperatingHours(screenId);
    }, 0);
  }
  loadOperatingHours(screenId: number) {
    this.screenOperatingHourService
      .getOperatingHour(screenId)
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: (response: ApiResponse<ScreenOperatingHour[]>) => {
          this.operatingHour = response?.data ?? [];
          console.log('operating hours:', this.operatingHour);
        },
        error: (err) => {
          this.showMessage('Error', err.message, 'error');
        },
      });
  }

  addSlot() {
    if (this.startTimeDate) {
      this.newSlot.startTime = this.startTimeDate.toTimeString().slice(0, 8);
    }
    if (this.endTimeDate) {
      this.newSlot.endTime = this.endTimeDate.toTimeString().slice(0, 8);
    }

    if (
      this.startTimeDate &&
      this.endTimeDate &&
      this.startTimeDate >= this.endTimeDate
    ) {
      this.showMessage(
        'Warning',
        'Open time must be less than close time',
        'warn',
      );
      return;
    }

    const hasOverlap = this.operatingHour.some((h) => {
      if (
        h.dayOfWeek !== this.newSlot.dayOfWeek &&
        h.dayOfWeek !== DayOfWeek.Everyday &&
        this.newSlot.dayOfWeek !== DayOfWeek.Everyday
      ) {
        return false;
      }
      return (
        this.newSlot.startTime < h.endTime && this.newSlot.endTime > h.startTime
      );
    });

    if (hasOverlap) {
      this.showMessage(
        'Warning',
        'This slot overlaps with an existing slot',
        'warn',
      );
      return;
    }

    this.screenOperatingHourService
      .insertOperatingHour(this.newSlot)
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: (response: ApiResponse<ScreenOperatingHour>) => {
          if (!response.success) {
            this.showMessage('Error', response.message, 'error');
            return;
          }
          this.operatingHour.push(response.data);
          const screenId = this.newSlot.screenId;
          this.newSlot = new ScreenOperatingHourInsert();
          this.newSlot.screenId = screenId;
          this.startTimeDate = null;
          this.endTimeDate = null;
          this.showMessage('Success', 'Slot added successfully', 'success');
        },
        error: (err) => this.showMessage('Error', err.error?.message, 'error'),
      });
  }

  deleteSlot(slot: ScreenOperatingHour) {
    this.screenOperatingHourService
      .deleteOperatingHour({ id: slot.id, deletedBy: 1 })
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: () => {
          this.operatingHour = this.operatingHour.filter(
            (h) => h.id !== slot.id,
          );
          this.showMessage('Deleted', 'Slot deleted successfully', 'success');
        },
        error: (err) => this.showMessage('Error', err.error?.message, 'error'),
      });
  }

  close() {
    this.isVisible = false;
    this.operatingHour = [];
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
