<template>
  <div>
    <BreadcrumbNav/>
    <div class="row box">
      <div class="col-75">
        <div class="container">
          <a href="/" class="link-to-cart"><p class="back">&#8592; Back to delivery</p></a>
          <h1 class="delivery underline">Shipment</h1>
          <div class="row wrap">
            <div
              class="box-courier"
              v-for="(shipment, index) in shipments"
              :key=index
              @click="shipmentSelect(index)"
              :class="{success: index == indexSuccess}"
            >
              <div class="title">
                <div class="box-name">{{ shipment.courier }}</div>
                <div class="box-price">{{ formatPrice(shipment.price) }}</div>
              </div>
              <div class="check" v-if="index == indexSuccess">
                <i class="fas fa-check"></i>
              </div>
            </div>
          </div>

          <h1 class="payment underline">Payment</h1>
          <div class="row wrap">
            <div class="box-courier" @click="payment('e-Wallet')" :class="{success: payments == 'e-Wallet'}">
              <div class="title">
                <div class="box-name">e-Wallet</div>
                <div class="box-price">1,500,000 left</div>
              </div>
              <div class="check" v-if="payments == 'e-Wallet'">
                <i class="fas fa-check"></i>
              </div>
            </div>
            <div class="box-courier" @click="payment('Bank Transfer')" :class="{success: payments == 'Bank Transfer'}">
              <div class="title">
                <div class="box-name account">Bank Transfer</div>
              </div>
              <div class="check" v-if="payments == 'Bank Transfer'">
                <i class="fas fa-check"></i>
              </div>
            </div>
            <div class="box-courier" @click="payment('Virtual Account')" :class="{success: payments == 'Virtual Account'}">
              <div class="title">
                <div class="box-name account">Virtual Account</div>
              </div>
              <div class="check" v-if="payments == 'Virtual Account'">
                <i class="fas fa-check"></i>
              </div>
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
          <p class="courier-send" v-if="courier">{{ deliveryTime }} by {{ courier }}</p>
          <p class="cost">Cost of goods <span class="price">{{ cost ? formatPrice(cost) : 0 }}</span></p>
          <p class="dropshipping">Dropshipping Fee <span class="price">{{ dropshippingFee ? formatPrice(dropshippingFee) : 0 }}</span></p>
          <p class="shipment-price" v-if="price"><span style="font-weight: bold;">{{ courier }}</span> shipment <span class="price">{{ price ? formatPrice(price) : 0 }}</span></p>
          <hr>
          <h3>Total <span class="price" style="color: #FF8A00;">{{ totalCost() }}</span></h3>
          <router-link to="/finish" type="submit" tag="button" v-if="payments" class="btn" @click="addPurchased">Payment with {{payments}}</router-link>
          <router-link to="/finish" type="submit" tag="button" v-else class="btn">Payment with ....</router-link>
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
      total: 0,
      allTotal: 0,
      courier: '',
      price: 0,
      payments: '',
      deliveryTime: 0,
      email: '',
      dataPurchased: [],
      msg: [],
      indexSuccess: null,
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
      if (this.price) {
        this.allTotal = this.total + this.price
      } else {
        this.allTotal = this.total
      }

      return this.formatPrice(this.allTotal)
    },
    shipmentSelect (index) {
      this.price = this.shipments[index].price
      this.courier = this.shipments[index].courier
      this.deliveryTime = this.shipments[index].deliveryEstimate
      this.indexSuccess = index
      this.totalCost(index)
    },
    payment (payment) {
      this.payments = payment
    },
    addPurchased () {
      this.process++

      // if (!this.Cost) return
      // if (!this.total) return
      // if (!this.dropshippingFee) return
      // if (!this.allTotal) return
      // if (!this.courier) return
      // if (!this.price) return
      // if (!this.deliveryTime) return
      // if (!this.payments) return

      this.dataPurchased.push({ cost: this.Cost })
      this.dataPurchased.push({ total: this.total })
      this.dataPurchased.push({ process: this.process })
      this.dataPurchased.push({ allTotal: this.allTotal })
      this.dataPurchased.push({ price: this.price })
      this.dataPurchased.push({ courier: this.courier })
      this.dataPurchased.push({ deliveryTime: this.deliveryTime })
      this.dataPurchased.push({ payments: this.payments })

      if (this.checked) {
        this.dataPurchased.push({ dropshippingFee: this.dropshippingFee })
      } else {
        this.dataPurchased.push({ dropshippingFee: 0 })
      }
      console.log(this.dataPurchased)
      this.savePurchased()
    },
    savePurchased () {
      const parsed = JSON.stringify(this.dataPurchased)
      localStorage.setItem('purchased', parsed)
    }
  },
  mounted () {
    if (localStorage.getItem('purchased')) {
      try {
        this.dataPurchased = JSON.parse(localStorage.getItem('purchased'))
        this.cost = this.dataPurchased[0].cost
        this.total = this.dataPurchased[1].total

        if (this.dataPurchased[3].dropshippingFee !== 0) {
          this.dropshippingFee = this.dataPurchased[3].dropshippingFee
        }

        console.log('COST', this.cost)
        console.log('TOTAL', this.total)
        console.log('Dropshiping Fee', this.dropshippingFee)
      } catch (e) {
        localStorage.removeItem('purchased')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.box-courier:focus {
  color: #1BD97B;
  background-color: rgba(27, 217, 123, 0.1);
  border: 1px solid #1BD97B;
  border-radius: 3px;
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
  margin-bottom: 10px;
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

.success {
  background-color: rgba(27, 217, 123, 0.1);
  border: 1px solid #1BD97B;
  border-radius: 3px;

  .box-name {
    color: black;
  }

  .box-price {
    color: black;
  }

  p {
    color: black;
  }
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

.account {
  font-size: 16px;
  padding-top: 18px;
}

.box-price {
  font-weight: bold;
  color: rgba(45, 42, 64, 0.6);
  font-size: 16px;
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
