import CryptoJS from 'crypto-js';
import {
	Base64
} from 'js-base64';

const key = CryptoJS.enc.Utf8.parse(Base64.decode('RVpPQ25pM3B6RDNUMzcwNw==')); //十六位十六进制数作为秘钥
const iv = CryptoJS.enc.Utf8.parse(Base64.decode('ZFgwY21tQTVENzk3NTc3MA==')); //十六位十六进制数作为秘钥偏移量

//加密方法
const AesEncrypt = (word) => {
	let encrypted = CryptoJS.AES.encrypt(word, key, {
		iv: iv,
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7
	});
	return encrypted.toString();
};

//解密方法
const AesDecrypt = (word) => {
	let decrypted = CryptoJS.AES.decrypt(word, key, {
		iv: iv,
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7
	});
	let decryptedStr = decrypted.toString(CryptoJS.enc.Utf8);
	return decryptedStr.toString();
};

export {
	AesEncrypt,
	AesDecrypt
};
