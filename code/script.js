// Variables that point to selected DOM elements
const chat = document.getElementById('chat');
const inputWrapper = document.getElementById('input-wrapper');
const form = document.getElementById("name-form");
const nameInput = document.getElementById("name-input")

// If you need any global variables that you can use across different functions, declare them here:


// Declare your functions after this comment

// This function will add a chat bubble in the correct place based on who the sender is
const showMessage = (message, sender) => {
  // the if statement checks if the sender is 'user' and if that's the case it inserts an html senction inside the chat with the posted message
  if (sender === 'user') {
    
    chat.innerHTML += `
      <section class="user-msg">
        <div class="bubble user-bubble">
          <p>${message}</p>
        </div>
        <img src="assets/user.png" alt="User" />  
      </section>
    `
    // the else if statement checks if the sender is a bot and if that's the case it inserts an html senction inside the chat with the posted message
  } else if (sender === 'bot') {
    
    chat.innerHTML += `
      <section class="bot-msg">
        <img src="assets/bot.png" alt="Bot" />
        <div class="bubble bot-bubble">
          <p>${message}</p>
        </div>
      </section>
    `
  }
  // This little thing makes the chat scroll to the last message when there are too many to be shown in the chat box
  chat.scrollTop = chat.scrollHeight;
}

// Starts here
// Bot: Hi! What's your name?

const greeting = () => {
  // here we call the function showMessage, that we declared earlier with the argument "Hello there, What's your name?" for message, and the argument "bot" for sender
  showMessage("Hi Friend, What's your name?", 'bot');
}

// User: Replies with name

const handleNameInput = (event) => {
  event.preventDefault()
  
  // Store the value in a variable so we can access it after we 
	// clear it from the input
  const name = nameInput.value
  showMessage(name, 'user')
  showMessage(`So ${nameInput.value}, I understand that your’re done watching a TV show and are looking for something new to watch?`, 'bot') // Bot: Are you looking for something new to watch?
  nameInput.value = ''
  inputWrapper.innerHTML = // add Yes/No button
    `<button id="yesBtn" type="submit">Yes</button>
    <button id="noBtn" type="submit">No</button>`

    document
    .getElementById('yesBtn')
    .addEventListener('click', () => {
      showMessage('Yes', 'user');
      showMessage('What kind of TV show would you like to see?', 'bot');
      askForGenre() //call next function with a parameter for yes
   
    })
// Bot: (If No) Okay! Then I will not be of any help.
    document
    .getElementById('noBtn')
    .addEventListener('click', () => {
      showMessage('No', 'user')
      showMessage('Okay! Have a good day!', 'bot')
      
    yesBtn.remove();
    noBtn.remove(); //call next function with a parameter for no
    }) 

// Genre list
/*
    inputWrapper.innerHTML = `
       <select id="select">
        <option value="" selected disabled>Choose a genre...</option>
        <option value="drama">Drama</option>
        <option value="thriller">Thriller</option>
        <option value="comedy">Comedy</option>
      </select>
      `
*/
      
const askForGenre = () => {      
  inputWrapper.innerHTML = // add genre buttons
   `<button id="drama" type="submit">Drama</button>
    <button id="thriller" type="submit">Thriller</button>
    <button id="comedy" type="submit">Comedy</button>`
    document
      .getElementById('drama')
      .addEventListener('click', () => {
        showMessage('Drama', 'user')
        showMessage(`Okay, then I would suggest this: <a href="https://www.imdb.com/title/tt4786824/">The Crown</a>`, 'bot');
        setTimeout(() => showMessage('Are you happy with my suggestion?', 'bot'), 2000);
        askForLastUserAnswer() //call next function with a parameter for no
      
      })
    document
      .getElementById('thriller')
      .addEventListener('click', () => {
        showMessage('Thriller', 'user')
        showMessage(`Okay, then I would suggest this: <a href="https://www.imdb.com/title/tt10574558/">Midnight Mass</a>`, 'bot')
        setTimeout(() => showMessage('Are you happy with my suggestion?', 'bot'), 2000);
        askForLastUserAnswer()
      
      })

      document
      .getElementById('comedy')
      .addEventListener('click', () => {
        showMessage('Comedy', 'user')
        showMessage(`Okay, then I would suggest this: <a href="https://www.imdb.com/title/tt10062292/?ref_=fn_al_tt_1">Never Have I Ever</a>`, 'bot')
        setTimeout(() => showMessage('Are you happy with my suggestion?', 'bot'), 2000)
        askForLastUserAnswer()
        
      })

     
    }
// We need to setTimeout for the YES/NO buttons so they show after some time - optional
    const askForLastUserAnswer = () => {
    inputWrapper.innerHTML = // add Yes/No button after short time
    `<button id="yesBtn" type="submit">Yes</button>
    <button id="noBtn" type="submit">No</button>`

    
    document
    .getElementById('yesBtn')
    .addEventListener('click', () => {
      showMessage('Yes', 'user');
      showMessage('Great! I hope you enjoy it! Have a great day/evening!', 'bot');
    yesBtn.remove();
    noBtn.remove();
   
    })

    document
    .getElementById('noBtn')
    .addEventListener('click', () => {
      showMessage('No', 'user')
      showMessage(`Oh no! I’m so sorry to hear that! Maybe you can check out this list of the best shows on Netflix right now: <a href="https://www.digitaltrends.com/movies/best-shows-on-netflix/">List</a>`, 'bot')
    yesBtn.remove();
    noBtn.remove();
    }) 
      
    }
  
}


// Set up your eventlisteners here

form.addEventListener('submit', handleNameInput);

// When website loaded, chatbot asks first question.
// normally we would invoke a function like this:
// greeting()
// But if we want to add a little delay to it, we can wrap it in a setTimeout:
// setTimeout(functionName, timeToWaitInMilliSeconds)
// This means the greeting function will be called one second after the website is loaded.
setTimeout(greeting, 1000);

