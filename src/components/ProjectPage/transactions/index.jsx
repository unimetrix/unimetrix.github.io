import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import Moment from 'react-moment';
import { urlState } from '../../../atome/atome';
import './index.scss';

function TablePaginationActions(props) {
  const theme = useTheme();
  const {
    // eslint-disable-next-line react/prop-types
    count, page, rowsPerPage, onPageChange,
  } = props;

  const handleFirstPageButtonClick = (
    event,
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 1 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

function Transaction() {
  const { id } = useParams();
  const [url] = useRecoilState(urlState);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const [transactions, setTransactions] = useState([]);
  async function getTransaction(projectId) {
    const res = await axios(`${url}/projects/${projectId}/transfers`);
    const txs = res.data
      .sort((p, n) => n.tokenId - p.tokenId)
      .sort((p, n) => new Date(n.time) - new Date(p.time));
    setTransactions(txs);
  }

  const style = {
    width: 100,
    maxWidth: 100,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    borderStyle: 'border-box',
  };

  useEffect(() => {
    getTransaction(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - transactions.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="transaction-container">
      {transactions.length ? (
        <TableContainer
          sx={{ fontFamily: "'Poppins, sans-serif" }}
          component={Paper}
        >
          <Table sx={{ borderRadius: '30px' }} aria-label="simple table">
            <TableHead sx={{ fontFamily: '"Poppins", "sans-serif"', backgroundColor: '#EEEEEEDD' }}>
              <TableRow>
                <TableCell align="left">Type of transaction</TableCell>
                <TableCell align="left">Hash of transaction</TableCell>
                <TableCell align="right">Token ID</TableCell>
                <TableCell align="right">From&nbsp;</TableCell>
                <TableCell align="right">To&nbsp;</TableCell>
                <TableCell align="right">TimeStamp&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? transactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : transactions
              ).map((transaction, index) => (
                <TableRow
                // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: '#F6F9FD' }}
                >
                  <TableCell sx={style} component="th" scope="row">
                    Transfer
                  </TableCell>
                  <TableCell sx={style} component="th" scope="row">
                    <a href={`https://starkscan.co/tx/${transaction.hash}`}>
                      {' '}
                      {transaction.hash?.slice(0, 10).concat('...')}
                    </a>

                  </TableCell>

                  <TableCell sx={style} align="right">{transaction.tokenId}</TableCell>
                  <TableCell sx={style} align="right">
                    <a href={`https://starkscan.co/contract/${transaction.from}`}>{transaction.from?.slice(0, 10).concat('...')}</a>
                    {' '}
                  </TableCell>
                  <TableCell sx={style} align="right">
                    <a href={`https://starkscan.co/contract/${transaction.to}`}>{transaction.to?.slice(0, 10).concat('...')}</a>
                    {' '}
                  </TableCell>
                  <TableCell sx={style} align="right">
                    <Moment format="DD-MM-YYYY hh:mm:ss">{transaction.time}</Moment>
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
              )}
            </TableBody>
            <TableFooter sx={{ width: '100%' }}>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={5}
                  count={transactions.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      ) : (
        <div />
      )}
    </div>

  );
}
export default Transaction;
