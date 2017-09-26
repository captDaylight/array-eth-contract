pragma solidity ^0.4.4;

contract Arbitration {
  string description;

  struct Claimant {
    string opinion;
    address addr;
    address arbiter;
  }

  Claimant[2] claimants;
  /*mapping(uint => Claimant) public claimants;*/

  function addClaimant(string opinion, address arbiter) {
    // TODO check that the amount of claimants isn't above 2
    claimants.push(Claimant(opinion, msg.sender, arbiter));
  }
}
