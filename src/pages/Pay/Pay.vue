<template>
  <section class="search">
    <HeaderTop title="支付"/>
    <form class="search_form" @submit.prevent="submit">
			<mt-field label="收货人" placeholder="请输入收货人" v-model="name"></mt-field>
			<mt-field label="联系方式" placeholder="请输入联系方式" type="tel" v-model="phone"></mt-field>
			<mt-field label="收货地址" placeholder="收货地址" type="textarea" rows="4" v-model="address"></mt-field>
			<section class="list">
				<div>
					<blockquote v-for="(v,i) in orders" :key="i">
						<img :src="v.icon" >
						<a href="javascript:;">
							<i>{{v.goods_name}}</i>
							<i>单价: ¥{{v.price}} 数量: {{v.counts}}</i>
						</a>
					</blockquote>
					<p>总计: <span>¥{{total_price}}</span> (含运费 ¥{{distribution}})</p>
				</div>
			</section>
      <input type="submit" class="search_submit" value="支付">
    </form>
	<AlertTip :alertText="alertText" v-show="alertShow" @closeTip="closeTip"/>
  </section>
</template>

<script>
  import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
	import {orderInfoAPI, payforAPI} from "../../api";
	import AlertTip from '../../components/AlertTip/AlertTip.vue'
	import { Field, MessageBox } from 'mint-ui';
  export default {
		name: "pay",
    data () {
      return {
				id: null,
        name: '',
				phone: '',
				address: '',
				orders: [],
				total_price: '0',
				distribution: '0',
				alertShow: false, // 是否显示警告框
				alertText: '', // 提示文本
      }
    },
		async created() {
			this.id = this.$route.params.id || ''
			let {
				data,
				status,
				meg
			} = await orderInfoAPI({
				order_id: this.id,
				uid: this.$store.state.userId
			});
			if (status == 1) {
				this.orders = data.goods_infoss
				this.total_price = data.price
				this.distribution = data.distribution
			} else {
				this.showAlert(meg)
				setTimeout(_=>this.$router.replace('/login'))
			}
		},

    methods: {
			submit(){
				if(!this.address || !this.phone || !this.name){
					this.showAlert("请把信息填写完整!");
					return false;
				}
				MessageBox.prompt('请输入支付密码').then(({ value, action }) => {
					if (value.length === 6 && value == '123456') {
						let obj = {
							uid: this.$store.state.userId,
							order_id: this.id,
							address: this.address,
							phone: this.phone,
							name: this.name,
							pay_type: '余额支付', // 支付方式
							send_type: '电商配送' // 配送方式
						};
						this.payfor(obj);
					} else if (value.length != 6 || value != '123456') {
						this.showAlert("密码错误");
					}
				});
			},
      async payfor(obj) {
				let res = await payforAPI(obj);
				if (res.status == 1) {
					this.showAlert("支付成功")
					setTimeout(_=>this.$router.replace('/order'))
				} else {
					this.showAlert(res.meg);
				}
			},
			showAlert(alertText) {
			  this.alertShow = true
			  this.alertText = alertText
			},
			// 关闭警告框
			closeTip () {
			  this.alertShow = false
			  this.alertText = ''
			},
    },

    components: {
      HeaderTop,
			AlertTip,
			mtField: Field
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .search
    width 100%
    height 100%
    overflow hidden
    .search_form
      clearFix()
      margin-top 45px
      background-color #fff
      padding 12px 8px
      input
        height 35px
        padding 0 4px
        border-radius 2px
        font-weight bold
        outline none
        &.search_submit
          width 100%
          border 4px solid #02a774
          font-size 16px
          color #fff
          background-color #02a774
			.list
				padding-top 50px
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