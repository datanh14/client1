import React from 'react';
import {
  CircularProgress,
  CircularProgressProps,
  PropTypes,
} from '@material-ui/core';

interface Props extends CircularProgressProps {
  loadingColor?: PropTypes.Color;
}
const LoadingIcon: React.FC<Props> = (props) => {
  const { children, loadingColor, style, ...rest } = props;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        height: 320,
        ...style,
      }}
    >
      <CircularProgress
        size={48}
        color={
          loadingColor || loadingColor === 'default' ? 'primary' : rest.color
        }
        {...rest}
      />
    </div>
  );
};

export default LoadingIcon;
