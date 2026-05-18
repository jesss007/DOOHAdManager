import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { AppComponent } from '../../../../../app.component';
import { Subject, takeUntil } from 'rxjs';
import { MvCampaign, MvCampaignFilter } from '../../Models/campaign';
import { sharedImports } from '../../../../../Shared/Imports/shared-imports';
import { CampaignStatus } from '../../../../../Shared/Models/enum.model';
import { CampaignService } from '../../Services/campaign.service';
import {
  ApiResponse,
  MvGridConfig,
} from '../../../../../Shared/Models/response-model';
import { CampaignCreateComponent } from '../campaign-create/campaign-create.component';
import { CampaignInfoComponent } from '../campaign-info/campaign-info.component';
import { CampaignMediaCreateEditComponent } from '../campaign-media/campaign-media-create-edit/campaign-media-create-edit.component';
import { MvCampaignMedia } from '../../Models/campaign-media';

@Component({
  selector: 'campaign',
  standalone: true,
  imports: [
    sharedImports,
    CampaignCreateComponent,
    CampaignInfoComponent,
    CampaignMediaCreateEditComponent,
  ],
  templateUrl: './campaign.component.html',
  styleUrl: './campaign.component.scss',
})
export class CampaignComponent
  extends AppComponent
  implements OnInit, OnDestroy
{
  private destroy$ = new Subject<void>();
  campaign: MvCampaign[] = [];
  campaignMedia?: MvCampaignMedia[];
  currentPage = 1;
  pageSize = 5;
  totalRows = 0;

  filter: MvCampaignFilter = {
    tenantId: 1,
    campaignId: undefined,
    status: undefined,
    search: undefined,
  };

  CampaignStatus = CampaignStatus;
  statusOptions = [
    { label: 'New', value: CampaignStatus.new },
    { label: 'Active', value: CampaignStatus.active },
    { label: 'Paused', value: CampaignStatus.paused },
    { label: 'Completed', value: CampaignStatus.completed },
    { label: 'Cancelled', value: CampaignStatus.cancelled },
  ];

  constructor(
    injector: Injector,
    private campaignService: CampaignService,
  ) {
    super(injector);
  }

  ngOnInit() {
    this.loadCampaign();
  }

  get totalPages(): number {
    return Math.ceil(this.totalRows / this.pageSize);
  }

  get offset(): number {
    return (this.currentPage - 1) * this.pageSize;
  }

  loadCampaign() {
    this.campaignService
      .getCampaign(this.offset, this.pageSize, this.filter)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: ApiResponse<MvGridConfig<MvCampaign>>) => {
          this.campaign = response.data.data ?? [];
          this.totalRows = response.data.totalRows;
        },
        error: (err) => {
          this.showMessage('Error', err.message, 'error');
        },
      });
  }

  onFilter() {
    this.currentPage = 1;
    this.loadCampaign();
  }

  onClearFilter() {
    this.filter = {
      tenantId: 1,
      campaignId: undefined,
      status: undefined,
      search: undefined,
    };
    this.currentPage = 1;
    this.loadCampaign();
  }

  onPageChange(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.loadCampaign();
  }

  onSave(campaign: MvCampaign) {
    this.loadCampaign();
  }

  onDelete(campaign: MvCampaign) {
    this.confirmAction({
      message: 'Are you sure you want to delete this campaign?',
      header: 'Delete Confirmation',
      accept: () => {
        this.campaignService
          .deleteCampaign({ id: campaign.id, deletedBy: 1 })
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (response: ApiResponse<MvCampaign>) => {
              this.campaign = this.campaign.filter(
                (c) => c.id !== response.data.id,
              );
              this.totalRows -= 1;
              this.showMessage(
                'Deleted',
                'Campaign deleted successfully',
                'success',
              );
            },
            error: (err) => {
              this.showMessage('Error', err.message, 'error');
            },
          });
      },
      reject: () => {
        this.showMessage('Cancel', 'Campaign deletion cancelled', 'info');
      },
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
