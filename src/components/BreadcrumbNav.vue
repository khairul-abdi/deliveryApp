<template>
  <div class="container-title">
    <ul class="breadcrumb">
      <li>
        <router-link to="/" class="navbar"><span class="circle"  :class="{ process: process >= 1 }">1 </span> Delivery</router-link>
      </li>
      <li>
        <router-link to="/payment" class="navbar"><span class="circle" :class="{ process: process >= 2 }">2 </span> Payment</router-link>
      </li>
      <li>
        <router-link to="/finish" class="navbar"><span class="circle" :class="{ process: process >= 3 }">3 </span> Finish</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'BreadcrumbNav',
  data () {
    return {
      dataPurchased: [],
      process: 1
    }
  },
  methods: {

  },
  mounted () {
    if (localStorage.getItem('purchased')) {
      try {
        this.dataPurchased = JSON.parse(localStorage.getItem('purchased'))
        this.process = this.dataPurchased[3].process
      } catch (e) {
        localStorage.removeItem('purchased')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.container-title {
  display: flex;
  align-items: center;
  margin: 0 auto -30px auto;
  justify-content: center;
  position: relative;
  z-index: 1;
  background-color: #FFFAE6;
  width: 500px;
  height: 70px;
  border-radius: 50px;
}

ul.breadcrumb {
  width: 100%;
  font-weight: 500;
  padding: 10px 16px;
  list-style: none;
}
ul.breadcrumb li {
  display: inline;
  font-size: 18px;
}

ul.breadcrumb li+li:before {
  font-family: Arial, Helvetica, sans-serif;
  padding: 8px;
  color: #FF8A00;
  content: ' \003E';
  margin: 15px;
  font-weight: bold;
}
ul.breadcrumb li a {
  color: #FF8A00;
  text-decoration: none;
}

span.circle {
  background: red;
  color: #ffffff;
  opacity: 0.3;
  border-radius: 0.8em;
  background-color: #FF8A00;
  -moz-border-radius: 0.8em;
  -webkit-border-radius: 0.8em;
  display: inline-block;
  font-weight: 500;
  line-height: 1.6em;
  margin-right: 8px;
  text-align: center;
  width: 1.6em;
}

span.circle:hover {
  opacity: 1;
  background-color: #FF8A00;
}

span.process {
  opacity: 1;
  background-color: #FF8A00;
}

@media (max-width: 768px) {
  .container-title {
    justify-content: center;
    text-align: center;
    width: 100vw;
  }
}

@media (max-width: 576px) {
 .navbar {
    font-size: 10px;
  }
}

</style>
