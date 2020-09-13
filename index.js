const got=require('got');
class DigiByteRPC {

    /**
     *
     * @param {string}  user
     * @param {string}  pass
     * @param {string}  host
     * @param {int}     port
     */
    constructor(user,pass,host='localhost',port=14022) {
        this._uri = `http://${encodeURIComponent(user)}:${encodeURIComponent(pass)}@${host}:${port}/`;
        this.filterClear();
        this.autoClear=true;
        this._retry=0;
    }

    /**
     * If set to true clears filter after every call
     * @param {boolean} value
     */
    set autoClear(value) {
        this._autoClear=value;
    }

    /**
     * Sets the number of retries
     * @param {int} value
     */
    set retry(value) {
        this._retry=value;
    }

    /**
     * Sets the number of retries
     * @return {int}
     */
    get retry() {
        return this._retry;
    }


    /**
     * Allows you to set a custom filter converting the string to json value
     * If not set will do JSON.parse(body)
     * @param {function(body)}  filter
     */
    set filter(filter) {
        this._filter=filter;
    }

    /**
     * Clears the filter
     */
    filterClear() {
        this._filter=(body)=>{return JSON.parse(body);};
    }



    async call() {
        //process parameters
        let method = arguments[0];
        let params = [...arguments].splice(1);

        //make request of wallet
        let response=await got.post(this._uri,{
            json: {
                "jsonrpc":	"1.0",
                "id":		"curltext",
                "method":	method,
                "params":	params
            },
            retry:			this._retry
        });

        //handle response
        if (response.statusCode !== 200) throw new Error("Wallet responded with error("+response.statusCode+")");	//handle communication errors
        const data = this._filter(response.body);						//decode body
        if (this._autoClear) this.filterClear();                        //clear filter if auto clear
        if (data.error!=null) throw new Error(data.error);		        //handle returned errors
        return data.result;

    }




    /*
    ███╗   ███╗███████╗████████╗██╗  ██╗ ██████╗ ██████╗ ███████╗
    ████╗ ████║██╔════╝╚══██╔══╝██║  ██║██╔═══██╗██╔══██╗██╔════╝
    ██╔████╔██║█████╗     ██║   ███████║██║   ██║██║  ██║███████╗
    ██║╚██╔╝██║██╔══╝     ██║   ██╔══██║██║   ██║██║  ██║╚════██║
    ██║ ╚═╝ ██║███████╗   ██║   ██║  ██║╚██████╔╝██████╔╝███████║
    ╚═╝     ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝
    bitcoin v0.18
     */

    /*___ _         _      _         _        ___ ___  ___
     | _ ) |___  __| |____| |_  __ _(_)_ _   | _ \ _ \/ __|___
     | _ \ / _ \/ _| / / _| ' \/ _` | | ' \  |   /  _/ (__(_-<
     |___/_\___/\__|_\_\__|_||_\__,_|_|_||_| |_|_\_|  \___/__/
     */
    async getBestBlockHash(){
        return this.call('getbestblockhash',...(Array.from(arguments)));
    }

    async getBlock(){
        return this.call('getblock',...(Array.from(arguments)));
    }

    async getBlockChainInfo(){
        return this.call('getblockchaininfo',...(Array.from(arguments)));
    }

    async getBlockCount(){
        return this.call('getblockcount',...(Array.from(arguments)));
    }

    async getBlockHash(){
        return this.call('getblockhash',...(Array.from(arguments)));
    }

    async getBlockHeader(){
        return this.call('getblockheader',...(Array.from(arguments)));
    }

    async getBlockStats(){
        return this.call('getblockstats',...(Array.from(arguments)));
    }

    async getChainTips(){
        return this.call('getchaintips',...(Array.from(arguments)));
    }

    async getChainTxStats(){
        return this.call('getchaintxstats',...(Array.from(arguments)));
    }

    async getDifficulty(){
        return this.call('getdifficulty',...(Array.from(arguments)));
    }

    async getMempoolAncestors(){
        return this.call('getmempoolancestors',...(Array.from(arguments)));
    }

    async getMempoolDescendants(){
        return this.call('getmempooldescendants',...(Array.from(arguments)));
    }

    async getMempoolEntry(){
        return this.call('getmempoolentry',...(Array.from(arguments)));
    }

    async getMempoolInfo(){
        return this.call('getmempoolinfo',...(Array.from(arguments)));
    }

    async getRawMempool(){
        return this.call('getrawmempool',...(Array.from(arguments)));
    }

    async getTxOut(){
        return this.call('gettxout',...(Array.from(arguments)));
    }

    async getTxOutProof(){
        return this.call('gettxoutproof',...(Array.from(arguments)));
    }

