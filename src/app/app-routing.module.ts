import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NoauthGuard } from './guards/noauth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'feed',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: './home/home.module#HomePageModule',
    canActivate: [NoauthGuard]
  },
  {
    path: 'register',
    loadChildren: './register/register.module#RegisterPageModule',
    canActivate: [NoauthGuard]
  },
  {
    path: 'feed',
    loadChildren: './feed/feed.module#FeedPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: './profile/profile.module#ProfilePageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'post/:id',
    loadChildren: './post/post.module#PostPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'info',
    loadChildren: './static/info/info.module#InfoPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'harashment',
    loadChildren: './static/harashment/harashment.module#HarashmentPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'support',
    loadChildren: './static/support/support.module#SupportPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'helpline',
    loadChildren: './static/helpline/helpline.module#HelplinePageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'list',
    loadChildren: './sos/list/list.module#ListPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'map',
    loadChildren: './sos/map/map.module#MapPageModule',
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],

  exports: [RouterModule]
})
export class AppRoutingModule { }
