import React from 'react';
import { Button } from '@tarojs/components';
import classnames from 'classnames';
import styles from './index.module.scss';

export interface PrimaryButtonProps {
  text: string;
  disabled?: boolean;
  onClick?: () => void;
}

export default function PrimaryButton(props: PrimaryButtonProps) {
  const { text, disabled, onClick } = props;
  return (
    <Button
      className={classnames(styles.button, disabled && styles.buttonDisabled)}
      disabled={Boolean(disabled)}
      onClick={onClick}
    >
      {text}
    </Button>
  );
}

