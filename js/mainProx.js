var mode = localStorage.getItem('login')
if (mode == "true")
  var gh = true
else
  var gh = false

if (gh) {
  (function (window, document) {
    'use strict'
    const supports = !!document.querySelector

    const defaults = {
      eleMain: document.getElementById('info'),
      eleNav: '#sidebarToggleTop',
      eleMenu: '#accordionSidebar',
      eleIcon: '#iconmenu',
      eleSign: '#sign-out',

      eleHoraFinal: 16,
      eleMinutoFinal: 40,

      eleLessDate: '#menosdate',
      elePlusDate: '#maisdate',
      eleDate: '#date',

      eleCorpo: '#corpo',
      eleT: '#modalT',
      eleB: '#modalB',

      elePrint: '#imprimir',
      eleName: '#name',
      eleValue: '#value',
      eleDateConfirm: '#dateConfirm',

      eleHora: '#date',

    }

    const settings = {}

    const main = (event) => {
      if (event['type'] == 'load') {
        attDate()
        ball()
        att()
      }

      if (event['type'] == 'click') {
        if (event.composedPath()['length'] == 12) {
          settings.eleT.innerHTML = 'Você escolheu o numero: <b>' + event.composedPath()[0]['innerText'] + '</b>'
          settings.eleName.value = ''
          settings.eleT.id = event.composedPath()[0]['innerText']
          settings.eleValue.value = event.composedPath()[0]['innerText']
          settings.eleDateConfirm.value = settings.eleDate.value
          settings.elePrint.classList.remove('bg-info')
          settings.elePrint.disabled = false
        }
      }
    }

    const attDate = () => {
      var date = new Date
      var hora = date.getHours()
      var minuto = date.getMinutes()

      if (hora == defaults.eleHoraFinal && minuto < defaults.eleMinutoFinal) {

        settings.eleDate.value = date.getFullYear() + "-" + String((date.getMonth() + 1)).padStart(2, '0') + "-" + String(date.getDate()).padStart(2, '0')
        settings.eleDate.min = date.getFullYear() + "-" + String((date.getMonth() + 1)).padStart(2, '0') + "-" + String(date.getDate()).padStart(2, '0')

        var today = new Date(settings.eleDate.value)
        var conf = new Date(today.getTime() + (2 * 24 * 60 * 60 * 1000))
        settings.eleDate.max = conf.getFullYear() + "-" + String((conf.getMonth() + 1)).padStart(2, '0') + "-" + String(conf.getDate()).padStart(2, '0')

      } else if (hora < defaults.eleHoraFinal) {

        settings.eleDate.value = date.getFullYear() + "-" + String((date.getMonth() + 1)).padStart(2, '0') + "-" + String(date.getDate()).padStart(2, '0')
        settings.eleDate.min = date.getFullYear() + "-" + String((date.getMonth() + 1)).padStart(2, '0') + "-" + String(date.getDate()).padStart(2, '0')

        var today = new Date(settings.eleDate.value)
        var conf = new Date(today.getTime() + (2 * 24 * 60 * 60 * 1000))
        settings.eleDate.max = conf.getFullYear() + "-" + String((conf.getMonth() + 1)).padStart(2, '0') + "-" + String(conf.getDate()).padStart(2, '0')

      } else {

        var date = new Date
        var conf = new Date(date.getTime() + (1 * 24 * 60 * 60 * 1000))
        settings.eleDate.value = conf.getFullYear() + "-" + String((conf.getMonth() + 1)).padStart(2, '0') + "-" + String(conf.getDate()).padStart(2, '0')
        settings.eleDate.min = conf.getFullYear() + "-" + String((conf.getMonth() + 1)).padStart(2, '0') + "-" + String(conf.getDate()).padStart(2, '0')

        var today = new Date(settings.eleDate.value)
        var conf = new Date(today.getTime() + (2 * 24 * 60 * 60 * 1000))
        settings.eleDate.max = conf.getFullYear() + "-" + String((conf.getMonth() + 1)).padStart(2, '0') + "-" + String(conf.getDate()).padStart(2, '0')

      }
    }

    const att = () => {

      var balls = getBalls()

      for (var i = 0; i <= 999; i++) {
        if (balls['data']['length'] > 0) {
          for (var k = 0; k <= balls['data']['length'] - 1; k++) {
            var array = balls['data'][k]['sort'].split('T')
            if (array[0] == settings.eleDate.value) {
              if (balls['data'][k]['ball'] == i) {
                var l = defaults.eleMain.querySelector('#a' + i)
                l.classList.add('bg-danger')
                l.classList.remove('bg-success')
                l.disabled = true
              }
            }
          }
        }
      }
      setTimeout(att, 10000)
    }

    const ball = () => {
      var balls = getBalls()
      for (var i = 0; i <= 999; i++) {
        var button = document.createElement('button')
        button.id = 'a' + i
        button.className = 'bg-success rounded-circle cir txt'
        button.innerHTML = String(i).padStart(3, '0')
        button.setAttribute('data-toggle', 'modal')
        button.setAttribute('data-target', '#myModal')

        if (balls['data']['length'] > 0) {
          var k = 0
          for (k = 0; k <= balls['data']['length'] - 1; k++) {
            if (balls['data'][k]['ball'] == i) {  //String(i).padStart(3, '0')
              var array = balls['data'][k]['sort'].split('T')
              if (array[0] == settings.eleDate.value) {
                button.id = 'a' + i
                button.disabled = true
                button.className = 'bg-danger rounded-circle cir txt'
                button.innerHTML = String(i).padStart(3, '0')
              }
            }

          }
        }
        settings.eleCorpo.appendChild(button)
      }
    }

    const getBalls = () => {
      var xhr = new XMLHttpRequest()
      xhr.open("POST", 'https://script.google.com/macros/s/AKfycbwkz-3LOYkx7RI9j0osi6O3ELvc0e4Mm514oGyH4JwB3-5_hgk/exec', false)
      xhr.send(JSON.stringify({
        method: "GET",
        sheet: "ball"
      }))

      return JSON.parse(xhr.responseText)
    }

    const elPrint = (event) => {
      settings.elePrint.classList.toggle('bg-info')
      settings.elePrint.disabled = true

      var text = ""
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
      var date = new Date
      var hj = date.getFullYear() + "-" + String((date.getMonth() + 1)).padStart(2, '0') + "-" + String(date.getDate()).padStart(2, '0')
      var hjPrint = hj.split('-')
      hjPrint = hjPrint[2] + '/' + hjPrint[1] + '/' + hjPrint[0][2] + hjPrint[0][3]
      var hora = date.getHours()
      var minuto = date.getMinutes()

      var datas = settings.eleDate.value.split('-')
      var sorteio = datas[2] + '/' + datas[1] + '/' + datas[0][2] + datas[0][3]

      console.log(settings.eleDate.value)

      if (hora == defaults.eleHoraFinal && minuto < defaults.eleMinutoFinal && settings.eleDate.value == hj) {

        var queryTrue = "=QUERY(ball!A:E; #select * where E = date '" + settings.eleDate.value + "'#)"
        var xhr = new XMLHttpRequest()
        xhr.open("POST", 'https://script.google.com/macros/s/AKfycbwkz-3LOYkx7RI9j0osi6O3ELvc0e4Mm514oGyH4JwB3-5_hgk/exec', false)
        xhr.send(JSON.stringify({
          method: "PUT",
          sheet: "whereBall",
          id: 2,
          payload: {
            query: queryTrue.replace('#', '"').replace('#', '"')
          }
        }))

        var xhr = new XMLHttpRequest()
        xhr.open("POST", 'https://script.google.com/macros/s/AKfycbwkz-3LOYkx7RI9j0osi6O3ELvc0e4Mm514oGyH4JwB3-5_hgk/exec', false)
        xhr.send(JSON.stringify({
          method: "WHEREGET",
          sheet: "whereBall"
        }))

        var balls = JSON.parse(xhr.responseText)
        var disponivel = true

        if (balls['data']['length'] > 0) {
          for (var k = 0; k <= balls['data']['length'] - 1; k++) {
            if (balls['data'][k]['ball'] == settings.eleValue.value) {
              disponivel = false
            }
          }
        }

        if (disponivel) {
          for (var i = 0; i < 11; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length))

          var c = new PosPrinterJob(getCurrentDriver(), getCurrentTransport())
          c.initialize()
          c.printText("3,00 por 500,00", c.ALIGNMENT_CENTER, c.FONT_SIZE_MEDIUM3)
          c.printText("-------------------", c.ALIGNMENT_LEFT, c.FONT_SIZE_MEDIUM1)
          c.printText("Data:      " + hjPrint, c.ALIGNMENT_LEFT, c.FONT_SIZE_MEDIUM1)
          c.printText("Hora:         " + String(hora + ':' + minuto), c.ALIGNMENT_LEFT, c.FONT_SIZE_MEDIUM1)
          c.printText("-------------------", c.ALIGNMENT_LEFT, c.FONT_SIZE_MEDIUM1)
          c.printText("Sorteio:   " + sorteio, c.ALIGNMENT_LEFT, c.FONT_SIZE_MEDIUM1)
          c.printText("Hora:         17:00", c.ALIGNMENT_LEFT, c.FONT_SIZE_MEDIUM1)
          c.printText("-------------------", c.ALIGNMENT_LEFT, c.FONT_SIZE_MEDIUM1)
          c.printText("Cambista: " + localStorage.getItem('cambista'), c.ALIGNMENT_LEFT, c.FONT_SIZE_MEDIUM1)
          c.printText("Código: " + text, c.ALIGNMENT_LEFT, c.FONT_SIZE_MEDIUM1)
          c.printText("-------------------", c.ALIGNMENT_LEFT, c.FONT_SIZE_MEDIUM1)
          c.printText("Número:", c.ALIGNMENT_LEFT, c.FONT_SIZE_MEDIUM1)
          c.printText(settings.eleValue.value, c.ALIGNMENT_CENTER, c.FONT_SIZE_BIG)
          c.printText("-------------------", c.ALIGNMENT_LEFT, c.FONT_SIZE_MEDIUM1)
          c.printText("Pagamento apenas com esse cupom. Caso seja sorteado tem até   8 DIAS   para receber !", c.ALIGNMENT_LEFT, c.FONT_SIZE_SMALL)
          c.printText("", c.ALIGNMENT_LEFT, c.FONT_SIZE_MEDIUM1)
          c.printText("Site para resultado", c.ALIGNMENT_CENTER, c.FONT_SIZE_MEDIUM1)
          c.printText("https://bit.ly/339t7ZZ", c.ALIGNMENT_CENTER, c.FONT_SIZE_SMALL)
          c.execute()

          var xhr = new XMLHttpRequest()
          xhr.open("post", 'https://script.google.com/macros/s/AKfycbwkz-3LOYkx7RI9j0osi6O3ELvc0e4Mm514oGyH4JwB3-5_hgk/exec', false)
          xhr.send(JSON.stringify({
            method: "POST",
            sheet: "ball",
            payload: {
              ball: settings.eleValue.value,
              code: text,
              name: settings.eleName.value,
              date: hj,
              sort: settings.eleDate.value
            }
          }))
          xhr = new XMLHttpRequest()
          xhr.open("post", 'https://script.google.com/macros/s/AKfycbwkz-3LOYkx7RI9j0osi6O3ELvc0e4Mm514oGyH4JwB3-5_hgk/exec', false)
          xhr.send(JSON.stringify({
            method: "POST",
            sheet: "sales",
            payload: {
              city: localStorage.getItem('city'),
              table: localStorage.getItem('cambista'),
              ball: settings.eleValue.value,
              value: 3,
              code: text,
              name: settings.eleName.value,
              date: hj,
              sort: settings.eleDate.value
            }
          }))
        } else {
          alert('Número reservado')
        }
      } else if (hora < defaults.eleHoraFinal && settings.eleDate.value == hj) {
        var queryTrue = "=QUERY(ball!A:E; #select * where E = date '" + settings.eleDate.value + "'#)"
        var xhr = new XMLHttpRequest()
        xhr.open("POST", 'https://script.google.com/macros/s/AKfycbwkz-3LOYkx7RI9j0osi6O3ELvc0e4Mm514oGyH4JwB3-5_hgk/exec', false)
        xhr.send(JSON.stringify({
          method: "PUT",
          sheet: "whereBall",
          id: 2,
          payload: {
            query: queryTrue.replace('#', '"').replace('#', '"')
          }
        }))

        var xhr = new XMLHttpRequest()
        xhr.open("POST", 'https://script.google.com/macros/s/AKfycbwkz-3LOYkx7RI9j0osi6O3ELvc0e4Mm514oGyH4JwB3-5_hgk/exec', false)
        xhr.send(JSON.stringify({
          method: "WHEREGET",
          sheet: "whereBall"
        }))

        var balls = JSON.parse(xhr.responseText)
        var disponivel = true

        if (balls['data']['length'] > 0) {
          for (var k = 0; k <= balls['data']['length'] - 1; k++) {
            if (balls['data'][k]['ball'] == settings.eleValue.value) {
              disponivel = false
            }
          }
        }

        if (disponivel) {
          for (var i = 0; i < 11; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length))

          var c = new PosPrinterJob(getCurrentDriver(), getCurrentTransport())
          c.initialize()
          c.printText("3,00 por 500,00", c.ALIGNMENT_CENTER, c.FONT_SIZE_MEDIUM3)
          c.printText("-------------------", c.ALIGNMENT_LEFT, c.FONT_SIZE_MEDIUM1)
          c.printText("Data:      " + hjPrint, c.ALIGNMENT_LEFT, c.FONT_SIZE_MEDIUM1)
          c.printText("Hora:         " + String(hora + ':' + minuto), c.ALIGNMENT_LEFT, c.FONT_SIZE_MEDIUM1)
          c.printText("-------------------", c.ALIGNMENT_LEFT, c.FONT_SIZE_MEDIUM1)
          c.printText("Sorteio:   " + sorteio, c.ALIGNMENT_LEFT, c.FONT_SIZE_MEDIUM1)
          c.printText("Hora:         17:00", c.ALIGNMENT_LEFT, c.FONT_SIZE_MEDIUM1)
          c.printText("-------------------", c.ALIGNMENT_LEFT, c.FONT_SIZE_MEDIUM1)
          c.printText("Cambista: " + localStorage.getItem('cambista'), c.ALIGNMENT_LEFT, c.FONT_SIZE_MEDIUM1)
          c.printText("Código: " + text, c.ALIGNMENT_LEFT, c.FONT_SIZE_MEDIUM1)
          c.printText("-------------------", c.ALIGNMENT_LEFT, c.FONT_SIZE_MEDIUM1)
          c.printText("Número:", c.ALIGNMENT_LEFT, c.FONT_SIZE_MEDIUM1)
          c.printText(settings.eleValue.value, c.ALIGNMENT_CENTER, c.FONT_SIZE_BIG)
          c.printText("-------------------", c.ALIGNMENT_LEFT, c.FONT_SIZE_MEDIUM1)
          c.printText("Pagamento apenas com esse cupom. Caso seja sorteado tem até   8 DIAS   para receber !", c.ALIGNMENT_LEFT, c.FONT_SIZE_SMALL)
          c.printText("", c.ALIGNMENT_LEFT, c.FONT_SIZE_MEDIUM1)
          c.printText("Site para resultado", c.ALIGNMENT_CENTER, c.FONT_SIZE_MEDIUM1)
          c.printText("https://bit.ly/339t7ZZ", c.ALIGNMENT_CENTER, c.FONT_SIZE_SMALL)
          c.execute()

          var xhr = new XMLHttpRequest()
          xhr.open("post", 'https://script.google.com/macros/s/AKfycbwkz-3LOYkx7RI9j0osi6O3ELvc0e4Mm514oGyH4JwB3-5_hgk/exec', false)
          xhr.send(JSON.stringify({
            method: "POST",
            sheet: "ball",
            payload: {
              ball: settings.eleValue.value,
              code: text,
              name: settings.eleName.value,
              date: hj,
              sort: settings.eleDate.value
            }
          }))

          xhr = new XMLHttpRequest()
          xhr.open("post", 'https://script.google.com/macros/s/AKfycbwkz-3LOYkx7RI9j0osi6O3ELvc0e4Mm514oGyH4JwB3-5_hgk/exec', false)
          xhr.send(JSON.stringify({
            method: "POST",
            sheet: "sales",
            payload: {
              city: localStorage.getItem('city'),
              table: localStorage.getItem('cambista'),
              ball: settings.eleValue.value,
              value: 3,
              code: text,
              name: settings.eleName.value,
              date: hj,
              sort: settings.eleDate.value
            }
          }))

        } else {
          alert('Número reservado')
        }

      } else {
        if (settings.eleDate.value > hj) {
          var queryTrue = "=QUERY(ball!A:E; #select * where E = date '" + settings.eleDate.value + "'#)"
          var xhr = new XMLHttpRequest()
          xhr.open("POST", 'https://script.google.com/macros/s/AKfycbwkz-3LOYkx7RI9j0osi6O3ELvc0e4Mm514oGyH4JwB3-5_hgk/exec', false)
          xhr.send(JSON.stringify({
            method: "PUT",
            sheet: "whereBall",
            id: 2,
            payload: {
              query: queryTrue.replace('#', '"').replace('#', '"')
            }
          }))

          var xhr = new XMLHttpRequest()
          xhr.open("POST", 'https://script.google.com/macros/s/AKfycbwkz-3LOYkx7RI9j0osi6O3ELvc0e4Mm514oGyH4JwB3-5_hgk/exec', false)
          xhr.send(JSON.stringify({
            method: "WHEREGET",
            sheet: "whereBall"
          }))

          var balls = JSON.parse(xhr.responseText)
          var disponivel = true

          if (balls['data']['length'] > 0) {
            for (var k = 0; k <= balls['data']['length'] - 1; k++) {
              if (balls['data'][k]['ball'] == settings.eleValue.value) {
                disponivel = false
              }
            }
          }

          if (disponivel) {
            for (var i = 0; i < 11; i++)
              text += possible.charAt(Math.floor(Math.random() * possible.length))

            var c = new PosPrinterJob(getCurrentDriver(), getCurrentTransport())
            c.initialize()
            c.printText("3,00 por 500,00", c.ALIGNMENT_CENTER, c.FONT_SIZE_MEDIUM3)
            c.printText("-------------------", c.ALIGNMENT_LEFT, c.FONT_SIZE_MEDIUM1)
            c.printText("Data:      " + hjPrint, c.ALIGNMENT_LEFT, c.FONT_SIZE_MEDIUM1)
            c.printText("Hora:         " + String(hora + ':' + minuto), c.ALIGNMENT_LEFT, c.FONT_SIZE_MEDIUM1)
            c.printText("-------------------", c.ALIGNMENT_LEFT, c.FONT_SIZE_MEDIUM1)
            c.printText("Sorteio:   " + sorteio, c.ALIGNMENT_LEFT, c.FONT_SIZE_MEDIUM1)
            c.printText("Hora:         17:00", c.ALIGNMENT_LEFT, c.FONT_SIZE_MEDIUM1)
            c.printText("-------------------", c.ALIGNMENT_LEFT, c.FONT_SIZE_MEDIUM1)
            c.printText("Cambista: " + localStorage.getItem('cambista'), c.ALIGNMENT_LEFT, c.FONT_SIZE_MEDIUM1)
            c.printText("Código: " + text, c.ALIGNMENT_LEFT, c.FONT_SIZE_MEDIUM1)
            c.printText("-------------------", c.ALIGNMENT_LEFT, c.FONT_SIZE_MEDIUM1)
            c.printText("Número:", c.ALIGNMENT_LEFT, c.FONT_SIZE_MEDIUM1)
            c.printText(settings.eleValue.value, c.ALIGNMENT_CENTER, c.FONT_SIZE_BIG)
            c.printText("-------------------", c.ALIGNMENT_LEFT, c.FONT_SIZE_MEDIUM1)
            c.printText("Pagamento apenas com esse cupom. Caso seja sorteado tem até   8 DIAS   para receber !", c.ALIGNMENT_LEFT, c.FONT_SIZE_SMALL)
            c.printText("", c.ALIGNMENT_LEFT, c.FONT_SIZE_MEDIUM1)
            c.printText("Site para resultado", c.ALIGNMENT_CENTER, c.FONT_SIZE_MEDIUM1)
            c.printText("https://bit.ly/339t7ZZ", c.ALIGNMENT_CENTER, c.FONT_SIZE_SMALL)
            c.execute()

            var xhr = new XMLHttpRequest()
            xhr.open("post", 'https://script.google.com/macros/s/AKfycbwkz-3LOYkx7RI9j0osi6O3ELvc0e4Mm514oGyH4JwB3-5_hgk/exec', false)
            xhr.send(JSON.stringify({
              method: "POST",
              sheet: "ball",
              payload: {
                ball: settings.eleValue.value,
                code: text,
                name: settings.eleName.value,
                date: hj,
                sort: settings.eleDate.value
              }
            }))
            xhr = new XMLHttpRequest()
            xhr.open("post", 'https://script.google.com/macros/s/AKfycbwkz-3LOYkx7RI9j0osi6O3ELvc0e4Mm514oGyH4JwB3-5_hgk/exec', false)
            xhr.send(JSON.stringify({
              method: "POST",
              sheet: "sales",
              payload: {
                city: localStorage.getItem('city'),
                table: localStorage.getItem('cambista'),
                ball: settings.eleValue.value,
                value: 3,
                code: text,
                name: settings.eleName.value,
                date: hj,
                sort: settings.eleDate.value
              }
            }))
          } else {
            alert('Número reservado')
          }
        }
        else {
          console.log(settings.eleDate.value > hj)
          console.log(settings.eleDate.value)
          console.log(hj)
          var datas = settings.eleDate.value.split('-')
          // alert('Horario encerrado para as apostas, atualize a pagina ou aposte para o dia seguinte')
          alert('Horario encerrado para a data de: '+ datas[2]+ '/' +datas[1]+ '/' +datas[0][2]+datas[0][3])
        }
      }
    }

    const exit = () => {
      localStorage.removeItem('cambista')
      localStorage.removeItem('login')
      localStorage.removeItem('city')
      window.location.href = 'login.html'

    }

    const mais = () => {
      if (!(settings.eleDate.value >= settings.eleDate.max)) {
        var today = new Date(settings.eleDate.value)
        var date = new Date(today.getTime() + (2 * 24 * 60 * 60 * 1000))
        settings.eleDate.value = date.getFullYear() + "-" + String((date.getMonth() + 1)).padStart(2, '0') + "-" + String(date.getDate()).padStart(2, '0')

        var queryTrue = "=QUERY(ball!A:E; #select * where E = date '" + settings.eleDate.value + "'#)"
        var xhr = new XMLHttpRequest()
        xhr.open("POST", 'https://script.google.com/macros/s/AKfycbwkz-3LOYkx7RI9j0osi6O3ELvc0e4Mm514oGyH4JwB3-5_hgk/exec', false)
        xhr.send(JSON.stringify({
          method: "PUT",
          sheet: "whereBall",
          id: 2,
          payload: {
            query: queryTrue.replace('#', '"').replace('#', '"')
          }
        }))

        var xhr = new XMLHttpRequest()
        xhr.open("POST", 'https://script.google.com/macros/s/AKfycbwkz-3LOYkx7RI9j0osi6O3ELvc0e4Mm514oGyH4JwB3-5_hgk/exec', false)
        xhr.send(JSON.stringify({
          method: "WHEREGET",
          sheet: "whereBall"
        }))

        var balls = JSON.parse(xhr.responseText)
        for (var i = 0; i <= 999; i++) {
          var l = defaults.eleMain.querySelector('#a' + i)
          l.classList.remove('bg-danger')
          l.classList.add('bg-success')
          l.disabled = false
        }

        if (balls['data']['length'] > 0) {
          for (var k = 0; k <= balls['data']['length'] - 1; k++) {
            var l = defaults.eleMain.querySelector('#a' + balls['data'][k]['ball'])
            l.classList.add('bg-danger')
            l.classList.remove('bg-success')
            l.disabled = true
          }
        }
      }
    }

    const menos = () => {
      if (!(settings.eleDate.value <= settings.eleDate.min)) {
        var today = new Date(settings.eleDate.value)
        var date = new Date(today.getTime())
        settings.eleDate.value = date.getFullYear() + "-" + String((date.getMonth() + 1)).padStart(2, '0') + "-" + date.getDate()

        var queryTrue = "=QUERY(ball!A:E; #select * where E = date '" + settings.eleDate.value + "'#)"
        var xhr = new XMLHttpRequest()
        xhr.open("POST", 'https://script.google.com/macros/s/AKfycbwkz-3LOYkx7RI9j0osi6O3ELvc0e4Mm514oGyH4JwB3-5_hgk/exec', false)
        xhr.send(JSON.stringify({
          method: "PUT",
          sheet: "whereBall",
          id: 2,
          payload: {
            query: queryTrue.replace('#', '"').replace('#', '"')
          }
        }))

        var xhr = new XMLHttpRequest()
        xhr.open("POST", 'https://script.google.com/macros/s/AKfycbwkz-3LOYkx7RI9j0osi6O3ELvc0e4Mm514oGyH4JwB3-5_hgk/exec', false)
        xhr.send(JSON.stringify({
          method: "WHEREGET",
          sheet: "whereBall"
        }))

        var balls = JSON.parse(xhr.responseText)
        for (var i = 0; i <= 999; i++) {
          var l = defaults.eleMain.querySelector('#a' + i)
          l.classList.remove('bg-danger')
          l.classList.add('bg-success')
          l.disabled = false
        }

        if (balls['data']['length'] > 0) {
          for (var k = 0; k <= balls['data']['length'] - 1; k++) {
            var l = defaults.eleMain.querySelector('#a' + balls['data'][k]['ball'])
            l.classList.add('bg-danger')
            l.classList.remove('bg-success')
            l.disabled = true
          }
        }
      }
    }

    const menu = () => {
      settings.eleMenu.classList.toggle('toggled')
      settings.eleIcon.classList.toggle('rotate-180')
    }

    const setUp = () => {
      settings.eleNav = defaults.eleMain.querySelector(defaults.eleNav)
      settings.eleIcon = defaults.eleMain.querySelector(defaults.eleIcon)
      settings.eleMenu = defaults.eleMain.querySelector(defaults.eleMenu)
      settings.eleSign = defaults.eleMain.querySelector(defaults.eleSign)

      settings.elePlusDate = defaults.eleMain.querySelector(defaults.elePlusDate)
      settings.eleLessDate = defaults.eleMain.querySelector(defaults.eleLessDate)
      settings.eleDate = defaults.eleMain.querySelector(defaults.eleDate)

      settings.eleCorpo = defaults.eleMain.querySelector(defaults.eleCorpo)

      settings.eleT = defaults.eleMain.querySelector(defaults.eleT)
      settings.eleB = defaults.eleMain.querySelector(defaults.eleB)


      settings.elePrint = defaults.eleMain.querySelector(defaults.elePrint)
      settings.eleName = defaults.eleMain.querySelector(defaults.eleName)
      settings.eleValue = defaults.eleMain.querySelector(defaults.eleValue)
      settings.eleDateConfirm = defaults.eleMain.querySelector(defaults.eleDateConfirm)
    }

    const events = function () {
      window.addEventListener('load', main)
      window.addEventListener('click', main)
      settings.eleNav.addEventListener('click', menu)
      settings.eleSign.addEventListener('click', exit)
      settings.elePrint.addEventListener('click', elPrint)
      settings.elePlusDate.addEventListener('click', mais)
      settings.eleLessDate.addEventListener('click', menos)
    }

    const init = function (options) {
      if (!supports) return
      setUp()
      events()
    }

    init()
  }(window, document))
}
else {
  window.location.href = 'login.html'
}