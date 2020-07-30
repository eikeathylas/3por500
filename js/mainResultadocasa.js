(function(window, document) {
    'use strict'
    const supports = !!document.querySelector

    const defaults = {
        eleMain: document.getElementById('info'),
        eleDate: '#date',
        eleRdate: '#rDate',
        eleNumber: '#rNumber',

    }

    const settings = {}

    const main = (event) => {
        var today = new Date
        var date = ''
        date = new Date(today.getTime())
        settings.eleDate.max = date.getFullYear() + "-" + String((date.getMonth() + 1)).padStart(2, '0') + "-" + date.getDate()
        date = new Date(today.getTime() - (8 * 24 * 60 * 60 * 1000))
        settings.eleDate.min = date.getFullYear() + "-" + String((date.getMonth() + 1)).padStart(2, '0') + "-" + date.getDate()
    }

    const change = (event) => {
        var xhr = new XMLHttpRequest()
        xhr.open("POST", 'https://script.google.com/macros/s/AKfycbwkz-3LOYkx7RI9j0osi6O3ELvc0e4Mm514oGyH4JwB3-5_hgk/exec', false)
        xhr.send(JSON.stringify({
            method: "GET",
            sheet: "results"
        }))

        if( JSON.parse(xhr.responseText)['data']['length'] != 0){
            for (var k = 0; k <= JSON.parse(xhr.responseText)['data']['length'] -1; k++){
                var array = JSON.parse(xhr.responseText)['data'][k]['date'].split('T')
                if (JSON.parse(xhr.responseText)['data'][k]['city'] == 'Cortês'){
                    if (array[0] == event.composedPath()[0]['value']){
                        settings.eleRdate.innerHTML = array[0]
                        settings.eleNumber.innerHTML = String(JSON.parse(xhr.responseText)['data'][k]['number']).padStart(3, '0')
                    }else
                        alert('Nesta data não houve sorteio')
                }else
                    alert('Sem sorteio para sua cidade')
            }
        }else
        alert('Nenhum sorteio cadastrado')
    }

    const setUp = function() {
        settings.eleDate = defaults.eleMain.querySelector(defaults.eleDate)
        settings.eleRdate = defaults.eleMain.querySelector(defaults.eleRdate)
        settings.eleNumber = defaults.eleMain.querySelector(defaults.eleNumber)
        settings.eleBtnPrint = defaults.eleMain.querySelector(defaults.eleBtnPrint)

    }

    const events = function() {
        window.addEventListener('load', main)
        settings.eleDate.addEventListener('change', change)
    }

    const init = function(options) {
        if (!supports) return
        setUp()
        events()
    }

    init()
}(window, document))