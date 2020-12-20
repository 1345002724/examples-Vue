<template>
  <div>
    <!--导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
    </el-breadcrumb>

    <!--卡片视图-->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable
                    @clear="getUserList"> <!--clearable清除输入的内容，@clear清除数据过后的回调函数-->
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addialogVisiable=true">添加用户</el-button>
          <el-button type="primary" @click="testfr">测试帆软打印</el-button>
        </el-col>
      </el-row>
    </el-card>

    <!--表格区域-->
    <el-table :data="userList" border stripe style="width: 100%">
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="rybm" label="编码" width="100"></el-table-column>
      <el-table-column prop="ryxm" label="姓名" width="100"></el-table-column>
      <el-table-column prop="xb" label="性别" width="80"></el-table-column>
      <el-table-column prop="sjhm" label="手机号码" width="120"></el-table-column>
      <el-table-column prop="sfzhm" label="身份证号码" width="180"></el-table-column>
      <el-table-column label="其他"></el-table-column>
      <el-table-column prop="qyzt" label="状态" width="80">
        <template slot-scope="scope">
          <el-switch
              v-model="scope.row.qyzt"
              active-value="1"
              inactive-value="0"
              @change="userstatechange(scope.row)"
              active-color="#13ce66"
              inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width='120'>
        <template slot-scope="scope">

          <el-tooltip class="item" effect="dark" content="修改操作" placement="top"> <!--外层为提示-->
            <!--修改按钮-->
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.rybm)"></el-button>
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="删除操作" placement="top"> <!--外层为提示-->
            <!--删除按钮-->
            <el-button type="primary" icon="el-icon-delete" size="mini" @click="DeleteUser(scope.row.rybm)"></el-button>
          </el-tooltip>

        </template>
      </el-table-column>

    </el-table>


    <!--分页显示-->
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>


    <!--新增用户弹框组件-->
    <el-dialog
        title="添加用户"
        :visible.sync="addialogVisiable" @close="addDialogClose"
        width="50%">
      <!--内容主体区-->

      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef">

        <el-row :gutter="20">
          <el-col :span="6"><div class="grid-content bg-purple">
            <!--人员编码-->
            <el-form-item label="人员编码" prop="rybm">
              <el-input v-model="addForm.rybm"></el-input>
            </el-form-item>
          </div>
          </el-col>
          <el-col :span="6"><div class="grid-content bg-purple">
            <!--用户-->
            <el-form-item label="用户名" prop="ryxm">
              <el-input v-model="addForm.ryxm"></el-input>
            </el-form-item>
          </div>
          </el-col>
          <el-col :span="6"><div class="grid-content bg-purple">
            <!--密码-->
            <el-form-item label="密码" prop="password">
              <el-input v-model="addForm.password"></el-input>
            </el-form-item>
          </div></el-col>

          <el-col :span="6"><div class="grid-content bg-purple">
            <!--性别-->
            <el-form-item label="性别" prop="xb">
              <el-select v-model="addForm.xb" placeholder="请选择">
                <el-option
                    v-for="item in sexOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item></div></el-col>
        </el-row>


        <el-row :gutter="20">
          <el-col :span="6"><div class="grid-content bg-purple">
            <!--电话-->
            <el-form-item label="手机号码" prop="sjhm">
              <el-input v-model="addForm.sjhm"></el-input>
            </el-form-item>
          </div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">
            <!--email-->
            <el-form-item label="电子邮箱" prop="email">
              <el-input v-model="addForm.email"></el-input>
            </el-form-item>
          </div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple">

            <!--身份证号码-->
            <el-form-item label="身份证号码" prop="sfzhm">
              <el-input v-model="addForm.sfzhm"></el-input>
            </el-form-item>
          </div></el-col>
        </el-row>

      </el-form>
      <!--增加用户弹窗底部区域-->
      <span slot="footer" class="dialog-footer">
    <el-button @click="addialogVisiable = false">取 消</el-button>
    <el-button type="primary" @click="addusersubmit">确 定</el-button>
  </span>
    </el-dialog>

    <el-dialog
        title="修改用户信息"
        :visible.sync="EditdialogVisible"
        width="50%">
      <!--修改用户主体区域-->
      <el-form>

        <el-row :gutter="20">
          <el-col :span="6"><div class="grid-content bg-purple">
            <!--人员编码-->
            <el-form-item label="人员编码" prop="rybm">
              <el-input v-model="EditForm.rybm" disabled></el-input>
            </el-form-item>
          </div>
          </el-col>
          <el-col :span="6"><div class="grid-content bg-purple">
            <!--用户-->
            <el-form-item label="用户名" prop="ryxm">
              <el-input v-model="EditForm.ryxm"></el-input>
            </el-form-item>
          </div>
          </el-col>
          <el-col :span="6"><div class="grid-content bg-purple">
            <!--密码-->
            <el-form-item label="密码" prop="password">
              <el-input v-model="EditForm.password"></el-input>
            </el-form-item>
          </div></el-col>

          <el-col :span="6"><div class="grid-content bg-purple">
            <!--性别-->
            <el-form-item label="性别" prop="xb">
              <el-select v-model="EditForm.xb" placeholder="请选择">
                <el-option
                    v-for="item in sexOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item></div></el-col>
        </el-row>


        <el-row :gutter="20">
          <el-col :span="6"><div class="grid-content bg-purple">
            <!--电话号码-->
            <el-form-item label="手机号码" prop="sjhm">
              <el-input v-model="EditForm.sjhm"></el-input>
            </el-form-item>
          </div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">
            <!--email-->
            <el-form-item label="电子邮箱" prop="email">
              <el-input v-model="EditForm.email"></el-input>
            </el-form-item>
          </div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple">

            <!--身份证号码-->
            <el-form-item label="身份证号码" prop="sfzhm">
              <el-input v-model="EditForm.sfzhm"></el-input>
            </el-form-item>
          </div></el-col>
        </el-row>

      </el-form>

      <span slot="footer" class="dialog-footer">
    <el-button @click="EditdialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitEditdialogVisible">确 定</el-button>
  </span>
    </el-dialog>


  </div>
