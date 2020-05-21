<template>
  <div>
    <BreadcrumbNav/>
    <div class="row box">
      <div class="col-75">
        <div class="container">
          <div class="col-100" style="width: 100%; padding-left: 250px;">
            <h1 class="delivery underline">Thank you</h1>
              <p class="order-id">Order ID: {{generate()}}</p>
              <p class="description">Your order will be delivered {{deliveryTime}} with {{courier}}</p>
              <a href="/" class="link-to-cart"><p class="back">&#8592; Back to delivery</p></a>
          </div>
        </div>
      </div>
      <div class="col-25">
        <div class="container">
          <h3 class="summary-title">Summary</h3>
          <p class="items-purchased">10 items purchased</p>

          <hr class="line">
          <p class="dev-estimation">Delivery estimation</p>
          <p class="courier-send">{{deliveryTime}} by {{courier}}</p>

          <hr class="line">
          <p class="dev-estimation">Payment method</p>
          <p class="courier-send">{{payments}}</p>
          <p class="cost">Cost of goods <span class="price">{{ formatPrice(cost) }}</span></p>
          <p class="dropshipping">Dropshipping Fee <span class="price">{{ formatPrice(dropshippingFee) }}</span></p>
          <p class="shipment-price"><span style="font-weight: bold;">{{courier}}</span> shipment <span class="price">{{ formatPrice(price) }}</span></p>
          <hr>
          <h3>Total <span class="price" style="color: #FF8A00;">{{ formatPrice(allTotal) }}</span></h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import BreadcrumbNav from '@/components/BreadcrumbNav.vue'

export default {
  name: 'Delivery',
  components: {
    BreadcrumbNav
  },
  data () {
    return {
      dropshippingFee: 0,
      cost: 0,
      courier: 0,
      allTotal: 0,
      price: 0,
      payments: '',
      deliveryTime: ''
    }
  },
  methods: {
    formatPrice (value) {
      const val = (value / 1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    generate () {
      const chars = '23456789abcdefghijkmnpqrstuvwxyzABCDEFGHIJKMNPQRSTUVWXYZ'
      let result = ''
      for (var i = 5; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))]
      return result
    }
  },
  mounted () {
    if (localStorage.getItem('purchased')) {
      try {
        this.dataPurchased = JSON.parse(localStorage.getItem('purchased'))
        this.courier = this.dataPurchased[6].courier
        this.deliveryTime = this.dataPurchased[7].deliveryTime
        this.payments = this.dataPurchased[8].payments
        this.price = this.dataPurchased[5].price
        this.cost = this.dataPurchased[1].cost
        this.allTotal = this.dataPurchased[4].allTotal
        this.dropshippingFee = this.dataPurchased[0].dropshippingFee

        console.log('COST FINSIH', this.cost)
        console.log('TOTAL FINSIH', this.total)
        console.log('Dropshiping Fee FINSIH', this.dropshippingFee)
      } catch (e) {
        // localStorage.removeItem('purchased')
        console.log('ERROR FINSIH')
        console.log(e)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.description {
  color: rgba(0, 0, 0, 0.6);
}

.description {
  font-size: 14px;
  margin-bottom: 50px;
}

.order-id {
  font-size: 14px;
}

.row {
  display: -ms-flexbox; /* IE10 */
  display: flex;
  -ms-flex-wrap: wrap; /* IE10 */
  flex-wrap: wrap;
  margin: 0 -16px 50px;
  background-color: white;
  border-radius: 10px;
}

.wrap {
  flex-wrap: wrap;
  padding: 0 10px;
}

.box-courier {
  border: 1px solid #CCCCCC;
  font-size: 13px;
  margin: 5px;
  width: 180px;
  height: 60px;
  padding-left: 15px;
  font-weight: 500;
  display: flex;
  cursor: pointer;
}

.title {
  width: 80%;
}

.check {
  width: 20%;
  padding-top: 20px;
  color: #1BD97B;
}

.box-name {
  padding-top: 8px;
  color: rgba(0, 0, 0, 0.6);
  padding-bottom: 2px;
}

.box-price {
  font-weight: bold;
  color: rgba(45, 42, 64, 0.6);
  font-size: 16px;
}

// Success Click
.clicked {
  border: 2px solid #1BD97B;
  background-color: rgba(27, 217, 123, 0.1);;
}

.box-price-clicked {
color: black;
}

.box-name-clicked {
color: black;
}

.delivery {
  font-size: 36px;
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  margin-top: 100px;
}

.underline {
  display: inline-block;
  border-bottom: 2px solid #EEEEEE;
  border-width: 5px;
}

.box {
  box-shadow: 0 3px 20px rgba(253, 140, 63, 0.3);
}

.col-25 {
  -ms-flex: 25%; /* IE10 */
  flex: 25%;
}

.col-50 {
  -ms-flex: 50%; /* IE10 */
  flex: 50%;
}

.link-to-cart {
  color: black;
  text-decoration: none;
  font-size: 14px;
}

p.back {
  font-size: 14px;
}

.col-75 {
  -ms-flex: 75%; /* IE10 */
  flex: 75%;
  border-right: 1px solid rgba(253, 140, 63, 0.2);
}

.col-100 {
  -ms-flex: 100%; /* IE10 */
  flex: 100%;
}

.col-25,
.col-50,
.col-75,
.col-100 {
  padding: 0 10px;
}

.container {
  padding: 5px 20px 15px 20px;
  border-radius: 3px;
}

.items-purchased {
  opacity: 0.6;
  font-size: 14px;
}

.summary-title {
  margin-top: 40px;
  margin-bottom: 10px;
}

.line {
  width: 80px;
  border: 1px solid #D8D8D8;
  margin-left: 0;
  margin-top: 15px;
  margin-bottom: 20px;
}

.dev-estimation {
  font-size: 14px;
  margin-top: 0;
}

.courier-send {
  font-weight: 500;
  font-size: 16px;
  color: #1BD97B;
  margin-top: -3px;
}

.cost {
  margin-top: 65px;
  opacity: 0.6;
  font-size: 14px;
}

.dropshipping {
  opacity: 0.6;
  font-size: 14px;
}

.shipment-price {
  font-size: 14px;
  opacity: 0.6;
}

.btn {
  background-color: #FF8A00;
  color: white;
  padding: 12px;
  margin: 10px 0;
  border: none;
  width: 100%;
  border-radius: 3px;
  cursor: pointer;
  font-size: 17px;
}

.btn:hover {
  background-color: rgba(253, 140, 63, 0.8);
}

span.price {
  float: right;
  color: black;
  font-weight: bold;
}

/* Responsive layout - when the screen is less than 800px wide, make the two columns stack on top of each other instead of next to each other (also change the direction - make the "cart" column go on top) */
@media (max-width: 800px) {
  .row {
    // flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
  }
  .col-25 {
    margin-bottom: 20px;
  }

  p.back {
    margin-top: 40px;
  }

  .container-title {
    width: 100%;
  }

  .wrap {
    flex-wrap: wrap;
    padding: 0 10px;
  }
}
</style>
