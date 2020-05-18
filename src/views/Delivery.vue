<template>
  <div>
    <BreadcrumbNav/>
    <div class="row box">
      <div class="col-75">
        <div class="container">
          <form action="">
            <div class="row">
              <div class="col-50">
                <a href="" class="link-to-cart"><p class="back">&#8592; Back to cart</p></a>
                <h1 class="delivery underline">Delivery details</h1>
                <div class="input-group">
                  <input type="email" name="email" required>
                  <label for="email"  class="textbox">Email</label>
                </div>
                <div class="input-group">
                  <input type="text" pattern="^[0-9-+\s()]*$" minlength="6" maxlength="20" name="phone" required>
                  <label for="phone" class="textbox">Phone Number</label>
                </div>
                <div class="input-group">
                  <textarea rows="6" cols="50" maxlength="120" type="text" name="address" class="textarea" required></textarea>
                  <label for="address" class="textbox">Delivery address</label>
                </div>
              </div>
              <div class="col-50 dropshipper">
                <div class="checkbox-container" name="checked">
                  <label class="checkbox-label">
                    <input type="checkbox" v-model="checked">
                    <span class="checkbox-custom rectangular"></span>
                     <span class="send-as">Send as dropshipper </span>
                  </label>
                </div>
                <div v-show="checked">
                  <div class="input-group">
                    <input type="text" name="dropshipper-name" required>
                    <label for="dropshipper-name" class="input-dropshipper textbox">Dropshipper Name</label>
                  </div>
                  <div class="input-group">
                    <input type="tel" name="dropshipper-phone" required>
                    <label for="dropshipper-phone" class="input-dropshipper textbox">Dropshipper phone number</label>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="col-25">
        <div class="container">
          <h3>Summary</h3>
          <p>10 items purchased</p>
          <p class="cost">Cost of goods <span class="price">{{ Cost }}</span></p>
          <p>Dropshipping Fee <span class="price">{{ checked ? dropshippingFee : 0 }}</span></p>
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
      total: 0
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
  box-shadow: 0 3px 20px rgba(253, 140, 63, 0.2);
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

.icon-container {
  margin-bottom: 20px;
  padding: 7px 0;
  font-size: 24px;
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
