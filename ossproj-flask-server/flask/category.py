import numpy as np
import pandas as pd
import re
import networkx as nx
import matplotlib.pyplot as plt
from networkx.drawing.nx_agraph import to_agraph 
from matplotlib import cm 
import matplotlib as mpl
import matplotlib.font_manager as fm
import operator
from bs4 import BeautifulSoup
import requests
     

def getCategory(url):
    Category = {'정치' : '1', '경제' : '2', '사회' : '3', '생활/문화' : '4', '세계' : '5', 'IT/과학' : '6'}
     
    headers = {'User-Agent':'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36'}
    webpage = requests.get(f"{url}",headers=headers)
    soup = BeautifulSoup(webpage.content,"html.parser")
    category = soup.find('li', attrs = {'class':'Nlist_item _LNB_ITEM is_active'})
    category=category.get_text().replace("\n","").replace("// flash 오류를 우회하기 위한 함수 추가function _flash_removeCallback() {}","").replace("\t","").replace(".",". ")
     
    return Category.get(category)