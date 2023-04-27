import { Box, Button, IconButton, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import ClearIcon from "@material-ui/icons/Clear";
import PublishIcon from "@material-ui/icons/Publish";
import React, { useState } from "react";
import { storage } from "../../../../firebase";
import { Col, Row } from "../../../common/Elements";
interface Props {
  // fetchData: () => void;
  updateImage(values: string[]): void;
  images: string[];
}
const FirebaseUpload: React.FC<Props> = (props) => {
  const { updateImage, images } = props;
  const [image, setImage] = useState<any>(null);
  const [url, setUrl] = useState("");
  const [arr, setArr] = useState<string[]>(images);
  const [progress, setProgress] = useState(0);
  const [loadding, setLoadding] = useState<boolean>(true);

  const handleChange = (e: any) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      handleUpload(e.target.files[0]);
    }
  };
  React.useEffect(() => {
    updateImage(arr); //eslint-disable-next-line
  }, [arr]);

  const handleUpload = (image: any) => {
    if (image) {
      const uploadTask = storage.ref(`images/${image?.name}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
          progress === 100 ? setLoadding(true) : setLoadding(false);
        },
        (error) => {},
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              setUrl(url);
              setArr((arr) => [...arr, url]);
            });
        }
      );
    }
  };

  const deleteImage = (index: number) => {
    var filtered = arr.filter((value, idx, arr) => idx !== index);
    setArr((arr) => [...filtered]);
  };

  const dragOver = (e: any) => {
    e.preventDefault();
  };

  const dragEnter = (e: any) => {
    e.preventDefault();
  };

  const dragLeave = (e: any) => {
    e.preventDefault();
  };

  const fileDrop = (e: any) => {
    e.preventDefault();
    if (e.dataTransfer.files[0]) {
      setImage(e.dataTransfer.files[0]);
      handleUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <Col style={{ width: "100%" }}>
          <Box>
            <Typography variant="body2" style={{ marginBottom: 8 }}>
              Thêm hình sản phẩm (nếu có)
            </Typography>
          </Box>
          <Box
            onDragOver={dragOver}
            onDragEnter={dragEnter}
            onDragLeave={dragLeave}
            onDrop={fileDrop}
          >
            <Col
              style={{
                width: "100%",
                height: 150,
                borderStyle: "dotted",
                borderWidth: 1,
                borderColor: "orange",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 5,
              }}
            >
              <Typography style={{ marginBottom: 8, fontSize: 14 }}>
                Kéo và thả ảnh tại đây
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                component="label"
                startIcon={<PublishIcon />}
                style={{ fontSize: 14 }}
              >
                Chọn hình
                <input type="file" hidden onChange={handleChange} />
              </Button>
            </Col>
          </Box>
          {!loadding && (
            <LinearProgress
              variant="determinate"
              value={progress}
              valueBuffer={100}
              style={{
                display: "flex",
                marginTop: 10,
              }}
            />
          )}
        </Col>
      </Grid>
      <Grid item xs={8}>
        <Col style={{ width: "100%" }}>
          <Box>
            <Typography variant="body2" style={{ marginBottom: 8 }}>
              Danh sách hình ảnh của sản phẩm:
            </Typography>
          </Box>
          <Box style={{ height: 170, overflow: "scroll" }}>
            {arr.length !== 0 && (
              <>
                <Row
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    backgroundColor: "white",
                  }}
                >
                  {arr.map((item: string, index: number) => {
                    return (
                      <Box style={{ position: "relative" }}>
                        <img
                          style={{
                            width: 80,
                            height: 80,
                            marginRight: 10,
                            marginBottom: 10,
                            borderStyle: "solid",
                            borderWidth: 1,
                            borderColor: "#c4cfc7",
                            borderRadius: 10,
                          }}
                          src={item || "http://via.placeholder.com/300"}
                          alt="No image"
                        />
                        <IconButton
                          style={{
                            position: "absolute",
                            width: 5,
                            height: 5,
                            marginLeft: -35,
                            marginTop: 0,
                            color: "#c4cfc7",
                          }}
                          onClick={() => deleteImage(index)}
                        >
                          <ClearIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    );
                  })}
                </Row>
              </>
            )}
          </Box>
        </Col>
      </Grid>
    </Grid>
  );
};

export default FirebaseUpload;
