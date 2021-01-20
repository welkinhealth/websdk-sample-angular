import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ZoomVideoComponent } from './zoom-video/zoom-video.component';

const routes: Routes = [
  { path: '', redirectTo: '/zoom-video', pathMatch: 'full' },
  { path: 'zoom-video/:token', component: ZoomVideoComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
