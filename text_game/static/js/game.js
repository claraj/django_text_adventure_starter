let questionElement = document.querySelector('#question')
let button1 = document.querySelector('#choice-1')
let button2 = document.querySelector('#choice-2')
let message = document.querySelector('#message')


button1.addEventListener('click', selectChoice)
button2.addEventListener('click', selectChoice)

// On page load, make request to server for inital data 
loadGame()


function loadGame() {

    fetch(loadGameUrl)
        .then( response => 
             response.json() )
        .then( data => {
            loadQuestion(data)
        })
        .catch( err => console.error(err) )
}


function userAction(data) {

    // https://docs.djangoproject.com/en/3.0/ref/csrf/#setting-the-token-on-the-ajax-request

    let token = Cookies.get('csrftoken')   
 
    console.log(data)
    fetch(actionURL, 
        {   
            method: 'POST', 
            body: JSON.stringify(data),
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                 'X-CSRFToken': token
            }
        })
        .then( response => response.json() )
        .then ( data => {
            loadQuestion(data)
        })
        .catch( err => console.error(err) )
    }


function selectChoice(event) {
    let button = event.srcElement
    let next_text = button.dataset.next_text 
    console.log(button, button.dataset)
    let data = { next_text: next_text } 
    userAction(data)
}


function loadQuestion(data) {

    console.log('loading this data from server: ', data)
    
    message.innerHTML = data.message || ''   // show data if present, empty string if not 

    questionElement.innerHTML = data.text || ''

    if (data.choices && data.choices.length > 0) {
        // Set the text of both buttons, and use html data attributes to store data within each button element
        // https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
        button1.innerHTML = data.choices[0].text
        button1.dataset.next_text = data.choices[0].next_text   // Save next_text value as an attribute on the button element
        button2.innerHTML = data.choices[1].text 
        button2.dataset.next_text = data.choices[1].next_text   // same - the event handler will read the next_text and send that to the server 
    } 

    else {
        // Disable both buttons. TODO replace with whatever other end-of-game behavior you want. 
        button1.innerHTML = 'Not a choice'
        button1.disabled = true 
        button2.innerHTML = 'Also not a choice'
        button2.disabled = true
    }
}