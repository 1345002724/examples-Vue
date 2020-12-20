<template>
<div>
  <iframe src="http://127.0.0.1:9083/FR/ReportServer?reportlet=zyb_brfyqd.cpt" id="finereport"></iframe>
</div>
</template>

<script>
export default {
name: "FineReport",
  mounted(){
    /**
     * iframe-宽高自适应显示
     */
    function changefinereportIframe(){
      const finereport = document.getElementById('finereport');
      const deviceWidth = document.body.clientWidth;
      const deviceHeight = document.body.clientHeight;
      finereport.style.width = (Number(deviceWidth)-240) + 'px'; //数字是页面布局宽度差值
      finereport.style.height = (Number(deviceHeight)-120) + 'px'; //数字是页面布局高度差
    }

    changefinereportIframe()

    window.onresize = function(){
      changefinereportIframe()
    }
  }
}
</script>

<style scoped>
iframe{
  background-color: white;
}
</style>
