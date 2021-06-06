import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { some, SUCCESS_CODE } from '../../../constants/constants';
import FormControlAutoComplete from '../../common/FormControlAutoComplete';
import { actionGetProductByCategoryIDbyRange } from '../../system/systemAction';
interface Props {}

const SearchBox: React.FC<Props> = (props) => {
  const {} = props;
  const [data, setData] = React.useState<any[]>([]);
  const [searchKey, setSearchKey] = React.useState<string>('');
  const [dataProduct, setDataProduct] = React.useState<string>('');
  const history = useHistory();

  const fetchListProduct = async () => {
    try {
      const res: some = await actionGetProductByCategoryIDbyRange({
        searchKey: searchKey,
        page: 0,
        size: 5,
      });
      if (res?.code === SUCCESS_CODE) {
        setData([...res.message.productsList]);
      } else {
      }
    } catch (error) {
    } finally {
    }
  };
  const handleOnClick = useCallback(
    () => history.push(`/product-detail/${dataProduct}`),
    [history]
  );
  React.useEffect(() => {
    fetchListProduct();
  }, [searchKey]);
  console.log('dataProduct', dataProduct);

  return (
    <FormControlAutoComplete
      value={data.find((v) => v.id === searchKey) || null}
      options={data}
      getOptionLabel={(v) => v.name}
      onChange={(e, value: some | null) => {
        setDataProduct(value?.id);
      }}
      onInputChange={(e, value) => {
        setSearchKey(value);
        handleOnClick();
      }}
      formControlStyle={{ minWidth: 270, marginRight: 0, flex: 1 }}
      placeholder={'Nhập tên sản phẩm'}
      optional
      style={{ marginTop: '20px' }}
    />
  );
};

export default SearchBox;
