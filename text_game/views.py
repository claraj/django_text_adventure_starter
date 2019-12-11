import json

from django.shortcuts import render
from django.http import JsonResponse, HttpResponseNotAllowed


def home(request):
    return render(request, 'text_game/home.html')


def load_game(request):

    # TODO get this data from some type of data store. Maybe a JSON file? 
    # Do any initial setup for the game here. If you want to save game state for 
    # a user, create a GameState object for that user. You can update it in the 
    # user_action 

    initial_data = {
        "text": "Welcome to the exciting choose your adventure game. Do you want to play?", 
        "choices": [
            {
                'text': 'Yes please',
                'next_text': 1
            },
            {
                'text': 'No thanks',
                'next_text': -1
            }
        ]
    }

    return JsonResponse(initial_data)



def user_action(request):
  
    if request.method == 'POST':

        # TODO update user's game progress, as stored in the database 

        request_data = json.loads(request.body)
        next_text = request_data.get('next_text')

        print(request_data,next_text)

        if next_text == '-1':
            return JsonResponse( {"message": "The end. Please come again soon."} )
        
        elif next_text == '1':

            # TODO have many other next_text values. These would be read from some kind of data store.
            # JSON file(s) would work 
            # Figure out the correct one to return and send that.
            
            next_text = {
                "text": "You have found youself stuck in a computer program. Do you...", 
                "choices": [
                    {
                        'text': 'Start the debugger',
                        'next_text': 2
                    },
                    {
                        'text': 'Throw an exception',
                        'next_text': 3
                    }
                ]
            }
            return JsonResponse(next_text)
        
        else:
            return JsonResponse( {"message": "Sorry, the game is not yet finished." } )




        
    else:
        return HttpResponseNotAllowed()   # No get requests, only POST, since these requests may affect the state of the data stored on the server. 