const socket=io('http://localhost:8000')
//Get DOM elements in respective JS variables
const form=document.getElementById('send-container')
const messageInput=document.getElementById('messageInp')
const messageContainer=document.querySelector(".container");
// function which will append to the container
const append=(message,position)=>
{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

// ask new user for name
const n=prompt("Enter your name to join");
socket.emit('new-user-joined',n)
// if  new user join,receive name from the server 
socket.on('user-joined',n=>
{
append(`${n} joined the chat`,'right')
})
// if server sends a msg,receive it
socket.on('receive',data=>
{
append(`${data.name}: ${data.message}`,'left')
})
// if the user leaves the chat,append the info to the container
socket.on('left',n=>
{
    append(`${n} left the chat`,'left')
});
// if the msg is submitted sent to the server
form.addEventListener('submit',(e)=>
{
    e.preventDefault();
    const message=messageInput.value;
    append(`You: ${message}`,'right')
    socket.emit('send',message);
    messageInput.value=''

})