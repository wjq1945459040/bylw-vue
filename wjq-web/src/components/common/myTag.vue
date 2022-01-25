<template>
  <div class="m-container-small m-opacity" align="center">
    <div class="mt-10">
      <span style="color: #00000099;font-size:15px"><i class="el-icon-collection-tag"></i>{{content}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "my-tag",
  props: {
    content: "",
  },
  data () {
    return {}
  }
}
</script>

<style scoped>
.m-container-small {
    max-width: 60em;
    margin: 0 auto;
    width: 840px;
    height: 50px;
    background-color: #f3f4f5;
}

.m-opacity {
    opacity: 0.9;
}
.mt-10 {
    padding-top: 13px;
    position: relative;
}
</style>

