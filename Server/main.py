import flask
import json
from flask import Flask, request
from flask_cors import CORS


app = flask.Flask("__main__")
CORS(app)

# Golabal Variables
board = [['x' for x in range(6)] for y in range(7)]
nextp = ['Y']
playerID = [1]

@app.route("/name", methods=['GET', 'POST'])
def get_player():

    value = playerID[0]

    playerID[0] = playerID[0] + 1

    return json.dumps({"player": value})
 

@app.route("/", methods=['GET', 'POST'])
def get_board():

    if request.method == 'GET':
        return json.dumps({"board": board}) 

    if request.method == 'POST':
        req_data = request.get_json()
        col = req_data['col']
        reset = req_data['reset']
        player = req_data['player']

    if reset == 1:
        nextp[0] = 'Y'
        for i in range(7):
            for j in range(6):                
                board[i][j] = 'x'
        return json.dumps({"board": board})            

    if nextp[0] != 'win':

        if (nextp[0] == 'Y' and player == 1) or (nextp[0] == 'R' and player == 2):

            for j in range(7):
                i = int(col)
                if board[i][j] == 'x':
                    board[i][j] = nextp[0]

                    for i in range(4):
                        for j in range(6):
                            if board[i][j] != 'x':
                                if board[i][j] == board[i+1][j] == board[i+2][j] == board[i+3][j]:
                                    
                                    if board[i][j] == 'Y':
                                        winner = 'WY'
                                    else:
                                        winner = 'WR'

                                    board[i][j] = winner
                                    board[i+1][j] = winner
                                    board[i+2][j] = winner
                                    board[i+3][j] = winner
                                    nextp[0] = 'win'

                    for i in range(4):
                        for j in range(6):
                            if board[i][j] != 'x':
                                if board[i][j] == board[i+1][j+1] == board[i+2][j+2] == board[i+3][j+3]:
                                    
                                    if board[i][j] == 'Y':
                                        winner = 'WY'
                                    else:
                                        winner = 'WR'
                                    
                                    board[i][j] = winner
                                    board[i+1][j+1] = winner
                                    board[i+2][j+2] = winner
                                    board[i+3][j+3] = winner
                                    nextp[0] = 'win'

                    for i in range(4):
                        for j in range(5,0,-1):
                            if board[i][j] != 'x':
                                if board[i][j] == board[i+1][j-1] == board[i+2][j-2] == board[i+3][j-3]:
                                    
                                    if board[i][j] == 'Y':
                                        winner = 'WY'
                                    else:
                                        winner = 'WR'                                    
                                                                        
                                    board[i][j] = winner
                                    board[i+1][j-1] = winner
                                    board[i+2][j-2] = winner
                                    board[i+3][j-3] = winner
                                    nextp[0] = 'win'

                    for i in range(7):
                        for j in range(3):
                            if board[i][j] != 'x':
                                if board[i][j] == board[i][j+1] == board[i][j+2] == board[i][j+3]:
                                    
                                    if board[i][j] == 'Y':
                                        winner = 'WY'
                                    else:
                                        winner = 'WR'                                    
                                                                        
                                    board[i][j] = winner
                                    board[i][j+1] = winner
                                    board[i][j+2] = winner
                                    board[i][j+3] = winner
                                    nextp[0] = 'win'


                    if nextp[0] == 'Y':
                        nextp[0] = 'R'
                    elif nextp[0] == 'R':
                        nextp[0] = 'Y'
                    break

    return json.dumps({"board": board})


app.run(debug=True)
