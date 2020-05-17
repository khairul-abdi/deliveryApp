<template>
  <div class="container-title">
    <ul class="breadcrumb">
      <li><a href="#"><span class="circle">1 </span> Delivery</a></li>
      <li><a href="#"><span class="circle">2 </span> Payment</a></li>
      <li><a href="#"><span class="circle">3 </span> Finish</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'BreadcrumbNav'
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
</style>
