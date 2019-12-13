import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';
import Item from 'src/app/models/item';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.page.html',
  styleUrls: ['./item-edit.page.scss'],
})
export class ItemEditPage implements OnInit {
  itemForm: FormGroup;
  itemId: string;
  item: Item;
  isLoadingResults = false;

  constructor(
    private router: Router,
    private itemApi: ItemService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute  ) {}

  getItem(itemId: string) {
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
      complete: () => (this.isLoadingResults = false),
    });
  }

  onFormSubmit() {
    const formValue = this.itemForm.value;
    this.item.description = formValue.description;
    this.item.brand = formValue.brand;
    this.item.price = formValue.price;
    this.item.stock = formValue.stock;

    this.isLoadingResults = true;
    this.itemApi.updateItem(this.itemId, this.item).subscribe({
      next: () => {
        this.router.navigate(['/item-detail', this.itemId]);
      },
      error: err => console.error(err),
      complete: () => (this.isLoadingResults = false),
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: params => {
        this.itemId = params.get('id');
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
