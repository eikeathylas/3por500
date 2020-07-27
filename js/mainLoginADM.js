(function(window, document) {
  'use strict'
  const supports = !!document.querySelector

  const defaults = {
      eleMain: document.getElementById('info'),
      eleLogin: '#login',

    }

  const settings = {}

  const main = (event) => {

    if (event['path'][2]['children'][1][0]['value'] != '' && event['path'][2]['children'][1][1]['value'] != ''){
      login(event['path'][2]['children'][1][0]['value'].toLowerCase(), event['path'][2]['children'][1][1]['value'].toLowerCase())
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
        sheet: "adm"
        }))

    for (var k = 0; k <= JSON.parse(xhr.responseText)['data']['length'] -1; k++){
      if (JSON.parse(xhr.responseText)['data'][k]['user'] == user){
        if (JSON.parse(xhr.responseText)['data'][k]['pass'] == senha){
          setLocalMode('adm', true)
          window.location.href = 'painel.html'
        }
      }
    }
  }

  const setLocalMode = (key, value) => {
      localStorage.setItem(key, value)
  }

  const setUp = function() {
    settings.eleLogin = defaults.eleMain.querySelector(defaults.eleLogin)
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