import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/Product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  productId: string | number | undefined;
  product: Product | undefined;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ){}
  ngOnInit(): void {
      this.productId = this.route.snapshot.params['id'];
      console.log(this.productId);
      this.productService.getProductById(this.productId).subscribe((p)=>{
        this.product = p;
      });
      
  }
}
