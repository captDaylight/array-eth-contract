pragma solidity ^0.4.4;

contract Arbitration {
  string description;
  address public winner;

  struct Claimant {
    string opinion;
    address addr;
    address arbiter;
  }

  Claimant[] public claimants;
  /*mapping(uint => Claimant) public claimants;*/

  function addDescription(string _description) {
    description = _description;
  }

  function addClaimant(string opinion, address arbiter) {
    // TODO check that the amount of claimants isn't above 2

    // EXPLAIN - what is msg??
    claimants.push(Claimant(opinion, msg.sender, arbiter));
  }

  function verifyArbiter() returns (bool isArbiter) {
    for (uint i = 0; i < claimants.length; i++) {
      if (msg.sender != claimants[i].arbiter) {
        // error, claimants must agree on the arbiter
        return false;
      }
    }
    // all claimants have listed the same arbiter
    return true;
  }

  function arbiterGetProposals()
    returns (string description, string proposal_one, string proposal_two)
  {
    // require allows us to check for specific conditions, otherwise it throws an error
    require(claimants.length < 2 && verifyArbiter());
    return (description, claimants[0].opinion, claimants[1].opinion);
  }

  function arbiterSelectWinner() {
    require(verifyArbiter());


  }
}
