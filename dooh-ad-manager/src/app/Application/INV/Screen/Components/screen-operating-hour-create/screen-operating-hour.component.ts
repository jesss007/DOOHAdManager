import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { sharedImports } from '../../../../../Shared/Imports/shared-imports';
import { AppComponent } from '../../../../../app.component';
import {
  MvScreenOperatingHour,
  MvScreenOperatingHourAdd,
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
  operatingHour: MvScreenOperatingHour[] = [];
  private destroy$ = new Subject<void>();
  isVisible = false;
  DayOfWeek = DayOfWeek;
  startTimeDate!: Date;
  endTimeDate!: Date;

  newSlot: MvScreenOperatingHourAdd = new MvScreenOperatingHourAdd();

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

  ngOnInit() {
  }

  private createTime(hours: number, minutes: number, seconds: number): Date {
  const date = new Date();
  date.setHours(hours, minutes, seconds, 0);
  return date;
}

  show(screenId: number) {
    this.isVisible = false;
    this.newSlot = new MvScreenOperatingHourAdd();
    this.newSlot.screenId = screenId;
    this.startTimeDate = this.createTime(8, 0, 0);
    this.endTimeDate = this.createTime(22, 0, 0);
    setTimeout(() => {
      this.isVisible = true;
      this.loadOperatingHours(screenId);
    }, 0);
  }
  loadOperatingHours(screenId: number) {
    this.screenOperatingHourService
      .getOperatingHour(screenId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: ApiResponse<MvScreenOperatingHour[]>) => {
          this.operatingHour = response?.data ?? [];
          console.log('operating hours:', this.operatingHour);
        },
        error: (err) => {
          this.showMessage('Error', err.message, 'error');
        },
      });
  }

  addSlot() {
    if (!this.startTimeDate || !this.endTimeDate) {
      this.showMessage(
        'Warning',
        'Please select both Open and Close time.',
        'warn',
      );
      return;
    }

    const toSeconds = (d: Date) =>
      d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();

    const start = toSeconds(this.startTimeDate);
    const end = toSeconds(this.endTimeDate);

    if (start === end) {
      this.showMessage(
        'Warning',
        'Open time and Close time cannot be the same.',
        'warn',
      );
      return;
    }
    if (start > end) {
      this.showMessage(
        'Warning',
        'Open time must be less than Close time.',
        'warn',
      );
      return;
    }
    this.newSlot.startTime = this.startTimeDate.toTimeString().slice(0, 8);

    this.newSlot.endTime = this.endTimeDate.toTimeString().slice(0, 8);

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
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: ApiResponse<MvScreenOperatingHour>) => {
          if (!response.success) {
            this.showMessage('Error', response.message, 'error');
            return;
          }
          this.operatingHour.push(response.data);
          const screenId = this.newSlot.screenId;
          this.newSlot = new MvScreenOperatingHourAdd();
          this.newSlot.screenId = screenId;
          this.showMessage('Success', 'Slot added successfully', 'success');
        },
        error: (err) => this.showMessage('Error', err.error?.message, 'error'),
      });
  }

  deleteSlot(slot: MvScreenOperatingHour) {
    this.screenOperatingHourService
      .deleteOperatingHour({ id: slot.id, deletedBy: 1 })
      .pipe(takeUntil(this.destroy$))
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
    this.destroy$.next();
    this.destroy$.complete();
  }
}
