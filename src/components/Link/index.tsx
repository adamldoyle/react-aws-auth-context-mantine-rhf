import { MouseEvent, PropsWithChildren } from 'react';
import { Text, createStyles } from '@mantine/core';

const useStyles = createStyles(() => ({
  link: {
    cursor: 'pointer',
  },
}));

export type LinkProps = {
  onClick: () => Promise<void> | void;
};

export function Link({ onClick, children }: PropsWithChildren<LinkProps>): JSX.Element {
  const { classes } = useStyles();
  return (
    <Text
      className={classes.link}
      variant="link"
      size="sm"
      onClick={async (evt: MouseEvent) => {
        evt.preventDefault();
        await onClick();
      }}
      role="button"
    >
      {children}
    </Text>
  );
}
