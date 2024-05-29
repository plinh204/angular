import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../../interfaces/Product';
import { ProductService } from '../../../services/product.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  products: Product[] | undefined;
  constructor(private productService: ProductService){}
  loadProducts() {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }
  ngOnInit() {
    this.loadProducts();
  }
  handleDelete(id: string | number | undefined) {
    if (confirm('Bạn có chắc chắn muốn xóa không?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        console.log('Product deleted successfully!');
        alert('Xóa thành công!');
        this.loadProducts(); // Reload the products after deletion
      });
    }
  }
}
