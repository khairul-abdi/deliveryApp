<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap');
@import url('https://rsms.me/inter/inter.css');

body {
  font-family: 'Inter', Arial, sans-serif;
  font-size: 17px;
  padding: 8px;
  margin: 10px 50px ;
  background-color: #FFFAE6;
}

* {
  box-sizing: border-box;
}

h3,h1 {
  font-family: 'Montserrat', sans-serif;
  color: #FF8A00;
}

@media (max-width: 768px) {
  body {
    margin: 0;
  }
}
</style>
