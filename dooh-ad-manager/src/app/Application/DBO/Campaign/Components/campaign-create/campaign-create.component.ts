import {
  Component,
  EventEmitter,
  Injector,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { AppComponent } from '../../../../../app.component';
import {
  Campaign,
  CampaignDateInsert,
  CampaignScreenInsert,
} from '../../Models/campaign';
import { Subject, takeUntil } from 'rxjs';
import { CampaignService } from '../../Services/campaign.service';
import { ScreenDropdown } from '../../../../INV/Screen/Models/screen';
import { ScreenService } from '../../../../INV/Screen/Services/screen.service';
import {
  ApiResponse,
  MvGridConfig,
} from '../../../../../Shared/Models/response-model';
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

  campaignName = '';
  campaignRemarks = '';
  campaignDate: CampaignDateInsert[] = [{ startDate: '', endDate: '' }];

  screen: ScreenDropdown[] = [];
  selectedScreen: ScreenDropdown[] = [];

  constructor(
    injector: Injector,
    private campaignService: CampaignService,
    private screenService: ScreenService,
  ) {
    super(injector);
  }

  ngOnInit() {}

  show() {
    this.isActive = false;
    this.loadScreen();
    setTimeout(() => {
    this.activeStep = 0;
    this.campaignName = '';
    this.campaignRemarks = '';
    this.campaignDate = [{ startDate: '', endDate: '' }];
    this.screen = [];
    this.selectedScreen = [];
    this.isActive = true;
    },0);
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
    this.campaignDate.push({ startDate: '', endDate: '' });
  }

  removeDate(index: number) {
    if (this.campaignDate.length === 1) {
      this.campaignDate[0] = { startDate: '', endDate: '' };
      return;
    }
    this.campaignDate.splice(index, 1);
  }

  formatDate(value: Date): string {
    const d = new Date(value);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();

    const mm = month < 10 ? '0' + month : '' + month;
    const dd = day < 10 ? '0' + day : '' + day;

    return year + '-' + mm + '-' + dd;
  }

  goNext() {
    if (this.activeStep === 0) {
      if (!this.campaignName.trim()) {
        this.showMessage('Error', 'Campaign name is required.', 'error');
        return;
      }
    }

    if (this.activeStep === 1) {
      for (const d of this.campaignDate) {
        if (!d.startDate || !d.endDate) {
          this.showMessage('Error', 'Please fill in all date ranges.', 'error');
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
        const screenList: CampaignScreenInsert[] = this.selectedScreen.map(
          (s) => ({ screenId: s.id }),
        );

        this.campaignService
          .addCampaign({
            tenantId: 1,
            name: this.campaignName,
            remarks: this.campaignRemarks,
            createdBy: 1,
            date: this.campaignDate,
            screen: screenList,
          })
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
            error: (err) => this.showMessage('Error', err.message, 'error'),
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
