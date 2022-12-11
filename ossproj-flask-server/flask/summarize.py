from bs4 import BeautifulSoup
from wordcloud import WordCloud, ImageColorGenerator

from gensim.summarization.summarizer import summarize
import requests


def summarizing(url):
    headers = {'User-Agent':'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36'}

    webpage = requests.get(f'{url}', headers=headers)
    soup = BeautifulSoup(webpage.content,"html.parser")
    
    title=soup.title.string
    content = soup.find('div', attrs={'id':'dic_area'})
    content=content.get_text().replace("\n","").replace("// flash 오류를 우회하기 위한 함수 추가function _flash_removeCallback() {}","").replace("\t","").replace(".",". ")
    # content=content.get_text().replace("\n","").replace("\t","").replace(".",". ")

    z=summarize(content)
    return z