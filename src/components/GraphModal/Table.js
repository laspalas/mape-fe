import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import {
  Row,
  Col,
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardSubtitle,
  CardBody,
  CardText,
} from 'reactstrap';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('_12_2', 159, 6.0, 24, 4.0),
  createData('_12_2', 237, 9.0, 37, 4.3),
  createData('_12_2', 262, 16.0, 24, 6.0),
  createData('_12_2', 305, 3.7, 67, 4.3),
  createData('_12_2', 356, 16.0, 49, 3.9),
  createData('_12_2', 262, 16.0, 24, 6.0),
  createData('_12_2', 305, 3.7, 67, 4.3),
  createData('_12_2', 356, 16.0, 49, 3.9),
  createData('_12_2', 262, 16.0, 24, 6.0),
  createData('_12_2', 305, 3.7, 67, 4.3),
  createData('_12_2', 356, 16.0, 49, 3.9),
];

export default function BasicTable({ rows = [] }) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} style={{ maxHeight: '450px' }}>
      <Table
        stickyHeader
        stickyB
        className={classes.table}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell colSpan={2} align="center">
              Comb3
            </TableCell>
            <TableCell colSpan={2} align="center">
              Comb4
            </TableCell>
            <TableCell colSpan={2} align="center">
              Comb5
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={row.name}>
              <TableCell align="center">
                <Button color="link" variant="link">
                  {row[0].Indicators}
                </Button>
              </TableCell>
              <TableCell align="center">
                {row[0].spearmanValue.toFixed(3)}
              </TableCell>
              <TableCell align="center">
                <Button color="link" variant="link">
                  {row[1].Indicators}
                </Button>
              </TableCell>
              <TableCell align="center">
                {row[1].spearmanValue.toFixed(3)}
              </TableCell>
              <TableCell align="center">
                <Button color="link">{row[2].Indicators}</Button>
              </TableCell>
              <TableCell align="center">
                {row[2].spearmanValue.toFixed(3)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
