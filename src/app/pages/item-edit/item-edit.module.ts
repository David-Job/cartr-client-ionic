import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemEditPageRoutingModule } from './item-edit-routing.module';

import { ItemEditPage } from './item-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ItemEditPageRoutingModule
  ],
  declarations: [ItemEditPage]
})
export class ItemEditPageModule {}