</template>

<script>
export default {
  name: "Users",
  data() {
    return {
      //新增用户验证规则
      addFormRules: {
        rybm: [
          {required: true, message: '请输入人员编码', trigger: 'change'},],
        ryxm: [
          {required: true, message: '请输入用户名', trigger: 'change'},
          /*  {min: 5, max: 5, message: '长度为5个字符', trigger: 'change'}*/],
        password: [
          {required: true, message: '请输入用户名', trigger: 'change'},
          /*{min: 5, max: 5, message: '长度为5个字符', trigger: 'change'}*/],
        sjhm: [
          {required: true, message: '请输入电话号码', trigger: 'change'}],
        email: [
          {required: true, message: '请输入用户名', trigger: 'change'}],
/*        sfzhm: [
          {required: true, message: '请输入身份证号码', trigger: 'change'},]*/
      },

      //新增用户输入框定义
      addForm: {
        rybm:'',
        ryxm: '',
        password: '',
         xb:'',//select选择器选中的值
        sjhm: '',
        email: '',
        sfzhm:''
      },
      EditForm:{},//修改人员信息暂存区
      queryInfo: {
        query: '', //作为搜索条件
        pagenum: 1,  //当前页数
        pagesize: 10 //当前每页显示数量
      },
      userList: [],
      total: 10,

      addialogVisiable: false, //控制添加用户对话框的显示和隐藏
      EditdialogVisible:false,//修改用户信息对话框的显示和隐藏

    }
  },
  created() {
    this.getUserList()
  },
  methods: {

    //获取用户列表
    getUserList: function () {
      this.$http.post("/user/queryrybm", JSON.stringify(this.queryInfo)).then(res => {
        this.userList = res.data.data
      })
    },

    /*监听pagesize改变事件*/
    handleSizeChange: function (newsize) {
      this.queryInfo.pagesize = newsize
      this.getUserList()
    },

    /*监听页码改变的事件*/
    handleCurrentChange: function (newpage) {
      //console.log(newpage)
      this.queryInfo.pagenum = newpage
    },

    //点击switch状态改变回调函数
    userstatechange(data) {
      this.$http.get("/user/updateRybm?rybm="+data.rybm+'&qyzt='+data.qyzt).then(res => {
        if (res.data.code == '200') {
          this.$message.success("更新状态成功")
          this.getUserList() //状态更新成功后调用刷新
        } else {
          this.$message.error("更新状态成功" + res.data.data)
        }
      })
    },

    //监听添加用户关闭的对话框事件(重置对话框)
    addDialogClose: function () {
      this.$refs.addFormRef.resetFields()
    },

    //提交新增用户
    addusersubmit:function (){
      this.$refs.addFormRef.validate((valid) => {
        if(valid){
          console.log(JSON.stringify(this.addForm))
          this.loading = true;
          this.$http.post('/user/insertrybm',JSON.stringify(this.addForm)).then(res=>{
            if(res.data.code=='200'){
                this.$message.success("新增成功")
                this.addialogVisiable=false
                this.getUserList() //状态更新成功后调用刷新
            }else this.$message.error("新增失败")
          })
        }
      })
    },
    //删除用户
    DeleteUser:function (rybm){
      this.$http.get('/user/DeleteUser?rybm='+rybm).then(res=>{
        if(res.data.code=='200'){
          this.$message.success("删除成功")
          this.getUserList() //状态更新成功后调用刷新
        } else this.$message.error("删除失败")
      })
    },

    //修改人员信息
    showEditDialog:function (rybm){
      this.queryInfo.query=rybm
      this.$http.post("/user/queryrybm", JSON.stringify(this.queryInfo)).then(res => {
        this.queryInfo.query=''
        console.log(res.data.data[0])
        this.EditForm=res.data.data[0]
      })
      this.EditdialogVisible=true
    },



    //提交用户修改的信息
    submitEditdialogVisible:function (){
      this.$http.post('',JSON.stringify(this.EditForm).then(res=>{
        if(res.data.code=='200'){
          this.$message.success("修改人员信息成功")
          this.getUserList() //状态更新成功后调用刷新
        }else this.$message.error("修改失败")
      }))
    },
    //测试帆软打印
    testfr:function (){
       var reportlets ="[{reportlet: 'fpdy%2Fykgl%2Fykgl_ckd.cpt',yljgbm:'000001',kfbm:'01',ckdh:'CK01201904000053'}]";
       this.FrPrint(reportlets)
    }

  }
}
</script>

<style scoped>
.el-input{
  margin: 0;
}
</style>
