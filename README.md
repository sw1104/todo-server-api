## 사이트
[배포 링크](https://joeunji0119.github.io/loginTodo/)

## 프로젝트 개요
원티드 프리온보딩 코스를 마치며 해당 코스에서 습득한 typescript와 nest를 좀 더 공부해보기 위해 프론트엔드 동료와 기획한 todo list 프로젝트로 유저는 회원가입과 로그인을 하고 todo를 생성, 체크, 수정, 삭제한다. 회원가입시 프로필 사진을 등록하며, 사진은 백엔드에서 form-data로 받아 S3에 저장 후 데이터베이스에 URL을 저장한다.

---

## 프로젝트 팀 구성

-   FRONT END 1명
-   BACK END 1명

---

## 기술스택

-   프론트엔드 :
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"/></a> <img src="https://img.shields.io/badge/React.js-58c3cc?style=flat-square&logo=React&logoColor=white"/> <img src="https://img.shields.io/badge/ReactQuery-FF4154?style=flat-square&logo=ReactQuery&logoColor=white"/></a>

-   백엔드 : 
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"/></a> <img src="https://img.shields.io/badge/NestJs-E0234E?style=flat-square&logo=NestJs&logoColor=white"/></a> <img src="https://img.shields.io/badge/Mysql-E6B91E?style=flat-square&logo=MySql&logoColor=white"/></a> <img src="https://img.shields.io/badge/TypeOrm-262627?style=flat-square&logo=TypeOrm&logoColor=white"/></a> <img src="https://img.shields.io/badge/AmazonS3-569A31?style=flat-square&logo=AmazonS3&logoColor=white"/></a>

---

## ERD
<img width="257" alt="2022-11-21-todo" src="https://user-images.githubusercontent.com/105622759/203677975-136e7950-7960-49d7-9ea4-f45ccdc31064.png">


## API DOCUMENT
<img width="1502" alt="2022-11-21-todo1" src="https://user-images.githubusercontent.com/105622759/203677986-544ad503-ea22-4b24-a226-f1f24a3facc3.png">


# 구현 사항
## 유저 등록
유저를 등록한다. 유저는 등록시 프로필 사진을 등록해야한다. 프로필 사진은 S3에 저장되며, DB에는 S3에 저장된 파일의 URL을 가져와서 저장한다. 비밀번호는 bcrypt를 이용하여 암호화해서 저장한다.
<img width="1012" alt="2022-11-21-todo2" src="https://user-images.githubusercontent.com/105622759/203678027-31f1786c-8031-4465-bc9e-13cc9d40afc0.png">




## 유저 로그인
유저는 이메일과 패스워드를 통해 로그인을 진행한다. 로그인이 정상적으로 완료되면 JWT TOKEN을 발급해서 응답한다. TOKEN에는 user의 id와 email이 담겨있다.

<img width="1000" alt="2022-11-21-todo3" src="https://user-images.githubusercontent.com/105622759/203678034-f4119b6c-466f-4109-9d47-14600f2776bf.png">


## todo 생성
todo를 생성한다. 생성시 먼저 토큰을 클라이언트로부터 받아와서 user의 id를 검증하고 생성을 진행한다.
<img width="1009" alt="2022-11-21-todo4" src="https://user-images.githubusercontent.com/105622759/203678044-1f27c1f0-0968-4fc8-bffe-76e13f3c7c11.png">


## todo 체크
todo 항목에 대해서 체크를 진행한다. 하나의 api로 체크 상태를 확인해서 체크와 언체크한다. 
<img width="1026" alt="2022-11-21-todo5" src="https://user-images.githubusercontent.com/105622759/203678053-659198a3-5de9-4e1a-b053-6ad3f6df8d43.png">
<img width="1014" alt="2022-11-21-todo6" src="https://user-images.githubusercontent.com/105622759/203678058-1ca6c4e7-898d-4d6b-b091-9f73af8a58ab.png">


## todo를 수정
todo 항목을 수정한다. 수정은 체크가 되어있지 않은 상태에서만 할 수 있으며 해당 항목이 체크된 경우 수정은 불가능하다.

<img width="1159" alt="2022-11-21-todo8" src="https://user-images.githubusercontent.com/105622759/203678071-96f8a872-8619-4ed0-98ea-b076a2258be5.png">
<img width="1172" alt="2022-11-21-todo9" src="https://user-images.githubusercontent.com/105622759/203678080-495de20d-d9e3-4082-8943-512ccee0fc78.png">

## 유저 정보
유저의 정보를 확인한다. `age`는 가입시 설정한 `birth`를 통해 계산해서 응답하고, `together`는 가입일로부터 며칠이 경과했는지 계산해서 응답한다.

<img width="1015" alt="2022-11-21-todo10" src="https://user-images.githubusercontent.com/105622759/203678093-41a39cce-9405-4561-9035-55f6743c504f.png">


## 유저의 todo 정보
유저가 작성한 todo의 정보를 응답한다.

<img width="1024" alt="2022-11-21-todo7" src="https://user-images.githubusercontent.com/105622759/203678113-af0069d9-03cc-49d6-9b82-02f9726cc0f8.png">

## todo 삭제
todo 항목을 삭제한다.

<img width="414" alt="2022-11-21-todo11" src="https://user-images.githubusercontent.com/105622759/204142430-ba536211-1af8-499f-8d95-06dc4331dd34.png">


