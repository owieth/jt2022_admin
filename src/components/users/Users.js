import {
  Avatar, Card, Container, Stack, Table, TableBody,
  TableCell, TableContainer,
  TablePagination, TableRow, Typography
} from '@mui/material';
import { filter } from 'lodash';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { UserMoreMenu, UserRow, UserWorkshopsDialog } from '.';
import { getCollection } from '../../service/firebase';
import Page from '../shared/Page';
import Scrollbar from '../shared/Scrollbar';
import WorkshopsSelector from '../shared/WorkshopsSelector';

const TABLE_HEAD = [
  { id: 'name', label: 'Name', },
  { id: 'region', label: 'Bezirk', },
  { id: 'muncipality', label: 'Gemeinde', },
  { id: 'workshops', label: 'Workshops', },
  { id: 'isVolunteer', label: 'Freiwilliger Helfer', },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Users() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('name');

  const [filterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(50);

  const [users, setUsers] = useState([]);

  const [workshops, setWorkshops] = useState([]);

  const [open, setOpen] = useState(false);

  const [workshopsToAssign, setWorkshopsToAssign] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getCollection("users");
      setUsers(users);
    }

    const fetchWorkshops = async () => {
      const workshops = await getCollection("workshops");
      setWorkshops(workshops);
    }

    fetchUsers();
    fetchWorkshops();
  }, [])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleWorkshopAssignment = (workshops) => {
    setWorkshopsToAssign(workshops);
    setOpen(true);
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  const filteredUsers = applySortFilter(users, getComparator(order, orderBy), filterName);

  return (
    <>
      {workshops.length > 0 && <Page title="Teilnehmer">
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Teilnehmer
            </Typography>
          </Stack>

          <Card sx={{ padding: 5 }}>
            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <UserRow
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={users.length}
                    onRequestSort={handleRequestSort}
                  />
                  <TableBody>
                    {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => {
                      const { id, name, email, photoUrl, region, muncipality, isVolunteer } = user;

                      const userWorkshops = workshops.filter((workshop) => workshop.attendees.includes(id));

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                        >
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar src={photoUrl} />
                              <Stack direction="column">
                                <Typography variant="subtitle2" noWrap>
                                  {name}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                  {email}
                                </Typography>
                              </Stack>
                            </Stack>
                          </TableCell>

                          <TableCell align="left">{region}</TableCell>

                          <TableCell align="left">{muncipality}</TableCell>

                          <TableCell align="right">
                            <WorkshopsSelector workshops={workshops} userWorkshops={userWorkshops} />
                          </TableCell>

                          <TableCell align="left">{isVolunteer ? 'Ja' : 'Nein'}</TableCell>

                          <TableCell align="right">
                            {/* <UserMoreMenu handleClose={() => handleWorkshopAssignment(userWorkshops)} disabled={userWorkshops.length <= 0}/> */}
                            <UserMoreMenu handleClose={() => handleWorkshopAssignment(userWorkshops)} />
                          </TableCell>
                        </TableRow>
                      );

                    })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Scrollbar>

            <TablePagination
              component="div"
              count={users.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        </Container>

        <UserWorkshopsDialog workshops={workshopsToAssign} open={open} handleClose={() => setOpen(false)} />

      </Page>}
    </>
  );
}
