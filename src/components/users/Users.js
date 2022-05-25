import {
  Card, Container, Stack, Table, TableBody,
  TableCell, TableContainer, Tooltip,
  TablePagination, TableRow, Typography, IconButton
} from '@mui/material';
import { useEffect, useState } from 'react';
import { CSVLink } from "react-csv";
import { TableHeaderRow, UserRow, UserWorkshopsDialog } from '.';
import { getCollection } from '../../service/firebase';
import Page from '../shared/Page';
import Scrollbar from '../shared/Scrollbar';
import Iconify from '../shared/Iconify';

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

function applySortFilter(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
}

export default function Users() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('name');

  const [rowsPerPage, setRowsPerPage] = useState(50);

  const [users, setUsers] = useState([]);

  const [user, setUser] = useState();

  const [workshops, setWorkshops] = useState([]);

  const [open, setOpen] = useState(false);

  const [workshopsToAssign, setWorkshopsToAssign] = useState([]);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const users = await getCollection("users");
      if (mounted) {
        setUsers(users);
      }
    })();

    (async () => {
      const workshops = await getCollection("workshops");
      if (mounted) {
        setWorkshops(workshops);
      }
    })();

    return () => mounted = false;
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

  const handleWorkshopAssignment = (workshops, userId) => {
    setUser(userId);
    setWorkshopsToAssign(workshops);
    setOpen(true);
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  const filteredUsers = applySortFilter(users, getComparator(order, orderBy));

  const headers = [
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Bezirk", key: "region" },
    { label: "Gemeinde", key: "muncipality" },
    { label: "Workshop 1", key: "workshop_1" },
    { label: "Workshop 2", key: "workshop_2" },
    { label: "Workshop 3", key: "workshop_3" },
    { label: "Workshop 4", key: "workshop_4" },
    { label: "Workshop 5", key: "workshop_5" },
    { label: "Workshop 6", key: "workshop_6" },
    { label: "Helfer", key: "isVolunteer" },
  ];

  const data = [];

  return (
    <>
      {workshops.length > 0 && <Page title="Teilnehmer">
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Teilnehmer
            </Typography>

            <CSVLink data={data} headers={headers} filename={"C4MP_Teilnehmer.csv"}>
              <Tooltip title="Export CSV">
                <span >
                  <IconButton>
                    <Iconify icon="eva:download-outline" width={20} height={20} />
                  </IconButton>
                </span>
              </Tooltip>
            </CSVLink>
          </Stack>

          <Card sx={{ padding: 5 }}>
            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <TableHeaderRow
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={users.length}
                    onRequestSort={handleRequestSort}
                  />
                  <TableBody>
                    {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => {
                      const { id, name, email, region, muncipality, isVolunteer } = user;
                      const userWorkshops = workshops.filter((workshop) => workshop.attendees.includes(id));
                      userWorkshops.sort((a, b) => user.workshops.indexOf(user.workshops.find(workshop => workshop.id === a.id)) - user.workshops.indexOf(user.workshops.find(workshop => workshop.id === b.id)));

                      data.push({
                        name,
                        email,
                        region,
                        muncipality,
                        workshop_1: userWorkshops[0]?.name,
                        workshop_2: userWorkshops[1]?.name,
                        workshop_3: userWorkshops[2]?.name,
                        workshop_4: userWorkshops[3]?.name,
                        workshop_5: userWorkshops[4]?.name,
                        workshop_6: userWorkshops[5]?.name,
                        isVolunteer,
                      });

                      return <UserRow key={id} user={user} workshops={workshops} userWorkshops={userWorkshops} handleWorkshopAssignment={handleWorkshopAssignment} />
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

        <UserWorkshopsDialog userId={user} workshops={workshopsToAssign} open={open} handleClose={() => setOpen(false)} />

      </Page>}
    </>
  );
}
