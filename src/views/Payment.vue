<template>
  <div>
    <BreadcrumbNav/>
    <div class="row box">
      <div class="col-75">
        <div class="container">
          <a href="" class="link-to-cart"><p class="back">&#8592; Back to delivery</p></a>
            <h1 class="delivery underline">Shipment</h1>
            <div class="row wrap">
              <!-- <div class="box-courier clicked">
                <div class="title">
                  <div class="box-name box-name-clicked">GO-SEND</div>
                  <div  class="box-price box-price-clicked">15,000</div>
                </div>
                <div class="check">
                  <i class="fas fa-check"></i>
                </div>
              </div> -->

              <div
                class="box-courier"
                v-for="(shipment, index) in shipments"
                :key=index
                @click="shipmentSelect(index)"
              >
                <div class="title">
                  <div class="box-name">{{ shipment.courier }}</div>
                  <div class="box-price">{{ formatPrice(shipment.price) }}</div>
                </div>

                <!-- <div>
                  <i class="fas fa-check"></i>
                </div> -->
              </div>
            </div>
        </div>
      </div>
      <div class="col-25">
        <div class="container">
          <h3 class="summary-title">Summary</h3>
          <p class="items-purchased">10 items purchased</p>
          <hr class="line">
          <p class="dev-estimation">Delivery estimation</p>
          <p class="courier-send">today by GO-SEND</p>
          <p class="cost">Cost of goods <span class="price">{{ formatPrice(Cost) }}</span></p>
          <p class="dropshipping">Dropshipping Fee <span class="price">{{ checked ? dropshippingFee : 0 }}</span></p>
          <p class="shipment-price"><span style="font-weight: bold;">GO-SEND</span> shipment <span class="price">{{ formatPrice(priceCourier) }}</span></p>
          <hr>
          <h3>Total <span class="price" style="color: #FF8A00;">{{ totalCost() }}</span></h3>
          <input type="submit" value="Continue to Payment" class="btn">
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
      checked: false,
      dropshippingFee: 5900,
      Cost: 500000,
      total: 0,
      priceCourier: 0,
      email: '',
      msg: [],
      shipments: [{
        courier: 'GO-SEND',
        price: 15000,
        deliveryEstimate: 'today'
      },
      {
        courier: 'JNE',
        price: 9000,
        deliveryEstimate: '2 days'
      },
      {
        courier: 'Personal Courier',
        price: 29000,
        deliveryEstimate: '1 day'
      }]
    }
  },
  methods: {
    formatPrice (value) {
      const val = (value / 1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    totalCost () {
      if (this.checked) {
        this.total = this.Cost + this.dropshippingFee + this.priceCourier
      } else {
        this.total = this.Cost
      }

      return this.formatPrice(this.total)
    },
    validateEmail (value) {
      // if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
      //   this.msg.email = ''
      // } else {
      //   this.msg.email = 'Invalid Email Address'
      // }
    },
    shipmentSelect (index) {
      console.log(index)
      this.priceCourier = this.shipments[index].price
    }
  },
  watch: {
    email (value) {
      this.email = value
      this.validateEmail(value)
    }
  }
}
</script>

<style scoped lang="scss">
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
  margin-top: 20px;
}

.dev-estimation {
  font-size: 14px;
  margin-top: 20px;
}

.courier-send {
  font-weight: 500;
  font-size: 16px;
  color: #1BD97B;
}

.cost {
  margin-top: 92px;
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
