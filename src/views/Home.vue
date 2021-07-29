<template>
  <div class="home">
    <ul>
      <li
        v-for="(item,index) in newsList"
        :key="index"
      >
        <p>
          <span>{{item.username}}</span>
          
        </p>
        <p>{{msg}}</p>
      </li>
    </ul>
    <input type="text" placeholder="请输入消息" v-model="msg">
    <button @click="send">发送</button>
  </div>
</template>

<script>
let ws=new WebSocket('ws://localhost:8000')

export default {
  name: 'Home',
  data () {
    return {
      username:'',
      msg:'',
      newsList:[]
    }
  },
  mounted () {
    this.username=localStorage.getItem('username')
    // console.log(this.username);
    ws.addEventListener('open',this.wsOpen.bind(this),false)
    ws.addEventListener('close',this.wsClose.bind(this),false)
    ws.addEventListener('error',this.wsError.bind(this),false)
    ws.addEventListener('message',this.wsMessage.bind(this),false)
  },
  methods:{
    send () {
        ws.send(JSON.stringify({
         
          username:this.username,
          msg:this.msg
        
        }))
    },
    wsOpen (e) {console.log('open',e);},
    wsClose (e) {console.log('close',e);},
    wsError (e) {console.log('error',e);},
    wsMessage (e) {
      console.log(e.data);
      
      let reader = new FileReader(); // 创建读取文件对象
      reader.addEventListener("loadend",  () =>{ // 
        let res = JSON.parse(reader.result); // 返回的数据
        // console.log(res) 
        // console.log(this);
        this.newsList.push(res)
      });
      // console.log(this);
       
       console.log(this.newsList);
      reader.readAsText(e.data, 'utf-8'); // 设置读取的数据以及返回的数据类型为utf-8
      }
  }
}
</script>
