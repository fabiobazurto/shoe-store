import React from 'react';
import { styled } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { StoreShoeStock } from './../../models/store_shoe_stock';

//  Component which uses drag-n-drop activation when clicking inside the component
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`th`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`tbody`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function XgTable(props) {
  
  return (
    <Container>
    <TableContainer >
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead>
        <TableRow>
          {props.cols.map((col) => (	  
            <StyledTableCell aligh="left">{col}</StyledTableCell>
	  ))}
          <StyledTableCell align="right"></StyledTableCell>	  
        </TableRow>
      </TableHead>
      <TableBody>
           {props.rows.map((row) => (
             <StyledTableRow>
               <StyledTableCell  align="left" scope="row">
                 {row.store}
               </StyledTableCell>
               <StyledTableCell align="right">{row.model}</StyledTableCell>
 	      <StyledTableCell align="right">{row.inventory}</StyledTableCell>
 		  <StyledTableCell align="right"></StyledTableCell>
             </StyledTableRow>
           ))}
         </TableBody>
       </Table>
       </TableContainer>
       </Container>
   );
 }
