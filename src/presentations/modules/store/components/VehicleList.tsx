import React, { useMemo, useState } from 'react'
import { GridCellEditCommitParams, GridColumns } from '@mui/x-data-grid'

import { useAppDispatch, useAppSelector } from 'Hooks/useStore'
import { DataTable } from 'Components/data-table'
import actionVehicle from '~/domain/adapters/redux/entities/vehicle/vehicle'

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
  const dispatch = useAppDispatch()
  const vehicle = useAppSelector((store) => store.entities.vehicle)

  const rows = useMemo(() => vehicle.result.map((id) => vehicle.entities[id]), [vehicle])
  const columns = useMemo(() => columnsVehicle, [])

  const [perPage, setPerPage] = useState(10)

  const handlePageSizeChange = (pageSize: number) => {
    setPerPage(pageSize)
  }
  const handleCellEditCommit = React.useCallback(
    ({ id, field, value }: GridCellEditCommitParams) => {
      dispatch(actionVehicle.updateEntity({ id: +id, field, value: value as never }))
    },
    [dispatch],
  )

  return (
    <DataTable
      rows={rows}
      columns={columns}
      pageSize={perPage}
      loading={isLoading}
      paginationMode="client"
      rowCount={vehicle.result.length}
      onCellEditCommit={handleCellEditCommit}
      onPageSizeChange={handlePageSizeChange}
    />
  )
}
