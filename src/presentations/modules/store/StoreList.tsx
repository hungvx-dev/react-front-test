import React, { useEffect, useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Box, Grid, Typography } from '@mui/material'
import { GridActionsCellItem, GridColumns, GridRowId } from '@mui/x-data-grid'

import { DataTable } from 'Components/data-table'
import { useAppDispatch, useAppSelector } from 'Hooks/useStore'
import { ConfirmationDialog } from 'Components/dialog/ConfirmationDialog'
import { fetchList, deleteStoreById } from '~/domain/adapters/redux/entities/store'
import actionUiStore from '~/domain/adapters/redux/ui/store'
import { Store } from '~/domain/models/entities/store'
import { TrashIcon } from '@/presentations/icons/Trash'

import { EditIcon } from '@/presentations/icons/Edit'
import { StoreLayout } from './StoreLayout'

type HandleColumnAction = (id: GridRowId) => Promise<void> | void

const generateColumns = (handleEditClick: HandleColumnAction, handleDeleteClick: HandleColumnAction): GridColumns => [
  { field: 'name', headerName: 'Name', sortable: true, flex: 0.7, minWidth: 150 },
  { field: 'address', headerName: 'Address', sortable: false, flex: 2, minWidth: 300 },
  {
    field: 'phoneNumber',
    headerName: 'Phone',
    type: 'number',
    sortable: false,
    align: 'left',
    headerAlign: 'left',
    flex: 1,
    minWidth: 150,
  },
  {
    field: 'city',
    headerName: 'City',
    sortable: false,
    flex: 0.7,
    minWidth: 160,
  },
  {
    field: 'actions',
    type: 'actions',
    headerName: 'Actions',
    flex: 0.5,
    minWidth: 100,
    getActions: ({ id }) => [
      <GridActionsCellItem icon={<EditIcon />} label="Edit" onClick={() => handleEditClick(id)} color="inherit" />,
      <GridActionsCellItem
        icon={<TrashIcon color="error" />}
        label="Delete"
        onClick={() => handleDeleteClick(id)}
        color="inherit"
      />,
    ],
  },
]

export const StoreList: React.FC = () => {
  const dispatch = useAppDispatch()
  const history = useHistory()
  const stores = useAppSelector((store) => store.entities.store)
  const paginationStore = useAppSelector((store) => store.ui.store.pagination)

  const [isLoading, setIsLoading] = useState(true)
  const [deletingStore, setDeletingStore] = useState<Store | null>(null)

  const rows = useMemo(() => stores.result.map((id) => stores.entities[id]), [stores])

  const columns = useMemo(() => {
    const handleDeleteClick = (id: GridRowId) => {
      const store = stores.entities[id as number]
      store && setDeletingStore(store)
    }

    const handleEditClick = (id: GridRowId) => {
      history.push(`/stores/${id}`)
    }
    return generateColumns(handleEditClick, handleDeleteClick)
  }, [history, stores])

  const handleCloseDeleteDialog = (isOk?: boolean) => {
    if (isOk) {
      deletingStore && dispatch(deleteStoreById(deletingStore.id))
    }
    setDeletingStore(null)
  }

  const handlePageChange = (page: number) => {
    dispatch(actionUiStore.setPage(page))
  }

  const handlePageSizeChange = (pageSize: number) => {
    dispatch(actionUiStore.setPerPage(pageSize))
  }

  useEffect(() => {
    const fetchStores = async () => {
      setIsLoading(() => true)
      await dispatch(fetchList({ page: (paginationStore.page || 0) + 1, perPage: paginationStore.perPage }))
      setIsLoading(() => false)
    }

    fetchStores()
  }, [dispatch, setIsLoading, paginationStore])

  return (
    <StoreLayout>
      <Grid container direction="column" justifyContent="space-between" spacing={3}>
        <Grid item>
          <Typography color="textPrimary" variant="h5">
            Store List
          </Typography>
        </Grid>
        <Grid item>
          <DataTable
            rows={rows}
            columns={columns}
            loading={isLoading}
            pageSize={paginationStore.perPage}
            rowCount={paginationStore.total}
            paginationMode="server"
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </Grid>

        <ConfirmationDialog title="Delete Store" open={!!deletingStore} onCloseDialog={handleCloseDeleteDialog}>
          <Box>
            <Typography variant="h6" component="h2">
              Are you sure to delete this store?
            </Typography>
          </Box>
        </ConfirmationDialog>
      </Grid>
    </StoreLayout>
  )
}
