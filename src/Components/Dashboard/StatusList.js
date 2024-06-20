import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(AssetName, NumborOfOrders) {
  return { AssetName, NumborOfOrders };
}

const rows = [
  createData('Asset 1', 159),
  createData('Asset 2', 237),
  createData('Asset 3', 262),
  createData('Asset 4', 305),
  createData('Asset 5', 356),
];

export default function StatusList() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 200 }} size="small" >
        <TableHead>
          <TableRow>
            <TableCell>Asset Name</TableCell>
            <TableCell align="right">Numbor Of Orders</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.AssetName}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.AssetName}
              </TableCell>
              <TableCell align="right">{row.NumborOfOrders}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
