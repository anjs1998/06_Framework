console.log("boardList");

const insertBtn = document.querySelector("#insertBtn");

// 글쓰기 버튼이 존재할 때만 선택 가능

if(insertBtn != null){

    insertBtn.addEventListener("click", () => {

        // get 방식 요청(글작성 할수 있는 페이지로 이동시키기)

        // /editBoard/i/insert
        location.href=`/editBoard/${boardCode}/insert`;


    });
}