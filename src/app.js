const express = require('express')
const app = express()
const { CryptoneNFT } = require('./cryptone')

app.get('/cryptone/:publicKey', async (req, res) => {
    console.log(req.params)
    const cryptones = await CryptoneNFT.getMetadataFromPk(req.params.publicKey);
    console.log(cryptones)
    res.send(cryptones)
})

app.listen(5000, () => {
    console.log('Server listening on port 5000...')
})
