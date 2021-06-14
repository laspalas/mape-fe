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

export default function BasicTable({ rows = [], onClickCell }) {
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
              <TableCell
                onClick={() => {
                  onClickCell(row[0].Indicators);
                }}
                align="center"
              >
                <Button color="link" variant="link">
                  {row[0].Indicators}
                </Button>
              </TableCell>
              <TableCell align="center">
                {row[0].spearmanValue.toFixed(3)}
              </TableCell>
              <TableCell
                onClick={() => {
                  onClickCell(row[1].Indicators);
                }}
                align="center"
              >
                <Button color="link" variant="link">
                  {row[1].Indicators}
                </Button>
              </TableCell>
              <TableCell align="center">
                {row[1].spearmanValue.toFixed(3)}
              </TableCell>
              <TableCell
                onClick={() => {
                  onClickCell(row[2].Indicators);
                }}
                align="center"
              >
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
