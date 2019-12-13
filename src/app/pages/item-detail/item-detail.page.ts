import { Component, OnInit } from '@angular/core';
import Item from 'src/app/models/item';
import { ItemService } from 'src/app/services/item.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.page.html',
  styleUrls: ['./item-detail.page.scss'],
})
export class ItemDetailPage implements OnInit {
  item: Item;
  itemId: string;
  isLoadingResults = false;
  editingMode = false;
  itemForm: any;

  constructor(
    private itemApi: ItemService,
    private loadingController: LoadingController,
    private router: Router,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private formBuilder: FormBuilder
  ) {}

  async confirmDeletion() {
    (
      await this.alertController.create({
        header: 'Confirm deletion',
        message: 'Are you sure you want to <strong>delete</strong> this item?',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel: blah');
            },
          },
          {
            text: 'Yes',
            handler: () => {
              console.log('Confirm Okay');
              this.deleteItem(this.itemId);
            },
          },
        ],
      })
    ).present();
  }

  async deleteItem(itemId: string) {
    this.isLoadingResults = true;

    this.itemApi.deleteItem(itemId).subscribe({
      next: () => {
        this.router.navigate(['item-list']);
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => (this.isLoadingResults = false),
    });
  }

  async getItem(itemId: string) {
    const loading = await this.loadingController.create({
      message: 'Loading...',
    });
    this.isLoadingResults = true;
    this.itemApi.getItem(itemId).subscribe({
      next: item => {
        this.itemForm.setValue({
          description: item.description,
          brand: item.brand,
          price: item.price,
          stock: item.stock,
        });
        this.item = item;
      },
      error: err => console.error(err),
      complete: () => {
        this.isLoadingResults = false;
        loading.dismiss();
      },
    });
  }

  async confirmSubmit() {
    (
      await this.alertController.create({
        header: 'Confirm changes',
        message: '<strong>Edit</strong> this item?',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel: blah');
            },
          },
          {
            text: 'Yes',
            handler: () => {
              console.log('Confirm Okay');
              this.submitEdit();
            },
          },
        ],
      })
    ).present();
  }

  submitEdit() {
    const formValue = this.itemForm.value;
    this.item.description = formValue.description;
    this.item.brand = formValue.brand;
    this.item.price = formValue.price;
    this.item.stock = formValue.stock;

    this.isLoadingResults = true;
    this.itemApi.updateItem(this.itemId, this.item).subscribe({
      next: () => {
        // This.router.navigate(['/item-detail', this.itemId]);
        this.toggleEditingMode();
      },
      error: err => console.error(err),
      complete: () => (this.isLoadingResults = false),
    });
  }

  toggleEditingMode() {
    this.editingMode = !this.editingMode;
  }

  ngOnInit() {
    this.route.paramMap.subscribe({
      next: params => {
        this.itemId = params.get('id');
        console.log(this.itemId);
        this.getItem(this.itemId);
      },
      error: err => console.error(err),
    });

    this.itemForm = this.formBuilder.group({
      description: [null, Validators.required],
      brand: [null, Validators.required],
      price: [null, Validators.required],
      stock: [null, Validators.required],
    });
  }
}
