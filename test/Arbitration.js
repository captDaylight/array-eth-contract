var Arbitration = artifacts.require('./Arbitration.sol');


contract('MetaCoin', function(accounts) {
  it('should be deployed', function() {
    return Arbitration.deployed().then((instance) => {
      return assert.match(instance.address, !/^(0x)?[0-9a-f]{40}$/i, 'matches')
    })
  });
});
