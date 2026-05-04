import {
  Component,
  EventEmitter,
  Injector,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { sharedImports } from '../../../../../Shared/Imports/shared-imports';
import { AppComponent } from '../../../../../app.component';
import { MediaLibrary } from '../../Models/media-library';
import { Subject, takeUntil } from 'rxjs';
import { MediaLibraryService } from '../../Services/media-library.service';
import { ApiResponse } from '../../../../../Shared/Models/response-model';

@Component({
  selector: 'media-library-upload',
  standalone: true,
  imports: [sharedImports],
  templateUrl: './media-library-upload.component.html',
  styleUrl: './media-library-upload.component.scss',
})
export class MediaLibraryUploadComponent
  extends AppComponent
  implements OnInit, OnDestroy
{
  @Output() onSave = new EventEmitter<MediaLibrary>();

  private destroy = new Subject<void>();
  isActive: boolean = false;
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  name: string = '';
  isVideo: boolean = false;
  isLoading: boolean = false;
  showFileUpload: boolean = true;

  constructor(
    injector: Injector,
    private mediaLibraryService: MediaLibraryService,
  ) {
    super(injector);
  }

  ngOnInit() {
    
  }

  show() {
    this.reset();
    this.isActive = true;
  }

  reset() {
    this.selectedFile = null;
    this.previewUrl = null;
    this.name = '';
    this.isVideo = false;
    this.isLoading = false;
    this.showFileUpload = false;
  setTimeout(() => (this.showFileUpload = true), 0);
  }


  onFileSelect(event: any) {
    const file = event.files[0];
    if (!file) {
      return;
    }

    this.selectedFile = file;
    this.isVideo = file.type.startsWith('video/');

    const reader = new FileReader();
    reader.onload = (e) => (this.previewUrl = e.target?.result as string);
    reader.readAsDataURL(file);
  }

  onSubmit() {
    if (!this.selectedFile) {
      this.showMessage('Error', 'Please select a file', 'error');
      return;
    }
    if (!this.name.trim()) {
      this.showMessage('Error', 'Name is required', 'error');
    }

    this.isLoading = true;

    this.mediaLibraryService
      .uploadMedia(this.selectedFile, this.name.trim(), this.isVideo)
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: (response: ApiResponse<MediaLibrary>) => {
          if (!response.success) {
            this.showMessage('Error', response.message, 'error');
            this.isLoading = false;
            return;
          }
          this.isLoading = false;
          this.isActive = false;
          this.onSave.emit(response.data);
          this.showMessage('Success', 'Media uploaded successfully', 'success');
        },
        error: (err) => {
          this.isLoading = false;
          this.showMessage('Error', err.error?.message, 'error');
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
