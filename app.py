from datetime import datetime

from flask import Flask
from flask import Response
from flask import request
from flask import render_template
import pymysql
import json
import datetime

app = Flask(__name__)

conn = pymysql.connect("127.0.0.1", "root", "123456", "board")
cursor = conn.cursor()


@app.route('/')
def hello_world():
    cursor.execute("SELECT username,content,time FROM message")
    _list = cursor.fetchall()
    return render_template("register.html", message=_list)


@app.route('/update', methods=['POST'])
def ajax_text():
    username = request.form.get('username')
    content = request.form.get("content")
    nowTime = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    dir = {"username": username, "content": content, "time": nowTime}
    cursor.execute("INSERT INTO message (username,content,time) VALUES(%s,%s,%s)", (username, content, nowTime))
    conn.commit()
    return Response(json.dumps(dir), content_type='application/json')


# 这里不应该叫这个名字
@app.route('/ajax_register', methods=['Get', 'POST'])
def ajax_register():
    username = request.form.get('username')
    password = request.form.get("password")
    email = '123@qq.com',
    flag = True,
    cursor.execute("SELECT username FROM users ")
    list = cursor.fetchall()
    for i in list:
        if username == i:
            flag = False
    if flag:
        cursor.execute("INSERT INTO users (username,password,email) VALUES(%s,%s,%s)", (username, password, email))
        conn.commit()
    dir = {"username": username, "password": password, "email": email, "res": flag}
    return Response(json.dumps(dir), content_type='application/json')


@app.route('/login', methods=['POST'])
def login():
    username = request.form.get('username')
    password = request.form.get("password")
    email = None,
    flag = False,
    cursor.execute("SELECT username,password FROM users ")
    list = cursor.fetchall()
    for i in list:
        if i[0] == username and i[1] == password:
            flag = True
    dir = {"username": username, "flag": flag}
    return Response(json.dumps(dir), content_type='application/json')


@app.route('/login_submit', methods=['POST'])
def ajax_main():
    username = request.form.get('username')
    password = request.form.get("password")
    email = None,
    flag = False,
    cursor.execute("SELECT username,password FROM users ")
    list = cursor.fetchall()
    cursor.execute("SELECT username,content,time FROM message")
    _list = cursor.fetchall()
    for i in list:
        if i[0] == username and i[1] == password:
            flag = True
            return render_template("index.html", message=_list,username=username)
    return render_template("register.html", message=_list)


@app.route('/ajax_login_success', methods=['POST'])
def ajax_login_success():
    cursor.execute("SELECT username,content,time FROM message")
    _list = cursor.fetchall()
    dir = {"flag": "flag"}
    return Response(json.dumps(dir), content_type='application/json')


if __name__ == '__main__':
    app.run()
