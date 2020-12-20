<template>
  <div class="login_container">
    <div class="login_box">
      <!--头像区域-->
      <div class="avatar_box">
        <img src="../assets/img/login.png">
      </div>
      <!--表单区域-->
      <el-form label-width="0px" class="login_form" :rules="loginrules" :model="loginForm"><!--:model="loginForm"验证表单用-->

        <!--用户名-->
        <el-form-item prop="username">
          <el-input prefix-icon="el-icon-user-solid" v-model="loginForm.username" placeholder="请输入用户名" autocomplete="off"></el-input>
          <!--autocomplete="off"不记住历史输入信息-->
        </el-form-item>

        <!--密码-->
        <el-form-item prop="password">
          <el-input prefix-icon="el-icon-lock" v-model="loginForm.password" type="password" placeholder="请输入密码" autocomplete="off"></el-input>
        </el-form-item>

        <!--提交按钮-->
        <el-form-item class="btns">
        <el-button type="primary" style="width: 100%;" @click="LoginSumbit">登录</el-button>
 <!--       <el-button type="info">充值</el-button>-->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>


export default {
name: "Login",
data(){
  return {

    loginForm: {
      username: '00000',
      password: '2.0',
    },

    /*表单数据验证*/
    loginrules: {
      username: [
        { required: true, message: '请输入用户名', trigger: 'change' },
        { min: 5, max: 5, message: '长度为5个字符', trigger: 'change' }
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'change' },
      ]
    }
  }
},
  methods:{
    LoginSumbit:function (){

      if(!(this.loginForm.username && this.loginForm.password)){
        alert("账号或密码不能为空")
      }

      this.$http.get('/login?username='+this.loginForm.username+'&password='+this.loginForm.password).then((res)=>{
        console.log(JSON.stringify(res.data))
        if(res.data.code=='200'){
          this.$message.success("登录成功")
          window.sessionStorage.setItem('token',res.data.data)
          this.$router.push('/home')
        } else {
          this.$message.error('登录失败')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container{
  background-color: #2b4b6b;
  height: 100%;
}
.login_box{
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  .avatar_box{
    width: 130px;
    height: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #fff;
      img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
      }
  }
}
.login_form{
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
}
.btns{
/*  display: flex;
  justify-content: flex-end;*/
text-align: center;
}

</style>
