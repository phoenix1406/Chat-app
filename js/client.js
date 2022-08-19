const socket = io('http://localhost:8000');
const form = document.getElementById('send-container');
const messageport = document.getElementById('messageinp');
const messagecontainer = document.querySelector('.container');
const audio = new Audio('../../sounds/cash.mp3');


const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add(position);
    messageElement.classList.add('classnew');
    messageElement.classList.add('message');
    messagecontainer.append(messageElement);
    if (position == 'left') {
        audio.play();
    }
}
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageport.value;
    append(`You :${message}`, 'right');
    socket.emit('send', message);
    messageport.value = '';

})


const Name = prompt('Enter your name');
socket.emit('new-user-joined', Name);


    socket.on('user-joined:', name => {
      if(name!=null){
        append(`${name} joined the chat`, 'center');
      }
    }
    )


socket.on('receive', data => {

    append(`${data.name}:${data.message}`, 'left');
})
socket.on('user-disconnected', name => {
    if (name != null) {
        append(`${name} left the chat`, 'center')
    }
}
)