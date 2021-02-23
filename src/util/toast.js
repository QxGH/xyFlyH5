export function showToast(str) {
  uni.showToast({
    title: str,
    icon:'none',
    duration: 2000
  });
  return false;
}
export function showModal(str) {
  uni.showModal({
    title: '温馨提示',
    content: str,
    showCancel: false
  });
  return false;
}