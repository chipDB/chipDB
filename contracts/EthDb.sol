pragma solidity ^0.4.0;

contract EthDb {

  bytes32[][] tbl;
  // bytes32[] tblEntry;
  bytes32[] tblTemp;

  // Test
  function test () returns (string) {
    return 'Boom!';
  }

  // // Create
  function create (bytes32[] newRow) {
    if (tbl.length == 0) { return; }
    tbl.push(newRow);
  }

  //Schema
  function createSchema (bytes32[] newRow) {
    if (tbl.length > 0) { return; }
    tbl.push(newRow);
  }

  //Get Schema for width and rendering
  function getTableWidth () returns (uint) {
    return tbl[0].length;
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

  function update (bytes32 searchColName, bytes32 searchVal, bytes32 colName, bytes32 value) {
    int8 searchIndex = -1;
    int8 changeIndex = -1;

    for (uint i = 0; i < tbl[0].length; i++) {
      if (tbl[0][i] == searchColName) {
        searchIndex = int8(i);
      }
      if(tbl[0][i] == colName) {
        changeIndex = int8(i);
      }
    }
   if (searchIndex == -1 || changeIndex == -1) { return; }

    for (uint j = 1; j < tbl.length; j++) {
      if (tbl[j][uint(searchIndex)] == searchVal) {
        tbl[j][uint(changeIndex)] = value;
      }
    }
	}

  function tblLength () returns(uint) {
		return tbl.length;
	}

  // Delete:
  // http://ethereum.stackexchange.com/questions/1527/how-to-delete-an-element-at-a-certain-index-in-an-array
function remove(bytes32 searchColName, bytes32 searchVal)  returns(uint[]) {
    int8 columnIndex = -1;

    for (uint i = 0; i < tbl[0].length; i++) {
      if (tbl[0][i] == searchColName) {
        columnIndex = int8(i);
      }
    }
    if (columnIndex == -1) return;

    for(uint j = 1; j < tbl.length; j++) {
      if(tbl[j][uint(columnIndex)] == searchVal) {
        removeHelper(j);
        j--;
      }
    }
  }

  function removeHelper(uint index)  returns(uint[]) {
    if (index >= tbl.length) return;

    for (uint i = index; i<tbl.length-1; i++){
      tbl[i] = tbl[i+1];
    }
    delete tbl[tbl.length-1];
    tbl.length--;
  }

  //Search

  function search(bytes32 colName, bytes32 value) returns(bytes32[] x) {
    int8 index = -1;

    for (uint i = 0; i < tbl[0].length; i++) {
      if (tbl[0][i] == colName) {
        index = int8(i);
      }
    }

    if (index == -1) { return; }

    for (uint j = 1; j < tbl.length; j++) {
      if (tbl[j][uint(index)] == value) {
        for (uint k = 0; k < tbl[j].length; k++) {
          tblTemp.push(tbl[j][k]);
        }
      }
    }

    x = tblTemp;
		return x;

  }

}