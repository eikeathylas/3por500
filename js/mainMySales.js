var mode = localStorage.getItem('login')
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
        eleNav: '#sidebarToggleTop',
        eleMenu: '#accordionSidebar',
        eleIcon: '#iconmenu',
        eleSign: '#sign-out',

        
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

      if(event['type'] == 'click'){
        if(event.composedPath()['length'] == 17){
          settings.eleSalesCity.value = event.composedPath()[2]['children'][0]['textContent']
          settings.eleSalesTable.value = event.composedPath()[2]['children'][1]['textContent']
          settings.eleSalesBall.value = event.composedPath()[2]['children'][2]['textContent']
          settings.eleSalesCode.value = event.composedPath()[2]['children'][3]['textContent']
          settings.eleSalesName.value = event.composedPath()[2]['children'][4]['textContent']
          settings.eleSalesDay.value = event.composedPath()[2]['children'][5]['textContent']
        }
      }
    }

    const getSales = (event) => {
        localStorage.getItem('cambista')
      var queryTrue = "=QUERY(sales!A:G; #select * where B = '"+ localStorage.getItem('cambista') +"'#)"
      var xhr = new XMLHttpRequest()
      xhr.open("POST", 'https://script.google.com/macros/s/AKfycbwkz-3LOYkx7RI9j0osi6O3ELvc0e4Mm514oGyH4JwB3-5_hgk/exec', false)
      xhr.send(JSON.stringify({
          method: "PUT",
          sheet: "vendas",
          id: 2,
          payload: {
              query: queryTrue.replace('#', '"').replace('#', '"')
            }
          }))
          
      var xhr = new XMLHttpRequest()
      xhr.open("POST", 'https://script.google.com/macros/s/AKfycbwkz-3LOYkx7RI9j0osi6O3ELvc0e4Mm514oGyH4JwB3-5_hgk/exec', false)
      xhr.send(JSON.stringify({
        method: "WHEREGET",
        sheet: "vendas"
      }))

      var table = document.createElement('table')
      var thead = document.createElement('thead')
      var tr = document.createElement('tr')
      var th1 = document.createElement('th')
      var th3 = document.createElement('th')
      var th4 = document.createElement('th')

      th1.innerHTML = 'Bola'
      tr.appendChild(th1)
      th3.innerHTML = 'Nome'
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
        var td4 = document.createElement('td')
        var td5 = document.createElement('td')
        var td6 = document.createElement('td')
        var td7 = document.createElement('td')
        var td8 = document.createElement('td')
        var td9 = document.createElement('td')
        var button = document.createElement('button')

        td2.hidden = true
        td2.innerHTML = JSON.parse(xhr.responseText)['data'][k]['city']
        tr2.appendChild(td2)
        td4.hidden = false
        td4.innerHTML = String(JSON.parse(xhr.responseText)['data'][k]['ball']).padStart(3, '0')
        tr2.appendChild(td4)
        td5.hidden = true
        td5.innerHTML = JSON.parse(xhr.responseText)['data'][k]['code']
        tr2.appendChild(td5)
        td6.hidden = false
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
    
    const exit = () => {
        localStorage.removeItem('cambista')
        localStorage.removeItem('login')
        localStorage.removeItem('city')
        window.location.href ='login.html'
  
      }
    
    const menu = () => {
        settings.eleMenu.classList.toggle('toggled')
        settings.eleIcon.classList.toggle('rotate-180')
    }

    const setUp = function() {
        settings.eleNav = defaults.eleMain.querySelector(defaults.eleNav)
        settings.eleIcon = defaults.eleMain.querySelector(defaults.eleIcon)
        settings.eleMenu = defaults.eleMain.querySelector(defaults.eleMenu)
        settings.eleSign = defaults.eleMain.querySelector(defaults.eleSign)

        
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
        settings.eleNav.addEventListener('click', menu)
        settings.eleSign.addEventListener('click', exit)
        settings.eleDateSales.addEventListener('change', getSales)
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
  window.location.href ='login.html'
}