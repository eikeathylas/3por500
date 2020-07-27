(function(window, document) {
  'use strict'
  const supports = !!document.querySelector

  const defaults = {
      eleMain: document.getElementById('info'),
      eleLogin: '#login',

      eleUser: '#user',
      elePass: '#pass',

    }

  const settings = {}

  const main = (event) => {

    if (settings.eleUser.value != '' && settings.elePass.value != ''){
      login(settings.eleUser.value.toLowerCase(), settings.elePass.value.toLowerCase())
    }
    else{
      alert('Preencha os dois campos')
    }
  }

  const login = (user, senha) => {
    var xhr = new XMLHttpRequest()
    xhr.open("POST", 'https://script.google.com/macros/s/AKfycbwkz-3LOYkx7RI9j0osi6O3ELvc0e4Mm514oGyH4JwB3-5_hgk/exec', false)
    xhr.send(JSON.stringify({
        method: "GET",
        sheet: "users"
        }))

    for (var k = 0; k <= JSON.parse(xhr.responseText)['data']['length'] -1; k++){
      if (JSON.parse(xhr.responseText)['data'][k]['user'] == user){
        if (JSON.parse(xhr.responseText)['data'][k]['pass'] == senha){
          setLocalMode('login', true)
          setLocalMode('cambista', JSON.parse(xhr.responseText)['data'][k]['table'])
          setLocalMode('city', JSON.parse(xhr.responseText)['data'][k]['city'])
          window.location.href ='index.html'
        }else{
          alert('Senha incorreta')
        }
      }
    }
  }

  const setLocalMode = (key, value) => {
      localStorage.setItem(key, value)
  }

  const setUp = function() {
    settings.eleLogin = defaults.eleMain.querySelector(defaults.eleLogin)
    settings.eleUser = defaults.eleMain.querySelector(defaults.eleUser)
    settings.elePass = defaults.eleMain.querySelector(defaults.elePass)
  }

  const events = function() {
      // window.addEventListener('load', main)
      settings.eleLogin.addEventListener('click', main)
  }

  const init = function(options) {
      if (!supports) return
      setUp()
      events()
  }

  init()
}(window, document))