const web3 = require('@solana/web3.js')
const metaplex = require('@metaplex/js')
const metadata = require('./metadata.js')
const https = require('https')

const CryptoneNFT = {
    async getMetadataFromPk(pubkey) {
        // Connect to cluster.
        const connection = new web3.Connection(
            web3.clusterApiUrl('mainnet-beta'),
            'confirmed',
        )

        const pk = new web3.PublicKey(pubkey)
        const pIdPubKey = new web3.PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA')

        // Get all the tokens on the account.
        const accounts = await connection.getParsedTokenAccountsByOwner(pk, { programId: pIdPubKey })

        // Filter the NFT mint addresses.
        const nftAccounts = accounts.value
            .filter(a => a.account.data.parsed.info.tokenAmount.uiAmount === 1)
            .map(a => a.account.data.parsed.info.mint)

        const rawNFTAccountsData = await metaplex.programs.metadata.Metadata.getInfos(connection, nftAccounts);
        
        var cryptones = []
        for (let addr of rawNFTAccountsData.keys()) {
            const metaAcc = await metadata.getMetadataAccount(new web3.PublicKey(addr));
            const accInfo = await connection.getAccountInfo(new web3.PublicKey(metaAcc));

            decodedMetadata = metadata.decodeMetadata(accInfo.data)
            if (decodedMetadata['data']['uri'].includes('cdn.cryptone.zone')) {
                https.get(decodedMetadata['data']['uri'], (res) => {
                    res.setEncoding('utf8');
                    let output = '';
                    res.on('data', (chunk) => {
                        output += chunk;
                    });

                    res.on('end', () => {
                        let obj = JSON.parse(output);
                        cryptones.push({ hex: obj['description'], img: obj['image'] })
                    });
                })
            }
        }
        return cryptones
    }
}

module.exports = { CryptoneNFT }
