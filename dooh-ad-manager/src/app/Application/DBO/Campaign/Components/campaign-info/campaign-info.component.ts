import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { sharedImports } from '../../../../../Shared/Imports/shared-imports';
import { AppComponent } from '../../../../../app.component';
import { Campaign } from '../../Models/campaign';
import { CampaignStatus } from '../../../../../Shared/Models/enum.model';
import { CampaignService } from '../../Services/campaign.service';
import {
  ApiResponse,
  MvGridConfig,
} from '../../../../../Shared/Models/response-model';
import { Subject, takeUntil } from 'rxjs';
import { ScreenInfoComponent } from '../../../../INV/Screen/Components/screen-info/screen-info.component';
import { MediaLibraryService } from '../../../MediaLibrary/Services/media-library.service';

@Component({
  selector: 'campaign-info',
  standalone: true,
  imports: [sharedImports, ScreenInfoComponent],
  templateUrl: './campaign-info.component.html',
  styleUrl: './campaign-info.component.scss',
})
export class CampaignInfoComponent
  extends AppComponent
  implements OnInit, OnDestroy
{
  private destroy = new Subject<void>();

  isVisible = false;
  selectedCampaign: Campaign | null = null;

  CampaignStatus = CampaignStatus;

  constructor(
    injector: Injector,
    private campaignService: CampaignService,
    private mediaLibraryService: MediaLibraryService,
  ) {
    super(injector);
  }

  ngOnInit() {}

  show(id: number) {
    this.isVisible = false;
    this.selectedCampaign = null;

    setTimeout(() => {
      this.isVisible = true;

      this.campaignService
        .getCampaignById(id)
        .pipe(takeUntil(this.destroy))
        .subscribe({
          next: (response: ApiResponse<MvGridConfig<Campaign>>) => {
            this.selectedCampaign = response.data.data?.[0] ?? null;
          },

          error: (err) => {
            this.showMessage('Error', err.message, 'error');
            this.isVisible = false;
          },
        });
    }, 0);
  }

  getMediaUrl(url: string): string {
    return this.mediaLibraryService.getMediaUrl(url);
  }

  hide() {
    this.isVisible = false;
    this.selectedCampaign = null;
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
