<template>
  <div class="main_container">
    <div class="title_div">
      <div class="title_name">
        <slot name="name"></slot>
      </div>
      <div class="btn_div" >
          <slot name="btn"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>


<style lang="" scoped>
.title_div
{
    width: 100%;
    height: 3.75rem;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
}
.title_name {
  font-size: 2.1875rem;
}

</style>