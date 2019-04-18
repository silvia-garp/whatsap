this.state={
    id_org:'',
    id_dest:'',
    contactos:[],
    mensajes:[],
    teclado: '',
    pantalla: document.getElementById('pantalla'),
    divTermi: document.getElementById('terminal'),
    divConta: document.getElementById('contactos'),
    divFotos: document.getElementById('fotos'),
    video: document.querySelector('video'),
    emision: ''
};

periodical = setInterval(recibe,6000);

function handleInput(e){
    contactos(e)
}

function handleClick(e){
}

function handleTeclado(e){
}

function handleEnvia(){
}

function handleFotos(){
}

function capturePhoto() {
    var canvas = document.createElement('canvas');
    document.querySelector('html').appendChild(canvas);
    canvas.width = this.state.video.getAttribute("width");
    canvas.height = this.state.video.getAttribute("height");
    canvas.getContext('2d').drawImage(this.state.video, 0, 0, canvas.width, canvas.height);
    var picture = canvas.toDataURL("image/png");
    document.querySelector('html').removeChild(canvas);
    cancelPhoto();
    var texto="<p align=right>"+this.state.teclado+"</p>";
    this.state.pantalla.innerHTML= '<p align=right><img width=80 src="'+picture+'"/></p>'+ this.state.pantalla.innerHTML;
    envia(picture,"image");
}

function cancelPhoto(){
    this.state.emision.getTracks()[0].stop();
}

function exito(stream) {
    this.state.video.autoplay=true;
    this.state.video.srcObject = stream;
    this.state.emision=stream;
}

function error(e) {
}

function handleVoz(){
    var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
    recognition.lang = 'es-ES';
    recognition.start();
    var data_uri;
    var pantalla=this.state.pantalla;
    var divFotos=this.state.divFotos;
    pantalla.innerHTML= "<p align=right>Escuchando....</p>"+ pantalla.innerHTML;
    recognition.onend = function(event) {
        if (data_uri==null) pantalla.innerHTML= "<p align=right>No he reconocido</p>"+pantalla.innerHTML;
    };
    recognition.onresult = function(event) {
        data_uri = event.results[0][0].transcript;
        if (data_uri!=''){
            var texto="<p align=right>"+data_uri+"</p>";
            pantalla.innerHTML= texto + pantalla.innerHTML;
            envia(data_uri,"speech");
        }
    };
}

function handleGeoLocation(e){
}

function envia(contenido,tipo){
}

function contactos(username){
    $.get( "https://ssaatt.com/whatsat/contactos/"+username, function( data ) {
        alert( data );
    });
}

function terminal(name){
}

function recibe(){
}