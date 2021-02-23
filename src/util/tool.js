// 获取用户的当前设置
export function getSetting(callback) {
	uni.getSetting({
		success(res) {
			callback(res.authSetting)
		},
		fail(err) {
			callback(err)
		}
	})
}

// 获取用户地理位置
export function getLocation(callback) {
	// #ifdef MP-WEIXIN
	uni.getLocation({
		type: 'gcj02',
		success(res) {
			callback(res)
		},
		fail(err) {
			callback(err)
		}
	});
	// #endif

	// #ifdef H5

	// #endif
}

// 获取收货地址
export function chooseAddress(resolve, reject) {
	uni.chooseAddress({
    success(res) {
      res.countryName = res.countyName
      resolve(res)
    },
    fail(err){
      reject(err)
    }
  })
}

export function setClipboardData(text) {
	// #ifdef H5
	let input = document.createElement("input");
	input.value = text;
	document.body.appendChild(input);
	input.select();
	document.execCommand("Copy");
	document.body.removeChild(input);
	uni.showToast({
		title: '复制成功！',
		icon: 'none',
		duration: 2000
	});
	// #endif
	// #ifdef MP-WEIXIN
	uni.setClipboardData({
		data: text,
		success: function() {
			console.log('success');
		}
	})
	// #endif
}

export function getFileType(filePath) {
	let startIndex = filePath.lastIndexOf(".");
	if (startIndex != -1) {
		return filePath
			.substring(startIndex + 1, filePath.length)
			.toLowerCase();
	} else {
		return "";
	}
}

export function arrayDiff(arr1, arr2) {
    for (let i = 0; i < arr2.length; i++) {
        for (let j = 0; j < arr1.length; j++) {
            if (arr2[i] == arr1[j]) {
                arr1.splice(arr1.indexOf(arr1[j]), 1);
            }
        }
    }
    return arr1
}
