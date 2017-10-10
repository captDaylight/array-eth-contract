var Arbitration = artifacts.require('./Arbitration.sol');

const expectDescription = 'What to eat for dinner';
const expectOpinionOne = 'burrito';
const expectOpinionTwo = 'pizza';

contract('Arbitration', function(accounts) {
  it('should be deployed', () => {
    return Arbitration.deployed().then((instance) => {
      return assert.match(instance.address, /^(0x)?[0-9a-f]{40}$/i)
    });
  });

  it('should set the description', () => {

    return Arbitration.deployed().then((instance) => {
      return instance.addDescription(expectDescription);
    }).then((res) => {
      return Arbitration.deployed().then((instance) => {
        return instance.description().then((res) => {
          return assert.equal(expectDescription, res);
        });
      })
    })
  });

  it('should add claimant one', () => {
    return Arbitration.deployed().then((instance) => {
      return instance.addClaimant(expectOpinionOne, web3.eth.accounts[2], {from: web3.eth.accounts[0]});
    }).then((res) => {
      return Arbitration.deployed().then((instance) => {
        const expectedResponse = [expectOpinionOne, web3.eth.accounts[0], web3.eth.accounts[2]]
        return instance.claimants(0).then((res) => {
          return assert.deepEqual(expectedResponse, res);
        });
      });
    })
  });

  it('should add claimant two', () => {
    return Arbitration.deployed().then((instance) => {
      return instance.addClaimant(expectOpinionTwo, web3.eth.accounts[2], {from: web3.eth.accounts[1]});
    }).then((res) => {
      return Arbitration.deployed().then((instance) => {
        const expectedResponse = [expectOpinionTwo, web3.eth.accounts[1], web3.eth.accounts[2]]
        return instance.claimants(1).then((res) => {
          return assert.deepEqual(expectedResponse, res);
        });
      });
    })
  });

  it('should be able to get proposals if arbiter', () => {
    return Arbitration.deployed().then((instance) => {
      return instance.arbiterGetProposals.call({from: web3.eth.accounts[2]});
    }).then((res) => {
      const expectedResponse = [expectDescription, expectOpinionOne, expectOpinionTwo];
      return assert.deepEqual(expectedResponse, res);
    });
  });
});
