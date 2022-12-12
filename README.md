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


## Stacks
### Environment
<div align=center>
  <img src="https://img.shields.io/badge/vscode-007ACC?style=for-the-badge&logo=vscode&logoColor=white">
  <img src="https://img.shields.io/badge/iTerms2-000000?style=for-the-badge&logo=iTerms2&logoColor=white">
  <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
  <img src="https://img.shields.io/badge/Intellij IDEA-000000?style=for-the-badge&logo=Intellij IDEA&logoColor=white">
  <img src="https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=TensorFlow&logoColor=white">
</div>

### Development
<div align=center>
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=Python&logoColor=white">
  <img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=Flask&logoColor=white">
  <img src="https://img.shields.io/badge/Java-FFFFFF?style=for-the-badge&logo=Java&logoColor=white">
  <img src="https://img.shields.io/badge/Spring Boot-6DB33F?style=for-the-badge&logo=Spring Boot&logoColor=white">
  <img src="https://img.shields.io/badge/Spring Security-6DB33F?style=for-the-badge&logo=Spring Security&logoColor=white">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">
  <img src="https://img.shields.io/badge/ReactQuery-FF4154?style=for-the-badge&logo=ReactQuery&logoColor=white">
  <img src="https://img.shields.io/badge/Socketio-010101?style=for-the-badge&logo=Socketio&logoColor=white">
</div>
<br/><br/><br/>

### 1.4 주요기능 및 사용방법
#### 1.4.1 URL 요약 정리 결과 화면
<img width="1366" alt="image" src="https://user-images.githubusercontent.com/80098469/206985683-1fdb9faa-a41f-4989-959f-fb8e9f041dc2.png">
위 메인 페이지 URL 입력 창에 요약하고자 하는 URL을 입력한다.  
<br/><br/><br/>

<img width="1365" alt="image" src="https://user-images.githubusercontent.com/80098469/206977591-f58c4db5-a53f-4235-a5ca-c48fb4ad1ab6.png">
사용자는 위와 같이 URL을 입력하여 요약 결과 화면을 반환받을 수 있다.  
<br/> 상위 3개의 키워드를 추출하여 카테고리를 분류하고 okt()를 이용해 pos(명사+형용사)로 모델을 학습하여 텍스트를 요약한다.
<br/><br/><br/>


#### 1.4.2 카테고리 별 요약 결과 관리 
<img width="1223" alt="image" src="https://user-images.githubusercontent.com/80098469/206978111-87c27479-6bb5-4041-bd9a-00754385afff.png">
본 웹 사이트를 통해 현재까지 진행한 모든 사용자들의 URL을 카테고리 별로 저장되어있다. 해당 웹 사이트에 인증 및 인가 기능이 존재하기 때문에 인가가 확인이 된 사용자는 다른 사용자가 특정 카테고리 내 어떤 URL을 요약하였는지 쉽게 알 수 있다.  
<br/><br/><br/>


#### 1.4.3 채팅 관리 기능
<img width="1360" alt="image" src="https://user-images.githubusercontent.com/80098469/206978686-166c94bb-2c96-4ecd-9149-d0660a227748.png">
해당 웹 사이트를 이용하는 다른 사용자들과 채팅 기능을 이용할 수 있다.   
<br/><br/><br/>


### 1.5 데이터베이스 설계
<img width="778" alt="image" src="https://user-images.githubusercontent.com/80098469/206979285-7b84ebad-2057-4318-b8b0-e3669639b07e.png">
주요 기능이 URL 요약 및 채팅 기능이기 때문에 해당 기능을 사용하기 위한 데이터베이스 설계는 이와 같이 진행하였다. </br> 
* 회원과 채팅방과의 관계는 다대다 관계이므로 중계 테이블을 이용하여 일대다 - 다대일 관계로 풀어 설계해주었다. </br>
* 인가 기능을 유지한채 관리하는 URL과 카테고리 분류를 위한 전체 URL 관리를 위한 테이블이 하나씩 존재한다. 회원과 연관관계가 존재하는 URL이 회원이 검색했던 URL을 의미하며 독립적으로 존재하는 ORIGIN_URL 테이블이 전체 URL관리를 위한 테이블이다.
<br/><br/><br/></br></br>

## 2. 실행방법
### 2.1 해당 프로젝트를 Clone한다.

```
$ git clone https://github.com/CSID-DGU/2022-2-OSSProj-KKJ-5.git
$ cd 2022-2-OSSProj-KKJ-5
```

### 2.1.1 React 실행방법
```
$ cd ossproj-react-app
$ npm install or npm install --force
$ npm start
```

### 2.1.2 Flask 실행방법
#### 외부 라이브러리 사용
본 애플리케이션을 구현하는 과정에서 활용 가능한 외부 라이브러리는 제한없이 사용하는 것을 원칙으로 한다.
본 프로젝트는 gensim 라이브러리 사용을 위해 Python 3.8.3 버전을 사용해야한다.
gensim 라이브러리는 파이썬 4.0 이후부터 지원하지 않는 기능이다. 따라서, 파이썬 환경을 3.8.3에 구성할 수 있는 가상환경을 설정해준다.
</br> </br>

1. 아나콘다를 설치한다.
</br> https://www.anaconda.com/distribution/#download-section

2. 원하는 이름으로 가상 환경을 설정하고 파이썬 3.8.3로 설정해준다.
```
$ conda create -n {ENV_NAME} python=3.8.3
```

