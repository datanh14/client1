// import { FormattedMessage } from 'react-intl';
import { Button, Typography, Box } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { Controller, useForm } from 'react-hook-form';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import FormControlTextField from '../../common/FormControlTextField';
import { FormattedMessage } from 'react-intl';
import { actionAddStoreByUser } from '../../system/systemAction';
import { some, SUCCESS_CODE } from '../../../constants/constants';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3),
    },
    grid: {
      backgroundColor: 'white',
      paddingLeft: 10,
      paddingRight: 10,
    },
    rowMoney: {
      padding: 10,
      margin: 10,
    },
    addressHover: {
      backgroundColor: '#d1cfcf',
      margin: 10,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: 'white',
      borderStyle: 'solid',
      padding: 20,
      color: 'white',
    },
    address: {
      margin: 10,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#cccccc',
      borderStyle: 'solid',
      padding: 20,
    },
  })
);

interface Props {
  //   indexDefaut: number;
  item: some;
  //   fetchData: () => void;
}

const DialogSignUpToStore: React.FC<RouteComponentProps<any> & Props> = (
  props
) => {
  const { item } = props;
  const [loading, setLoading] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const { getValues, control, reset } = useForm({
    defaultValues: {
      Name: '',
      Detail: '',
    },
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    onSubmit(getValues());
  };

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const res: any = await actionAddStoreByUser({
        ...data,
        OwnerID: item?.id,
      });
      if (res?.code === SUCCESS_CODE) {
        // const { data } = await actionGetEmployeesInfo();
        setOpen(false);
      } else {
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        color="secondary"
        onClick={handleOpen}
        style={{
          marginLeft: 20,
          fontSize: 15,
          fontStyle: 'unset',
        }}
      >
        Đăng ký cửa hàng
      </Button>
      <form onSubmit={onSubmit} autoComplete="none">
        <Dialog
          onClose={handleClose}
          open={open}
          fullWidth={true}
          maxWidth="sm"
          aria-labelledby="max-width-dialog-title"
          className={classes.root}
        >
          <DialogTitle id="max-width-dialog-title">
            <Typography>
              <Box
                fontWeight="fontWeightBold"
                fontSize={20}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                Đăng ký cửa hàng:
              </Box>
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Controller
              as={React.forwardRef((itemProps: any, ref) => (
                <FormControlTextField
                  {...itemProps}
                  label={<FormattedMessage id="IDS_CHAT_STORE_NAME" />}
                  formControlStyle={{ width: '100%', marginRight: 0 }}
                  inputProps={{ maxLength: 50, autoComplete: 'none' }}
                  optional
                  inputRef={ref}
                />
              ))}
              name="Name"
              control={control}
            />
            <Controller
              as={React.forwardRef((itemProps: any, ref) => (
                <FormControlTextField
                  {...itemProps}
                  label={<FormattedMessage id="IDS_CHAT_STORE_DETAIL" />}
                  formControlStyle={{ width: '100%', marginRight: 0 }}
                  inputProps={{ maxLength: 50, autoComplete: 'none' }}
                  optional
                  inputRef={ref}
                />
              ))}
              name="Detail"
              control={control}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              color="primary"
              style={{
                marginRight: 20,
                fontSize: 15,
                fontStyle: 'unset',
              }}
            >
              Hủy
            </Button>
            <Button
              onClick={handleSubmit}
              color="primary"
              style={{
                marginRight: 20,
                fontSize: 15,
                fontStyle: 'unset',
              }}
            >
              Đăng ký
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </>
  );
};

export default connect(
  (state: any) => ({ profile: state.system.profile }),
  {}
)(withRouter(DialogSignUpToStore));
