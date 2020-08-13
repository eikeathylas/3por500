var mode = localStorage.getItem('adm')
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

      eleCrNumber: '#crNumber',
      eleBtnCR: '#btnCreateResult',

      eleBodyUser: '#bodyUsers',
      eleAddUser: '#addTuser',
      eleAddPass: '#addTpass',
      eleAddName: '#addTname',
      eleAddTable: '#addTtable',
      eleAddCity: '#addTcity',
      eleSaveAdd: '#saveadduser',

      eleEditId: '#editTid',
      eleEditUser: '#editTuser',
      eleEditPass: '#editTpass',
      eleEditName: '#editTname',
      eleEditTable: '#editTtable',
      eleEditCity: '#editTcity',
      eleSaveEdit: '#saveedituser',

      eleBodySales: '#bodySales',
      elesalesTCidade: '#salesTCidade',
      elesalesTBanca: '#salesTBanca',
      elesalesTBola: '#salesTBola',
      elesalesTValor: '#salesTValor',
      elesalesTCode: '#salesTCode',
      elesalesTNome: '#salesTNome',
      elesalesTData: '#salesTData',
      elesalesTsort: '#salesTsort',
      eleSalesPrint: '#salesPrint',
    }

    const settings = {}

    const main = (event) => {
      if (event['type'] == 'load') {
        getUser()
        getSales()
      }

      if (event['type'] == 'click') {
        if (event.composedPath()['length'] == 20) {
          settings.elesalesTCidade.value = event.composedPath()[2]['cells'][0]['innerText']
          settings.elesalesTBanca.value = event.composedPath()[2]['cells'][1]['innerText']
          settings.elesalesTBola.value = event.composedPath()[2]['cells'][2]['innerText']
          settings.elesalesTValor.value = event.composedPath()[2]['cells'][3]['innerText']
          settings.elesalesTCode.value = event.composedPath()[2]['cells'][5]['innerText']
          settings.elesalesTNome.value = event.composedPath()[2]['cells'][6]['innerText']
          settings.elesalesTData.value = event.composedPath()[2]['cells'][7]['innerText']
          settings.elesalesTsort.value = event.composedPath()[2]['cells'][8]['innerText']
        }
        if (event.composedPath()['length'] == 18) {
          if (event.composedPath()[0]['textContent'] == 'Editar') {
            settings.eleEditId.value = event.composedPath()[2]['children'][0]['textContent']
            settings.eleEditUser.value = event.composedPath()[2]['children'][1]['textContent']
            settings.eleEditPass.value = event.composedPath()[2]['children'][2]['textContent']
            settings.eleEditName.value = event.composedPath()[2]['children'][3]['textContent']
            settings.eleEditTable.value = event.composedPath()[2]['children'][4]['textContent']
            settings.eleEditCity.value = event.composedPath()[2]['children'][5]['textContent']
          }
          if (event.composedPath()[0]['textContent'] == 'Deletar') {
            dUser(event.composedPath()[2]['children'][0]['textContent'])
          }

        }
      }
    }

    const getSales = () => {
      var today = new Date
      var date = ''
      date = new Date(today.getTime())
      var hj = date.getFullYear() + "-" + String((date.getMonth() + 1)).padStart(2, '0') + "-" + date.getDate()
      date = new Date(today.getTime() - (10 * 24 * 60 * 60 * 1000))
      var antes = date.getFullYear() + "-" + String((date.getMonth() + 1)).padStart(2, '0') + "-" + date.getDate()

      var queryTrue = "=QUERY(sales!A:I; #select * where G >= date '" + antes + "' and G <= date '" + hj + "' order by G ASC #)"
      var xhr = new XMLHttpRequest()
      xhr.open("POST", 'https://script.google.com/macros/s/AKfycbwkz-3LOYkx7RI9j0osi6O3ELvc0e4Mm514oGyH4JwB3-5_hgk/exec', false)
      xhr.send(JSON.stringify({
        method: "PUT",
        sheet: "where",
        id: 2,
        payload: {
          query: queryTrue.replace('#', '"').replace('#', '"')
        }
      }))

      var xhr = new XMLHttpRequest()
      xhr.open("POST", 'https://script.google.com/macros/s/AKfycbwkz-3LOYkx7RI9j0osi6O3ELvc0e4Mm514oGyH4JwB3-5_hgk/exec', false)
      xhr.send(JSON.stringify({
        method: "WHEREGET",
        sheet: "where"
      }))


      if (JSON.parse(xhr.responseText)['data']['length'] > 0) {
        var datadobanco = JSON.parse(xhr.responseText)['data'][0]['date'].split('T')[0]
      }
      var lk = 0


      for (var k = 0; k < JSON.parse(xhr.responseText)['data']['length']; k++) {

        if (JSON.parse(xhr.responseText)['data']['length'] > 0) {
          if (JSON.parse(xhr.responseText)['data'][k]['date'].split('T')[0] == datadobanco) {
            var datas = datadobanco.split('-')
            var normal = datas[2] + '/' + datas[1] + '/' + datas[0][2] + datas[0][3]
            var thumb = document.getElementById('receita_' + normal.replace('/', '').replace('/', '').replace('/', '').replace('/', '').replace('/', ''))

            if (!thumb) {
              var c = 0
              var divPai = document.createElement('div')
              var detailsPai = document.createElement('details')
              var summaryPai = document.createElement('summary')
              var hrPai = document.createElement('hr')
              var pPai = document.createElement('p')
              var hrPai = document.createElement('hr')
              var divfilho = document.createElement('div')
              var hrPai = document.createElement('hr')

              summaryPai.innerHTML = normal
              detailsPai.appendChild(summaryPai)
              detailsPai.appendChild(hrPai)
              pPai.id = 'receita_' + normal.replace('/', '').replace('/', '').replace('/', '').replace('/', '').replace('/', '')
              pPai.className = 'text-success font-weight-bold mt-2'
              detailsPai.appendChild(pPai)
              detailsPai.appendChild(hrPai)
              detailsPai.appendChild(divfilho)
              divPai.appendChild(detailsPai)

              settings.eleBodySales.appendChild(divPai)
              settings.eleBodySales.appendChild(hrPai)

              var tableFilho = document.createElement('table')
              var theadFilho = document.createElement('thead')
              var trFilho = document.createElement('tr')
              var th1Filho = document.createElement('th')
              var th2Filho = document.createElement('th')
              var th3Filho = document.createElement('th')
              var th4Filho = document.createElement('th')

              th1Filho.innerHTML = 'Cidade'
              trFilho.appendChild(th1Filho)

              th2Filho.innerHTML = 'Banca'
              trFilho.appendChild(th2Filho)

              th3Filho.innerHTML = 'Bola'
              trFilho.appendChild(th3Filho)

              th4Filho.innerHTML = 'Ação'
              trFilho.appendChild(th4Filho)

              theadFilho.appendChild(trFilho)
              tableFilho.className = 'table'
              tableFilho.appendChild(theadFilho)
              for (var j = lk; j < JSON.parse(xhr.responseText)['data']['length']; j++) {
                if (JSON.parse(xhr.responseText)['data'][j]['date'].split('T')[0] == datadobanco) {

                  var tbodyFilho = document.createElement('tbody')
                  var tr2Filho = document.createElement('tr')
                  var td1Filho = document.createElement('td')
                  var td2Filho = document.createElement('td')
                  var td3Filho = document.createElement('td')
                  var td4Filho = document.createElement('td')
                  var td5Filho = document.createElement('td')
                  var btnFilho = document.createElement('button')
                  var td6Filho = document.createElement('td')
                  var td7Filho = document.createElement('td')
                  var td8Filho = document.createElement('td')
                  var td9Filho = document.createElement('td')



                  td1Filho.hidden = false
                  td1Filho.innerHTML = JSON.parse(xhr.responseText)['data'][j]['city']
                  tr2Filho.appendChild(td1Filho)

                  td2Filho.hidden = false
                  td2Filho.innerHTML = JSON.parse(xhr.responseText)['data'][j]['table']
                  tr2Filho.appendChild(td2Filho)

                  td3Filho.hidden = false
                  td3Filho.innerHTML = String(JSON.parse(xhr.responseText)['data'][j]['ball']).padStart(3, '0')
                  tr2Filho.appendChild(td3Filho)

                  td4Filho.hidden = true
                  td4Filho.innerHTML = 'R$ ' + JSON.parse(xhr.responseText)['data'][j]['value'] + ',00'
                  tr2Filho.appendChild(td4Filho)

                  btnFilho.setAttribute('data-toggle', 'modal')
                  btnFilho.setAttribute('data-target', '#salesModal')
                  btnFilho.className = 'btn btn-info btn-xs'
                  btnFilho.innerHTML = 'Ver'
                  td5Filho.appendChild(btnFilho)
                  tr2Filho.appendChild(td5Filho)

                  td6Filho.hidden = true
                  td6Filho.innerHTML = JSON.parse(xhr.responseText)['data'][j]['code']
                  tr2Filho.appendChild(td6Filho)

                  td9Filho.hidden = true
                  td9Filho.innerHTML = JSON.parse(xhr.responseText)['data'][j]['name']
                  tr2Filho.appendChild(td9Filho)

                  td7Filho.hidden = true
                  td7Filho.innerHTML = JSON.parse(xhr.responseText)['data'][j]['date'].split('T')[0]
                  tr2Filho.appendChild(td7Filho)

                  td8Filho.hidden = true
                  td8Filho.innerHTML = JSON.parse(xhr.responseText)['data'][j]['sort'].split('T')[0]
                  tr2Filho.appendChild(td8Filho)

                  tbodyFilho.appendChild(tr2Filho)
                  tableFilho.appendChild(tbodyFilho)
                  divfilho.appendChild(tableFilho)
                  c += 1
                  settings.pPai = defaults.eleMain.querySelector('#' + pPai.id)
                  settings.pPai.innerHTML = 'Receita: R$ ' + c * 3 + ',00'

                } else {
                  lk = j
                  var datadobanco = JSON.parse(xhr.responseText)['data'][j]['date'].split('T')[0]
                  break
                }

              }
            }
          }
        }
      }
    }

    const getUser = () => {
      var xhr = new XMLHttpRequest()
      xhr.open("POST", 'https://script.google.com/macros/s/AKfycbwkz-3LOYkx7RI9j0osi6O3ELvc0e4Mm514oGyH4JwB3-5_hgk/exec', false)
      xhr.send(JSON.stringify({
        method: "GET",
        sheet: "users"
      }))

      var table = document.createElement('table')
      var thead = document.createElement('thead')
      var tr = document.createElement('tr')
      var th1 = document.createElement('th')
      var th2 = document.createElement('th')
      var th3 = document.createElement('th')
      var th4 = document.createElement('th')

      th1.innerHTML = 'Id'
      tr.appendChild(th1)
      th2.innerHTML = 'Nome'
      tr.appendChild(th2)
      th3.innerHTML = 'Banca'
      tr.appendChild(th3)
      th4.innerHTML = 'Ação'
      tr.appendChild(th4)
      thead.appendChild(tr)
      table.className = 'table table-striped'
      table.appendChild(thead)

      for (var k = 0; k <= JSON.parse(xhr.responseText)['data']['length'] - 1; k++) {
        var tbody = document.createElement('tbody')
        var tr2 = document.createElement('tr')
        var td1 = document.createElement('td')
        var td2 = document.createElement('td')
        var td3 = document.createElement('td')
        var td4 = document.createElement('td')
        var td5 = document.createElement('td')
        var td6 = document.createElement('td')
        var td7 = document.createElement('td')
        var button = document.createElement('button')
        var button2 = document.createElement('button')

        td1.innerHTML = JSON.parse(xhr.responseText)['data'][k]['_id']
        tr2.appendChild(td1)
        td2.hidden = true
        td2.innerHTML = JSON.parse(xhr.responseText)['data'][k]['user']
        tr2.appendChild(td2)
        td3.hidden = true
        td3.innerHTML = JSON.parse(xhr.responseText)['data'][k]['pass']
        tr2.appendChild(td3)
        td4.hidden = false
        td4.innerHTML = JSON.parse(xhr.responseText)['data'][k]['name']
        tr2.appendChild(td4)
        td5.hidden = false
        td5.innerHTML = JSON.parse(xhr.responseText)['data'][k]['table']
        tr2.appendChild(td5)
        td6.hidden = true
        td6.innerHTML = JSON.parse(xhr.responseText)['data'][k]['city']
        tr2.appendChild(td6)
        button.setAttribute('data-toggle', 'modal')
        button.setAttribute('data-target', '#editModal')
        button.className = 'btn btn-info btn-xs mr-2'
        button.innerHTML = 'Editar'
        td7.appendChild(button)
        button2.className = 'btn btn-danger btn-xs'
        button2.innerHTML = 'Deletar'
        td7.appendChild(button2)
        tr2.appendChild(td7)
        tbody.appendChild(tr2)
        table.appendChild(tbody)
      }
      settings.eleBodyUser.appendChild(table)


    }

    const cResult = () => {
      var date = new Date
      var hj = date.getFullYear() + "-" + String((date.getMonth() + 1)).padStart(2, '0') + "-" + date.getDate()
      var xhr = new XMLHttpRequest()
      xhr.open("POST", 'https://script.google.com/macros/s/AKfycbwkz-3LOYkx7RI9j0osi6O3ELvc0e4Mm514oGyH4JwB3-5_hgk/exec', false)
      xhr.send(JSON.stringify({
        method: "POST",
        sheet: "results",
        payload: {
          date: hj,
          number: settings.eleCrNumber.value
        }
      }))

      settings.eleCrNumber.value = ''
    }

    const salesPrint = () => {
      var date = new Date
      var hora = String(date.getHours()).padStart(2, '0')
      var minuto = String(date.getMinutes()).padStart(2, '0')
      var hjPrint = settings.elesalesTData.value.split('-')
      hjPrint = hjPrint[2] + '/' + hjPrint[1] + '/' + hjPrint[0][2] + hjPrint[0][3]
      var sortPrint = settings.elesalesTsort.value.split('-')
      sortPrint = sortPrint[2] + '/' + sortPrint[1] + '/' + sortPrint[0][2] + sortPrint[0][3]


      var S = "#Intent;scheme=rawbt;"
      var P =  "package=ru.a402d.rawbtprinter;end;"

      var textEncoded = ''
      textEncoded += '        3,00 POR 500,00\n'
      textEncoded += '--------------------------------'
      textEncoded += ' Data:                  '+ hjPrint +'\n'
      textEncoded += ' Hora:                     '+ String(hora + ':' + minuto) +'\n'
      textEncoded += '--------------------------------'
      textEncoded += ' Data:                  '+ sortPrint +'\n'
      textEncoded += ' Hora:                     17:00\n'
      textEncoded += '--------------------------------'
      textEncoded += ' Cambista:          '+ settings.elesalesTBanca.value +'\n'
      textEncoded += ' Código:            '+ settings.elesalesTCode.value +'\n'
      textEncoded += '--------------------------------'
      textEncoded += ' Número:\n'
      textEncoded += '              '+ settings.elesalesTBola.value +'\n'
      textEncoded += '--------------------------------'
      textEncoded += 'Pagamento apenas com esse cupom.Caso seja sorteado tem até      8 DIAS para receber !\n\n'
      textEncoded += '      Site para resultado\n'
      textEncoded += '    https://bit.ly/339t7ZZ'

      textEncoded = encodeURI(textEncoded)
      window.location.href="intent:"+textEncoded+S+P

      // var c = new PosPrinterJob(getCurrentDriver(), getCurrentTransport())
      // c.initialize()
      // c.printText("3,00 por 500,00", c.ALIGNMENT_CENTER, c.FONT_SIZE_MEDIUM3)
      // c.printText("-------------------", c.ALIGNMENT_LEFT, c.FONT_SIZE_MEDIUM1)
      // c.printText("Data       " + hjPrint, c.ALIGNMENT_LEFT, c.FONT_SIZE_MEDIUM1)
      // c.printText("Hora          "+ String(hora +':'+minuto), c.ALIGNMENT_LEFT, c.FONT_SIZE_MEDIUM1)
      // c.printText("-------------------", c.ALIGNMENT_LEFT, c.FONT_SIZE_MEDIUM1)
      // c.printText("Sorteio    " + sortPrint, c.ALIGNMENT_LEFT, c.FONT_SIZE_MEDIUM1)
      // c.printText("Hora          17:00", c.ALIGNMENT_LEFT, c.FONT_SIZE_MEDIUM1)
      // c.printText("-------------------", c.ALIGNMENT_LEFT, c.FONT_SIZE_MEDIUM1)
      // c.printText("Cambista " + settings.elesalesTBanca.value, c.ALIGNMENT_LEFT, c.FONT_SIZE_MEDIUM1)
      // c.printText("Código  " + settings.elesalesTCode.value, c.ALIGNMENT_LEFT, c.FONT_SIZE_MEDIUM1)
      // c.printText("-------------------", c.ALIGNMENT_LEFT, c.FONT_SIZE_MEDIUM1)
      // c.printText("Número:", c.ALIGNMENT_LEFT, c.FONT_SIZE_MEDIUM1)
      // c.printText(settings.elesalesTBola.value, c.ALIGNMENT_CENTER, c.FONT_SIZE_BIG)
      // c.printText("-------------------", c.ALIGNMENT_LEFT, c.FONT_SIZE_MEDIUM1)
      // c.printText("Pagamento apenas com esse cupom. Caso seja sorteado tem até   8 DIAS   para receber !", c.ALIGNMENT_LEFT, c.FONT_SIZE_SMALL)
      // c.printText("", c.ALIGNMENT_LEFT, c.FONT_SIZE_MEDIUM1)
      // c.printText("Site para resultado", c.ALIGNMENT_CENTER, c.FONT_SIZE_MEDIUM1)
      // c.printText("https://bit.ly/339t7ZZ", c.ALIGNMENT_CENTER, c.FONT_SIZE_SMALL)
      // c.execute()
    }

    const cUser = () => {
      var xhr = new XMLHttpRequest()
      xhr.open("POST", 'https://script.google.com/macros/s/AKfycbwkz-3LOYkx7RI9j0osi6O3ELvc0e4Mm514oGyH4JwB3-5_hgk/exec', false)
      xhr.send(JSON.stringify({
        method: "POST",
        sheet: "users",
        payload: {
          user: settings.eleAddUser.value,
          pass: settings.eleAddPass.value,
          name: settings.eleAddName.value,
          table: settings.eleAddTable.value,
          city: settings.eleAddCity.value,
        }
      }))

      settings.eleAddUser.value = ''
      settings.eleAddPass.value = ''
      settings.eleAddName.value = ''
      settings.eleAddTable.value = ''
      settings.eleAddCity.value = ''
    }

    const dUser = (id) => {
      var xhr = new XMLHttpRequest()
      xhr.open("POST", 'https://script.google.com/macros/s/AKfycbwkz-3LOYkx7RI9j0osi6O3ELvc0e4Mm514oGyH4JwB3-5_hgk/exec', false)
      xhr.send(JSON.stringify({
        method: "DELETE",
        sheet: "users",
        id: String(id),
      }))
    }

    const saveEdit = () => {
      var xhr = new XMLHttpRequest()
      xhr.open("POST", 'https://script.google.com/macros/s/AKfycbwkz-3LOYkx7RI9j0osi6O3ELvc0e4Mm514oGyH4JwB3-5_hgk/exec', false)
      xhr.send(JSON.stringify({
        method: "PUT",
        sheet: "users",
        id: String(settings.eleEditId.value),
        payload: {
          user: settings.eleEditUser.value,
          pass: settings.eleEditPass.value,
          name: settings.eleEditName.value,
          table: settings.eleEditTable.value,
          city: settings.eleEditCity.value,
        }
      }))
    }

    const setUp = function () {
      settings.eleCrNumber = defaults.eleMain.querySelector(defaults.eleCrNumber)
      settings.eleBtnCR = defaults.eleMain.querySelector(defaults.eleBtnCR)

      settings.eleAddUser = defaults.eleMain.querySelector(defaults.eleAddUser)
      settings.eleAddPass = defaults.eleMain.querySelector(defaults.eleAddPass)
      settings.eleAddName = defaults.eleMain.querySelector(defaults.eleAddName)
      settings.eleAddTable = defaults.eleMain.querySelector(defaults.eleAddTable)
      settings.eleAddCity = defaults.eleMain.querySelector(defaults.eleAddCity)
      settings.eleSaveAdd = defaults.eleMain.querySelector(defaults.eleSaveAdd)


      settings.eleBodyUser = defaults.eleMain.querySelector(defaults.eleBodyUser)
      settings.eleEditId = defaults.eleMain.querySelector(defaults.eleEditId)
      settings.eleEditUser = defaults.eleMain.querySelector(defaults.eleEditUser)
      settings.eleEditPass = defaults.eleMain.querySelector(defaults.eleEditPass)
      settings.eleEditName = defaults.eleMain.querySelector(defaults.eleEditName)
      settings.eleEditTable = defaults.eleMain.querySelector(defaults.eleEditTable)
      settings.eleEditCity = defaults.eleMain.querySelector(defaults.eleEditCity)
      settings.eleSaveEdit = defaults.eleMain.querySelector(defaults.eleSaveEdit)


      settings.eleBodySales = defaults.eleMain.querySelector(defaults.eleBodySales)
      settings.elesalesTCidade = defaults.eleMain.querySelector(defaults.elesalesTCidade)
      settings.elesalesTBanca = defaults.eleMain.querySelector(defaults.elesalesTBanca)
      settings.elesalesTBola = defaults.eleMain.querySelector(defaults.elesalesTBola)
      settings.elesalesTValor = defaults.eleMain.querySelector(defaults.elesalesTValor)
      settings.elesalesTCode = defaults.eleMain.querySelector(defaults.elesalesTCode)
      settings.elesalesTNome = defaults.eleMain.querySelector(defaults.elesalesTNome)
      settings.elesalesTData = defaults.eleMain.querySelector(defaults.elesalesTData)
      settings.elesalesTsort = defaults.eleMain.querySelector(defaults.elesalesTsort)
      settings.eleSalesPrint = defaults.eleMain.querySelector(defaults.eleSalesPrint)
    }

    const events = function () {
      window.addEventListener('load', main)
      window.addEventListener('click', main)
      settings.eleBtnCR.addEventListener('click', cResult)
      settings.eleSaveEdit.addEventListener('click', saveEdit)
      settings.eleSaveAdd.addEventListener('click', cUser)
      settings.eleSalesPrint.addEventListener('click', salesPrint)
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
  window.location.href = 'adm.html'
}