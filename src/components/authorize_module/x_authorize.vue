<template>
	<button open-type="getUserInfo" @getuserinfo="getuserinfo"></button>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			getuserinfo(e) {
				this.$emit('get_user_info',e)
			}
		}
	}
</script>

<style scoped>
	button:after {
		border: 0;
	}

	button {
		width: 100%;
		height: 100%;
		position: absolute;
		background: transparent;
		left: 0;
		top: 0;
	}
</style>
