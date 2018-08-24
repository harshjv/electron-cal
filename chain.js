const $ = require('jquery')
const { Client } = require('chainabstractionlayer')
const dsn = window.location.search.substring(5)
$('#url').text(dsn)
const client = new Client(dsn)
const provider = client._providers[0]

$('#call').click(function () {
  const cmd = $('#command').val()
  const args = $('#args').val()
  const arr = JSON.parse(args) || []
  provider.rpc(cmd, ...arr).then(data => {
    $('#response').html(JSON.stringify(data, null, 2))
  })
})
