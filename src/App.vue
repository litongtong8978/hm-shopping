<template>
  <div id="app">
    <van-button type="primary">主要按钮</van-button>
<van-button type="success">成功按钮</van-button>
<van-button type="default">默认按钮</van-button>
<van-button type="danger">危险按钮</van-button>
<van-button type="warning">警告按钮</van-button>
<div class="box">

</div>
    <router-view/>
  </div>
</template>

<style lang="less">
.box
{
  width: 150px;
  height: 100px;
  background-color: red;
}
</style>
