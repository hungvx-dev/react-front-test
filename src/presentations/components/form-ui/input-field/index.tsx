import React, { memo } from 'react'
import { TextField } from '@mui/material'
import { Controller, ControllerProps, useFormContext } from 'react-hook-form'

interface InputProps extends PartialObject<ControllerProps, 'render'> {
  label: string
  type?: string
  placeholder?: string
  variant?: 'standard' | 'filled' | 'outlined'
}

export const InputField: React.FC<InputProps> = memo((props) => {
  const { name, label, type, variant, placeholder, ...controllerProps } = props
  const {
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      {...controllerProps}
      render={({ field }) => (
        <TextField
          {...field}
          type={type}
          label={label}
          variant={variant}
          placeholder={placeholder}
          error={Boolean(errors[name])}
          helperText={errors[name] ? errors[name]?.message : ''}
          fullWidth
          margin="dense"
        />
      )}
    />
  )
})

InputField.defaultProps = {
  type: 'text',
  variant: 'standard',
  defaultValue: '',
  placeholder: '',
}
