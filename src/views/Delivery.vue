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
                <h1 class="delivery">Delivery details</h1>
                <!-- <div> -->
                  <input type="email" id="email" name="email" placeholder="Email" required>
                  <!-- <label for="email" placeholder="Email"></label> -->
                <!-- </div> -->
                <input type="text" id="phone" name="phone" placeholder="Phone Number">
                <textarea rows="6" cols="50" type="text" id="adr" name="address" placeholder="Delivery Address" class="textarea"></textarea>
              </div>
              <div class="col-50 dropshipper">
                <div  style="float: right;" class="send-as">
                  <label class="check-dropshipper">
                    <input type="checkbox">
                    <span class="checkmark"></span>
                    <p class="send-as-dropshipper">Send as dropshipper</p>
                  </label>
                </div>
                <input type="text" id="cname" name="cardname" placeholder="Dropshipper Name">
                <input type="tel" id="phonenumber" name="phonenumber" placeholder="1111-2222-3333-4444">
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="col-25">
        <div class="container">
          <h3>Summary</h3>
          <p>10 items purchased</p>
          <p class="cost">Cost of goods <span class="price">500,000</span></p>
          <p>Dropshipper Fee <span class="price">5,900</span></p>
          <hr>
          <h3>Total <span class="price" style="color: #FF8A00;">505,900</span></h3>
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
  /* margin-top: 50px; */
}

/* Checkbox */
.check-dropshipper {
  display: block;
  position: relative;
  padding-left: 80px;
  cursor: pointer;
  padding-bottom: 2px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.check-dropshipper input[type="checkbox"] {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 16px;
  width: 16px;
  border: 2px solid #1BD97B;
}

.check-dropshipper:hover input ~ .checkmark {
  background-color: rgba(27, 217, 123, 0.5);
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.check-dropshipper input:checked ~ .checkmark:after {
  display: block;
}

.check-dropshipper .checkmark:after {
  left: 3px;
  width: 4px;
  height: 8px;
  border: solid #1BD97B;
  border-width: 0 2px 2px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
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
  margin-top: 40px;
}

.send-as {
  color: rgba(45, 42, 64, 0.8);
  margin-bottom: 2px;
  margin-top: 12px;
}

.container {
  padding: 5px 20px 15px 20px;
  border-radius: 3px;
}

// Textbox
input[type="text"], input[type="tel"],input[type="email"] {
  height: 55px;
  width: 100%;
  padding-left: 10px;
  font-size: 16px;
  margin-bottom: 20px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

label {
  margin-top: -40px;
  margin-left: 10px;
}

input[type="text"]+label {
  font-size: 16px;
  /* margin-top: -1.2em; */
  display: block;
  /* pointer-events: none; */
}

input[type="text"]+label:before {
  content: attr(placeholder);
  color: #898989;
  display: inline-block;
  transition: all .3s ease-in-out;
}

textarea {
  border-radius: 3px;
  padding: 10px;
}

label {
  margin-bottom: 10px;
  display: block;
}

input[type="text"]:focus+label:before {
  color: #287ae6;
  transform: translate(0, -1.2em) scale(0.8, 0.8);
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
    flex-direction: column-reverse;
  }
  .col-25 {
    margin-bottom: 20px;
  }

  .container-title {
    width: 100%;
  }
}
</style>
