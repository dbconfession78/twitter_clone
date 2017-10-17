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
    con = pymysql.connect("localhost", "twitter_admin", "twitter_admin_pwd", "twitter_clone")
    cursor = con.cursor();
    cursor.execute("INSERT INTO tweets (name, user_id, tweet) values(%s, %s, %s)", (obj['name'], obj['user_id'], obj['tweet']))
    con.commit()
    con.close()
    return jsonify(response).status

def fetch_tweets():
    """ retrieve records from tweets table  """
    con = pymysql.connect(host='localhost',
                          user='twitter_admin',
                          password='twitter_admin_pwd',
                          db='twitter_clone',
                          charset='utf8mb4',
                          cursorclass=pymysql.cursors.DictCursor)

    cursor = con.cursor()
    cursor.execute('SELECT * FROM tweets ORDER BY id DESC')
    result = cursor.fetchall()
    return result


# added after 2 hr cut off
@app.route('/load/', strict_slashes=False)
def load():
    """ return all tweets from the tweets table  """
    tweets = fetch_tweets();
    return jsonify(tweets);

@app.route('/delete_all/', strict_slashes=False)
def delete_all ():
    """ removes all tweets from the  tweets table """
    con = pymysql.connect(host='localhost',
                          user='twitter_admin',
                          password='twitter_admin_pwd',
                          db='twitter_clone',
                          charset='utf8mb4',
                          cursorclass=pymysql.cursors.DictCursor)

    cursor = con.cursor()
    cursor.execute('TRUNCATE TABLE tweets')
    result = cursor.fetchall()
    return " "

    

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001)
