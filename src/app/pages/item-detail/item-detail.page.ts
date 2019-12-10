import { Component, OnInit } from '@angular/core';
import Item from 'src/app/models/item';
import { ItemService } from 'src/app/services/item.service';
import { ActivatedRouteSnapshot, Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.page.html',
  styleUrls: ['./item-detail.page.scss'],
})
export class ItemDetailPage implements OnInit {
  item: Item;

  constructor(
    public itemApi: ItemService,
    public loadingController: LoadingController,
    public router: Router,
    public route: ActivatedRoute
  ) {}

  async getItem() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
    });
    loading.present();

    const itemObserver = {
      next: (res: Item) => {
        this.item = res;
        console.log(this.item);
      },
      error: (err: any) => console.log(err),
      complete: () => loading.dismiss(),
    };
    this.itemApi.getItem(this.route.snapshot.paramMap.get('id')).subscribe(itemObserver);
  }

  ngOnInit() {
    this.getItem();
  }
}
