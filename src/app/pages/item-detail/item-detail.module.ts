import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemDetailPageRoutingModule } from './item-detail-routing.module';

import { ItemDetailPage } from './item-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ItemDetailPageRoutingModule
  ],
  declarations: [ItemDetailPage]
})
export class ItemDetailPageModule {}
