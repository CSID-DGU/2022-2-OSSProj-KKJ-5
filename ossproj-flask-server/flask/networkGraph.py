#%%
import numpy as np
import pandas as pd
import platform 
import os, getpass
import re
import networkx as nx
import matplotlib.pyplot as plt
from networkx.drawing.nx_agraph import to_agraph 
from matplotlib import cm 
import matplotlib as mpl
mpl.use('SVG')
import matplotlib.font_manager as fm
import operator
from bs4 import BeautifulSoup
import requests
from krwordrank.word import KRWordRank
from krwordrank.hangle import normalize
from konlpy.tag import Okt
import uuid
from collections import Counter

def anaylze(url):
    headers = {'User-Agent':'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36'}
   
    webpage = requests.get(f"{url}",headers=headers)
    soup = BeautifulSoup(webpage.content,"html.parser")
   
    title=soup.title.string
    content=soup.find('div',attrs={'id':'dic_area'})
    content=content.get_text().replace("\n","").replace("// flash 오류를 우회하기 위한 함수 추가function _flash_removeCallback() {}","").replace("\t","").replace(".",". ")
   
    texts = content.split('.')
    texts = [normalize(text, english=True, number=True) for text in texts] 

    dataset = []
    for i in range(len(texts)) :
        okt_pos = Okt().pos(texts[i], norm =True, stem = True)
        dataset.append([x for x, y in okt_pos if y in ['Noun']])
        i = i+1


    count = {}   #동시출현 빈도가 저장될 dict
    for line in dataset:
        #하나의 문서에서 동일한 단어가 두번 나와도 두번의 동시출현으로 고려X
        words = list(set(line))   
        #한줄씩 읽어와서 단어별로 분리(unique한 값으로 받아오기)
        #split은 띄어쓰기를 단어로 구분하라는 함수 
        
        for i, a in enumerate(words):
            for b in words[i+1:]:
                if a>b: 
                    count[b, a] = count.get((b, a),0) + 1  
                else :
                    count[a, b] = count.get((a, b),0) + 1

    count.get(("a", "b"),0) #a, b라는 key가 없을 때는 디폴트를 0으로 해라 

    df=pd.DataFrame.from_dict(count, orient='index')


    list1=[]
    for i in range(len(df)):
        #index를 중심으로 계속 중첩해서 list에 넣는다 
        list1.append([df.index[i][0], df.index[i][1],df[0][i]])

    df2=pd.DataFrame(list1, columns=["term1","term2","freq"])

    df3=df2.sort_values(by=['freq'],ascending=False)
    df3 = df3.reset_index(drop=True)

    
    G=nx.Graph()
    
    for i in range(len((np.where(df3['freq']>=4))[0])):
        G.add_edge(df3['term1'][i], df3['term2'][i],weight = int(df3['freq'][i]))

    dgr = nx.degree_centrality(G)
    btw = nx.betweenness_centrality(G)
    cls = nx.closeness_centrality(G)
    pgr = nx.pagerank(G)                 # 페이지 랭크


    sorted_dgr = sorted(dgr.items(), key=operator.itemgetter(1),reverse=True)
    sorted_btw = sorted(btw.items(), key=operator.itemgetter(1),reverse=True)
    sorted_cls = sorted(cls.items(), key=operator.itemgetter(1), reverse=True)
    sorted_pgr = sorted(pgr.items(), key=operator.itemgetter(1), reverse=True)

    d = dict(G.degree)

    low, *_, high = sorted(d.values())
    norm = mpl.colors.Normalize(vmin=low, vmax=high, clip=True)
    mapper = mpl.cm.ScalarMappable(norm=norm, cmap=mpl.cm.Spectral)

    weights = nx.get_edge_attributes(G,'weight').values()
    weights = [(x*0.7)for x in weights]

    low, *_, high = sorted(weights)
    norm2 = mpl.colors.Normalize(vmin=low, vmax=high, clip=True)
    mapper2 = mpl.cm.ScalarMappable(norm=norm, cmap=mpl.cm.binary)

    options = {
     'with_labels': True,
     'font_weight': 'regular',
    }


    pr = nx.pagerank(G)

    nsize = np.array([v for v in d.values()])
    nsize = 5000 * (nsize - min(nsize)) / (max(nsize) - min(nsize))

    networkGraphPath = str(uuid.uuid1()) + '.png'
    
    nx.draw(G, node_size=nsize, pos=nx.spring_layout(G, k=3.5, iterations=100), **options, font_family='AppleGothic',
               font_size =20, node_color=[mapper.to_rgba(i) for i in d.values()]
           ,width = weights, edge_color= weights)
    flg = plt.savefig('/Users/'+ getpass.getuser() + '/' +networkGraphPath)
    plt.clf()
    plt.close(flg)
    G.clear()
    
    return networkGraphPath
# %%