    async getTxOutSetInfo(){
        return this.call('gettxoutsetinfo',...(Array.from(arguments)));
    }

    async preciousBlock(){
        return this.call('preciousblock',...(Array.from(arguments)));
    }

    async pruneBlockChain(){
        return this.call('pruneblockchain',...(Array.from(arguments)));
    }

    async saveMempool(){
        return this.call('savemempool',...(Array.from(arguments)));
    }

    async scanTxOutSet(){
        return this.call('scantxoutset',...(Array.from(arguments)));
    }

    async verifyChain(){
        return this.call('verifychain',...(Array.from(arguments)));
    }

    async verifyTxOutProof(){
        return this.call('verifytxoutproof',...(Array.from(arguments)));
    }



    /* ___         _           _   ___ ___  ___
      / __|___ _ _| |_ _ _ ___| | | _ \ _ \/ __|___
     | (__/ _ \ ' \  _| '_/ _ \ | |   /  _/ (__(_-<
      \___\___/_||_\__|_| \___/_| |_|_\_|  \___/__/
    */

    async getMemoryInfo(){
        return this.call('getmemoryinfo',...(Array.from(arguments)));
    }

    async getRpcInfo(){
        return this.call('getrpcinfo',...(Array.from(arguments)));
    }

    async help(){
        return this.call('help',...(Array.from(arguments)));
    }

    async logging(){
        return this.call('logging',...(Array.from(arguments)));
    }

    async stop(){
        return this.call('stop',...(Array.from(arguments)));
    }

    async upTime(){
        return this.call('uptime',...(Array.from(arguments)));
    }



    /* ___                       _   _             ___ ___  ___
      / __|___ _ _  ___ _ _ __ _| |_(_)_ _  __ _  | _ \ _ \/ __|___
     | (_ / -_) ' \/ -_) '_/ _` |  _| | ' \/ _` | |   /  _/ (__(_-<
      \___\___|_||_\___|_| \__,_|\__|_|_||_\__, | |_|_\_|  \___/__/
                                           |___/
    */

    async generate(){
        return this.call('generate',...(Array.from(arguments)));
    }

    async generateToAddress(){
        return this.call('generatetoaddress',...(Array.from(arguments)));
    }




    /*__  __ _      _             ___ ___  ___
     |  \/  (_)_ _ (_)_ _  __ _  | _ \ _ \/ __|___
     | |\/| | | ' \| | ' \/ _` | |   /  _/ (__(_-<
     |_|  |_|_|_||_|_|_||_\__, | |_|_\_|  \___/__/
                          |___/
    */

    async getBlockTemplate(){
        return this.call('getblocktemplate',...(Array.from(arguments)));
    }

    async getMiningInfo(){
        return this.call('getmininginfo',...(Array.from(arguments)));
    }

    async getNetworkHashps(){
        return this.call('getnetworkhashps',...(Array.from(arguments)));
    }

    async prioritiseTransaction(){
        return this.call('prioritisetransaction',...(Array.from(arguments)));
    }

    async submitBlock(){
        return this.call('submitblock',...(Array.from(arguments)));
    }

    async submitHeader(){
        return this.call('submitheader',...(Array.from(arguments)));
    }




    /*_  _     _                  _     ___ ___  ___
     | \| |___| |___ __ _____ _ _| |__ | _ \ _ \/ __|___
     | .` / -_)  _\ V  V / _ \ '_| / / |   /  _/ (__(_-<
     |_|\_\___|\__|\_/\_/\___/_| |_\_\ |_|_\_|  \___/__/
    */

    async addNode(){
        return this.call('addnode',...(Array.from(arguments)));
    }

    async clearBanned(){
        return this.call('clearbanned',...(Array.from(arguments)));
    }

    async disconnectNode(){
        return this.call('disconnectnode',...(Array.from(arguments)));
    }

    async getAddedNodeInfo(){
        return this.call('getaddednodeinfo',...(Array.from(arguments)));
    }

    async getConnectionCount(){
        return this.call('getconnectioncount',...(Array.from(arguments)));
    }

    async getNetTotals(){
        return this.call('getnettotals',...(Array.from(arguments)));
    }

    async getNetworkInfo(){
        return this.call('getnetworkinfo',...(Array.from(arguments)));
    }

    async getNodeAddresses(){
        return this.call('getnodeaddresses',...(Array.from(arguments)));
    }

    async getPeerInfo(){
        return this.call('getpeerinfo',...(Array.from(arguments)));
    }

    async listBanned(){
        return this.call('listbanned',...(Array.from(arguments)));
    }

    async ping(){
        return this.call('ping',...(Array.from(arguments)));
    }

