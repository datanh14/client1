import { Box, Container, Paper, Typography } from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { TreeItem, TreeView } from "@material-ui/lab";
import React from "react";
import { useIntl } from "react-intl";
import { some, SUCCESS_CODE } from "../../../../constants/constants";
import { Col, Row } from "../../../common/Elements";
import {
  actionGetCategoryAllChildList,
  actionGetProductByCategoryIDbyRange,
} from "../../../system/systemAction";
import Product from "../product/Product";

interface Props {
  id: string;
  setLoading?: (load: boolean) => void;
}

interface RenderTree {
  id: string;
  name: string;
  childList?: RenderTree[];
}

const StoreAllCategory: React.FC<Props> = (props) => {
  const { id, setLoading } = props;
  const intl = useIntl();
  const [data, setData] = React.useState<any[]>([]);
  const [dataCategoryChild, setDataCategoryChild] = React.useState<any>();
  const [categoryID, setCategoryID] = React.useState<string>("");
  const [pageProduct, setPageProduct] = React.useState<number>(0);
  const sizeProduct = 16;
  const [nameListProduct, setNameListProduct] = React.useState<string>();
  const [listCategory, setListCatergory] = React.useState<some>([]);

  const fetchAllCategory = async () => {
    try {
      const res: some = await actionGetCategoryAllChildList({});
      if (res?.code === SUCCESS_CODE) {
        setListCatergory(res?.category.childList);
        setCategoryID(res?.category.childList[0].childList[0].id);
        setNameListProduct(res?.category.childList[0].childList[0].name);
      } else {
        // none
      }
    } catch (error) {}
  };

  const fetchListProduct = async () => {
    try {
      const res: some = await actionGetProductByCategoryIDbyRange({
        CategoryID: categoryID,
        StoreID: id,
        page: pageProduct,
        size: sizeProduct,
      });
      if (res?.code === SUCCESS_CODE) {
        setData([...res.message.productsList]);
      } else {
      }
    } catch (error) {}
    finally {
      setLoading?.(true);
    }
  };

  const handleClickCategory = (name: string, id: string) => {
    setNameListProduct(name);
    setCategoryID(id);
  };

  const renderTree = (nodes: RenderTree) => (
    <TreeItem
      key={nodes.id}
      nodeId={nodes.id}
      label={nodes.name}
      onClick={() => {
        if (nodes.childList?.length === 0) {
          handleClickCategory(nodes.name, nodes.id);
        }
      }}
    >
      {Array.isArray(nodes.childList)
        ? nodes.childList.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  React.useEffect(() => {
    categoryID && fetchListProduct();
  }, [categoryID]);

  React.useEffect(() => {
    fetchAllCategory();
  }, []);

  return (
    <div style={{ marginTop: 30 }}>
      <Container
        style={{ display: "flex", minHeight: 704, backgroundColor: "white" }}
      >
        <Col
          style={{
            minWidth: 234.5,
            maxWidth: 234.5,
            flex: 1,
          }}
        >
          <Paper elevation={0} square style={{ paddingTop: 10 }}>
            <Typography
              variant="h6"
              style={{ marginBottom: 12 }}
            >
              {listCategory && intl.formatMessage({ id: "IDS_APP_LIST_PRODUCT" })}
            </Typography>
            <TreeView
              defaultExpanded={["3fba6643-fac5-47f6-9093-3898aac0d2fb"]}
              selected={[categoryID]}
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
            >
              {listCategory &&
                listCategory.map((node: any) => renderTree(node))}
            </TreeView>
          </Paper>
        </Col>
        <Col style={{ flex: 3 }}>
          <Paper elevation={0} square>
            <Typography variant="h6" style={{ padding: "10px 20px" }}>
              {nameListProduct}
            </Typography>
            {data !== undefined && data.length > 0 ? (
              <Row
                style={{
                  flexWrap: "wrap",
                  width: "100%",
                }}
              >
                {data !== undefined &&
                  data.map((item: some, index: number) => {
                    return <Product key={index} data={item} />;
                  })}
              </Row>
            ) : (
              <Col
                style={{
                  minHeight: 500,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  style={{
                    minWidth: 100,
                    maxWidth: 100,
                  }}
                  alt="Không có sản phẩm nào trong cửa hàng"
                  src="https://www.orientappliances.pk//images/no.svg"
                />
                <Typography>
                  <Box fontSize={15}>Không có sản phẩm nào trong cửa hàng</Box>
                </Typography>
              </Col>
            )}
          </Paper>
        </Col>
      </Container>
    </div>
  );
};
export default StoreAllCategory;
