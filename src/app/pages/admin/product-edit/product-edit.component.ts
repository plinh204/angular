import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Product } from '../../../interfaces/Product';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [FormsModule, RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.scss',
})
export class ProductEditComponent implements OnInit {
  product: Product = {} as Product;
  productForm: FormGroup = {} as FormGroup;
  productId: string | null = null;
  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.productForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(1)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  loadProduct() {
    if (this.productId) {
      this.productService
        .getProductById(this.productId)
        .subscribe((product) => {
          this.product = product;
          this.productForm.patchValue(product);
        });
    }
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.loadProduct();
  }
  handleSubmit() {
    if (this.productForm.valid && this.productId !== null) {
      this.productService
        .updateProduct(this.productId, this.productForm.value)
        .subscribe((data) => {
          console.log('Cập nhập thành công!', data);
          alert('Cập nhập thành công!');
          this.router.navigate(['/admin']);
        });
    }
  }
}