3. 생성한 가상 환경 {ENV_NAME}로 들어갑니다.
```
$ conda activate {ENV_NAME}
```

위와 같이 가상 환경을 설정하고 아래 과정을 통해 라이브러리까지 다운로드를 받아준다.

### Requirements.txt
본 애플리케이션의 소스코드 내에서 활용한 모든 외부 라이브러리는 requirements.txt에 해당 라이브러리 리스트를 저장하여 실행할 수 있도록 헌다.
```
$ pip freeze > requirements.txt
```
requirements.txt에 저장된 외부 라이브러리를 다운로드 받는 명령어는 다음과 같다.
``` 
$ pip install -r requirements.txt
```

4. Flask 서버 실행
```
$ python app.py
```

### 환경변수 파일
.gitignore
* Git 관련 환경 변수 파일 </br>

requirements.txt
* 파이썬 라이브러리 종속성 


### 2.1.3 Spring Server 실행 방법
Spring Server를 실행하기 전 로컬 데이터 베이스인 H2 환경을 먼저 구성해주어야 한다.

1. H2 설치 
</br> http://h2database.com/html/main.html

2. H2 데이터베이스 서버 실행
압축을 풀고 해당 폴더 안 bin 디렉토리 안으로 이동한 후 h2.bat을 실행해준다. 경로 이동은 개인 환경 설정에 맞도록 작성하여 bin폴더 안으로 이동해준다. 아래는 MacOS 환경에서 이동 경로 예시이다.
```
cd Users/{UserName}/Downloads/h2/bin 
./h2.sh
```

3. H2 데이터베이스 생성
<img width="310" alt="image" src="https://user-images.githubusercontent.com/80098469/207020328-9ba3a19d-b13f-4b64-a0dc-2561aea44f71.png">

Generic H2 (Embedded)로 설정한 후 JDBC URL에 위 사진과 동일한 경로를 작성해준다. 만약 다른 경로로 설정하고 싶은 경우 Spring내 application.yml 파일 내 spring.datasource.url의 이름 또한 설정한 경로로 변경해주도록 한다. </br>

위 과정을 통해 H2 데이터베이스를 생성해준 후 열려있는 창을 닫고 데이터베이스에 재접속 해주도록 한다.

4. H2 데이터베이스 접속
<img width="311" alt="image" src="https://user-images.githubusercontent.com/80098469/207021101-0858b593-f82f-4de5-a989-df0acd8b99ce.png">

생성이 아닌 접속이기 때문에 Generic H2 (Server)로 변경해준 후 JDBC URL 또한 위 사진과 동일하게 입력해준 후 연결을 클릭하여 데이터베이스에 접속해주도록 한다.

</br></br></br>

5. Spring Server 실행 </br>
본 프로젝트 환경은 Intellij IDEA에서 build와 실행을 함께 진행하였으므로 아래 설명 또한 Intellij IDEA 기준 실행 방법을 소개한다.</br></br></br>

5.1 Intellij IDEA 환경 설정에서 빌드,실행,배포를 검색한 후 빌드 도구를 연다.
<img width="892" alt="image" src="https://user-images.githubusercontent.com/80098469/207022144-0d0eea1c-36b7-4909-8339-e37fdf521d7c.png">


다음 사진에서 [다음을 사용하여 빌드 및 실행]의 Gradle이 아닌 Intellij IDEA로 변경해준다. </br></br>

5.2 Intellij IDEA 환경 설정에서 빌드,실행,배포를 검색한 후 컴파일러 도구를 연다.
<img width="972" alt="image" src="https://user-images.githubusercontent.com/80098469/207028376-6d1de97e-e0e5-45ab-ac26-f71c50269f3f.png">

다음 사진에서 [어노테이션 처리 활성화] 버튼을 클릭하여 어노테이션이 활성화될 수 있도록 환경을 구성해준다. </br></br>

5.3 Intellij IDEA를 실행한다.

OssProjApplication 클래스 내 실행 버튼을 클릭하여 Spring Server를 실행한다.

위 과정을 모두 진행하면 React, Flask, Spring 3개의 Server를 실행했으며 URL창에 localhost:3000을 입력하여 본 프로젝트 웹 사이트에 접속할 수 있다.

## 3. Attributes
* 기존 프로젝트 : https://github.com/DGUFARM </br>
* 기존 프로젝트 License : MIT License </br>
* 현재 프로젝트 License : GNU General Public License v3.0

## 4. 프로젝트 자료
[프로젝트 제안서 바로가기] https://github.com/CSID-DGU/2022-2-OSSProj-KKJ-5/blob/main/KKJ_%EC%A0%9C%EC%95%88%EC%84%9C.pdf
[프로젝트 제안서 발표자료 바로가기] https://github.com/CSID-DGU/2022-2-OSSProj-KKJ-5/blob/main/kKJ_%EC%A0%9C%EC%95%88%EC%84%9C%EB%B0%9C%ED%91%9C.pptx
[프로젝트 중간보고서 바로가기] https://github.com/CSID-DGU/2022-2-OSSProj-KKJ-5/blob/main/%EC%A4%91%EA%B0%84%EB%B3%B4%EA%B3%A0%EC%84%9C_KKJ.pdf
[프로젝트 중간발표자료 바로가기] https://github.com/CSID-DGU/2022-2-OSSProj-KKJ-5/blob/main/%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_KKJ.pdf

