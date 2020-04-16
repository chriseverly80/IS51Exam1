import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlexModalService } from '../shared-components/flex-modal/flex-modal.service';
import { Http } from '@angular/http';
interface IOrder{
  pid:string;
  image:string;
  description: string;
  quantity: number;
  price: number;
}
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})

export class OrdersComponent implements OnInit {

  orders: Array<IOrder> = [];
  name: string;
errorMessage= '';
confirmmessage = '';

  constructor(
    private router: Router,
    private flexModal: FlexModalService,
    private http: Http
  ) {
  }

  async ngOnInit() {
    this.loadDefaultOrders();
  }
  calculate(){
    const total = this.orders.reduce((inc, item, i ,arr) => {
      inc += item.price * item.quantity;
      return inc;
    
    }, 0);
    const taxAmount = total + .15;
    const subTotal = total - taxAmount;
    return{
      total: total,
      taxAmount: taxAmount,
      subTotal: subTotal
    };
  }
  submit(){
    const commaIndex = this.name.indexOf (',')
    const firstName = this.name.slice(commaIndex, this.name.length);
    const lastName = this.name.slice(0, commaIndex);
    const fullName = firstName + ' ' + lastName;
    let error = false;
    if(commaIndex === -1) {
      this.errorMessage = 'Name Must have comma';
      error=true;


    }
    if(this.name === '') {
      this.errorMessage = 'Name must not me empty';
      error=true;

    }
    if(!error) {
      const firstName = this.name.slice(commaIndex, this.name.length);
    const lastName = this.name.slice(0, commaIndex);
    const fullName = firstName + ' ' + lastName;
    const calculation = this.calculate();
    this.confirmmessage = ' thank you for your order ${fullName} your sub total is: $calculation.subtotal}. your tax amound is ${calculation.tax} your grand total is ${caluclation.total}'
    }
    this.calculate();
    this.flexModal.openDialog('confirm-modal')
    else{
      this.flexModal.openDialog('error-modal');
    }
  }
loadDefaultOrders() {
  this.orders = [{
      "pid": "1",
      "image":"assets/sm_android.jpeg",
      "description": "Android",
      "price": 150.00,
      "quantity": 2
    }, {
      "pid": "2",
      "image":"assets/sm_iphone.jpeg",
      "description": "IPhone",
      "price": 200.00,
      "quantity": 1
    }, {
      "pid": "3",
      "image":"assets/sm_windows.jpeg",
      "description": "Windows Phone",
      "price": 110.00,
      "quantity": 2
    }];
}
delete(index: number) {
  this.orders.splice(index, 1);
}
addItem(item: string){
  if(item === 'android'){
    this.orders.unshift({
      
        "pid": "1",
        "image":"assets/sm_android.jpeg",
        "description": "Android",
        "price": 150.00,
        "quantity": 2
      });
    }else if (item === 'iphone') {
      this.orders.unshift({
        
          "pid": "2",
          "image":"assets/sm_iphone.jpeg",
          "description": "IPhone",
          "price": 200.00,
          "quantity": 1
        });
  
       } else if (item === 'windows') {
        this.orders.unshift({
          
            "pid": "3",
            "image":"assets/sm_windows.jpeg",
            "description": "Windows Phone",
            "price": 110.00,
            "quantity": 2
          }
        );
        
}
this.orders = this.orders.map((item, i) => {
  item.quantity = ' ';
  item.price = ' ';
  return item;
}

}
 
  }


    
  
  

