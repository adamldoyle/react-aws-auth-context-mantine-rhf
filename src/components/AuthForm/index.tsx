import React, { useCallback } from 'react';
import { Alert, Box, Button, Grid, Group, Text, Title, createStyles } from '@mantine/core';
import * as Yup from 'yup';
import { useForm, Control, UseFormGetValues, ResolverResult } from 'react-hook-form';
import { useYupValidationResolver } from '../useYupValidationResolver';

const useStyles = createStyles((theme) => ({
  paper: {
    marginTop: theme.spacing.md,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing.md,
    backgroundColor: theme.primaryColor,
  },
  form: {
    marginTop: theme.spacing.md,
    width: '100%',
  },
  formDescription: {
    marginBottom: theme.spacing.md,
  },
  submit: {
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
}));

export interface AuthFormProps<Values> {
  title: string;
  Schema: Yup.BaseSchema;
  formDefaults: Values;
  validate?: (values: Values) => Promise<Record<string, string> | undefined> | Record<string, string> | undefined;
  formDescription?: string;
  submitLabel: string;
  onSubmit: (values: Values) => Promise<void>;
  actions?: (getValues: UseFormGetValues<Values>) => React.ReactNode;
  renderFormBody: (control: Control) => React.ReactNode;
}

export function AuthForm<Values>({
  title,
  Schema,
  formDefaults,
  validate,
  formDescription,
  submitLabel,
  onSubmit,
  actions,
  renderFormBody,
}: AuthFormProps<Values>): JSX.Element {
  const { classes } = useStyles();

  const yupResolver = useYupValidationResolver(Schema);

  const resolver = useCallback(
    async (values: Values) => {
      const yupResults = await yupResolver(values);
      if (Object.keys(yupResults.errors).length === 0 && validate) {
        const errors = await validate(values);
        if (errors) {
          return Object.entries(errors).reduce<ResolverResult>(
            (acc, error) => {
              acc.errors[error[0]] = { message: error[1] };
              return acc;
            },
            { values: {}, errors: {} },
          );
        }
      }
      return yupResults;
    },
    [yupResolver, validate],
  );

  const { formState, getValues, setError, clearErrors, handleSubmit, control } = useForm({
    defaultValues: formDefaults,
    mode: 'onSubmit',
    resolver,
  });

  const onInternalSubmit = async (values: Values) => {
    clearErrors('_root');
    try {
      await onSubmit(values);
    } catch (err) {
      setError('_root', { message: err.message });
    }
  };

  return (
    <Grid justify="center" align="center">
      <Grid.Col xs={12} sm={6} md={4}>
        <Box className={classes.paper}>
          <Title order={2}>{title}</Title>
          <form className={classes.form} onSubmit={handleSubmit(onInternalSubmit)}>
            {formDescription && (
              <Box className={classes.formDescription}>
                <Text size="sm">{formDescription}</Text>
              </Box>
            )}
            <Group direction="column" grow spacing="xs">
              {formState.errors['_root'] && <Alert color="red">{formState.errors['_root'].message}</Alert>}

              {renderFormBody(control)}

              <Button
                type="submit"
                fullWidth
                variant="filled"
                color="primary"
                className={classes.submit}
                disabled={formState.isSubmitting}
              >
                {submitLabel}
              </Button>
            </Group>
            {Boolean(actions) && (
              <Group direction="column" align="flex-end" spacing={4}>
                {actions(getValues)}
              </Group>
            )}
          </form>
        </Box>
      </Grid.Col>
    </Grid>
  );
}
