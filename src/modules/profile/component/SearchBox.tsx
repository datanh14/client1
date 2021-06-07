import React from 'react';
import { useHistory } from 'react-router-dom';
import { some, SUCCESS_CODE } from '../../../constants/constants';
import FormControlAutoComplete from '../../common/FormControlAutoComplete';
import { actionGetProductByCategoryIDbyRange } from '../../system/systemAction';
interface Props {}

const SearchBox: React.FC<Props> = (props) => {
  const {} = props;
  const [data, setData] = React.useState<any[]>([]);
  const [searchKey, setSearchKey] = React.useState<string>('');
  const [dataForm, setDataForm] = React.useState<some | null>(null);
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
  // const handleOnClick = () =>
  React.useEffect(() => {
    fetchListProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKey]);

  return (
    <FormControlAutoComplete
      value={dataForm}
      options={data}
      getOptionLabel={(v) => v.name}
      onChange={(e, value: some | null) => {
        value?.id &&
          history.push({
            pathname: `/product-detail/${value?.id}`,
          });
        value && setDataForm(value);
      }}
      onInputChange={(e, value) => {
        setSearchKey(value);
      }}
      formControlStyle={{ minWidth: 270, marginRight: 0, flex: 1 }}
      placeholder={'Nhập tên sản phẩm'}
      optional
      style={{ marginTop: '20px', zIndex: 3000 }}
    />
  );
};

export default SearchBox;
