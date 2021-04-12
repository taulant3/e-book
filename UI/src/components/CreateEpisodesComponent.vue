<template>
  <div class="root">
    <form action="http://localhost:7000/api/episode" method="post" enctype="multipart/form-data">
      <label>Thumbnail</label>
      <input type="file" name="files" />
      <br />

      <label>Title</label>
      <input type="text" name="title" class="in title" />
      <label>Files</label>
      <input type="file" name="files" class="in file" multiple />
      <label>Creators Note</label>
      <input type="text" name="creatorsNote" class="in creatorsnote" />
      <label>Published</label>
      <input type="text" name="published" class="in published" />
      <label>Active</label>
      <input type="text" name="active" class="in active" />
      <label>Seriali</label>
      <input type="text" name="id_seria" class="in tit" />
      <br />
      <input type="submit" value="Create" class="button" />
    </form>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.root {
  background-color: aliceblue;
  height: 800px;
}
input {
  margin-top: 100px;
}

</style>