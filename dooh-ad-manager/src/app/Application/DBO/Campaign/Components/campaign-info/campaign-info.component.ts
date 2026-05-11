import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { sharedImports } from '../../../../../Shared/Imports/shared-imports';
import { AppComponent } from '../../../../../app.component';
import { Campaign } from '../../Models/campaign';
import { CampaignStatus } from '../../../../../Shared/Models/enum.model';
import { CampaignService } from '../../Services/campaign.service';
import { ApiResponse, MvGridConfig } from '../../../../../Shared/Models/response-model';
import { Subject, takeUntil } from 'rxjs';
import { ScreenInfoComponent } from '../../../../INV/Screen/Components/screen-info/screen-info.component';

@Component({
  selector: 'campaign-info',
  standalone: true,
  imports: [sharedImports, ScreenInfoComponent],
  templateUrl: './campaign-info.component.html',
  styleUrl: './campaign-info.component.scss'
})
export class CampaignInfoComponent extends AppComponent implements OnInit, OnDestroy {
  private destroy = new Subject<void>();
  
  isVisible = false;
  selectedCampaign: Campaign | null = null;

  CampaignStatus = CampaignStatus;

  constructor(
    injector: Injector,
    private campaignService: CampaignService,
  ) {
    super(injector);
  }

  ngOnInit() {
  
  }


  show(id: number){
    this.isVisible = true; 
    this.selectedCampaign = null;

    this.campaignService.getCampaignById(id)
    .pipe(takeUntil(this.destroy))
    .subscribe({
      next: (response :ApiResponse<MvGridConfig<Campaign>>) => {
        this.selectedCampaign = response.data.data?.[0] ?? null;
      },

      error: (err) => {
        this.showMessage('Error', err.message, 'error');
        this.isVisible = false;
      },
    });

  }

  hide(){
    this.isVisible = false;
    this.selectedCampaign = null;
  }

  ngOnDestroy(): void {
      this.destroy.next();
      this.destroy.complete();
  }
}
