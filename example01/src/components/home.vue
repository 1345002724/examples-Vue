<template>

 <!--<el-button type="info" @click="logout">退出</el-button>-->
  <el-container class="home-container">
    <!--//头部区域-->
    <el-header>
      <div>
        <img src="../assets/img/login.png" alt="">
        <span>机房管理系统</span>
      </div>

      <el-dropdown>
        <el-button type="primary" size="small" style="background-color:green">
          管理员<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <!--路由跳转到指定位置-->
          <router-link to="/message" style="text-decoration: none">
          <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>

          <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!--<el-button type="info" @click="logout">退出</el-button>-->

    </el-header>
   <!-- 页面主题-->
    <el-container>
      <!--侧边框-->
      <el-aside :width="iscollapse?'64px':'200px'">
        <div class="toggele-button" @click="togglecollapse">|||</div>
     <!--   侧边菜单区域-->
        <el-menu
            :default-active="this.activePth"
            class="el-menu-vertical-demo" :unique-opened="true" :collapse="iscollapse"
            :collapse-transition="false" :router="true"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#409BFF">

          <!--一级菜单-->
          <el-submenu :index="item.mkbm1+''" v-for="item in menList" :key="item.mkbm1">
            <!--一级菜单模板区域-->
            <template slot="title">
              <!--图标-->
              <i :class="item.icon"></i>
              <!--文本-->
              <span>{{item.mkmc1}}</span>
            </template>

           <!-- 二级菜单-->
            <el-menu-item :index="'/'+subitem.path" v-for="subitem in item.children"
                          :key="subitem.mkbm2" @click="saveNavState('/'+subitem.path)">
              <template slot="title">
                <!--图标-->
                <i class="el-icon-menu"></i>
                <!--文本-->
                <span>{{subitem.mkmc2}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!--内部主题-->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
export default {
name: "home",
  data(){
  return{
    //左侧菜单数据
    menList:[],

    iscollapse:false,//是否隐藏菜单，默认为false

    //保存被激活的地址状态
    activePth:''
  }
  },
  created() {
  this.getMenuList()
/*    this.menList=[
      {authName:"用户管理1",id:10,children:[{authName1:"二级菜单11",id:1,path:'users'}]},
      {authName:"权限管理",id:20,children:[{authName1:"二级菜单21",id:1,path:'rules'},{authName1:"二级菜单22",id:2,path:'rigths'}]},
      {authName:"用户管理3",id:30,children:[{authName1:"二级菜单31",id:1,path:'user33'},{authName1:"二级菜单32",id:2,path:'user33'},{authName1:"二级菜单33",id:3,path:'user33'}]}
    ]*/
  },
  methods:{
  //退出登录
    logout:function (){
      //后端清除token
      this.$http('/loginout').then(res=>{
        if (res.data.code ==200){
          this.$message.success("注销成功")
          //前端清除token
          window.sessionStorage.clear();
          //页面跳转到登录页面
          this.$router.push('/login')
        }else this.$message.error("注销失败")
      })

    },

    //获取后台菜单选项
    getMenuList:function (){
      this.$http('/home/menulist').then(res=>{
        if (res.data.code !=200){
          this.$message.error('登录失败,请从新登录')
          this.$router.push('/login')
        } else this.menList=res.data.data;
      })
    },

    //点击隐藏菜单
    togglecollapse:function (){
      this.iscollapse= !this.iscollapse
    },

    /*保存链接的激活状态*/
    saveNavState(activePth){
      window.sessionStorage.setItem('activePth',activePth)
      this.activePth=activePth
    }


  }
}
</script>

<style lang="less" scoped>
.el-header{
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0px;
  align-items: center; /*垂直居中*/
  color: #fff;
  font-size: 20px;
  >div{
    display: flex;
    align-items: center;
    span{
      margin-left: 15px;
    }
    img{
      width: 50px;
      border-radius: 25px;
    }
  }
}
.el-aside{
  background-color: #333744;
}
.el-main{
  background-color: #EAEDF1;
}
.el-menu{
  border-right: none;
}
.home-container{
  height: 100%;
}
.toggele-button{
  background-color:#4A5064 ;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
