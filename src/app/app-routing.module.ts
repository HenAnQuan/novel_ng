import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'mine',
    loadChildren: () => import('./mine/mine.module').then( m => m.MinePageModule)
  },
  {
    path: 'single-list',
    loadChildren: () => import('./single-list/single-list.module').then( m => m.SingleListPageModule)
  },
  {
    path: 'book-detail',
    loadChildren: () => import('./book-detail/book-detail.module').then( m => m.BookDetailPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
