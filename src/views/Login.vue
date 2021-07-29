<template>
  <div class="about">
    <input type="text" v-model="userName">
    <button @click="login">登录</button>
  </div>
</template>
<script>
export default {
  name:'Login',
  data () {
    return {
      userName:''
    }
  },
  methods:{
    login () {
      let username=this.userName
      localStorage.setItem('username',username)
      this.$router.push('/home')

    }
  }
}
</script>