<template>
	<div>
		<HeaderTop title="个人中心">
			<router-link to="/Profile" slot="left">
				<mt-button icon="back">返回</mt-button>
			</router-link>
		</HeaderTop>
		<div class="infos">
			<mt-field label="昵称" placeholder="昵称" v-model="user.nickName" readonly></mt-field>
			<mt-field label="用户名" placeholder="用户名" v-model="user.userName" readonly></mt-field>
			<mt-field label="密码" placeholder="密码" v-model="user.password" readonly></mt-field>
			
		</div>
	</div>
</template>

<script>
	import {
		Field
	} from 'mint-ui';
	import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
	import {
		loadUserInfoAPI
	} from "../../api";
	export default {
		data() {
			return {
				user: {}
			}
		},
		async mounted() {
			let id = this.$store.state.userId || "";
			await loadUserInfoAPI({
				id
			}).then((res) => {
				if (res.status == 1) {
					this.user = {
						...res.data
					};
				}
			});
		},
		components: {
			HeaderTop,
			mtField: Field
		}
	}
</script>

<style scoped="scoped">
	body {
		background-color: #eee;
	}
	.infos {
		padding-top: 45px;
	}
	.mint-button--default {
	  color: #fff;
	  background-color: transparent;
	}
</style>
