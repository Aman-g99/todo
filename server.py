from flask import Flask, request, Response, send_file
from flask import jsonify
from flask_cors import CORS
import json
# from flaskext.mysql import MySQL
# import MySQLdb
import mysql.connector

db = mysql.connector.connect(host="localhost",    # your host, usually localhost
                     user="root",         # your username
                     passwd="",  # your password
                     db="new_schema")


# Initialize the Flask application
app = Flask(__name__)
CORS(app=app)


current_user_id = 10020
#Account Registration
@app.route('/app/agent', methods=['POST'])
def auth():
    r = request.json
    global current_user_id

    # print(r["username"])
    # print(r["password"])
    # return jsonify({"userid":12334})

    cur = db.cursor()

    current_user_id = current_user_id +1
    sql = "INSERT INTO users (username, passwordd, usersid) VALUES (%s, %s, %s)"
    val = (r["agent_id"],r["password"],current_user_id)
    cur.execute(sql, val)
    db.commit()
    cur.execute("CREATE TABLE %s (website VARCHAR(255),username VARCHAR(255), password VARCHAR(255))",str(current_user_id))
    return jsonify({'status': 'account created','status_code': '200'})


#login
@app.route('/app/agent/auth', methods=['POST'])
def login():
    r = request.json
    cur = db.cursor()
    cur.execute("SELECT passwordd,usersid FROM users where username=\"%s\" ",r["agent_id"])
    myresult = cur.fetchall()
    if(myresult[0]==r["password"]):
        return jsonify({'status': "success",'userid': myresult[1]})



# #username and password list
@app.route('/app/sites/list/?agent={agent_id}', methods=['GET'])
def listdetails(agent_id):
    r = request.json
    data = """{[]}"""
    cur.execute("SELECT * FROM %s",str(agent_id))
    myresult = cur.fetchall()
    j = json.loads(data)
    for x in myresult:
        y = {"website": x[0]}
        y = {"username": x[1]}
        y = {"password": x[2]}
        data.append(y)
    return y
        

# #save new todo
@app.route('/app/sites?agent={agent_id}', methods=['POST'])
def savenew(agent_id):
    r = request.json
    sql = "INSERT INTO %s (title, description, category,due_date) VALUES (%s, %s, %s)"
    val = (agent_id,r["username"],r["password"],current_user_id)
    cur.execute(sql, val)
    db.commit()

    return jsonify({'status': "success","status_code":200})





app.run(port=5000,host="0.0.0.0")

