//console.log("ajax-main is loaded")


//HTML상 요소 얻어와서 변수에 저장
// 할일 개수 관련 요소
const totalCount = document.querySelector("#totalCount");
const completeCount = document.querySelector("#completeCount");
const reloadBtn = document.querySelector("#reloadBtn");
// 할 일 추가 관련 요소
const todoTitle = document.querySelector("#todoTitle");
const todoContent = document.querySelector("#todoContent");
const addBtn = document.querySelector("#addBtn");
// 할 일 목록 조회 관련 요소
const tbody = document.querySelector("#tbody");
// 할 일 상세 조회 관련 요소
const popupLayer = document.querySelector("#popupLayer");
const popupTodoNo = document.querySelector("#popupTodoNo");
const popupTodoTitle = document.querySelector("#popupTodoTitle");
const popupComplete = document.querySelector("#popupComplete");
const popupRegDate = document.querySelector("#popupRegDate");
const popupTodoContent = document.querySelector("#popupTodoContent");
const popupClose = document.querySelector("#popupClose");
// 상세 조회 팝업레이어 관련 버튼 요소
const changeComplete = document.querySelector("#changeComplete");
const updateView = document.querySelector("#updateView");
const deleteBtn = document.querySelector("#deleteBtn");
// 수정 레이어 관련 요소
const updateLayer = document.querySelector("#updateLayer");
const updateTitle = document.querySelector("#updateTitle");
const updateContent = document.querySelector("#updateContent");
const updateBtn = document.querySelector("#updateBtn");
const updateCancel = document.querySelector("#updateCancel");
/*
    fetch() API
    비동기 요청을 수행하는 최신 Javascript API 중 하나


    -Promise는 비동기 작업의 결과를 처리하는 방법중 하나
    -> 어떤 결과가 올지는 모르지만 반드시 결과를 보내주겟다는 약속.
    -> 비동기 작업이 맞이할 완료 또는 실패와 그 결과값을 나타냄.
    -> 비동기 작업이 완료되었을 떄 실행할 콜백함수를 지정하고
    해당 작업의 성공 또는 실패 여부를 처리할수 있도록 함


Promise 객체는 세 가지 상태를 가짐
- Pending ( 대기중 ) : 비동기 작업이 완료되지 않은 상태
- fulfilled ( 이행됨 ) : 비동기 작업이 성공적으로 완료된 상태
- Rejected ( 거부됨 ) : 비동기 작업이 실패한 상태


*/

// 전체 Todo 개수 조회 및 출력하는 함수


function getTotalCount(){

    //비동기로 서버에 전체 Todo 개수를 조회하는 요청
    // fetch() API 코드 작성

    fetch("/ajax/totalCount" /*{method : "POST"}*/ ) // 서버로 "/ajax/totalCount" 로 GET 요청
    .then(response => {// 응답 데이터 처리 - 서버서 응답을 받으면 이 응답(response)을 덱스트 형식으로 변환하는 콜백함수

        return response.text(); //response.text() : 서버로부터 응답 데이터를 문자열/숫자 형태로 변환한 결과를 가지는 Promise 객체 반환
    }) 
    // 두번째 then( 첫번째에서 return(변환)된 데이터를 활용하는 역할 )
    .then( result => { // 첫번째 콜백함수가 완료된 후 호출되는 콜백함수
        // 변환된 텍스트 데이터(result)를 받아서
        // 콘솔에 단순 출력
        // 매개변수 result : 첫번째 콜백함수에서 반환된 Promise 객체의 PromiseResult값
        // == result 매개변수로 받아서 처리
        console.log(result)
        totalCount.innerText = result; //idrk totalcount인곳에 innertext로 result 표시
    } )
}


// 완료된 할일 개수 조회 및 출력하는 함수
function getCompleteCount(){

    fetch("/ajax/completeCount")
    .then( response => response.text() ) // 화살표 함수(매개변수 : response)(return response.text())
    .then( result => {

        completeCount.innerText = result;
    });
}

// 새로고침 버튼이 클릭되었을때
reloadBtn.addEventListener("click", ()=>{
    getTotalCount();
    getCompleteCount();
    selectTodoList();
    //전체 목록 조회 함수도 호출예정

});

