/* ****************************************************************
 * test/config.js is left out for security reasons.  It should be in the form
 * where REDACTED is replaced by you AWS keys
module.exports={
    wallet: {
        user:   'REDACTED',
        pass:   'REDACTED',
        host:   '127.0.0.1',
        port:   14022,
        secret:	"REDACTED"
    }
};
**************************************************************** */
const DigiByteRPC = require('../index');
let config;
try {
    config=require('./config');
} catch (e) {
    throw "Config not found";
}

const expect    = require("chai").expect;


describe("getAddressesByLabel",function() {
    this.timeout(20000);
    it('label that likely exists', async function() {
        let wallet = new DigiByteRPC(config.wallet.user, config.wallet.pass, config.wallet.host, config.wallet.port);
        try {
            expect(Object.keys(await wallet.getAddressesByLabel("")).length).greaterThan(0);
        } catch (e) {
            console.log("No blank label");
            expect(e.code).to.equal(-11);
        }
    });
    it('label that likely does not exist', async function() {
        let wallet = new DigiByteRPC(config.wallet.user, config.wallet.pass, config.wallet.host, config.wallet.port);
        try {
            await wallet.getAddressesByLabel("sjbdfsmjgbufxdgbxg");
            console.log("Wow you actually have sjbdfsmjgbufxdgbxg as a label");
            expect("").to.equal("");
        } catch (e) {
            expect(e.code).to.equal(-11);
        }
    });
});