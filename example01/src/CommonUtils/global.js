//定义全局常量、全局方法(调用：this+方法名称)
export default {
    install(Vue, options) {
        //一、全局常量
        //1、下拉框选择性别
        Vue.prototype.sexOptions = [
            {value: 1, label: '男'},
            {value: 2, label: '女'},
            {value: 3, label: '未知'},]







        //二、全局方法
        //1、定义全局测试方法
        Vue.prototype.test001 = function () {
            this.$message.error("测试全局方法")
        }


    }
}
