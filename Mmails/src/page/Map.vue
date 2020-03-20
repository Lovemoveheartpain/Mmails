<template>
  <MainContainerVue>
    <span slot="name">地图</span>
    <div slot="container">
      <el-input
        :id="suggestId"
        v-model="address"
        clearable
        size="mini "
        class="inout_search"
        placeholder="请输入内容"
      ></el-input>
      <el-button size="mini" @click="search" type="primary">地名查询</el-button>
      <el-tag
        type="success"
        v-clipboard:copy="coordinate.lng"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError"
      >经度 {{coordinate.lng}}</el-tag>
      <el-tag
        type="success"
        v-clipboard:copy="coordinate.lat"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError"
      >纬度 {{coordinate.lat}}</el-tag>
      <el-tag type="success">
        <i class="el-icon-arrow-left"></i>
        <i class="el-icon-arrow-left"></i>
        <i class="el-icon-arrow-left"></i>
        点击按钮复制经纬度信息
      </el-tag>
      <br />
      <span class="sp">经度:</span>
      <el-input v-model="coordinate.lng" clearable size="mini " class="lang" placeholder="请输入经度"></el-input>
      <span class="sp">纬度:</span>
      <el-input v-model="coordinate.lat" clearable size="mini " class="lang" placeholder="请输入纬度"></el-input>
      <el-button size="mini" @click="theLocation" type="primary">经纬度查询</el-button>
      <div id="allmap" class="allmap"></div>
    </div>
  </MainContainerVue>
</template>

<script>
import MainContainerVue from "../components/Common/MainContainer.vue";
export default {
  components: {
    MainContainerVue
  },
  data() {
    return {
      suggestId: "suggestId",
      address: "",
      map: {},
      maker: {},
      coordinate: { lng: 116.404, lat: 39.915 }
    };
  },
  methods: {
    theLocation() {
      console.log(855);
      if (this.coordinate.lng && this.coordinate.lat) {
        this.map.clearOverlays();
        var new_point = new BMap.Point(
          this.coordinate.lng,
          this.coordinate.lat
        );
        console.log(this.coordinate);
        var marker = new BMap.Marker(new_point); // 创建标注
        this.map.addOverlay(marker); // 将标注添加到地图中
        this.map.panTo(new_point);
      }
    },
    search() {
      if (!this.address) {
        return;
      }
      var localSearch = new BMap.LocalSearch(this.map);
      localSearch.enableAutoViewport(); //允许自动调节窗体大小
      this.searchByInputName(localSearch);
    },
    searchByInputName(localSearch) {
      this.map.clearOverlays(); //清空原来的标注
      var th = this;
      var keyword = this.address;
      localSearch.setSearchCompleteCallback(searchResult => {
        var poi = searchResult.getPoi(0);
        if (!poi) {
          alert("对不起，查无此处!!");
          return;
        }
        th.coordinate = poi.point;
        th.map.centerAndZoom(poi.point, 15);
        th.getMarker(th.coordinate);
      });
      localSearch.search(keyword);
    },
    init() {
      this.map = new BMap.Map("allmap"); // 创建地图实例
      var point = new BMap.Point(this.coordinate.lng, this.coordinate.lat);
      this.map.enableScrollWheelZoom(true);
      this.getlocation();
      var scaleCtrl = new BMap.ScaleControl(); // 添加比例尺控件
      this.map.addControl(scaleCtrl);
      var top_left_control = new BMap.ScaleControl({
        anchor: BMAP_ANCHOR_TOP_LEFT
      }); // 左上角，添加比例尺
      var top_left_navigation = new BMap.NavigationControl(); //左上角，添加默认缩放平移控件
      var top_right_navigation = new BMap.NavigationControl({
        anchor: BMAP_ANCHOR_TOP_RIGHT,
        type: BMAP_NAVIGATION_CONTROL_SMALL
      }); //右上角，仅包含平移和缩放按钮
      this.map.addControl(top_left_control);
      this.map.addControl(top_left_navigation);
      this.map.addControl(top_right_navigation);
      // 创建点坐标
      this.map.centerAndZoom(point, 15);

      var marker = new BMap.Marker(point); // 创建标注
      this.map.addOverlay(marker); // 将标注添加到地图中

      var ac = new BMap.Autocomplete({
        //建立一个自动完成的对象
        input: "suggestId",
        location: this.map
      });
      var myValue;

      ac.addEventListener("onconfirm", e => {
        //鼠标点击下拉列表后的事件
        var _value = e.item.value;
        myValue =
          _value.province +
          _value.city +
          _value.district +
          _value.street +
          _value.business;
        this.address = myValue;
        this.setPlace();
      });
    },
    setPlace() {
      this.map.clearOverlays(); //清除地图上所有覆盖物
      var th = this;
      function myFun() {
        th.coordinate = local.getResults().getPoi(0).point; //获取第一个智能搜索的结果
        th.map.centerAndZoom(th.coordinate, 15);
        th.getMarker(th.coordinate);
      }

      var local = new BMap.LocalSearch(this.map, {
        onSearchComplete: myFun //智能搜索
      });
      local.search(this.address);
    },
    getlocation() {
      //获取当前位置
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(r => {
        if (geolocation.getStatus() == BMAP_STATUS_SUCCESS) {
          this.getMarker(r.point);
          this.coordinate = r.point;
        } else {
          alert("failed" + this.getStatus());
        }
      });
    },
    //绑定Marker的拖拽事件
    showInfo(e) {
      var gc = new BMap.Geocoder();
      gc.getLocation(e.point, rs => {
        var addComp = rs.addressComponents;
        var address =
          addComp.province +
          addComp.city +
          addComp.district +
          addComp.street +
          addComp.streetNumber; //获取地址

        //画图 ---》显示地址信息
        var label = new BMap.Label(address, { offset: new BMap.Size(20, -10) });
        this.map.removeOverlay(this.maker.getLabel()); //删除之前的label

        this.maker.setLabel(label);
        this.address = address;
        this.coordinate = e.point;
      });
    },
    getMarker(point) {
      this.maker = new BMap.Marker(point);
      this.maker.addEventListener("dragend", this.showInfo);
      this.maker.enableDragging(); //可拖拽
      this.getAddress(point);
      this.map.addOverlay(this.maker); //把点添加到地图上
      this.map.panTo(point);
    },
    //获取地址信息，设置地址label
    getAddress(point) {
      var gc = new BMap.Geocoder();
      gc.getLocation(point, rs => {
        var addComp = rs.addressComponents;
        var address =
          addComp.province +
          addComp.city +
          addComp.district +
          addComp.street +
          addComp.streetNumber; //获取地址

        //画图 ---》显示地址信息
        var label = new BMap.Label(address, { offset: new BMap.Size(20, -10) });
        this.map.removeOverlay(this.maker.getLabel()); //删除之前的label
        this.address_detail = address;
        this.maker.setLabel(label);
      });
    },
    onCopy() {
      this.$message("内容已复制到剪贴板!");
    },
    onError() {
      this.$message("内容复制失败,请重试!");
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.init();
    });
  }
};
</script>


<style scoped>
.allmap {
  width: 100%;
  height: 65vh;
}
.inout_search {
  width: 30%;
  min-width: 200px;
}
.lang {
  width: 15%;
  min-width: 100px;
}
.sp
{
    font-size: 12px;
}
</style>