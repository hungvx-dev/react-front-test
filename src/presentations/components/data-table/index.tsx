import React from 'react'
import { DataGrid, DataGridProps } from '@mui/x-data-grid'
import { Box } from '@mui/system'

export type DataTableProps = DataGridProps

export const DataTable: React.FC<DataTableProps> = ({ ...dataGridProps }) => (
  <Box>
    <DataGrid
      autoHeight
      pagination
      rowsPerPageOptions={[5, 10, 20, 50, 100]}
      disableColumnMenu
      disableColumnFilter
      disableSelectionOnClick
      {...dataGridProps}
    />
  </Box>
)
