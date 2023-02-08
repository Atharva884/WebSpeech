const synth = window.speechSynthesis

let form = document.forms.myForm
let textInput = document.getElementById('text-input')
let selectVoice = document.getElementById('selectVoice')
let voices = []

const getVoices = () =>{
    voices = synth.getVoices()
    console.log(voices)

    // Loop through the voices array
    voices.forEach(voice =>{
        console.log(voice)
        let option = document.createElement('option')
        option.textContent = `${voice.name} (${voice.lang})`
        option.setAttribute('data-name', voice.name)
        option.setAttribute('data-lang', voice.lang)
        selectVoice.appendChild(option)
    })
}

if(synth.onvoiceschanged !== undefined){
    synth.onvoiceschanged = getVoices
}

// Speak
const speak = () =>{
    if(synth.speaking){
        alert("Already Speaking")
    }
    if(textInput.value.length !== 0){
        let value = selectVoice.selectedOptions[0].getAttribute('data-name')
        let speechText = new SpeechSynthesisUtterance(textInput.value)
        voices.forEach(voice => {
            if(voice.name == value){
                speechText.voice = voice
            }
        })
        synth.speak(speechText)
    }else{
        alert("Enter value")
    }
}

selectVoice.addEventListener('change', e => speak());

form.addEventListener('submit', (e)=>{
    e.preventDefault()
    speak()
})