import { Box, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { formatter } from '../../../../utils/helpers/helpers';

const Product = (props: any) => {
  const { data } = props;
  const [isHover, setIsHover] = useState(false);
  const productStyle = {
    minWidth: 234.5,
    minHeight: 326,
    maxWidth: 234.5,
    maxHeight: 326,
    padding: 10,
    zIndex: 1,
    backgroundColor: 'white',
    cursor: 'pointer',
  };
  const productHoverStyle = {
    minWidth: 234.5,
    minHeight: 326,
    maxWidth: 234.5,
    maxHeight: 326,
    padding: 10,
    zIndex: 2,
    boxShadow:
      '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    elevation: 10,
    backgroundColor: 'white',
    overflow: 'hidden',
    cursor: 'pointer',
  };
  const gotoAction = (route: string) => {
    props?.history?.push(`/product-detail/${route}`);
  };

  return (
    <>
      <div
        onClick={() => {
          gotoAction(data.id);
        }}
        style={{
          ...(isHover ? productHoverStyle : productStyle),
          position: 'relative',
        }}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <img
          style={{
            width: '80%',
            height: 187.6,
            marginRight: 18,
            marginLeft: 18,
          }}
          src={
            data.images
              ? data.images[0]
              : 'https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png'
          }
          alt={data.name}
        />
        <Typography
          variant="body2"
          style={{
            height: 40,
            fontSize: 15,
            marginBottom: 5,
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          <Box>{data.name}</Box>
        </Typography>
        <Rating
          name="customized-10"
          defaultValue={data.star}
          max={5}
          size="small"
          readOnly={true}
        />
        <Box
          display="flex"
          alignItems="flex-start"
          style={{
            marginTop: 5,
            bottom: 0,
          }}
        >
          <Typography
            variant="body2"
            style={{
              alignItems: 'center',
              display: 'flex',
              fontSize: 18,
            }}
          >
            {formatter(data.price)}
          </Typography>

          {data?.discount !== 0 && (
            <Box
              style={{
                minWidth: 35,
                maxHeight: 30,
                marginLeft: 18,
                textAlign: 'center',
                borderRadius: 2,
                backgroundColor: '#ff424e',
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
                color: 'white',
                padding: 0.5,
                position: 'absolute',
                top: 10,
              }}
            >
              <Typography>{data.discount}%</Typography>
            </Box>
          )}
        </Box>
      </div>
    </>
  );
};

export default withRouter(Product);
