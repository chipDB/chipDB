pragma solidity ^0.4.0;

contract EthDb {

  bytes32[][] tbl;
  bytes32[] tableNames;
  // bytes32[] tblEntry;
  bytes32[] tblTemp;
  mapping (bytes32 => bytes32[][]) tables;

  // Test
  function test () returns (string) {
    return 'Boom!';
  }

  // Ensure map can store key with single array
  // mapping (string => bytes32[]) arrTest;

  // function testA () returns (bytes32[] x) {
  //   x = arrTest['a'];
  //   return x;
  // }

  // function addToArr () {
  //   arrTest['a'].push('testVal');
  // }

  // Ensure map can store key with nested array
  mapping (string => bytes32[][]) arrNestedTest;
  function testB () returns (bytes32[] x) {
    x = arrNestedTest['a'][0];
    return x;
  }

  bytes32[] y;
  function addToArrB () {
    arrNestedTest['a'].push(y);
    arrNestedTest['a'][0].push('TestNested');
  }

  // Create table
  function createTable (bytes32 tableName, bytes32[] schema, bytes32[] dataTypes) {
    tableNames.push(tableName);
    tables[tableName].push(schema);
    tables[tableName].push(dataTypes);
  }

  // Read full table
  function readTable (bytes32 tableName) returns (bytes32[]) {
    tables[tableName];
    for (uint i = 0; i < tables[tableName].length; i++) {
			for (uint j = 0; j < tables[tableName][i].length; j++) {
				tblTemp.push(tables[tableName][i][j]);
			}
		}
		return tblTemp;
  }

  function getTableNames () returns (bytes32[]) {
		return tableNames;
  }

  // Create row on table
  function createRow (bytes32 tableName, bytes32[] newRow) {
    if (tables[tableName].length == 0) { return; }
    tables[tableName].push(newRow);
  }

  // Get table's width
  function getTblWidth (bytes32 tableName) returns (uint) {
    return tables[tableName][0].length;
  }

  // Update the Table
  function updateTable (bytes32 tableName, bytes32 searchColName, bytes32 searchVal, bytes32 colName, bytes32 value) {
    int8 searchIndex = -1;
    int8 changeIndex = -1;

    for (uint i = 0; i < tables[tableName][0].length; i++) {
    if (tables[tableName][0][i] == searchColName) {
        searchIndex = int8(i);
      }
    if(tables[tableName][0][i] == colName) {
        changeIndex = int8(i);
      }
    }
   if (searchIndex == -1 || changeIndex == -1) { return; }

    for (uint j = 1; j < tables[tableName].length; j++) {
    if (tables[tableName][j][uint(searchIndex)] == searchVal) {
    tables[tableName][j][uint(changeIndex)] = value;
      }
    }
	}

function removeRow(bytes32 tableName, bytes32 searchColName, bytes32 searchVal) {
    int8 columnIndex = -1;

    for (uint i = 0; i < tables[tableName][0].length; i++) {
      if (tables[tableName][0][i] == searchColName) {
        columnIndex = int8(i);
      }
    }
    if (columnIndex == -1) return;

    for(uint j = 1; j < tables[tableName].length; j++) {
      if(tables[tableName][j][uint(columnIndex)] == searchVal) {
        removeRowHelper(tableName, j);
        j--;
      }
    }
  }

  function removeRowHelper(bytes32 tableName, uint index)  returns(uint[]) {
    if (index >= tables[tableName].length) return;

    for (uint i = index; i<tables[tableName].length-1; i++){
      tables[tableName][i] = tables[tableName][i+1];
    }
    delete tables[tableName][tables[tableName].length-1];
    tables[tableName].length--;
  }

  //Search Table

  function searchTable(bytes32 tableName, bytes32 colName, bytes32 value) returns(bytes32[]) {
    int8 index = -1;

    for (uint i = 0; i < tables[tableName][0].length; i++) {
      if (tables[tableName][0][i] == colName) {
        index = int8(i);
      }
    }

    if (index == -1) { return; }

    for (uint j = 1; j < tables[tableName].length; j++) {
      if (tables[tableName][j][uint(index)] == value) {
        for (uint k = 0; k < tables[tableName][j].length; k++) {
          tblTemp.push(tables[tableName][j][k]);
        }
      }
    }

    return tblTemp;
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

function remove(bytes32 searchColName, bytes32 searchVal) {
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