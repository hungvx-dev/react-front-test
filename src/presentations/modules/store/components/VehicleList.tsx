import React, { useEffect, useMemo, useState } from 'react'
import { GridColumns, GridEditRowsModel } from '@mui/x-data-grid'
import { Grid } from '@mui/material'
import { useAppDispatch, useAppSelector } from 'Hooks/useStore'
import { DataTable } from 'Components/data-table'

const columnsVehicle: GridColumns = [
  { field: 'name', headerName: 'Name', sortable: true, flex: 0.7, minWidth: 150 },
  { field: 'vehicleNumber', headerName: 'Vehicle Number', sortable: false, flex: 1, minWidth: 150 },
  {
    field: 'price',
    headerName: 'Price',
    type: 'number',
    align: 'left',
    headerAlign: 'left',
    flex: 1,
    minWidth: 150,
    editable: true,
  },
]

interface PropsType {
  isLoading: boolean
}

export const VehicleList: React.FC<PropsType> = ({ isLoading }) => {
  const vehicle = useAppSelector((store) => store.entities.vehicle)

  const rows = useMemo(() => vehicle.result.map((id) => vehicle.entities[id]), [vehicle])
  const columns = useMemo(() => columnsVehicle, [])

  const [perPage, setPerPage] = useState(10)

  const handlePageSizeChange = (pageSize: number) => {
    setPerPage(pageSize)
  }

  return (
    <DataTable
      rows={rows}
      columns={columns}
      pageSize={perPage}
      loading={isLoading}
      paginationMode="client"
      rowCount={vehicle.result.length}
      // onEditCellPropsChange={handleCellEditPropsChange}
      onPageSizeChange={handlePageSizeChange}
    />
  )
}
