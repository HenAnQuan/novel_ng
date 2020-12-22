import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingleListPageRoutingModule } from './single-list-routing.module';

import { SingleListPage } from './single-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SingleListPageRoutingModule
  ],
  declarations: [SingleListPage]
})
export class SingleListPageModule {}
