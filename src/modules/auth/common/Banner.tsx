/* eslint-disable react/require-default-props */
import * as React from 'react';
import BgLogin from '../../../assets/icons/bg_banner_login.svg';
import { ReactComponent as BlueKey } from '../../../assets/icons/ic_blueKey.svg';
import { ReactComponent as RegisterIcon } from '../../../assets/icons/ic_register.svg';
import { BLUE_400 } from '../../../assets/theme/colors';
import { Col } from '../../common/Elements';
// const Wrapper = styled.div`
//   /* position: absolute; */
//   top: 103px;
//   left: 0;
//   right: 0;
//   padding: 32px;
// `;

interface Props {
  isRegister?: boolean | false;
}

const Banner = (props: Props) => {
  const { isRegister } = props;
  return (
    <Col
      style={{
        position: 'relative',
        backgroundColor: BLUE_400,
        backgroundImage: `url(${BgLogin})`,
        borderRadius: '12px 0px 0px 12px',
        width: 270,
        padding: 32,
      }}
    >
      <Col style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {isRegister ? <RegisterIcon /> : <BlueKey />}
      </Col>
    </Col>
  );
};

export default Banner;
