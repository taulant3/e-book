<template>
  <div class="root">
    <form action="http://localhost:3000/api/serie" method="post" enctype="multipart/form-data">
      <input type="text" name="userId" v-model="userId" class="in userid" />

<!-- @change="onFileSelect($event)" -->
      <label>Thumbnail</label>
      <input type="file" name="thumbnail"  class="in thumb" />
  <br />
      <label>genre1</label>
      <input type="text" name="genre1" v-model="genre1" class="in gen1" />

      <label>genre2</label>
      <input type="text" name="genre2" v-model="genre2" class="in gen2" />

      <label>title</label>
      <input type="text" name="title" v-model="title" class="in tit" />

      <label>sumary</label>
      <input type="text" name="sumary" v-model="sumary" class="in sum" />

      <label>expliciteContent</label>
      <input type="text" name="expliciteContent" v-model="expliciteContent" class="in ex" />
<br />
      <input type="submit"  value="Create" class="button" />
    </form>

  </div>
</template>

<script>
// import axios from "axios";

export default {
  
};
</script>

<style scoped>
.root {
  background-color: aliceblue;
  height: 800px;
}
input {
  margin-top: 100px;
}
/* .in {
  display: inline;
} */
</style>