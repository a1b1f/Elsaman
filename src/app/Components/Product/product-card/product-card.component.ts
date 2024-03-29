import { Component, Input, OnInit } from '@angular/core';
import { AccountServices } from 'src/Services/Account';
import { addcart, CartServices } from 'src/Services/Cart';
import { favServices } from 'src/Services/Fav';
import { Product } from 'src/ViewModels/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() product:Product= new Product();
  CartItems:addcart[]=[];
   @Input() rateval:number=0;
   //isInCart:boolean=false;
   btnDis:string="btnDis";
   btn:string="btn";

    hidden:string="hidden";
   AddTOCart(ProducrID:number) {
    console.log(ProducrID)
      this.cart.AddCart(1,ProducrID,this.acc.getCurrentUserId()).subscribe(res=>this.product.isInCart=res.data);
    }

    AddTOFav(ProducrID:number){
    this.fav.AddFav(ProducrID,this.acc.getCurrentUserId()).subscribe(res=>console.log(res));
  }



    constructor(private cart:CartServices,
      private acc :AccountServices,
      private fav:favServices) {   }

    ngOnInit(): void {
     // console.log(this.product)
    }

}
