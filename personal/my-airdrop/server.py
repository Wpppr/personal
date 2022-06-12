from flask import Flask, render_template, request, send_from_directory, url_for, redirect
from werkzeug.utils import secure_filename
import json
import os
from time import time, ctime

os.system('mkdir static\\upload')
app = Flask(__name__)


@app.route('/')
def mainpage():
    return redirect('airdrop')


@app.route('/airdrop',methods=['get','post'])
def airdrop():
    # 列出文件夹的内容
    if request.method == 'GET':
        dictlist = []
        names = os.listdir(os.path.join(app.root_path,'static\\upload'))
        for name in names:
            dictlist.append({'file':'upload/'+name, 'type':(name.split('.')[-1]).lower(),'download_name':name.split('__')[-1]})
        return render_template('airdrop.html', dictlist=dictlist)  #模板
    else:
        # 表单
        t = ctime(time()).split(' ')
        num = request.form.get('num')
        for i in range(int(num)):
            # 获取文件
            file = request.files['file'+str(i)]
            fname = file.filename
            print(fname+'have been upload')
            savepath = os.path.join(app.root_path,'static\\upload\\'+fname)
            file.save(savepath)
        return 'ok' 

@app.route('/airdrop/background.png')
def bg():
    return send_from_directory('static/img','background.png',mimetype='image/png')

@app.route('/airdrop/upload.png')
def upload():
    return send_from_directory('static/img','upload.png',mimetype='image/png')

@app.route('/airdrop/haveBeenDownload', methods=['post'])
def hbd():
    name = request.form.get('name')
    # os.system('del static\\upload\\\"'+name+'\"')
    os.system('del \"'+app.root_path+'\\static\\upload\\'+name+'\"')
    print(name+'have been del')
    return 'ok'

# app.run('::', 6000, debug=True)
app.run('0.0.0.0', 4000, debug=True)
app.add_url_rule('/favicon.ico',redirect_to=url_for('static',filename='img/favicon.ico'))



