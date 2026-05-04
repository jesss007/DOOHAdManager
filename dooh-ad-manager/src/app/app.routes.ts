import { Routes } from '@angular/router';
import { ScreenComponent } from './Application/INV/Screen/Components/screen-list/screen.component';
import { MediaLibraryComponent } from './Application/DBO/MediaLibrary/Components/media-library-list/media-library.component';

export const routes: Routes = [
  { path: '', redirectTo: 'screen', pathMatch: 'full' },
  { path: 'screen', component: ScreenComponent },
  { path: 'media', component: MediaLibraryComponent},
];
