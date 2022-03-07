//here the event starts
module.exports = (client, id) => {
    const moment = require("moment")

require('moment-duration-format')
    moment.locale("tr")
    var tarih = [moment().format('YYYY-MM-DD | H:mm:ss')]
    console.log(` || <==> || [ Tarih: ${tarih}] || <==> || Shard #${id} Hazır || <==> ||`)
}