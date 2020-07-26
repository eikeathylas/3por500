// var mode = localStorage.getItem('login')
// if(mode == "true")
//   var gh = true
// else
//   var gh = false

// if (gh) {
(function(window, document) {
    'use strict'
    const supports = !!document.querySelector

    const defaults = {
        eleMain: document.getElementById('info'),
        eleNav: '#sidebarToggleTop',
        eleMenu: '#accordionSidebar',
        eleIcon: '#iconmenu',
        eleSign: '#sign-out',

        eleDate: '#date',

        eleRdate: '#rDate',
        eleNumber: '#rNumber',
        eleBtnPrint: '#btnPrintResult',

    }

    const settings = {}

    const main = (event) => {
        var today = new Date
        var date = ''
        date = new Date(today.getTime())
        // settings.eleDate.value = date.getFullYear() + "-" + String((date.getMonth() + 1)).padStart(2, '0') + "-" + date.getDate()
        settings.eleDate.max = date.getFullYear() + "-" + String((date.getMonth() + 1)).padStart(2, '0') + "-" + date.getDate()
        date = new Date(today.getTime() - (8 * 24 * 60 * 60 * 1000))
        settings.eleDate.min = date.getFullYear() + "-" + String((date.getMonth() + 1)).padStart(2, '0') + "-" + date.getDate()
    }

    const pResult = () => {
      var c = new PosPrinterJob(getCurrentDriver(), getCurrentTransport())
      c.initialize()
      c.printText("3,00 por 500,00", c.ALIGNMENT_CENTER, c.FONT_SIZE_MEDIUM3)
      c.printText("-------------------", c.ALIGNMENT_LEFT, c.FONT_SIZE_MEDIUM1)
      c.printText("Resultado", c.ALIGNMENT_CENTER, c.FONT_SIZE_MEDIUM1)
      c.printText("Data:    "+ settings.eleRdate.innerHTML, c.ALIGNMENT_LEFT, c.FONT_SIZE_MEDIUM1)
      c.printText("-------------------", c.ALIGNMENT_LEFT, c.FONT_SIZE_MEDIUM1)
      c.printText("Número:", c.ALIGNMENT_LEFT, c.FONT_SIZE_MEDIUM1)
      c.printText(settings.eleNumber.innerHTML, c.ALIGNMENT_CENTER, c.FONT_SIZE_BIG)
      c.execute()
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
                if (JSON.parse(xhr.responseText)['data'][k]['city'] == localStorage.getItem('city')){
                    if (array[0] == event['path'][0]['value']){
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

    const exit = function(){
        localStorage.removeItem('cambista')
        localStorage.removeItem('login')
        localStorage.removeItem('city')
        window.location.href ='login.html'
  
      }

    const menu = function(){
      settings.eleMenu.classList.toggle('toggled')
      settings.eleIcon.classList.toggle('rotate-180')
    }

    const setUp = function() {
        settings.eleNav = defaults.eleMain.querySelector(defaults.eleNav)
        settings.eleIcon = defaults.eleMain.querySelector(defaults.eleIcon)
        settings.eleMenu = defaults.eleMain.querySelector(defaults.eleMenu)
        settings.eleSign = defaults.eleMain.querySelector(defaults.eleSign)

        settings.eleDate = defaults.eleMain.querySelector(defaults.eleDate)

        settings.eleRdate = defaults.eleMain.querySelector(defaults.eleRdate)
        settings.eleNumber = defaults.eleMain.querySelector(defaults.eleNumber)
        settings.eleBtnPrint = defaults.eleMain.querySelector(defaults.eleBtnPrint)

    }

    const events = function() {
        window.addEventListener('load', main)
        settings.eleNav.addEventListener('click', menu)
        settings.eleSign.addEventListener('click', exit)
        settings.eleDate.addEventListener('change', change)
        settings.eleBtnPrint.addEventListener('click', pResult)
    }

    const init = function(options) {
        if (!supports) return
        setUp()
        events()
    }

    init()
}(window, document))
// }
// else{
//     window.location.href ='login.html'
// }