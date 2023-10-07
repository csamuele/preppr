import { ErrorMessage as FormikErrorMessage } from 'formik';
import { Paper } from '@mui/material';

interface ErrorMessageProps {
  name: string;
}

/**
 * Renders an error message for a Formik field.
 * @param {ErrorMessageProps} props - The props object containing the name of the field.
 * @returns {JSX.Element} - The JSX element representing the error message.
 */

export const ErrorMessage = ({ name }: ErrorMessageProps) => {
  return (
    <FormikErrorMessage name={name}>{msg => <Paper
      sx={{
        backgroundColor: 'error.main',
        color: 'error.contrastText',
        padding: '0.5rem',
        marginTop: '0.5rem',
      }}
    >
      {msg}
    </Paper>}
    </FormikErrorMessage>
  );
};