# Cryptone background generator

[This repository](https://github.com/debemdeboas/cryptone-background-generator) implements an API to the Solana blockchain that returns a list of Cryptone NFTs of a given wallet (public key).

## Usage

Server:

```
node src/app.js
```

Client:

```
curl -X GET <address>/cryptone/<public key>
```

### Example

To query all Cryptones from one of the developer's wallets:

```
curl localhost:5000/cryptone/Dmwq9JNfBaWqE2rFsrquz7kiDABLNF4816n8byNEcHah
```

Response:

```js
[
  { hex: '#d1902e', img: 'https://cdn.cryptone.zone/meta/821.png' },
  { hex: '#698538', img: 'https://cdn.cryptone.zone/meta/883.png' },
  { hex: '#d9dcdb', img: 'https://cdn.cryptone.zone/meta/122.png' },
  { hex: '#f5f0d1', img: 'https://cdn.cryptone.zone/meta/309.png' },
  { hex: '#ffb300', img: 'https://cdn.cryptone.zone/meta/957.png' }
]
```