    async setBan(){
        return this.call('setban',...(Array.from(arguments)));
    }

    async setNetworkActive(){
        return this.call('setnetworkactive',...(Array.from(arguments)));
    }




    /*___             _                             _   _               ___ ___  ___
     | _ \__ ___ __ _| |_ _ _ __ _ _ _  ___ __ _ __| |_(_)___ _ _  ___ | _ \ _ \/ __|___
     |   / _` \ V  V /  _| '_/ _` | ' \(_-</ _` / _|  _| / _ \ ' \(_-< |   /  _/ (__(_-<
     |_|_\__,_|\_/\_/ \__|_| \__,_|_||_/__/\__,_\__|\__|_\___/_||_/__/ |_|_\_|  \___/__/
    */

    async analyzePsbt(){
        return this.call('analyzepsbt',...(Array.from(arguments)));
    }

    async combinePsbt(){
        return this.call('combinepsbt',...(Array.from(arguments)));
    }

    async combineRawTransaction(){
        return this.call('combinerawtransaction',...(Array.from(arguments)));
    }

    async convertToPsbt(){
        return this.call('converttopsbt',...(Array.from(arguments)));
    }

    async createPsbt(){
        return this.call('createpsbt',...(Array.from(arguments)));
    }

    async createRawTransaction(){
        return this.call('createrawtransaction',...(Array.from(arguments)));
    }

    async decodePsbt(){
        return this.call('decodepsbt',...(Array.from(arguments)));
    }

    async decodeRawTransaction(){
        return this.call('decoderawtransaction',...(Array.from(arguments)));
    }

    async decodeScript(){
        return this.call('decodescript',...(Array.from(arguments)));
    }

    async finalizePsbt(){
        return this.call('finalizepsbt',...(Array.from(arguments)));
    }

    async fundRawTransaction(){
        return this.call('fundrawtransaction',...(Array.from(arguments)));
    }

    async getRawTransaction(){
        return this.call('getrawtransaction',...(Array.from(arguments)));
    }

    async joinPsbts(){
        return this.call('joinpsbts',...(Array.from(arguments)));
    }

    async sendRawTransaction(){
        return this.call('sendrawtransaction',...(Array.from(arguments)));
    }

    async signRawTransactionWithKey(){
        return this.call('signrawtransactionwithkey',...(Array.from(arguments)));
    }

    async testMempoolAccept(){
        return this.call('testmempoolaccept',...(Array.from(arguments)));
    }

    async utxoUpdatePsbt(){
        return this.call('utxoupdatepsbt',...(Array.from(arguments)));
    }




    /*_   _ _   _ _   ___ ___  ___
     | | | | |_(_) | | _ \ _ \/ __|___
     | |_| |  _| | | |   /  _/ (__(_-<
      \___/ \__|_|_| |_|_\_|  \___/__/
    */

    async createMultisig(){
        return this.call('createmultisig',...(Array.from(arguments)));
    }

    async deriveAddresses(){
        return this.call('deriveaddresses',...(Array.from(arguments)));
    }

    async estimateSmartFee(){
        return this.call('estimatesmartfee',...(Array.from(arguments)));
    }

    async getDescriptorInfo(){
        return this.call('getdescriptorinfo',...(Array.from(arguments)));
    }

    async signMessageWithPrivKey(){
        return this.call('signmessagewithprivkey',...(Array.from(arguments)));
    }

    async validateAddress(){
        return this.call('validateaddress',...(Array.from(arguments)));
    }

    async verifyMessage(){
        return this.call('verifymessage',...(Array.from(arguments)));
    }




    /*_      __    _ _     _     ___ ___  ___
     \ \    / /_ _| | |___| |_  | _ \ _ \/ __|___
      \ \/\/ / _` | | / -_)  _| |   /  _/ (__(_-<
       \_/\_/\__,_|_|_\___|\__| |_|_\_|  \___/__/
    */

    async abandonTransaction(){
        return this.call('abandontransaction',...(Array.from(arguments)));
    }

    async abortRescan(){
        return this.call('abortrescan',...(Array.from(arguments)));
    }

    async addMultisigAddress(){
        return this.call('addmultisigaddress',...(Array.from(arguments)));
    }

    async backupWallet(){
        return this.call('backupwallet',...(Array.from(arguments)));
    }

    async bumpFee(){
        return this.call('bumpfee',...(Array.from(arguments)));
    }

    async createWallet(){
        return this.call('createwallet',...(Array.from(arguments)));
    }

    async dumpPrivKey(){
        return this.call('dumpprivkey',...(Array.from(arguments)));
    }

    async dumpWallet(){
        return this.call('dumpwallet',...(Array.from(arguments)));
    }

