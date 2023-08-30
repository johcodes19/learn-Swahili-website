document.getElementById("contactForm").onsubmit= function(e){
    e.preventDefault();
    sendMessage()
}

function sendMessage(){
    const Name=document.getElementById("name").value
    const email=document.getElementById("email").value
    const message=document.getElementById("message").value
    //here you can implement the code to send the message and handle the response
    displayNotification("✅✅Message sent successfully")
}
function displayNotification(message) {
    document.getElementById("notification").innerHTML=message
}