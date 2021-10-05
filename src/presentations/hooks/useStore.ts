import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { RootState, ThunkDispatch } from '~/domain/frameworks/redux'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<ThunkDispatch>()
