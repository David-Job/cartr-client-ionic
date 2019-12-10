import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import Item from 'src/app/models/item';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.page.html',
  styleUrls: ['./item-list.page.scss'],
})
export class ItemListPage implements OnInit {
  items: Item[];

  constructor(
    public itemApi: ItemService,
    public loadingController: LoadingController,
    public router: Router,
    public route: ActivatedRoute
  ) {}

  async getItems() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
    });
    loading.present();

    const itemObserver = {
      next: (res: Item[]) => {
        this.items = res;
        console.log(this.items);
      },
      error: (err: any) => console.log(err),
      complete: () => loading.dismiss(),
    };
    this.itemApi.getAllItems().subscribe(itemObserver);
  }

  onClick() {

  }

  ngOnInit() {
    this.getItems();
  }
}
