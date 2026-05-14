import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { AppComponent } from '../../../../../app.component';
import { share, Subject, takeUntil } from 'rxjs';
import { MediaLibrary, MediaFilter } from '../../Models/media-library';
import { MediaLibraryService } from '../../Services/media-library.service';
import {
  ApiResponse,
  MvGridConfig,
} from '../../../../../Shared/Models/response-model';
import { sharedImports } from '../../../../../Shared/Imports/shared-imports';
import { MediaLibraryUploadComponent } from '../media-library-upload/media-library-upload.component';

@Component({
  selector: 'media-library',
  standalone: true,
  imports: [sharedImports, MediaLibraryUploadComponent],
  templateUrl: './media-library.component.html',
  styleUrl: './media-library.component.scss',
})
export class MediaLibraryComponent
  extends AppComponent
  implements OnInit, OnDestroy
{
  private destroy = new Subject<void>();

  mediaList: MediaLibrary[] = [];
  currentPage = 1;
  pageSize = 5;
  totalRows = 0;
  selectedMedia: MediaLibrary | null = null;
  previewVisible = false;

  filter: MediaFilter = {
    tenantId: 1,
    search: undefined,
    isVideo: undefined,
    isDeleted : false,
  };

  typeOptions = [
    { label: 'Images', value: false },
    { label: 'Videos', value: true },
  ];

  deletedOptions = [
    { label: 'Active', value: false },
    { label: 'Archived', value: true },
  ];
  constructor(
    injector: Injector,
    private mediaLibraryService: MediaLibraryService,
  ) {
    super(injector);
  }

  ngOnInit() {
    this.loadMedia();
  }

  get totalPages(): number {
    return Math.ceil(this.totalRows / this.pageSize);
  }

  get offset(): number {
    return (this.currentPage - 1) * this.pageSize;
  }

  loadMedia() {
    this.mediaLibraryService
      .getMedia(this.offset, this.pageSize, this.filter)
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: (response: ApiResponse<MvGridConfig<MediaLibrary>>) => {
          this.mediaList = response.data.data ?? [];
          this.totalRows = response.data.totalRows;
        },
        error: (err) => {
          this.showMessage('Error', err.message, 'error');
        },
      });
  }

  onFilter() {
    this.currentPage = 1;
    this.loadMedia();
  }

  onClearFilter() {
    this.filter = {
      tenantId: 1,
      search: undefined,
      isVideo: undefined,
      isDeleted: false,
    };
    this.currentPage = 1;
    this.loadMedia();
  }

  onPageChange(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.loadMedia();
  }

  getMediaType(media: any): string {
    return media.isVideo ? 'Video' : 'Image';
  }

  getMediaUrl(url: string): string {
    return this.mediaLibraryService.getMediaUrl(url);
  }

  onSave() {
    this.loadMedia();
  }

  onDelete(media: MediaLibrary) {
    this.confirmAction({
      message: 'Deleting this media will also remove it from any campaigns it is assigned to. Are you sure?',
      header: 'Delete Confirmation',
      accept: () => {
        this.mediaLibraryService
          .deleteMedia({ id: media.id, deletedBy: 1 })
          .pipe(takeUntil(this.destroy))
          .subscribe({
            next: (response: ApiResponse<MediaLibrary>) => {
              this.mediaList = this.mediaList.filter(
                (u) => u.id !== response.data.id,
              );
              this.showMessage(
                'Deleted',
                'Media deleted successfully',
                'success',
              );
            },
            error: (err) => {
              this.showMessage('Error', err.message, 'error');
            },
          });
      },
      reject: () => {
        this.showMessage('Cancel', 'Media deletion cancelled', 'info');
      },
    });
  }

  onPreview(media: MediaLibrary) {
    this.selectedMedia = media;
    this.previewVisible = true;
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