// 할일 추가 버튼 클릭시 동작
addBtn.addEventListener("click", () => {

    
    if(todoTitle.value.trim().length === 0 || todoContent.value.trim().length === 0){

        alert("제목이나 나용은 비어있을수 없습니다!");
    }

        const param = {
            //key : value
            "todoTitle" : todoTitle.Value,
            "todoContent" : todoContent.value
        
        }
        
        fetch("/ajax/add", {
            //key : value
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify(param) //param이라는 JS 객체를 JSON으로 변환
        
        })
        .then( resp => resp.text() ) // 반환한 값을 text로 변환
        .then( result => {
            //첫번째 then에서 반환된 값을 result에 저장
            console.log(result)

            if(result > 0){ // 성공

                alert("추가 성공!!!");

                todoTitle.value = "";
                todoContent.value = "";

                //전체 Todo개수 조회함수 재호출로 refresh
                getTotalCount();
                selectTodoList();
                // -> 전체 Todo 목록 조회하는 함수 재호출 예정
            }else{

                alert("추가 실패...");
            }
        });

});


//-------------------------------------------------------------------
// 비동기 할일 전체 목록을 조회하는 함수

const selectTodoList = () => {

    fetch("/ajax/selectList")
    .then(resp => resp.json()) // 응답결과를 json으로 받음. resp.text가 아니다!  
    // ※(JSON.parse(resp.text)란 방법이 있기는 하다. 이떄 js object로 변환된다!!)
    // JSON.parse(JSON 데이터) : string -> JS object
    // JSON.stringify (JS Object) : JS Object -> string

    .then(todoList => {

        // 매개변수 todoList:
        // 첫번째 then에서 resp.text() / resp.json()
        // 단순 텍스트이거나, JS Object일수 있음.
        console.log(todoList);



        //---------------------------------------------------------------

        //기존에 출력되어 있던 할 일 목록을 모두 비우기
        tbody.innerHTML = "";

        //tbody에 tr/td/ 요소를 생성하여 내용 추가
        for(let todo of todoList){// 향상된 for문
            //tr 태그 생성
            const tr = document.createElement("tr"); //<tr></tr>
            // JS 객체에 존재하는 key 모음 배열 생성
            const arr = ['todoNo', 'todoTitle', 'complete','regDate'];

            for(let key of arr){
                const td = document.createElement("td"); //<tr></tr>

                //제목인 경우
                if(key ==='todoTitle'){
                    const a = document.createElement("a"); //a태그 생성
                    a. innerText = todo[key]; //todo["todoTitle"]
                    a.href = "/ajax/detail?todoNo=" + todo.todoNo;
                    tr.append(a);
                    tr.append(td);
                    
                    //a태그 클릭 시 페이지 이동 막기(비동기 요청 사용을 위해)
                    a.addEventListener("click", e=>{
                        e.preventDefault();
                        
                        // 할 일 상세 조회 비동기 요청 함수 호출
                        selectTodo(e.target.href);
                    });
                    continue;
                }
                //제목이 아닌 경우
                td.innerText = todo[key]; //todo['todoNo']

                tr.append(td);
            }

            //tbody의 자식으로 tr 추가
            tbody.append(tr);

        }
    });
}

const selectTodo = (url) => {

    //매개변수 url == "/ajax/detail?todoNo=1" 형태의 문자열

    //fetch요청시 url이용

    fetch(url)
    .then(resp => resp.json())
    .then(todo => {
        
        console.log(todo);

        popupTodoNo.innerText = todo.todoNo;
        popupTodoTitle.innerText = todo.todoTitle;
        popupComplete.innerText = todo.complete;
        popupRegDate.innerText = todo.regDate;
        popupTodoContent.innerText = todo.todoContent;

        //popup layer 보이게하기

        popupLayer.classList.remove("popup-hidden");

        //update layer가 열려있다면 숨기기
        updateLayer.classList.add("popup-hidden");


    });
}

popupClose.addEventListener("click", () => {
    //숨겨주는 class 추가
    popupLayer.classList.add("popup-hidden");
});

// 삭제 버튼 클릭시

deleteBtn.addEventListener("click", ()=>{

    //취소 클릭 시 아무것도 안함(해당 함수 종료)
    if( !confirm("정말 삭제하시겟습니까?") ){
        return;
    }

    // 삭제할 할일 번호 얻어오기
    const todoNo = popupTodoNo.innerText;

    // 삭제 비동기 요청 (DELETE)
    fetch("/ajax/delete", {

        method : "DELETE", //delete 방식 요청 -> @DeleteMapping 어노테이션
        headers : {"Content-Type" : "application/json"},
        body : todoNo // todoNo 단일값 하나는 JSON 형태로 자동 변환되어 전달
        // body : JSON.stringify(todoNo)
        // -> 원래는 이렇게 명시하는게 옳음(엄격한 환경에서는 꼭 명시)

        
    })
    .then(resp => resp.text())
    .then(result => {

        console.log(result);
        if(result > 0){ // 삭제 성공
            alert("삭제되엇습니다!");
            //상세 조회 팝업 레이어 닫기
            popupLayer.classList.add("popup-hidden");
            //전체, 완료된 할일 개수 다시 refresh
            //할일 목록 다시 조회
            getTotalCount();
            getCompleteCount();
            selectTodoList();
        }else{ // 삭제 실패
            alert("삭제 실패...");
        }
    });

});
/*********************CRUD 당 상응하는 HTTP 요청 method********************

    GET(조회)
    POST(삽입)
    DELETE(삭제)
    PUT(수정)
*/

