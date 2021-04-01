/* eslint-disable no-unused-vars */
import { Button } from '@material-ui/core';
import React from 'react';
import { GREY_100, GREY_300, GREY_500 } from '../../../assets/theme/colors';
import { ReactComponent as IconArrow } from '../../../assets/icons/ic_arrow_back.svg';
import { Row } from '../Elements';

export interface TablePaginationLoadMoreProps {
  page: number;
  enableNextPage: boolean;
  onChangePage: (newPage: number) => void;
}

const TablePaginationLoadMore = (props: TablePaginationLoadMoreProps) => {
  const { page, enableNextPage, onChangePage } = props;

  const handleBackButtonClick = () => onChangePage(page - 1);
  const handleNextButtonClick = () => onChangePage(page + 1);

  return (
    <Row
      style={{
        justifyContent: 'flex-end',
        paddingBottom: 16,
        paddingRight: 16,
      }}
    >
      <Button
        style={{
          padding: '2px',
          background: GREY_100,
          minWidth: 'unset',
          marginRight: 4,
          marginLeft: 8,
          minHeight: 24,
        }}
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        <IconArrow
          className="svgFillAll"
          style={{ stroke: page === 0 ? GREY_300 : GREY_500 }}
        />
      </Button>
      <Button
        style={{
          padding: '2px',
          background: GREY_100,
          minWidth: 'unset',
          marginRight: 8,
          minHeight: 24,
        }}
        onClick={handleNextButtonClick}
        disabled={!enableNextPage}
        aria-label="next page"
      >
        <IconArrow
          className="svgFillAll"
          style={{
            stroke: !enableNextPage ? GREY_300 : GREY_500,
            transform: 'rotate(180deg)',
          }}
        />
      </Button>
    </Row>
  );
};
export default TablePaginationLoadMore;
