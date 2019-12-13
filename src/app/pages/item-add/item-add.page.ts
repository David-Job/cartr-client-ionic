import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-item-add',
  templateUrl: './item-add.page.html',
  styleUrls: ['./item-add.page.scss'],
})
export class ItemAddPage implements OnInit {
  itemForm: FormGroup;
  description = '';
  brand = '';
  price: number = null;
  stock: number = null;
  isLoadingResults = false;

  constructor(
    private router: Router,
    private itemApi: ItemService,
    private formBuilder: FormBuilder,
    private location: Location
  ) {}

  onFormSubmit() {
    console.log(this.itemForm.value);
    this.isLoadingResults = true;

    this.itemApi.addItem(this.itemForm.value).subscribe({
      next: (res: any) => {
        console.log(res);
        const id = res._id;
        this.location.back();
        this.router.navigate(['/item-detail', id]);
      },
      error: err => console.error(err),
      complete: () => (this.isLoadingResults = false),
    });
  }

  ngOnInit() {
    this.itemForm = this.formBuilder.group({
      description: [null, Validators.required],
      brand: [null, Validators.required],
      price: [null, Validators.required],
      stock: [null, Validators.required],
    });
  }
}