    async encryptWallet(){
        return this.call('encryptwallet',...(Array.from(arguments)));
    }

    async getAddressesByLabel(){
        return this.call('getaddressesbylabel',...(Array.from(arguments)));
    }

    async getAddressInfo(){
        return this.call('getaddressinfo',...(Array.from(arguments)));
    }

    async getBalance(){
        return this.call('getbalance',...(Array.from(arguments)));
    }

    async getNewAddress(){
        return this.call('getnewaddress',...(Array.from(arguments)));
    }

    async getRawChangeAddress(){
        return this.call('getrawchangeaddress',...(Array.from(arguments)));
    }

    async getReceivedByAddress(){
        return this.call('getreceivedbyaddress',...(Array.from(arguments)));
    }

    async getReceivedByLabel(){
        return this.call('getreceivedbylabel',...(Array.from(arguments)));
    }

    async getTransaction(){
        return this.call('gettransaction',...(Array.from(arguments)));
    }

    async getUnconfirmedBalance(){
        return this.call('getunconfirmedbalance',...(Array.from(arguments)));
    }

    async getWalletInfo(){
        return this.call('getwalletinfo',...(Array.from(arguments)));
    }

    async importAddress(){
        return this.call('importaddress',...(Array.from(arguments)));
    }

    async importMulti(){
        return this.call('importmulti',...(Array.from(arguments)));
    }

    async importPrivKey(){
        return this.call('importprivkey',...(Array.from(arguments)));
    }

    async importPrunedFunds(){
        return this.call('importprunedfunds',...(Array.from(arguments)));
    }

    async importPubKey(){
        return this.call('importpubkey',...(Array.from(arguments)));
    }

    async importWallet(){
        return this.call('importwallet',...(Array.from(arguments)));
    }

    async keyPoolRefill(){
        return this.call('keypoolrefill',...(Array.from(arguments)));
    }

    async listAddressGroupings(){
        return this.call('listaddressgroupings',...(Array.from(arguments)));
    }

    async listLabels(){
        return this.call('listlabels',...(Array.from(arguments)));
    }

    async listLockUnspent(){
        return this.call('listlockunspent',...(Array.from(arguments)));
    }

    async listReceivedByAddress(){
        return this.call('listreceivedbyaddress',...(Array.from(arguments)));
    }

    async listReceivedByLabel(){
        return this.call('listreceivedbylabel',...(Array.from(arguments)));
    }

    async listSinceBlock(){
        return this.call('listsinceblock',...(Array.from(arguments)));
    }

    async listTransactions(){
        return this.call('listtransactions',...(Array.from(arguments)));
    }

    async listUnspent(){
        return this.call('listunspent',...(Array.from(arguments)));
    }

    async listWalletDir(){
        return this.call('listwalletdir',...(Array.from(arguments)));
    }

    async listWallets(){
        return this.call('listwallets',...(Array.from(arguments)));
    }

    async loadWallet(){
        return this.call('loadwallet',...(Array.from(arguments)));
    }

    async lockUnspent(){
        return this.call('lockunspent',...(Array.from(arguments)));
    }

    async removePrunedFunds(){
        return this.call('removeprunedfunds',...(Array.from(arguments)));
    }

    async rescanBlockChain(){
        return this.call('rescanblockchain',...(Array.from(arguments)));
    }

    async sendMany(){
        return this.call('sendmany',...(Array.from(arguments)));
    }

    async sendToAddress(){
        return this.call('sendtoaddress',...(Array.from(arguments)));
    }

    async setHdSeed(){
        return this.call('sethdseed',...(Array.from(arguments)));
    }

    async setLabel(){
        return this.call('setlabel',...(Array.from(arguments)));
    }

    async setTxFee(){
        return this.call('settxfee',...(Array.from(arguments)));
    }

    async signMessage(){
        return this.call('signmessage',...(Array.from(arguments)));
    }

    async signRawTransactionWithWallet(){
        return this.call('signrawtransactionwithwallet',...(Array.from(arguments)));
    }

    async unloadWallet(){
        return this.call('unloadwallet',...(Array.from(arguments)));
    }

    async walletCreateFundedPsbt(){
        return this.call('walletcreatefundedpsbt',...(Array.from(arguments)));
    }

    async walletLock(){
        return this.call('walletlock',...(Array.from(arguments)));
    }

    async walletPassPhrase(){
        return this.call('walletpassphrase',...(Array.from(arguments)));
    }

    async walletPassPhraseChange(){
        return this.call('walletpassphrasechange',...(Array.from(arguments)));
    }

    async walletProcessPsbt(){
        return this.call('walletprocesspsbt',...(Array.from(arguments)));
    }
}
module.exports = DigiByteRPC;