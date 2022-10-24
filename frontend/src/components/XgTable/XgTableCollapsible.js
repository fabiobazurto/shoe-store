import React from 'react';
import { styled } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Typography from '@material-ui/core/Typography';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


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

const cssStock = function(stock){
  if(stock.inventory<10 && stock.inventory!=-1){
    stock.bad_stock = true;
    return 'out-of-stock';
  }
  else{
    stock.bad_stock = false;
    return 'good-stock';
  }
}

function Row(props: { row: ReturnType<typeof StoreShoeStock > }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      <TableCell className={(row.bad_stock)?'out-of-stock':''}  component="th" scope="row">
          {row.title}
        </TableCell>
        <TableCell align="right">{row.title}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableBody>
                  {row.child_rows.map((childRow) => (
   		    <TableRow className={cssStock(childRow)} data-stock={childRow.inventory}>
		      <TableCell align="left">{childRow.model}</TableCell>
                      <TableCell align="right">
                      { (childRow.inventory==-1)? 'Not available...':childRow.inventory }
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}


export default function XgTableCollapsible(props) {
  
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
            <Row key={row.title} row={row} />
          ))}
        </TableBody>
      </Table>
	  </TableContainer>
	  </Container>
  );
}
