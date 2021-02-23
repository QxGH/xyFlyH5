export default function makePhoneCall(phone){
  phone = phone.toString();
  uni.makePhoneCall({
    phoneNumber: phone
  })
 }