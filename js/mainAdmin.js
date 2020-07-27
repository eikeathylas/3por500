var mode = localStorage.getItem('adm')
if(mode == "true")
  var gh = true
else
  var gh = false

if (gh) {
  (function(window, document) {
    'use strict'
    const supports = !!document.querySelector

    const defaults = {
        eleMain: document.getElementById('info'),
        eleCrCity: '#crCity',
        eleCrDate: '#crDate',
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
        
        eleDateSales: '#date',
        eleBodySales: '#bodySales',
        eleSalesCity: '#salesTcity',
        eleSalesTable: '#salesTtable',
        eleSalesBall: '#salesTball',
        eleSalesCode: '#salesTcode',
        eleSalesName: '#salesTname',
        eleSalesDay: '#salesTday',
        eleSalesSort: '#salesTsort',
        eleSalesPrint: '#salesPrint',
    }

    const settings = {}

    const main = (event) => {
      if(event['type'] == 'load'){
        getUser()
      }
      
      if(event['type'] == 'click'){
        if(event.composedPath()['length'] == 17){
          settings.eleSalesCity.value = event.composedPath()[2]['children'][0]['textContent']
          settings.eleSalesTable.value = event.composedPath()[2]['children'][1]['textContent']
          settings.eleSalesBall.value = event.composedPath()[2]['children'][2]['textContent']
          settings.eleSalesCode.value = event.composedPath()[2]['children'][3]['textContent']
          settings.eleSalesName.value = event.composedPath()[2]['children'][4]['textContent']
          settings.eleSalesDay.value = event.composedPath()[2]['children'][5]['textContent']
          settings.eleSalesSort.value = event.composedPath()[2]['children'][6]['textContent']
        }
        if(event.composedPath()['length'] == 18){
          if(event.composedPath()[0]['textContent'] == 'Editar'){
            settings.eleEditId.value = event.composedPath()[2]['children'][0]['textContent']
            settings.eleEditUser.value = event.composedPath()[2]['children'][1]['textContent']
            settings.eleEditPass.value = event.composedPath()[2]['children'][2]['textContent']
            settings.eleEditName.value = event.composedPath()[2]['children'][3]['textContent']
            settings.eleEditTable.value = event.composedPath()[2]['children'][4]['textContent']
            settings.eleEditCity.value = event.composedPath()[2]['children'][5]['textContent']
          }
          if(event.composedPath()[0]['textContent'] == 'Deletar'){
            dUser(event.composedPath()[2]['children'][0]['textContent'])
          }

        }
      }
    }

    const getSales = (event) => {
      var queryTrue = "=QUERY(sales!A:G; #select * where F = date '"+ settings.eleDateSales.value +"'#)"
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

      var table = document.createElement('table')
      var thead = document.createElement('thead')
      var tr = document.createElement('tr')
      var th1 = document.createElement('th')
      var th2 = document.createElement('th')
      var th3 = document.createElement('th')
      var th4 = document.createElement('th')

      th1.innerHTML = 'Cidade'
      tr.appendChild(th1)
      th2.innerHTML = 'Banca'
      tr.appendChild(th2)
      th3.innerHTML = 'Bola'
      tr.appendChild(th3)
      th4.innerHTML = 'Ação'
      tr.appendChild(th4)
      thead.appendChild(tr)
      table.className = 'table table-striped'
      table.appendChild(thead)

      for(var k = 0; k <= JSON.parse(xhr.responseText)['data']['length'] - 1; k++){
        var tbody = document.createElement('tbody')
        var tr2 = document.createElement('tr')
        var td2 = document.createElement('td')
        var td3 = document.createElement('td')
        var td4 = document.createElement('td')
        var td5 = document.createElement('td')
        var td6 = document.createElement('td')
        var td7 = document.createElement('td')
        var td8 = document.createElement('td')
        var td9 = document.createElement('td')
        var button = document.createElement('button')

        td2.hidden = false
        td2.innerHTML = JSON.parse(xhr.responseText)['data'][k]['city']
        tr2.appendChild(td2)
        td3.hidden = false
        td3.innerHTML = JSON.parse(xhr.responseText)['data'][k]['table']
        tr2.appendChild(td3)
        td4.hidden = false
        td4.innerHTML = String(JSON.parse(xhr.responseText)['data'][k]['ball']).padStart(3, '0')
        tr2.appendChild(td4)
        td5.hidden = true
        td5.innerHTML = JSON.parse(xhr.responseText)['data'][k]['code']
        tr2.appendChild(td5)
        td6.hidden = true
        td6.innerHTML = JSON.parse(xhr.responseText)['data'][k]['name']
        tr2.appendChild(td6)
        var array = JSON.parse(xhr.responseText)['data'][k]['date'].split('T')
        td7.hidden = true
        td7.innerHTML = array[0]
        tr2.appendChild(td7)
        var array = JSON.parse(xhr.responseText)['data'][k]['sort'].split('T')
        td8.hidden = true
        td8.innerHTML = array[0]
        tr2.appendChild(td8)
        button.setAttribute('data-toggle', 'modal')
        button.setAttribute('data-target', '#salesModal')
        button.className = 'btn btn-info btn-xs'
        button.innerHTML = 'Ver'
        td9.appendChild(button)
        tr2.appendChild(td9)
        tbody.appendChild(tr2)
        table.appendChild(tbody)
      }

      event.composedPath()[2]['children'][1]['children'][0].innerHTML = table.innerHTML

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

      for(var k = 0; k <= JSON.parse(xhr.responseText)['data']['length'] - 1; k++){
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
      var xhr = new XMLHttpRequest()
      xhr.open("POST", 'https://script.google.com/macros/s/AKfycbwkz-3LOYkx7RI9j0osi6O3ELvc0e4Mm514oGyH4JwB3-5_hgk/exec', false)
      xhr.send(JSON.stringify({
        method: "POST",
        sheet: "results",
        payload: {
          city: settings.eleCrCity.value,
          date: settings.eleCrDate.value,
          number: settings.eleCrNumber.value
        }
      }))

      settings.eleCrCity.value = ''
      settings.eleCrDate.value = ''
      settings.eleCrNumber.value = ''
    }

    const salesPrint = () => {
      var c = new PosPrinterJob(getCurrentDriver(), getCurrentTransport())
      c.initialize()
      c.printText("3,00 por 500,00", c.ALIGNMENT_CENTER, c.FONT_SIZE_MEDIUM3)
      c.printText("-------------------", c.ALIGNMENT_LEFT, c.FONT_SIZE_MEDIUM1)
      c.printText("Data:    "+ settings.eleSalesDay.value, c.ALIGNMENT_LEFT, c.FONT_SIZE_MEDIUM1)
      c.printText("Sorteio: "+ settings.eleSalesSort.value, c.ALIGNMENT_LEFT, c.FONT_SIZE_MEDIUM1)
      c.printText("Cambista:  "+ settings.eleSalesTable.value, c.ALIGNMENT_LEFT, c.FONT_SIZE_MEDIUM1)
      c.printText("Código: "+ settings.eleSalesCode.value, c.ALIGNMENT_LEFT, c.FONT_SIZE_MEDIUM1)
      c.printText("-------------------", c.ALIGNMENT_LEFT, c.FONT_SIZE_MEDIUM1)
      c.printText("Número:", c.ALIGNMENT_LEFT, c.FONT_SIZE_MEDIUM1)
      c.printText(settings.eleSalesBall.value, c.ALIGNMENT_CENTER, c.FONT_SIZE_BIG)
      c.printText("-------------------", c.ALIGNMENT_LEFT, c.FONT_SIZE_MEDIUM1)
      c.printText("Pagamento apenas com esse cumpom. Caso seja sorteado tem até   8 DIAS   para receber !", c.ALIGNMENT_LEFT, c.FONT_SIZE_SMALL)
      c.execute()
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

    const setUp = function() {
      settings.eleCrCity = defaults.eleMain.querySelector(defaults.eleCrCity)
      settings.eleCrDate = defaults.eleMain.querySelector(defaults.eleCrDate)
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

      
      settings.eleDateSales = defaults.eleMain.querySelector(defaults.eleDateSales)
      settings.eleBodySales = defaults.eleMain.querySelector(defaults.eleBodySales)
      settings.eleSalesCity = defaults.eleMain.querySelector(defaults.eleSalesCity)
      settings.eleSalesTable = defaults.eleMain.querySelector(defaults.eleSalesTable)
      settings.eleSalesBall = defaults.eleMain.querySelector(defaults.eleSalesBall)
      settings.eleSalesCode = defaults.eleMain.querySelector(defaults.eleSalesCode)
      settings.eleSalesName = defaults.eleMain.querySelector(defaults.eleSalesName)
      settings.eleSalesDay = defaults.eleMain.querySelector(defaults.eleSalesDay)
      settings.eleSalesSort = defaults.eleMain.querySelector(defaults.eleSalesSort)
      settings.eleSalesPrint = defaults.eleMain.querySelector(defaults.eleSalesPrint)
    }

    const events = function() {
        window.addEventListener('load', main)
        window.addEventListener('click', main)
        settings.eleBtnCR.addEventListener('click', cResult)
        settings.eleSaveEdit.addEventListener('click', saveEdit)
        settings.eleSaveAdd.addEventListener('click', cUser)
        settings.eleDateSales.addEventListener('change', getSales)
        settings.eleSalesPrint.addEventListener('click', salesPrint)
    }

    const init = function(options) {
        if (!supports) return
        setUp()
        events()
    }

    init()
}(window, document))
}
else{
  window.location.href ='adm.html'
}