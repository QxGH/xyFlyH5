import UUIDV4 from 'uuid/v4'
import { baseURL } from '@/api/config'

(function() {

	var config = {
		qiniuRegion: 'ECN',
		qiniuImageURLPrefix: '',
		qiniuUploadToken: '',
		qiniuUploadTokenURL: baseURL.api + 'tools/oss/uploadToken?bucket=xingchenyun',
		qiniuUploadTokenFunction: null,
		qiniuShouldUseQiniuFileName: false
	}

	module.exports = {
		init: init,
		upload: upload,
	}

	// 在整个程序生命周期中，只需要 init 一次即可
	// 如果需要变更参数，再调用 init 即可
	function init(options) {
		config = {
			qiniuRegion: '',
			qiniuImageURLPrefix: '',
			qiniuUploadToken: '',
			qiniuUploadTokenURL: '',
			qiniuUploadTokenFunction: null,
			qiniuShouldUseQiniuFileName: false
		};
		updateConfigWithOptions(options);
	}

	function updateConfigWithOptions(options) {
		if (options.region) {
			config.qiniuRegion = options.region;
		} else {
			console.error('qiniu uploader need your bucket region');
		}
		if (options.uptoken) {
			config.qiniuUploadToken = options.uptoken;
		} else if (options.uptokenURL) {
			config.qiniuUploadTokenURL = options.uptokenURL;
		} else if (options.uptokenFunc) {
			config.qiniuUploadTokenFunction = options.uptokenFunc;
		}
		if (options.domain) {
			config.qiniuImageURLPrefix = options.domain;
		}
		config.qiniuShouldUseQiniuFileName = options.shouldUseQiniuFileName
	}

  function upload(type, filePath, success, fail, options) {
		uni.showLoading({
			title: '上传中',
			mask: true
		})
		if (null == filePath) {
			console.error('qiniu uploader need filePath to upload');
			return;
		}
		if (options) {
			updateConfigWithOptions(options);
		}
		if (config.qiniuUploadToken) {
      doUpload(type, filePath, success, fail, options);
		} else if (config.qiniuUploadTokenURL) {
			getQiniUpToken(function() {
        doUpload(type, filePath, success, fail, options);
			});
		} else if (config.qiniuUploadTokenFunction) {
			config.qiniuUploadToken = config.qiniuUploadTokenFunction();
			if (null == config.qiniuUploadToken && config.qiniuUploadToken.length > 0) {
				console.error('qiniu UploadTokenFunction result is null, please check the return value');
				return
			}
		} else {
			console.error('qiniu uploader need one of [uptoken, uptokenURL, uptokenFunc]');
			return;
		}
	}

	function doUpload(type, filePath, success, fail, options) {
		if (null == config.qiniuUploadToken && config.qiniuUploadToken.length > 0) {
			console.error('qiniu UploadToken is null, please check the init config or networking');
			return
		}
    var url = uploadURLFromRegionCode(config.qiniuRegion);
    var utoken;
    if ('development' === process.env.NODE_ENV || 'test' === process.env.RUNNING_MODE) {
      utoken = uni.getStorageSync('c_token') ? uni.getStorageSync('c_token').utoken + '/' : ''
    } else {
      utoken = uni.getStorageSync('z_token') ? uni.getStorageSync('z_token').utoken + '/' : ''
    }
    var fileName
    if (type == "voice"){
      fileName = utoken + 'voice/' + UUIDV4() + '.mp3';
    } else {
      fileName = utoken + UUIDV4();
    }
		if (options && options.key) {
			fileName = options.key;
		}
		var formData = {
			'token': config.qiniuUploadToken
		};
		if (!config.qiniuShouldUseQiniuFileName) {
			formData['key'] = fileName
		}
		console.log(filePath)
		uni.uploadFile({
			url: url,
			filePath: filePath,
			name: 'file',
			formData: formData,
			success: function(res) {
				var dataString = res.data
				try {
					var dataObject = JSON.parse(dataString);
					//do something
					var imageUrl = config.qiniuImageURLPrefix + '/' + dataObject.key;
					dataObject.imageURL = imageUrl;
					//console.log(dataObject);
					if (success) {
						dataObject.url = dataObject.domain + dataObject.truekey + '?imageMogr2/auto-orient';
						success(dataObject);
					}
				} catch (e) {
					console.log('parse JSON failed, origin String is: ' + dataString)
					if (fail) {
						fail(e);
					}
				}
				uni.hideLoading();
			},
			fail: function(error) {
				uni.hideLoading();
				console.error(error);
				if (fail) {
					fail(error);
				}
			}
		})
	}

	function getQiniUpToken(callback) {
		uni.request({
			url: config.qiniuUploadTokenURL,
			success: function(res) {
				var token = res.data.data.uptoken;
				if (token && token.length > 0) {
					config.qiniuUploadToken = token;
					if (callback) {
						callback();
					}
				} else {
					console.error('qiniuUploader cannot get your token, please check the uptokenURL or server')
				}
			},
			fail: function(error) {
				console.error('qiniu UploadToken is null, please check the init config or networking: ' + error);
			}
		})
	}

	function uploadURLFromRegionCode(code) {
		var uploadURL = null;
		switch (code) {
			case 'ECN':
				uploadURL = 'https://upload.qiniup.com';
				break;
			case 'NCN':
				uploadURL = 'https://up-z1.qbox.me';
				break;
			case 'SCN':
				uploadURL = 'https://up-z2.qbox.me';
				break;
			case 'NA':
				uploadURL = 'https://up-na0.qbox.me';
				break;
			default:
				console.error('please make the region is with one of [ECN, SCN, NCN, NA]');
		}
		return uploadURL;
	}
})();
