import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import './reportsTable.css';

const ReportsTable = props => {
  // const dispatch = useDispatch();

  // const config = {
  //   headers: {
  //     authorization: props.token,
  //   },
  // };

  let cols;
  let width;
  if (props.path === 'products') {
    width = '100%';
    cols = [
      {
        field: 'position',
        headerName: '#',
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        sortable: false,
        // editable: false,
      },
      {
        field: 'name',
        headerName: 'Product Name',
        flex: 1,
        sortable: false,
        // disableExtendRowFullWidth: true,
        headerAlign: 'center',
        align: 'center',
        renderCell: ({ row }) => {
          return (
            <div>
              <span>{`${row.name.english}`}</span> -
              <span>{`${row.name.arabic}`}</span>
            </div>
          );
        },
      },
      {
        field: 'count',
        headerName: 'Orders Count',
        flex: 1,

        headerAlign: 'center',
        align: 'center',
        // renderCell: ({ row }) => {
        //   return (
        //     <div>
        //       <p>{`${row.name.english}`}</p>
        //       <p>{`${row.name.arabic}`}</p>
        //     </div>
        //   );
        // },
      },
    ];
  }
  // {
  //           firstName: obj._id.firstName,
  //           lastName: obj._id.lastName,
  //           phone: obj._id.phone,
  //           email: obj._id.email,
  //           count: obj.count,
  //           totalAmount: obj.totalAmount,
  //           position: i + 1,
  //         };
  if (props.path === 'customers') {
    width = '100%';
    cols = [
      {
        field: 'position',
        headerName: '#',
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        sortable: false,
      },
      {
        field: 'firstName',
        headerName: 'Customer Name',
        flex: 1,

        headerAlign: 'center',
        align: 'center',
        renderCell: ({ row }) => {
          return (
            <div>
              <span>{`${row.firstName}`}</span> -
              <span>{`${row.lastName}`}</span>
            </div>
          );
        },
      },
      {
        field: 'phone',
        headerName: 'Contact',
        flex: 1,

        headerAlign: 'center',
        align: 'center',
        renderCell: ({ row }) => {
          return (
            <div>
              <p>{`${row.phone}`}</p>
              <p>{`${row.email}`}</p>
            </div>
          );
        },
      },
      {
        field: 'totalAmount',
        headerName: 'Total Amount',
        flex: 1,

        headerAlign: 'center',
        align: 'center',
      },
      {
        field: 'count',
        headerName: 'Products',
        flex: 1,

        headerAlign: 'center',
        align: 'center',
      },
    ];
  }
  return (
    <Box sx={{ height: 450, width: '100%' }}>
      <DataGrid
      className='min-h-[60vh]'
        rows={props.data}
        columns={cols}
        pageSize={6}
        rowsPerPageOptions={[6]}
        disableSelectionOnClick={true}
        experimentalFeatures={{
          newEditingApi: true,
        }}
        sx={{
          '& .MuiDataGrid-row': {
            minHeight: '10rem !important',
            maxHeight: '10rem !important',
          },
          '& .MuiDataGrid-main': {
            borderRadius: '1.5rem !important',
          },
          '& .MuiDataGrid-cell--textCenter': {
            minHeight: '10rem !important',
            maxHeight: '10rem !important',
          },
          '& .MuiSvgIcon-root,& .MuiSvgIcon-fontSizeMedium': {
            fontSize: '2.7rem !important',
            fill: 'black !important',
            color: 'black !important',
          },
        }}
      />
    </Box>
  );
};

export default ReportsTable;
