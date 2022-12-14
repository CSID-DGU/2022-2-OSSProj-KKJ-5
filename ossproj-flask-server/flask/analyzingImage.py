import platform 
import matplotlib.pyplot as plt
from wordcloud import WordCloud, ImageColorGenerator
from krwordrank.word import KRWordRank
from krwordrank.hangle import normalize
from PIL import Image
import io, os
import uuid
import base64, getpass

font_path = 'NanumGothic.ttf'

class SaveFile:
    originUrl = 'basic'
    storeFileName = 'basic'
    def __init__(self, url, fileName):
        self.originUrl = url
        self.storeFileName = fileName

def textAnalyze(url, content):
    texts = content.split('.')
    texts = [normalize(text, english=True, number=True) for text in texts]

    wordrank_extractor = KRWordRank(
    min_count = 1, # 단어의 최소 출현 빈도수 (그래프 생성 시)
    max_length = 10, # 단어의 최대 길이
    verbose = True
    )

    beta = 0.85    # PageRank의 decaying factor beta
    max_iter = 10

    keywords, rank, graph = wordrank_extractor.extract(texts, beta, max_iter)

    noun_string = ""

    key={}
    id=1
    for word, r in sorted(keywords.items(), key=lambda x:x[1], reverse=True)[:30]:
        noun_string += word + " "
        if id<4:
            key[id]=word
            id+=1

    noun_string = noun_string.strip()
    wc = generateWordCloud(url, noun_string)

    return wc

def generateWordCloud(url, noun_string):
    if platform.system() == 'Darwin': #맥
        wordcloud=WordCloud(font_path="AppleGothic",width=800,height=800,background_color='white',max_font_size=2000)
    elif platform.system() == 'Windows': #윈도우
        wordcloud=WordCloud(font_path="C:\WINDOWS\Fonts\malgun.ttf",width=800,height=800,background_color='white',max_font_size=2000)
    elif platform.system() == 'Linux': #리눅스 (구글 콜랩)
        wordcloud=WordCloud(font_path="Malgun Gothic",width=800,height=800,background_color='white',max_font_size=2000)

    wordcloud.generate(noun_string)

    background_color="white"      #배경색
    margin=10                     #모서리 여백 넓이
    min_font_size=10              #최소 글자 크기
    max_font_size=150             #최대 글자 크기
    width=500                     #이미지 가로 크기
    height=500                    #이미지 세로 크기
    wc = WordCloud(background_color=background_color, \
                margin=margin, min_font_size=min_font_size, \
                max_font_size=max_font_size, width=width, height=height)
    wc = wc.generate(noun_string)

    wc_name = uuid.uuid1()
    wc_name = str(wc_name) + '.png'

    wordcloud.to_file('/Users/'+ getpass.getuser() + '/'+ wc_name)

    return SaveFile(url, wc_name)

    # wc2 = wc.generate_from_frequencies(noun_string)

    # 생성된 워드클라우드를 이미지로 생성합니다.
    # fig = plt.figure(figsize=(15, 15))
    # plt.imshow(wc, interpolation="bilinear")
    # plt.axis("off")

    
    # # plt.show()

    # wordcloud.to_file('wordcloud_news.png')

def image_to_byte_array(image: Image) -> bytes:
  # BytesIO is a fake file stored in memory
  imgByteArr = io.BytesIO()
  # image.save expects a file as a argument, passing a bytes io ins
  image.save(imgByteArr, format=image.format)
  # Turn the BytesIO object back into a bytes object
  imgByteArr = imgByteArr.getvalue()
  return imgByteArr