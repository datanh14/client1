import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import JSONbig from "json-bigint";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { RouteComponentProps, withRouter } from "react-router-dom";
import * as yup from "yup";
import { some, SUCCESS_CODE } from "../../../../constants/constants";
import { Col, snackbarSetting } from "../../../common/Elements";
import FormControlTextField from "../../../common/FormControlTextField";
import { actionAddRatingByUser } from "../../../system/systemAction";
import FirebaseUpload from "../../components/firebaseupload/FirebaseUpload";

interface Props {
  //   fetchData: () => void;
  productId : string;
}

const labels: { [index: string]: string } = {
  1: "Rất không hài lòng",
  2: "Không hài lòng",
  3: "Bình thường",
  4: "Hài  lòng",
  5: "Rất hài lòng",
};

const DialogAddComment: React.FC<RouteComponentProps<any> & Props> = (
  props
) => {
    const { productId } = props;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [imageProducts, setImageProduct] = React.useState<string[]>();
  const [valid, setValid] = useState<boolean>(false);
  const [value, setValue] = React.useState<number | null>(0);
  const [hover, setHover] = React.useState(-1);

  const schema = yup.object().shape({
    Comment: yup
      .string()
      .required("Nhận xét không được để trống")
      .nullable(),
  });

  const { handleSubmit, getValues, control, formState } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      Comment: "",
      Image: "",
    },
  });

  const { errors } = formState;
  const showNotifySnack = (res: any) => {
    enqueueSnackbar(
      res?.message,
      snackbarSetting((key) => closeSnackbar(key), {
        color: res?.code === SUCCESS_CODE ? "success" : "error",
      })
    );
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (data: any) => {
    setValid(true);
    try {
      setLoading(true);
      const res: some = await actionAddRatingByUser({
        ...data,
        Star: value,
        Image: JSONbig.stringify(imageProducts),
        ProductID: productId,
      });
      if (res?.code === SUCCESS_CODE) {
        setOpen(false);
        showNotifySnack(res);
      } else {
        enqueueSnackbar(
          res?.message,
          snackbarSetting((key) => closeSnackbar(key), { color: "error" })
        );
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (open) {
      setValid(false);
    }
  }, [open]);

  return (
    <>
      <Button
        color="secondary"
        onClick={handleOpen}
        style={{
          marginLeft: 20,
          fontSize: 15,
          fontStyle: "unset",
        }}
      >
        Nhận xét
      </Button>
      <form
        id="formDialog"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="none"
      >
        <Dialog
          onClose={handleClose}
          open={open}
          fullWidth={true}
          maxWidth="sm"
          aria-labelledby="max-width-dialog-title"
        >
          <DialogTitle id="max-width-dialog-title">
            <Typography>
              <Box
                fontWeight="fontWeightBold"
                fontSize={20}
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Nhận xét:
              </Box>
            </Typography>
          </DialogTitle>
          <DialogContent>
            <div className="dialog-content">
              <Box
                style={{
                  display: "flex",
                  textAlign: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                {value !== null && (
                  <Box fontSize={21} marginBottom={1}>
                    {labels[hover !== -1 ? hover : value]}
                  </Box>
                )}
                <Rating
                  size="large"
                  name="hover-feedback"
                  value={value}
                  precision={1}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  onChangeActive={(event, newHover) => {
                    setHover(newHover);
                  }}
                />
              </Box>
              <Controller
                render={({ onChange, value, ref }) => (
                  <FormControlTextField
                    value={value}
                    onChange={onChange}
                    label={<FormattedMessage id="IDS_CHAT_COMMENT" />}
                    formControlStyle={{ width: "100%", marginRight: 0 }}
                    inputProps={{ autoComplete: "none" }}
                    inputRef={ref}
                    multiline
                    rows={5}
                    errorMessage={errors.Comment?.message}
                  />
                )}
                name="Comment"
                control={control}
              />
              <FirebaseUpload
                updateImage={(values: string[]) => {
                  setImageProduct(values);
                }}
                images={[]}
                key="keyFirebaseUploadProductCreate"
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              color="primary"
              style={{
                marginRight: 20,
                fontSize: 15,
                fontStyle: "unset",
              }}
            >
              Hủy
            </Button>
            <Button
              color="primary"
              style={{
                marginRight: 20,
                fontSize: 15,
                fontStyle: "unset",
              }}
              type="submit"
              form="formDialog"
            >
              Nhận xét
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </>
  );
};

export default withRouter(DialogAddComment);
