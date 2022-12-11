from flask import Flask, request, jsonify
from urllib import parse
import summarize, os
import analyzingImage
import networkGraph, category
import base64
import uuid
import getpass

app = Flask(__name__)

@app.route('/url', methods=['GET', 'POST'])
def urlConvey():

    print('InComming!')

    args = request.json
    url = args['url']

    
    content = summarize.summarizing(url)
    networkGraphPath = networkGraph.anaylze(url)
    wc = analyzingImage.textAnalyze(url, content)

    wordCloudPath = wc.storeFileName
    networkGraphPath = networkGraphPath
    categoryNumber = category.getCategory(url)

    print(f'---->{categoryNumber}')

    print(wordCloudPath)
    print(networkGraphPath)

    response = {
        "url" : url,
        "content" : content,
        "wordCloudPath" : wordCloudPath,
        "networkGraphPath" : networkGraphPath,
        "categoryNumber": categoryNumber
    }
    

    return response


if __name__ == '__main__':
    app.run('0.0.0.0', port=5050, debug=True, use_reloader=False)