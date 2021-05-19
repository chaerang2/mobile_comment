
let commentList = JSON.parse(window.sessionStorage.commentList)
let ul = document.querySelector('.comment_box')
let commentForm = document.querySelector('.comment_form');
let commentBtn = document.querySelector('.comment_btn')
let banWord = ['노잼','짱싫어']



// 베스트 코멘트 
function makeBestComment(){
  const best = commentList[0];
  let snsImg = '';
  if(best.sns === 'kakao'){
    snsImg = "http://placehold.it/100x100.png?text=kakao"
  }else if(best.sns === 'naver'){
    snsImg = "http://placehold.it/100x100.png?text=naver"
  }else if(best.sns === 'facebook'){
    snsImg = "http://placehold.it/100x100.png?text=facebook"
  }
  
  document.querySelector('.bc_profile').src=best.profileImg
  document.querySelector('.bc_sns').src=snsImg
  document.querySelector('.bc_user').textContent=best.user
  document.querySelector('.bc_time').textContent=best.time
  document.querySelector('.bc_text').textContent=best.text
  const btnbox = document.querySelector('.content_btnbox')

  let commentCommBtn = document.createElement('button')
  let likeBtn = document.createElement('button')
  let disLikeBtn = document.createElement('button')
  let shareBtn = document.createElement('button')
  btnbox.appendChild(commentCommBtn)
  btnbox.appendChild(likeBtn)
  btnbox.appendChild(disLikeBtn)
  btnbox.appendChild(shareBtn)
  commentCommBtn.classList.add('bc_comm_btn')
  likeBtn.classList.add('bc_like_btn')
  disLikeBtn.classList.add('bc_dislike_btn')
  shareBtn.classList.add('bc_share_btn')
  commentCommBtn.textContent = best.comment.length
    likeBtn.textContent = best.like
    disLikeBtn.textContent = best.dislike
    shareBtn.textContent = '공유'
    likeBtn.onclick = function(){
      likeComment(best.id, 'like')
    }
    disLikeBtn.onclick = function(){
      likeComment(best.id, 'dislike')
    }
}
makeBestComment()

// 코멘트 삭제
function deleteComment(id){
  let commentList = JSON.parse(window.sessionStorage.commentList)
  let newArr = commentList.filter(ele=>{
    return ele.id !== id
  })
  window.sessionStorage.commentList = JSON.stringify(newArr)
  deleteCommentList()
  makeCommentList(JSON.parse(window.sessionStorage.commentList))
}
// 좋아요 or싫어요
function likeComment(id,str){
  let commentList = JSON.parse(window.sessionStorage.commentList)
  for(let i = 0; i < commentList.length; i++){
    if(commentList[i].id === id){
      if(str === 'like'){
        commentList[i].like++
      }else{
        commentList[i].dislike++
      }
    }
  }
  window.sessionStorage.commentList = JSON.stringify(commentList)
  deleteCommentList()
  makeCommentList(commentList)
}
// 댓글 리스트 구현
function makeCommentList(arr){
  arr.forEach(ele=>{
    let li = document.createElement('li')
    ul.appendChild(li)
    let time = document.createElement('p')
    let text = document.createElement('p')
    let sns = document.createElement('img')
    let deleteBtn = document.createElement('button')
    let commentCommBtn = document.createElement('button')
    let likeBtn = document.createElement('button')
    let disLikeBtn = document.createElement('button')
    let shareBtn = document.createElement('button')
    time.classList.add('time')
    text.classList.add('text')
    sns.classList.add('sns_img')
    deleteBtn.classList.add('edit_btn')
    commentCommBtn.classList.add('comment_comm_btn')
    likeBtn.classList.add('like_btn')
    disLikeBtn.classList.add('dislike_btn')
    shareBtn.classList.add('share_btn')
    li.appendChild(time)
    li.appendChild(text)
    li.appendChild(sns)
    li.appendChild(deleteBtn)
    li.appendChild(commentCommBtn)
    li.appendChild(likeBtn)
    li.appendChild(disLikeBtn)
    li.appendChild(shareBtn)
    time.textContent = ele.time
    text.textContent = ele.text
    deleteBtn.textContent = '삭제'
    commentCommBtn.textContent = ele.comment.length
    likeBtn.textContent = ele.like
    disLikeBtn.textContent = ele.dislike
    shareBtn.textContent = '공유'
    deleteBtn.onclick = function(){
      deleteComment(ele.id)
    }
    likeBtn.onclick = function(){
      likeComment(ele.id, 'like')
    }
    disLikeBtn.onclick = function(){
      likeComment(ele.id, 'dislike')
    }
    sns.src="http://placehold.it/100x100.png?text=facebook"
    }
  )
}
makeCommentList(commentList)

// 리스트 재생성을 위해 리스트 전체삭제
function deleteCommentList(){
  while (ul.firstChild) {
      ul.removeChild(ul.firstChild);
    }
}

// 고유 아이디 생성용
function uuidv4() {
  return 'xxxx-4xxx-yxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// 새 댓글작성
commentBtn.onclick = function(){
  let inputText = document.querySelector('.comment_input').value;
  let newComment = {}
  newComment.id = uuidv4()
  newComment.userId = window.sessionStorage.userId
  newComment.sns = window.sessionStorage.sns
  newComment.profileImg = 'http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg'
  newComment.time = new Date()
  newComment.text = inputText
  newComment.comment = []
  newComment.like = 0
  newComment.dislike = 0
  let sessionData = JSON.parse(window.sessionStorage.commentList)
  sessionData.push(newComment)
  window.sessionStorage.commentList = JSON.stringify(sessionData)
  deleteCommentList()
  makeCommentList(commentList)
    

}

// 소셜로그인 창 모달구현을 위한 클래스 이름 붙이고 떼기
let loginModal = document.querySelector('.login_modal')
commentForm.onclick = function(){
  if(!window.sessionStorage.isLogin){
    console.log('noLogin')
    loginModal.classList.remove('hidden')
  }
}
let modalBox = document.querySelector('.modal_box')
commentForm.onclick = function(){
  loginModal.classList.add('hidden')
}

let socialLoginBtn = document.querySelectorAll('.social_login')

// 소셜 로그인 클릭시 sns정보 세션스토리지로 넘기기
function socialLogin(sns){
  window.sessionStorage.sns = sns;
  window.sessionStorage.isLogin = true;
  window.sessionStorage.userId = '신규유저';
  loginModal.classList.add('hidden')
}

for (const button of socialLoginBtn) {
  button.addEventListener('click', function(e) {
    socialLogin(e.target.name)
  })
}
