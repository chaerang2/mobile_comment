
const commentList = JSON.parse(window.sessionStorage.commentList)
const best = commentList[0];
let snsImg = '';
if(best.sns === 'kakao'){
  snsImg = "http://placehold.it/100x100.png?text=kakao"
}else if(best.sns === 'naver'){
  snsImg = "http://placehold.it/100x100.png?text=naver"
}else if(best.sns === 'facebook'){
  snsImg = "http://placehold.it/100x100.png?text=facebook"
}
// 더미중에서 좋아요가 제일 많은 친구를 뽑아내기
// 걔의 데이터를 쪼로록 뽑아서

document.querySelector('.bc_profile').src=best.profileImg
document.querySelector('.bc_sns').src=snsImg
document.querySelector('.bc_time').textContent=best.time
document.querySelector('.bc_text').textContent=best.text
// document.querySelector('.')
// document.querySelector('.')
// document.querySelector('.')

