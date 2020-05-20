<template>
  <div>
    <BreadcrumbNav/>
    <form id="app" action="/payment" method="post">
      <div class="row box">
        <div class="col-75">
          <div class="container">
              <div class="row">
                <div class="col-50">
                  <a href="" class="link-to-cart"><p class="back">&#8592; Back to cart</p></a>
                  <h1 class="delivery underline">Delivery details</h1>
                  <div class="input-group" :class="{success: msg.email == 1, warning: msg.email == 0}">
                    <input type="text" @input="validateEmail" v-model="email" name="email" required>
                    <label for="email" class="textbox" :class="{'success-span': msg.email == 1, 'warning-span': msg.email == 0}">Email</label>
                    <span v-if="msg.email == 0" class="InputAddOn-item"><i class="fa fa-times"></i></span>
                    <span v-if="msg.email == 1" class="InputAddOn-item"><i class="fa fa-check"></i></span>
                  </div>
                  <div class="input-group" :class="{success: msg.phone == 1, warning: msg.phone == 0}">
                    <input type="text" @input="validatePhone" v-model="phone" required>
                    <label for="phone" class="textbox" :class="{'success-span': msg.phone == 1, 'warning-span': msg.phone == 0}">Phone Number</label>
                   <span v-if="msg.phone == 0" class="InputAddOn-item"><i class="fa fa-times"></i></span>
                    <span v-if="msg.phone == 1" class="InputAddOn-item"><i class="fa fa-check"></i></span>
                  </div>
                  <div class="input-group" :class="{ success: success >= 3, warning: warning }">
                    <textarea rows="6" cols="50" maxlength="120" type="text" name="address" class="textarea" required></textarea>
                    <label for="address" class="textbox">Delivery address</label>
                    <span v-if="msg.address" class="messages">{{msg.address}}</span>
                  </div>
                </div>
                <div class="col-50 dropshipper">
                  <div class="checkbox-container" name="checked">
                    <label class="checkbox-label">
                      <input type="checkbox" v-model="checked">
                      <span class="checkbox-custom"></span>
                      <span class="send-as">Send as dropshipper </span>
                      <span v-if="msg.sendas" class="messages">{{msg.sendas}}</span>
                    </label>
                  </div>
                  <div v-show="checked">
                    <div class="input-group">
                      <input type="text" name="dropshipper-name" required>
                      <label for="dropshipper-name" class="input-dropshipper textbox">Dropshipper Name</label>
                      <span v-if="msg.dropShipName" class="messages">{{msg.dropShipName}}</span>
                    </div>
                    <div class="input-group">
                      <input type="tel" name="dropshipper-phone" required>
                      <label for="dropshipper-phone" class="input-dropshipper textbox">Dropshipper phone number</label>
                      <span v-if="msg.dropShipPhone" class="messages">{{msg.dropShipPhone}}</span>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
        <div class="col-25">
          <div class="container">
            <h3 class="summary-title">Summary</h3>
            <p>10 items purchased</p>
            <p class="cost">Cost of goods <span class="price">{{ formatPrice(Cost) }}</span></p>
            <p>Dropshipping Fee <span class="price">{{ checked ? formatPrice(dropshippingFee) : 0 }}</span></p>
            <hr>
            <h3>Total <span class="price" style="color: #FF8A00;">{{ totalCost() }}</span></h3>
            <input type="submit" value="Continue to Payment" class="btn">
          </div>
        </div>
      </div>
    </form>
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
      email: '',
      phone: '',
      msg: [],
      success: 0,
      warning: false
    }
  },
  methods: {
    formatPrice (value) {
      const val = (value / 1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    totalCost () {
      if (this.checked) {
        this.total = this.Cost + this.dropshippingFee
      } else {
        this.total = this.Cost
      }

      return this.formatPrice(this.total)
    },
    validateEmail (value) {
      const validate = (value) => {
        const atChecker = value.indexOf('@')
        const dotChecker = value.lastIndexOf('.')
        const indexingChecker = atChecker < dotChecker ? 1 : 0

        return atChecker !== -1 && dotChecker !== -1 ? indexingChecker : 0
      }

      if (validate(this.email)) {
        // this.success++
        // this.warning = false
        this.msg.email = 1
        console.log(this.msg.email)
      } else {
        // this.warning = true
        this.msg.email = 0
        // this.msg.email = 'Invalid Email Address'
      }
    },
    validatePhone (value) {
      if (/^[0-9-+\s()]*$/.test(value)) {
        // this.success++
        // this.warning = false
        this.msg.phone = 1
      } else {
        // this.warning = true
        this.msg.phone = 0
      }
    }
  },
  watch: {
    // email (value) {
    //   this.email = value
    //   this.validateEmail(value)
    // }
  }
}
</script>

<style scoped lang="scss">
input:focus, textarea:focus, select:focus{
  outline: none;
}

.messages {
  color: #FF8A00;
  font-size: 12px;
  padding-left: 10px;
}

.InputAddOn-item {
  margin-left: -30px;
}

.success {
  color: #1BD97B;
  border: 1px solid #1BD97B;
}

.success-span {
  color: #1BD97B !important;
}

.warning {
  color: #FF8A00;
  border: 1px solid #FF8A00;
}

.warning-span {
  color: #FF8A00 !important;
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

.cost {
  margin-top: 180px;
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

.col-25,
.col-50,
.col-75 {
  padding: 0 10px;
}

.dropshipper {
  padding: 0;
  margin-top: 50px;
}

// Checkbox
.checkbox-container {
  box-sizing: border-box;
  color: rgba(45, 42, 64, 0.8);
  margin-top: 55px;
  margin-bottom: 28px;
  margin-left: 260px;
}

.checkbox-label input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.checkbox-label .checkbox-custom {
  position: absolute;
  height: 20px;
  width: 20px;
  background-color: transparent;
  border: 2px solid #FF8A00;
  transition: all 0.3s ease-out;
  -webkit-transition: all 0.3s ease-out;
  -moz-transition: all 0.3s ease-out;
  -ms-transition: all 0.3s ease-out;
  -o-transition: all 0.3s ease-out;
}

.checkbox-label .checkbox-custom::after {
  position: absolute;
  content: "";
  left: 6px;
  top: 6px;
  height: 0px;
  width: 0px;
  border: solid #1BD97B;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(0deg) scale(0);
  -ms-transform: rotate(0deg) scale(0);
  transform: rotate(0deg) scale(0);
  opacity: 1;
  transition: all 0.3s ease-out;
  -webkit-transition: all 0.3s ease-out;
  -moz-transition: all 0.3s ease-out;
  -ms-transition: all 0.3s ease-out;
  -o-transition: all 0.3s ease-out;
}

.checkbox-label input:checked ~ .checkbox-custom {
  -webkit-transform: rotate(0deg) scale(1);
  -ms-transform: rotate(0deg) scale(1);
  transform: rotate(0deg) scale(1);
  opacity: 1;
  border: 2px solid #1BD97B;
}

.send-as {
  padding-left: 26px;
  font-size: 14px;
}

.checkbox-label input:checked ~ .checkbox-custom::after {
  -webkit-transform: rotate(45deg) scale(1);
  -ms-transform: rotate(45deg) scale(1);
  transform: rotate(45deg) scale(1);
  opacity: 1;
  left: 4px;
  top: -1px;
  width: 6px;
  height: 12px;
  border: solid #1BD97B;
  border-width: 0 2px 2px 0;
  background-color: transparent;
}

.container {
  padding: 5px 20px 15px 20px;
  border-radius: 3px;
}

.summary-title {
  margin-top: 40px;
  margin-bottom: 10px;
}

// Textbox
.input-group {
  position: relative;
  margin: 10px 5px 10px 0;
}

input[type="text"],input[type="tel"],input[type="email"] {
  height: 55px;
  width: 100%;
  font-size: 16px;
  padding: 13px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

textarea {
  font-family: Inter;
  border: 1px solid #ccc;
  font-size: 16px;
  border-radius: 3px;
  padding-left: 13px;
  padding-top: 20px;
  width: 100%;
  resize: none;
}

label.textbox, .input-group .input-dropshipper{
  color: #999;
  padding-left: 10px;
  font-size: 16px;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 18px;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
}

input:focus ~ label,
textarea:focus ~ label,
input:valid ~ label,
textarea:valid + label {
  transform: translate3d(0, -100%, 0);
  font-size: 14px;
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
    flex-direction: column;
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
}
</style>
