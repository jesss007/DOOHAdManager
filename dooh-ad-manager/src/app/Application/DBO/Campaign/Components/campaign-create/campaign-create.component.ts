import {
  Component,
  EventEmitter,
  Injector,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { AppComponent } from '../../../../../app.component';
import { Campaign, CampaignInsert } from '../../Models/campaign';
import { Subject, takeUntil } from 'rxjs';
import { CampaignService } from '../../Services/campaign.service';
import { ScreenDropdown } from '../../../../INV/Screen/Models/screen';
import { ScreenService } from '../../../../INV/Screen/Services/screen.service';
import { ApiResponse } from '../../../../../Shared/Models/response-model';
import { sharedImports } from '../../../../../Shared/Imports/shared-imports';
import { ScreenInfoComponent } from '../../../../INV/Screen/Components/screen-info/screen-info.component';

@Component({
  selector: 'campaign-create',
  standalone: true,
  imports: [sharedImports, ScreenInfoComponent],
  templateUrl: './campaign-create.component.html',
  styleUrl: './campaign-create.component.scss',
})
export class CampaignCreateComponent
  extends AppComponent
  implements OnInit, OnDestroy
{
  @Output() onSubmit = new EventEmitter<Campaign>();

  private destroy = new Subject<void>();
  isActive = false;
  activeStep = 0;
  campaign: CampaignInsert = new CampaignInsert();

  screen: ScreenDropdown[] = [];
  selectedScreen: ScreenDropdown[] = [];
  minDate: Date = (() => {
    const d = new Date();
    d.setDate(d.getDate() + 1); // tomorrow
    return d;
  })();

  constructor(
    injector: Injector,
    private campaignService: CampaignService,
    private screenService: ScreenService,
  ) {
    super(injector);
  }

  ngOnInit() {}

  show() {
    this.isActive = true;
    this.reset();
  }

  reset() {
    this.activeStep = 0;
    this.loadScreen();
    this.campaign = new CampaignInsert();
    this.selectedScreen = [];
  }

  loadScreen() {
    this.screenService
      .getScreenDdl()
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: (response: ApiResponse<ScreenDropdown[]>) => {
          this.screen = response.data ?? [];
        },
        error: (err) => {
          this.showMessage('Error', err.message, 'error');
        },
      });
  }

  isSelected(screen: ScreenDropdown): boolean {
    return this.selectedScreen.findIndex((s) => s.id === screen.id) !== -1;
  }

  checkedScreen(screen: ScreenDropdown) {
    const index = this.selectedScreen.findIndex((s) => s.id === screen.id);

    if (index !== -1) {
      this.selectedScreen.splice(index, 1);
    } else {
      this.selectedScreen.push(screen);
    }
  }

  addDate() {
    this.campaign.date.push({
      startDate: null,
      endDate: null,
    });
  }
  removeDate(index: number) {
    if (this.campaign.date.length === 1) {
      this.campaign.date[0] = {
        startDate: null,
        endDate: null,
      };
      return;
    }

    this.campaign.date.splice(index, 1);
  }

  goNext() {
    if (this.activeStep === 0) {
      if (!this.campaign.name.trim()) {
        this.showMessage('Error', 'Campaign name is required.', 'error');
        return;
      }
    }

    if (this.activeStep === 1) {
      for (const d of this.campaign.date) {
        if (!d.startDate || !d.endDate) {
          this.showMessage('Error', 'Please fill in all date ranges.', 'error');
          return;
        }

        const start = new Date(d.startDate);
        const end = new Date(d.endDate);

        if (start > end) {
          this.showMessage(
            'Error',
            'Start date cannot be greater than End date.',
            'error',
          );
          return;
        }
      }

      const ranges = this.campaign.date
        .map((d) => ({
          start: new Date(d.startDate!),
          end: new Date(d.endDate!),
        }))
        .sort((a, b) => a.start.getTime() - b.start.getTime());

      for (let i = 0; i < ranges.length - 1; i++) {
        const current = ranges[i];
        const next = ranges[i + 1];

        // overlap condition
        if (current.end >= next.start) {
          this.showMessage('Error', 'Date ranges cannot overlap.', 'error');
          return;
        }
      }
    }

    if (this.activeStep === 2) {
      if (this.selectedScreen.length === 0) {
        this.showMessage(
          'Error',
          'Please select at least one screen.',
          'error',
        );
        return;
      }
    }
    this.activeStep++;
  }

  goBack() {
    this.activeStep--;
  }

  onSave() {
    this.confirmAction({
      message: 'Are you sure you want to save this campaign?',
      header: 'Save Confirmation',
      accept: () => {
        this.isActive = false;
        this.campaign.screen = this.selectedScreen.map((s) => ({
          screenId: s.id,
        }));

        this.campaignService
          .addCampaign(this.campaign)
          .pipe(takeUntil(this.destroy))
          .subscribe({
            next: (response: ApiResponse<Campaign>) => {
              this.isActive = false;
              this.onSubmit.emit(response.data);
              this.showMessage(
                'Saved',
                'Campaign saved successfully',
                'success',
              );
            },
            error: (err) =>
              this.showMessage('Error', err.error?.message, 'error'),
          });
      },
      reject: () => {
        this.showMessage('Cancelled', 'Campaign save cancelled', 'info');
      },
    });
  }

  onCancel() {
    this.isActive = false;
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
