import {
  Box,
  Button,

  Container
} from "@material-ui/core";
import React from "react";
import {
  some,
  SUCCESS_CODE
} from "../../../../constants/constants";
import { Row } from "../../../common/Elements";
import {
  actionGetProductByStoreIDbyRange
} from "../../../system/systemAction";
import Product from "../product/Product";
  
  interface Props {
    id: string;
  }
  
  const StoreInfor: React.FC<Props> = (props) => {
    const { id } = props;
    const [data, setData] = React.useState<any[]>([]);
    const [pageProduct, setPageProduct] = React.useState<number>(0);
    const sizeProduct = 5;
    const fetchListProduct = async () => {
      try {
        const res: some = await actionGetProductByStoreIDbyRange({
          StoreID: id,
          page: pageProduct,
          size: sizeProduct,
        });
        if (res?.code === SUCCESS_CODE) {
          setData((data) => [...data, ...res.message]);
        } else {
        }
      } catch (error) {}
    };
    React.useEffect(() => {
      fetchListProduct();
    }, [pageProduct]);
  
    const handleClickMore = () => {
      setPageProduct((pageProduct) => pageProduct + 1);
    };
   
    return (
      <>
        <Box
          style={{
            paddingTop: 20,
            width: "100%",
          }}
        >
          <Row
            style={{
              width: "100%",
            }}
          ></Row>
          <Container maxWidth="xl">
            <div>
              <Row
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "flex-start",
                  margin: "0 auto",
                  width: "100%",
                }}
              >
                {data !== undefined &&
                  data.map((item: some, index: number) => {
                    return <Product key={index} data={item} />;
                  })}
              </Row>
            </div>
  
            <Row
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 24,
              }}
            >
              <Button
                variant="outlined"
                color="primary"
                onClick={handleClickMore}
              >
                Xem thêm
              </Button>
            </Row>
          </Container>
        </Box>
      </>
    );
  };
  export default StoreInfor;
  