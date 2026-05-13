import {
  Component,
  EventEmitter,
  Injector,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { sharedImports } from '../../../../../../Shared/Imports/shared-imports';
import { AppComponent } from '../../../../../../app.component';
import { Subject, take, takeUntil } from 'rxjs';
import {
  CampaignMedia,
  CampaignMediaDeleted,
  CampaignMediaFilter,
  CampaignMediaInsert,
  CampaignMediaUpdate,
  MediaItem,
} from '../../../Models/campaign-media';
import { Campaign } from '../../../Models/campaign';
import { ScreenDropdown } from '../../../../../INV/Screen/Models/screen';
import { MediaDropdown } from '../../../../MediaLibrary/Models/media-library';
import { CampaignMediaService } from '../../../Services/campaign-media.service';
import { MediaLibraryService } from '../../../../MediaLibrary/Services/media-library.service';
import { ScreenService } from '../../../../../INV/Screen/Services/screen.service';
import {
  ApiResponse,
  MvGridConfig,
} from '../../../../../../Shared/Models/response-model';

@Component({
  selector: 'campaign-media-create-edit',
  standalone: true,
  imports: [sharedImports],
  templateUrl: './campaign-media-create-edit.component.html',
  styleUrl: './campaign-media-create-edit.component.scss',
})
export class CampaignMediaCreateEditComponent
  extends AppComponent
  implements OnInit, OnDestroy
{
  @Output() onSave = new EventEmitter<CampaignMedia>();

  private destroy = new Subject<void>();

  isActive = false;
  campaignData: Campaign | null = null;

  screen: ScreenDropdown[] = [];
  mediaList: MediaDropdown[] = [];

  newMedia: CampaignMediaInsert = new CampaignMediaInsert();

  campaignMedia: CampaignMedia[] = [];
  currentPage = 1;
  pageSize = 2;
  totalRows = 0;

  filter: CampaignMediaFilter = {
    campaignId: 0,
    screenId: undefined,
    playDate: undefined,
    search: undefined,
  };

  constructor(
    injector: Injector,
    private campaignMediaService: CampaignMediaService,
    private mediaLibraryService: MediaLibraryService,
    private screenService: ScreenService,
  ) {
    super(injector);
  }

  ngOnInit() {}

  show(campaign?: Campaign) {
    this.campaignData = campaign || null;
    this.isActive = false;

    setTimeout(() => {
      this.isActive = true;
      this.reset();
    }, 0);
  }

  reset() {
    this.newMedia = new CampaignMediaInsert();
    this.newMedia.campaignId = this.campaignData?.id ?? 0;
    this.filter.campaignId = this.campaignData?.id ?? 0;
    this.currentPage = 1;
    this.loadScreenDdl();
    this.loadMediaDdl();
    this.loadCampaignMedia();
  }

  loadScreenDdl() {
    console.log('campaignId:', this.campaignData?.id);
    this.screenService
      .getScreenDdl(this.campaignData?.id ?? 0)
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: (response: ApiResponse<ScreenDropdown[]>) => {
          this.screen = response.data ?? [];
        },
        error: (err) => this.showMessage('Error', err.error?.message, 'error'),
      });
  }

  loadMediaDdl() {
    this.mediaLibraryService
      .getMediaDdl()
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: (response: ApiResponse<MediaDropdown[]>) => {
          this.mediaList = response.data ?? [];
        },
        error: (err) => this.showMessage('Error', err.error?.message, 'error'),
      });
  }

  //form
  checkedMedia(mediaId: number) {
    const index = this.newMedia.media.findIndex((m) => m.mediaId === mediaId);
    if (index !== -1) {
      this.newMedia.media = this.newMedia.media.filter(
        (m) => m.mediaId !== mediaId,
      );
    } else {
      this.newMedia.media.push({
        mediaId: mediaId,
        playSequence: this.newMedia.media.length + 1,
      });
    }
  }

  isMediaSelected(mediaId: number): boolean {
    return this.newMedia.media.findIndex((m) => m.mediaId === mediaId) !== -1;
  }

  getSequence(mediaId: number): number {
    return (
      this.newMedia.media.find((m) => m.mediaId === mediaId)?.playSequence ?? 0
    );
  }

  onSequenceChange(mediaId: number, value: number) {
    const item = this.newMedia.media.find((m) => m.mediaId === mediaId);
    if (item) {
      item.playSequence = value;
    }
  }

  getMediaName(mediaId: number): string {
    return this.mediaList.find((m) => m.id === mediaId)?.name ?? '';
  }

  onAddMedia() {
    if (!this.newMedia.screenId) {
      this.showMessage('Error', 'Please select a screen', 'error');
      return;
    }

    if (!this.newMedia.playDate) {
      this.showMessage('Error', 'Please select a play date', 'error');
      return;
    }

    const seqs = this.newMedia.media.map((m) => m.playSequence);
    if (seqs.some((s) => s < 1)) {
      this.showMessage('Error', 'All sequences must be ≥ 1', 'error');
      return;
    }

    if (new Set(seqs).size !== seqs.length) {
      this.showMessage('Error', 'Duplicate play sequence values', 'error');
      return;
    }

    this.campaignMediaService
      .addCampaignMedia(this.newMedia)
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: (res: ApiResponse<CampaignMedia>) => {
          this.showMessage('Success', 'Media attached successfully', 'success');
          this.newMedia = new CampaignMediaInsert();
          this.newMedia.campaignId = this.campaignData?.id ?? 0;
          this.loadCampaignMedia();
          this.onSave.emit(res.data);
        },
        error: (err) => this.showMessage('Error', err.error?.message, 'error'),
      });
  }

  get offset(): number {
    return (this.currentPage - 1) * this.pageSize;
  }

  get totalPages(): number {
    return Math.ceil(this.totalRows / this.pageSize);
  }

  loadCampaignMedia() {
    this.campaignMediaService
      .getCampaignMedia(this.offset, this.pageSize, this.filter)
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: (res: ApiResponse<MvGridConfig<CampaignMedia>>) => {
          this.campaignMedia = res.data.data ?? [];
          this.totalRows = res.data.totalRows;
        },
        error: (err) => this.showMessage('Error', err.error?.message, 'error'),
      });
  }

  onSearch() {
    this.currentPage = 1;
    this.loadCampaignMedia();
  }

  onClearSearch() {
    this.filter.search = undefined;
    this.currentPage = 1;
    this.loadCampaignMedia();
  }

  onPageChange(page: number) {
    if (page < 1 || page > this.totalPages) {
      return;
    } 
    this.currentPage = page;
    this.loadCampaignMedia();
  }

  onPageSizeChange() {
    this.currentPage = 1;
    this.loadCampaignMedia();
  }

  getMediaUrl(url: string): string {
  return this.mediaLibraryService.getMediaUrl(url);
}

  //update sequence

  onSequenceSave(group: CampaignMedia) {
    const seqs = group.media.map((m) => m.playSequence);
    if (new Set(seqs).size !== seqs.length) {
      this.showMessage('Error', 'Duplicate play sequence values', 'error');
      return;
    }

    const update = new CampaignMediaUpdate();
    update.campaignId = group.campaignId;
    update.screenId = group.screenId;
    update.playDate = group.playDate as unknown as string;
    update.updatedBy = 1;
    update.media = group.media.map((m: MediaItem) => ({
      id: m.id,
      playSequence: m.playSequence,
    }));

    this.campaignMediaService
      .updateCampaignMedia(update)
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: () => this.showMessage('Success', 'Sequence updated', 'success'),
        error: (err) => this.showMessage('Error', err.error?.message, 'error'),
      });
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

  onDelete(itemId: number) {
    this.confirmAction({
      message: 'Are you sure you want to remove this media?',
      header: 'Delete Confirmation',
      accept: () => {
        this.campaignMediaService
          .deleteCampaignMedia({ id: itemId, deletedBy: 1 })
          .pipe(takeUntil(this.destroy))
          .subscribe({
            next: () => {
              this.showMessage(
                'Deleted',
                'Media removed successfully',
                'success',
              );
              this.loadCampaignMedia();
            },
            error: (err) =>
              this.showMessage('Error', err.error?.message, 'error'),
          });
      },
      reject: () => {
        this.showMessage('Cancel', 'Media deletion cancelled', 'info');
      },
    });
  }

  onClose() {
    document.body.click();
    this.isActive = false;
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
