import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';

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

  constructor(private router: Router, private itemApi: ItemService, private formBuilder: FormBuilder) {}

  onFormSubmit() {
    console.log(this.itemForm.value);
    this.isLoadingResults = true;

    const observer = {
      next: (res: any) => {
        console.log(res);
        const id = res._id;
        this.isLoadingResults=false;
        this.router.navigate(['/item-detail', id]);
      },
      error: (err: any) => {
        console.log(err);
        this.isLoadingResults=false;
      },
      complete: () => (this.isLoadingResults = false),
    };
    
    this.itemApi.addItem(this.itemForm.value).subscribe(observer);
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
