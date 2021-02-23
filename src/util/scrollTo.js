export default function scrollTo(y, time){
  uni.pageScrollTo({
    scrollTop: y,
    duration: time,
    success:()=>{
      console.log('scrollTop success from main')
    },
    fail:()=>{
      console.log('scrollTop fail from main')
    }
  });
}
 