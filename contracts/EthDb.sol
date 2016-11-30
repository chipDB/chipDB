pragma solidity ^0.4.0;

contract EthDb {

  bytes32[][] tbl;
  bytes32[] tblEntry;
  bytes32[] tblTemp;

  // // Create
  function create (bytes32[] newRow) {
    tbl.push(newRow);
  }

  // // Read
	function readAll () returns(bytes32[] x) {
		for (uint i = 0; i < tbl.length; i++) {
			for (uint j = 0; j < tbl[i].length; j++) {
				tblTemp.push(tbl[i][j]);
			}
		}
		x = tblTemp;
		return x;
	}

  // // Edit
  function update (uint row, uint col, bytes32 value) {
		tbl[row][col] = value;
	}

  function tblLength () returns(uint) {
		return tbl.length;
	}

  // Delete:
  // http://ethereum.stackexchange.com/questions/1527/how-to-delete-an-element-at-a-certain-index-in-an-array

  function remove(uint index)  returns(uint[]) {
    if (index >= tbl.length) return;

    for (uint i = index; i<tbl.length-1; i++){
        tbl[i] = tbl[i+1];
    }
    delete tbl[tbl.length-1];
    tbl.length--;
  }
}