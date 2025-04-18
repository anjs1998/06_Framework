// 목록으로 버튼 동작(메인페이지로 이동)
const goToList = document.querySelector("#goToList");

goToList.addEventListener("click", () => {
    location.href = "/"; // 메인페이지 ("/") 요청 GET 방식

});


//완료 여부 변경 버튼에 대한 동작

const completeBtn = document.querySelector(".complete-btn");

completeBtn.addEventListener("click", (e) => {

    //요소.dataset : data-* 속성에 저장된 값 반환
    // data-todo-no 세팅한 속성값 얻어오기
    // (html) data-todo-no -> js(카멜케이스 이용) dataset.todoNo
    const todoNo = e.target.dataset.todoNo;

    let complete = e.target.innerText; //기존 완료 여부 값 얻어오기("Y"/ "N")

    // Y <-> N
    complete = (complete === 'Y') ? 'N' : 'Y';

    // 완료 여부 수정 요청하기
    location.href = `/todo/changeComplete?todoNo=${todoNo}&complete=${complete}`;

});

//---------------------------------------------------

//수정 버튼 클릭 시 동작

const updateBtn = document.querySelector("#updateBtn");

updateBtn.addEventListener("click", e => {

    const todoNo = e.target.dataset.todoNo;

    console.log();
    location.href = `/todo/update?todoNo=${todoNo}`;
});


const deleteBtn = document.querySelector("#deleteBtn");

deleteBtn.addEventListener("click", e => {
    const todoNo = e.target.dataset.todoNo;
    if(confirm("삭제하시겟습니까?")){
        

        console.log();
        location.href = `/todo/delete?todoNo=${todoNo}`;
    }
    
    
});




/*
// LEGACY : 비동기식으로 돌아가는 함수
setTimeout(function(){ //callback 함수?
    //어떤 일이 끝났을 때 나중에 실행되는 함수

    setTimeout(function(){
        setTimeout(function(){}, 3000)

    }, 2000)
}, 1000);



//Promise 기반 -> fetch API : 서버에 비동기 요청으로 보낼때 사용하는 함수 (가독성 뛰어남, Exception 처리 쉬움)
fetch("/요청주소")
.then(resp => resp.json())
.then()
.catch(e){

    console.log(e);
}*/