<template>
  <section class="order">
    <HeaderTop title="订单列表"/>
    <section class="order_no_login" v-if="flag">
      <img src="./images/person.png">
      <h3>登录后查看外卖订单</h3>
      <button>立即登陆</button>
    </section>
		<div class="order-info">
			<div v-for="item in orders" :key="item.id">
				<blockquote v-for="(v,i) in item.goods_infoss" :key="i">
					<img :src="v.icon" >
					<a href="javascript:;">
						<i>{{v.goods_name}}</i>
						<i>单价: ¥{{v.price}} 数量: {{v.counts}}</i>
					</a>
				</blockquote>
				<p>总计: <span>¥{{item.price}}</span> (含运费 ¥{{item.distribution}})</p>
			</div>
		</div>
  </section>
</template>

<script>
  import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
	import { CellSwipe, Toast } from 'mint-ui';
	import {
		isLogined
	} from "../../utils/tool";
	import {orderListAPI} from "../../api";
  export default {
		data(){
			return{
				flag: !isLogined(),
				orders: []
			}
		},
		async created() {
			let {data, status, meg} = await orderListAPI({uid: this.$store.state.userId});
			if(status == 1){
				this.orders = data;
			}else{
				Toast(meg);
				setTimeout(_=>this.$router.replace('/login'))
			}
		},
    components: {
      HeaderTop
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .order  //订单
    width 100%
    .header
      background-color #02a774
      position fixed
      z-index 100
      left 0
      top 0
      width 100%
      height 45px
      .header_search
        position absolute
        left 15px
        top 50%
        transform translateY(-50%)
        width 10%
        height 50%
        .icon-sousuo
          font-size 25px
          color #fff
      .header_title
        position absolute
        top 50%
        left 50%
        transform translate(-50%, -50%)
        width 50%
        color #fff
        text-align center
        .header_title_text
          font-size 20px
          color #fff
          display block
      .header_login
        font-size 14px
        color #fff
        position absolute
        right 15px
        top 50%
        transform translateY(-50%)
        .header_login_text
          color #fff
    .order_no_login
      padding-top 140px
      width 60%
      margin 0 auto
      text-align center
      >img
        display block
        width 100%
        height 30%
      >h3
        padding 10px 0
        font-size 17px
        color #6a6a6a
      >button
        display inline-block
        background #02a774
        font-size 14px
        color #fff
        border 0
        outline none
        border-radius 5px
        padding 10px 20px
		.order-info
			padding-top 50px
			padding-bottom 50px
			>div
				margin 10px
				padding 10px
				background-color #f1f1f1
				blockquote
					display flex
					margin-bottom 15px
					img
						width 57px
						height 57px
					a
						display flex
						flex-direction column
						justify-content space-evenly
						margin-left 15px
						i
							font-style normal
				p
					text-align right
					padding 15px
					font-size 18px
					background-color #eee
</style>