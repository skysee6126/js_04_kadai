// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  databaseURL: "",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var storage = firebase.storage();
// Create a storage reference from our storage service
var storageRef = storage.ref();


const msgScreen = document.getElementById("messages"); //the <ul> that displays all the <li> msgs
const msgForm = document.getElementById("messageForm"); //the input form
const msgInput = document.getElementById("msg-input"); //the input element to write messages
const msgBtn = document.getElementById("msg-btn"); //the Send button

const db = firebase.database();
const msgRef = db.ref("/msgs"); 
//to store data in the msgs folder by creating a reference in database


let userName="";
function init() {
  userName = prompt("Please enter your name");
  const greeting = document.querySelector(".name");
  greeting.innerHTML = `Hello! ${userName}`;
  msgRef.on('child_added', updateMsgs);
}
document.addEventListener('DOMContentLoaded', init);

msgForm.addEventListener('submit', sendMessage);

function sendMessage(e){
  e.preventDefault();
  const text = msgInput.value;

    if(!text.trim()) return alert('Please type a message'); //no msg submitted
    const msg = {
        name: userName,
        text: text
    };

    msgRef.push(msg);
    msgInput.value = "";
}



const updateMsgs = data =>{
  const {dataName, text} = data.val(); //get name and text

  //load messages, display on left if not the user's name. Display on right if it is the user.
  const msg = `<li class="${dataName == userName ? "msg my": "msg"}"><span class = "msg-span">
    <i class = "name">${userName}: </i>${text}
    </span>
  </li>`

  msgScreen.innerHTML += msg; //add the <li> message to the chat window

  //auto scroll to bottom
  document.getElementById("chat-window").scrollTop = document.getElementById("chat-window").scrollHeight;
}


// upload images

// Create a root reference
var storageRef = firebase.storage().ref();


document.getElementById('up').addEventListener('click', function(){
  var files = document.getElementById('file').files;
  var image = files[0];

  var ref = firebase.storage().ref().child(image.name);
  ref.put(image).then(function(snapshot) {
    alert('アップロードしました');
    console.log(image);
    // const img = `<img src= "${image.name}"> `;
    // ref.put(img);
  });
});


storageRef.child('${image.name}').getDownloadURL().then(function(url) {
  var img = document.getElementById('messages');
  img.src = url;
  console.log(url);
}).catch(function(error) {
  // Handle any errors
});


// //showing image
// document.addEventListener('DOMContentLoaded', function() {
//   try {
//     var app = firebase.app();
//     Get a reference to the storage service, which is used to create references in your storage bucket
//     var imagesRef = storageRef.child(image.name);
//     document.getElementById('messages').innerHTML = `<img src= "${image.name}"> `;
//     document.getElementById('messages').innerHTML = 'File: ' + imagesRef.name;
//   } catch (e) {
//     console.error(e);
//     document.getElementById('load').innerHTML = 'Error loading the Firebase SDK, check the console.';
//   }
// });
