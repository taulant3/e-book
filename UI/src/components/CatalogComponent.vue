<template>
  <div class="catalog">
    <hr />
    <!-- <div class="card c1">
      <img src alt="img" />
      <h6>Title</h6>
      <p>Likes</p>
      <p>Category</p>
    </div>
    <div class="card c2">
      <img src alt="img" />
      <h6>Title</h6>
      <p>Likes</p>
      <p>Category</p>
    </div>
    <div class="card c3">
      <img src alt="img" />
      <h6>Title</h6>
      <p>Likes</p>
      <p>Category</p>
    </div>
    <div class="card c4">
      <img src alt="img" />
      <h6>Title</h6>
      <p>Likes</p>
      <p>Category</p>
    </div>
    <div class="card c5">
      <img src alt="img" />
      <h6>Title</h6>
      <p>Likes</p>
      <p>Category</p>
    </div>
    <div class="card c6">
      <img src alt="img" />
      <h6>Title</h6>
      <p>Likes</p>
      <p>Category</p>
    </div>
    <div class="card c7">
      <img src alt="img" />
      <h6>Title</h6>
      <p>Likes</p>
      <p>Category</p>
    </div>
    <div class="card c8">
      <img src alt="img" />
      <h6>Title</h6>
      <p>Likes</p>
      <p>Category</p>
    </div>
    <div class="card c9">
      <img src alt="img" />
      <h6>Title</h6>
      <p>Likes</p>
      <p>Category</p>
    </div> -->

    <li v-for="x in 9" :key="x">
      <div :class="'card c'+x">
        <!-- <img :src="require(`../../serieService/img/${series[x].thumbnail}`)" alt="img" /> -->
        <h6>{{ series[x].title }}</h6>
        <p>Likes</p>
        <p>{{ series[x].genre1}}</p>
      </div>
    </li>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      series: []
    };
  },
  mounted() {
    const url = "http://localhost:3000/api/serie";

    axios
      .get(url)
      .then(response => {
        this.series = response.data;
      })
      .catch(error => {
        console.log(error.response);
      });
  }
};
</script>

<style scoped>
li {
  list-style-type: none;
}
.card {
  border: 1px solid black;
  height: 210px;
  width: 210px;
}
.c1 {
  margin-left: 100px;
  margin-top: 10px;
}
.c2 {
  margin-left: 330px;
  margin-top: -212px;
}
.c3 {
  margin-left: 560px;
  margin-top: -212px;
  width: 440px;
}
.c4 {
  margin-left: 1020px;
  margin-top: -212px;
}
.c5 {
  margin-left: 100px;
  margin-top: 20px;
}
.c6 {
  margin-left: 330px;
  margin-top: -212px;
}
.c7 {
  margin-left: 560px;
  margin-top: -212px;
}
.c8 {
  margin-left: 790px;
  margin-top: -212px;
}
.c9 {
  margin-left: 1020px;
  margin-top: -212px;
}
</style>