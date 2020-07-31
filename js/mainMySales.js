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


      eleBodySales: '#bodySales',

      eleSalesName: '#salesTname',
      eleSalesBall: '#salesTball',
      eleSalesValue: '#salesTvalue',
      eleSalesCode: '#salesTcode',
      eleSalesDay: '#salesTdate',
      eleSalesHora: '#salesThora',
      eleSalesSort: '#salesTsort',
    }

    const settings = {}

    const main = (event) => {

      if (event['type'] == 'load') {
        getSales()
      }

      if (event['type'] == 'click') {
        if (event.composedPath()['length'] == 20) {
          settings.eleSalesName.value = event.composedPath()[2]['cells'][0]['innerText']
          settings.eleSalesBall.value = event.composedPath()[2]['cells'][1]['innerText']
          settings.eleSalesValue.value = event.composedPath()[2]['cells'][2]['innerText']
          settings.eleSalesCode.value = event.composedPath()[2]['cells'][4]['innerText']
          settings.eleSalesDay.value = event.composedPath()[2]['cells'][5]['innerText']
          settings.eleSalesSort.value = event.composedPath()[2]['cells'][6]['innerText']
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


      localStorage.getItem('cambista')
      var queryTrue = "=QUERY(sales!A:I; #select * where B = '" + localStorage.getItem('cambista') + "' and G >= date '" + antes + "' and G <= date '" + hj + "' order by G ASC #)"
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

              th1Filho.innerHTML = 'Apostador'
              trFilho.appendChild(th1Filho)

              th2Filho.innerHTML = 'Bola'
              trFilho.appendChild(th2Filho)

              th3Filho.innerHTML = 'Valor'
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
                  var td1Filho = document.createElement('td') // Nome
                  var td2Filho = document.createElement('td') // Bola
                  var td3Filho = document.createElement('td') // Valor
                  var td4Filho = document.createElement('td')
                  var btnFilho = document.createElement('button')
                  var td5Filho = document.createElement('td') // Code
                  var td6Filho = document.createElement('td') // Date
                  var td7Filho = document.createElement('td') // Sort



                  td1Filho.hidden = false
                  td1Filho.innerHTML = JSON.parse(xhr.responseText)['data'][j]['name']
                  tr2Filho.appendChild(td1Filho)

                  td2Filho.hidden = false
                  td2Filho.innerHTML = String(JSON.parse(xhr.responseText)['data'][j]['ball']).padStart(3, '0')
                  tr2Filho.appendChild(td2Filho)

                  td3Filho.hidden = false
                  td3Filho.innerHTML = 'R$ ' + JSON.parse(xhr.responseText)['data'][j]['value'] + ',00'
                  tr2Filho.appendChild(td3Filho)

                  btnFilho.setAttribute('data-toggle', 'modal')
                  btnFilho.setAttribute('data-target', '#salesModal')
                  btnFilho.className = 'btn btn-info btn-xs'
                  btnFilho.innerHTML = 'Ver'
                  td4Filho.appendChild(btnFilho)
                  tr2Filho.appendChild(td4Filho)

                  td5Filho.hidden = true
                  td5Filho.innerHTML = JSON.parse(xhr.responseText)['data'][j]['code']
                  tr2Filho.appendChild(td5Filho)

                  td6Filho.hidden = true
                  td6Filho.innerHTML = JSON.parse(xhr.responseText)['data'][j]['date'].split('T')[0]
                  tr2Filho.appendChild(td6Filho)

                  td7Filho.hidden = true
                  td7Filho.innerHTML = JSON.parse(xhr.responseText)['data'][j]['sort'].split('T')[0]
                  tr2Filho.appendChild(td7Filho)

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

    const exit = () => {
      localStorage.removeItem('cambista')
      localStorage.removeItem('login')
      localStorage.removeItem('city')
      window.location.href = 'login.html'

    }

    const menu = () => {
      settings.eleMenu.classList.toggle('toggled')
      settings.eleIcon.classList.toggle('rotate-180')
    }

    const setUp = function () {
      settings.eleNav = defaults.eleMain.querySelector(defaults.eleNav)
      settings.eleIcon = defaults.eleMain.querySelector(defaults.eleIcon)
      settings.eleMenu = defaults.eleMain.querySelector(defaults.eleMenu)
      settings.eleSign = defaults.eleMain.querySelector(defaults.eleSign)


      settings.eleBodySales = defaults.eleMain.querySelector(defaults.eleBodySales)
      settings.eleSalesName = defaults.eleMain.querySelector(defaults.eleSalesName)
      settings.eleSalesBall = defaults.eleMain.querySelector(defaults.eleSalesBall)
      settings.eleSalesValue = defaults.eleMain.querySelector(defaults.eleSalesValue)
      settings.eleSalesCode = defaults.eleMain.querySelector(defaults.eleSalesCode)
      settings.eleSalesDay = defaults.eleMain.querySelector(defaults.eleSalesDay)
      settings.eleSalesHora = defaults.eleMain.querySelector(defaults.eleSalesHora)
      settings.eleSalesSort = defaults.eleMain.querySelector(defaults.eleSalesSort)

    }

    const events = function () {
      window.addEventListener('load', main)
      window.addEventListener('click', main)
      settings.eleNav.addEventListener('click', menu)
      settings.eleSign.addEventListener('click', exit)
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