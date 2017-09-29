import React from 'react';
import { TableHead, TableRow, TableCell } from 'material-ui/Table';

function TableHeadRow({ columns }) {
  return (
    <TableHead>
      <TableRow>
        {
          columns.map(col =>
            <TableCell key={col.id}>
              {col.label}
            </TableCell>
          )
        }
      </TableRow>
    </TableHead>
  )
};

export default TableHeadRow;