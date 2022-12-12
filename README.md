# 2022-2-OSSProj-KKJ-5
# < KKJ Team >
# URL 요약 정리 및 공유 웹 사이트
# 1. 팀구성

## 본 프로젝트에 참여하는 KKJ팀의 팀원과 팀원의 역할은 다음과 같다.
- [김중원](https://github.com/jw0293) (개발자,팀장)
- [김재한](https://github.com/kim-limit) (개발자)
- [장민주](https://github.com/MinjuJangg) (개발자)
### 1.1 참여과제
주제 : 자유 주제([동국대학교 - CSID DGU](https://github.com/CSID-DGU)에 존재하는 프로젝트/타 오픈소스 프로젝트의 파생 프로젝트 또는 신규 프로젝트)

### 1.2 KKJ Team 주제 선정
1. 다양한 웹 페이지를 통해 정보를 활용하는데 많은 URL을 참고하게 되면 한 눈에 파악하기 힘들며 핵심 정보를 파악하는 것에 어려움을 느낄 수 있다.
2. 참고했던 URL내 정보를 다시 참고해야할 때 URL으로만 어떤 내용에 해당하는 것인지 알아차리는 것에는 어려움 존재 또한 저장해둔 URL이 많이 존재한다면 특정 URL을 찾고자 할 때 어려움 존재. 

이러한 문제점들의 개선방향을 제시하고 해결하고자하는 프로젝트 주제를 선정

### 1.3 과제 주제
## URL 요약 정리 및 공유 웹 사이트 개발
<img width="1370" alt="image" src="https://user-images.githubusercontent.com/80098469/206975558-69b2a32a-78b9-4507-befb-1a81329c509f.png">
사용자가 요약을 희망하고자 하는 URL을 입력하면 해당 URL의 본문을 요약한 텍스트와 시각화 자료(워드 클라우드, 네트워크 그래프)를 사용자에게 반환해준다. 이 기능을 통해 사용자에게 긴 내용의 본문을 한 눈에 보기 쉽도록 제공해준다.

### 1.4 주요기능
#### 1.4.1 URL 요약 정리 결과 화면
<img width="1365" alt="image" src="https://user-images.githubusercontent.com/80098469/206977591-f58c4db5-a53f-4235-a5ca-c48fb4ad1ab6.png">
사용자는 URL을 입력하여 위와 같은 요약 결과 화면을 반환받을 수 있다.


#### 1.4.2 카테고리 별 요약 결과 관리 
<img width="1223" alt="image" src="https://user-images.githubusercontent.com/80098469/206978111-87c27479-6bb5-4041-bd9a-00754385afff.png">
본 웹 사이트를 통해 현재까지 진행한 모든 사용자들의 URL을 카테고리 별로 저장되어있다. 해당 웹 사이트에 인증 및 인가 기능이 존재하기 때문에 인가가 확인이 된 사용자는 다른 사용자가 특정 카테고리 내 어떤 URL을 요약하였는지 쉽게 알 수 있다.


#### 1.4.3 채팅 관리 기능
<img width="1360" alt="image" src="https://user-images.githubusercontent.com/80098469/206978686-166c94bb-2c96-4ecd-9149-d0660a227748.png">
해당 웹 사이트를 이용하는 다른 사용자들과 채팅 기능을 이용할 수 있다.


### 1.5 데이터베이스 설계
<img width="778" alt="image" src="https://user-images.githubusercontent.com/80098469/206979285-7b84ebad-2057-4318-b8b0-e3669639b07e.png">
주요 기능이 URL 요약 및 채팅 기능이기 때문에 해당 기능을 사용하기 위한 데이터베이스 설계는 이와 같이 진행하였다.


### 2. Stacks
#### Environment
<img src="https://img.shields.io/badge/vscode-007ACC?style=for-the-badge&logo=vscode&logoColor=white">
<img src="https://img.shields.io/badge/iTerms2-#000000?style=for-the-badge&logo=iTerms2&logoColor=white">
<img src="https://img.shields.io/badge/git-#F05032?style=for-the-badge&logo=git&logoColor=white">
<img src="https://img.shields.io/badge/github-#181717?style=for-the-badge&logo=github&logoColor=white">
<img src="https://img.shields.io/badge/Intellij IDEA-#000000?style=for-the-badge&logo=Intellij IDEA&logoColor=white">

#### Development
<img src="https://img.shields.io/badge/Java-#007ACC?style=for-the-badge&logo=Java&logoColor=white">
<img src="https://img.shields.io/badge/Spring Boot-#007ACC?style=for-the-badge&logo=Spring Boot&logoColor=white">
<img src="https://img.shields.io/badge/JPA-#007ACC?style=for-the-badge&logo=JPA&logoColor=white">
<img src="https://img.shields.io/badge/JWT-#007ACC?style=for-the-badge&logo=JWT&logoColor=white">
<img src="https://img.shields.io/badge/vscode-#007ACC?style=for-the-badge&logo=vscode&logoColor=white">
<img src="https://img.shields.io/badge/vscode-#007ACC?style=for-the-badge&logo=vscode&logoColor=white">

