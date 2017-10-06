var Arbitration = artifacts.require('./Arbitration.sol');

contract('Arbitration', function(accounts) {
  it('should be deployed', () => {
    return Arbitration.deployed().then((instance) => {
      return assert.match(instance.address, /^(0x)?[0-9a-f]{40}$/i)
    });
  });

  it('should set the description', () => {
    const description = 'What to eat for dinner';
    return Arbitration.deployed().then((instance) => {
      return instance.addDescription(description);
    }).then((res) => {
      return Arbitration.deployed().then((instance) => {
        return instance.description().then((res) => {
          return assert.equal(description, res);
        });
      })
    })
  });

  it('should add claimant one', () => {
    return Arbitration.deployed().then((instance) => {
      return instance.addClaimant('burrito', web3.eth.accounts[2], {from: web3.eth.accounts[0]});
    }).then((res) => {
      return Arbitration.deployed().then((instance) => {
        const mockResponse = ['burrito', web3.eth.accounts[0], web3.eth.accounts[2]]
        return instance.claimants(0).then((res) => {
          return assert.deepEqual(mockResponse, res);
        });
      });
    })
  });

  it('should add claimant two', () => {
    return Arbitration.deployed().then((instance) => {
      return instance.addClaimant('burrito', web3.eth.accounts[2], {from: web3.eth.accounts[1]});
    }).then((res) => {
      return Arbitration.deployed().then((instance) => {
        const mockResponse = ['burrito', web3.eth.accounts[1], web3.eth.accounts[2]]
        return instance.claimants(1).then((res) => {
          return assert.deepEqual(mockResponse, res);
        });
      });
    })
  });
});
