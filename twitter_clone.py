#!/usr/bin/python3
from flask import Flask, render_template, request, jsonify
from flask.ext.api import status
import pymysql
import json

app = Flask(__name__)

@app.route('/', strict_slashes=False)
def serve_app():
    tweets = fetch_tweets()
    return render_template('index.html',
                           tweets=tweets)

@app.route('/save/', methods=["POST"], strict_slashes=False)
def save():
    response = request.data.decode('utf-8')
    obj = json.loads(response)
    name = obj['name']
    user_id = obj['user_id']
    tweet = obj['tweet']
    con = pymysql.connect("localhost", "twitter_admin", "twitter_admin_pwd", "twitter_clone")
    cursor = con.cursor();
    cursor.execute("INSERT INTO tweets (name, user_id, tweet) values(%s, %s, %s)", (name, user_id, tweet))
    con.commit()
    con.close()
    return jsonify(response).status

def fetch_tweets():
    """ retrieve records from tweets table  """
    con = pymysql.connect(host='localhost',
                          user='root',
                          password='Hyrenkosa1',
                          db='twitter_clone',
                          charset='utf8mb4',
                          cursorclass=pymysql.cursors.DictCursor)

    cursor = con.cursor()
    cursor.execute('SELECT * FROM tweets ORDER BY id DESC')
    result = cursor.fetchall()
    return result

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001)