changeComplete.addEventListener("click", () => {

    const todoNo = popupTodoNo.innerText;
    const complete = popupComplete.innerText === 'Y' ? "N" : 'Y';

    const obj = {"todoNo" : todoNo, "complete":complete};
    //      {"todoNo" : 2, "complete" : "Y"}

    // 비동기로 완료 여부 변경 요청(PUT 요청 방식)
    fetch("/ajax/changeComplete", {
        method : "PUT", //@PutMapping
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify(obj)
    })
    .then(resp => resp.text())
    .then(result => {

        if(result > 0){
            // update된 DB 데이터를 다시 조회해서 화면에 출력
            // -> 서버 부하가 큼

            // selectTodo();
            // 상세 조회에서 Y/N 만 바꾸기
            popupComplete.innerText = complete;

            //getCompleteCount();
            //완료된 Todo 개수 +-1
            const count = Number(completeCount.innerText);
            if(complete === 'Y') completeCount.innerText = count + 1;
            else                completeCount.innerText = count - 1;

            selectTodoList();
            // 서버 부하 줄이기 가능! -> 코드가 복잡해서 오히려 비용증가...
            // 그냥 서버 요청 함수 호출로 해결
        }else{
            alert("완료 여부 변경 실패!!");
        }
    });
});

updateView.addEventListener("click", () =>{
    
    //기존 상세 조회 팝업 레이어는 숨기고
    popupLayer.classList.add("popup-hidden");

    // 수정 팦업 레이어 보이게
    updateLayer.classList.remove("popup-hidden");

    // 수정 레이어 보일때
    // 상세 조회 팝업 레이어에 작성된 제목, 내용을 얻어와 세팅

    updateTitle.value = popupTodoTitle.innerText;

    updateContent.value = popupTodoContent.innerHTML.replaceAll("<br>", "\n");
    //HTML 화면에서 줄 바꿈이 <br>로 인식되고 있는데 
    // textarea에서는 \n으로 바꿔줘야 실제 줄바꿈으로 인식되어 출력된다.


    //수정 레이어 -> 수정 버튼에 data-todo-no 속성 추가
    updateBtn.setAttribute("data-todo-no", popupTodoNo.innerText);
    // <button id="updateBtn" data-todo-no="${todoNo}">수정</button>
});

updateCancel.addEventListener("click", () => {
    // 수정 레이어 숨기기
    updateLayer.classList.add("popup-hidden");

    // 상세 조회 팝업 레이어 보이기
    popupLayer.classList.remove("popup-hidden");
});


// 수정 레이어 -> 수정 버튼 클릭 시

updateBtn.addEventListener("click", e => {
    // 서버로 전달해야 하는 값이 
    const obj = {

        "todoNo" : e.target.dataset.todoNo,
        "todoTitle" : updateTitle.value,
        "todoContent" : updateContent.value
    };

    fetch("/ajax/update",{
        method: "PUT",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(obj)

    })
    .then(resp => resp.text())
    .then(result => {

        if(result > 0){
            alert("수정 성공!!");
            // 수정 레이어 숨기기
            updateLayer.classList.add("popup-hidden");

            //상세 조회 레이어는 보이게
            // -> 수정한 내용이 출력되도록
            //selectTodo()
            // -> 성능 개선
            popupTodoTitle.innerText = updateTitle.value;
            popupTodoContent.innerHTML
                = updateContent.value.replaceAll("\n", "<br>");
            popupLayer.classList.remove("popup-hidden");

            selectTodoList();

            updateTitle.value = "";
            updateContent.value = "";
            updateBtn.removeAttribute("data-todo-no"); // 속성 제거
        } else{
            alert("실패...");

        }

    });
});
selectTodoList();
getTotalCount();
getCompleteCount();

//POST 방식 fetch() 비동기 요청 보내기



//todoTitle과 todoContent를 저장한 JS 객체

