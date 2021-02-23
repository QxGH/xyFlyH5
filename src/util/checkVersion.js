export default function() {
	//检测更新
	const updateManager = uni.getUpdateManager();

	updateManager.onCheckForUpdate(function(res) {
		// 请求完新版本信息的回调
		// console.log(res.hasUpdate)
	});

	updateManager.onUpdateReady(function() {
		uni.showModal({
			title: '更新提示',
			content: '新版本已经准备好，请重启应用！',
			showCancel: false,
			success: function(res) {
				if (res.confirm) {
					// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
					updateManager.applyUpdate();
				}
			}
		});

	});

	updateManager.onUpdateFailed(function() {
		// 新的版本下载失败
		wepy.showModal({
			title: '出错啦',
			content: '新版本未准备好，请删除后重新进入！',
			showCancel: false
		});
	});
}
