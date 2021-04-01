/* eslint-disable no-nested-ternary */
import {
  Box,
  Collapse,
  fade,
  IconButton,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TablePaginationProps,
  TableRow,
  Theme,
  Typography,
  withStyles,
} from '@material-ui/core';
import { Variant } from '@material-ui/core/styles/createTypography';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { ReactComponent as IconBox } from '../../../../svg/ic_nodata.svg';
import { BLUE_200, GREY_100, WHITE } from '../../../assets/theme/colors';
import { some } from '../../../constants/constants';
import { Col, Row } from '../Elements';
import LoadingIcon from '../LoadingIcon';
import './table.css';
import TablePaginationActionsCustom from './TablePaginationActionsCustom';

// interface RowProps extends TableRowProps {}
// export const TableRowCS: React.FC<RowProps> = props => {
//   const { style, ...rest } = props;
//   return (
//     <>
//       <TableRow style={{ style }} />
//     </>
//   );
// };
export const TableContainerCS = withStyles(() => ({
  root: {
    // display: 'flex',
    // '&::-webkit-scrollbar-thumb': {
    //   background: GREY_100,
    //   border: '4px solid white',
    //   width: 8,
    //   height: 8,
    //   '::focus': { background: 'black' },
    // },
    // '&::-webkit-scrollbar-thumb:hover': {
    //   background: DARK_GREY_100,
    // },
    // '&::-webkit-scrollbar': {
    //   background: 'white',
    // },
  },
}))(TableContainer);

export const TableCellTD = withStyles(() => ({
  root: {
    padding: '12px 8px',
    background: WHITE,
    borderBottom: `1px solid ${GREY_100}`,
  },
  stickyHeader: { left: 'unset' },
}))(TableCell);

const useStyle = makeStyles((theme: Theme) => ({
  root: { justifyContent: 'flex-end' },
  selectRoot: {
    margin: '0 16px 0 8px',
    minWidth: '64px',
  },
  selectIcon: {
    top: 'calc(50% - 14px)',
  },
  caption: { fontSize: 12 },
  input: {
    '& .MuiTablePagination-select': {
      textAlign: 'left',
      textAlignLast: 'left',
      background: 'white',
      border: `0.5px solid ${GREY_100}`,
      borderRadius: '2px',
      fontSize: theme.typography.body2.fontSize,
      padding: '3px 12px',
    },
  },
  actions: {
    marginLeft: '10px',
    '& .MuiIconButton-root': {
      padding: '6px',
    },
  },
  even: {
    background: 'white',
  },
  odd: {
    background: BLUE_200,
  },
}));

export interface Columns {
  title?: string;
  dataIndex?: string;
  key?: string;
  style?: React.CSSProperties;
  styleHeader?: React.CSSProperties;
  render?: (col: some, index: number) => JSX.Element;
  fixed?: 'right' | 'left';
  width?: number;
  hidden?: boolean;
  disableAction?: boolean;
  variant?: Variant | 'inherit';
  lastCell?: { rowSpan?: number; colSpan?: number; render?: () => JSX.Element };
  nextRowsProps?: {
    isNextRow: boolean;
    hiddenArrow?: (col: some, index: number) => boolean;
    dataSource?: (col: some, index: number) => some[];
  };
  onClick?: (col: some, index: number) => void;
}
interface Props {
  style?: React.CSSProperties;
  styleTable?: React.CSSProperties;
  styleTableContainer?: React.CSSProperties;
  dataSource?: some[];
  columns: Columns[];
  paginationProps?: TablePaginationProps;
  loading?: boolean;
  caption?: React.ReactNode;
  header?: React.ReactNode;
  noColumnIndex?: boolean;
  stickyHeader?: boolean;
  fixIndexColumn?: boolean;
  onRowClick?: (col: some, index: number) => void;
  noHeaderColumns?: boolean | false;
}
export function RowCustom(props: {
  items: some;
  index: number;
  getColumn: any;
  hiddenArrow?: boolean;
  onRowClick?: (col: some, index: number) => void;
  onClick?: (col: some, index: number) => void;
  getWidth?: (col: Columns) => number;
  getShadow?: (col: Columns) => string | undefined;
  styleRow?: React.CSSProperties;
}) {
  const { getColumn, onRowClick, getWidth, getShadow, items, index, hiddenArrow, styleRow } = props;
  const [open, setOpen] = React.useState(false);

  const isTreeTable = React.useMemo(() => {
    const nextRowIndex = getColumn.filter((col: Columns) => col.nextRowsProps?.isNextRow);
    return nextRowIndex.length > 0;
  }, [getColumn]);

  return (
    <>
      <TableRow
        key={index}
        className="custom-table-row"
        onClick={() => onRowClick && onRowClick(items, index)}
        style={{ ...styleRow }}
      >
        {isTreeTable &&
          (hiddenArrow ? (
            <TableCellTD style={{ width: 40 }} onClick={(e: any) => e.stopPropagation()}>
              <IconButton
                onClick={() => {
                  setOpen(!open);
                }}
                style={{ padding: 0 }}
              >
                <KeyboardArrowRightIcon
                  fontSize="small"
                  style={{
                    transition: 'all 300ms',
                    transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
                  }}
                />
              </IconButton>
            </TableCellTD>
          ) : (
            <TableCellTD style={{ width: 40 }} />
          ))}
        {getColumn
          .filter((col: Columns) => !col.nextRowsProps?.isNextRow)
          .map((col: Columns, i: number) => (
            <TableCellTD
              className="custom-table-cell"
              key={i}
              style={{
                ...col.style,
                position: col.fixed ? 'sticky' : undefined,
                left: col.fixed === 'left' ? getWidth && getWidth(col) : undefined,
                right: col.fixed === 'right' ? getWidth && getWidth(col) : undefined,
                borderLeft:
                  col.fixed === 'right' && getShadow && getShadow(col)
                    ? `1px solid ${GREY_100}`
                    : undefined,
                borderRight:
                  col.fixed === 'left' && getShadow && getShadow(col)
                    ? `1px solid ${GREY_100}`
                    : undefined,
                // background:
                //   col.fixed === 'right' && getShadow(col) ? 'white' : undefined,
                cursor: onRowClick && !col.disableAction ? 'pointer' : undefined,
              }}
              onClick={(e: any) => {
                col.disableAction && e.stopPropagation();
              }}
            >
              {col.fixed && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: -1,
                    width: 6,
                    left: col.fixed === 'right' && getShadow && getShadow(col) ? -6 : undefined,
                    right: col.fixed === 'left' && getShadow && getShadow(col) ? -6 : undefined,
                    boxShadow: getShadow && getShadow(col),
                  }}
                />
              )}
              {col.render ? (
                <>{col.render(items, index)}</>
              ) : (
                <>
                  <Typography variant={col.variant || 'caption'}>
                    {items[`${col.dataIndex}`]}
                  </Typography>
                </>
              )}
            </TableCellTD>
          ))}
      </TableRow>
      {getColumn
        .filter(
          (col: Columns, n: number) =>
            col.nextRowsProps?.isNextRow &&
            col.nextRowsProps?.hiddenArrow &&
            col.nextRowsProps?.hiddenArrow(items, index) === true,
        )
        .map((col: Columns, i: number) => (
          <TableRow key={`${index}-${i}`} className="custom-table-row">
            <TableCellTD
              className="custom-table-cell"
              key={i}
              style={{
                padding: 0,
              }}
              onClick={(e: any) => {
                if (col.disableAction) {
                  return e.stopPropagation();
                }
                return col.onClick && col.onClick(items, index);
              }}
              colSpan={getColumn?.length}
            >
              <Collapse key={`${index}-${i}`} in={open} timeout="auto">
                <Box margin={0}>
                  {col.fixed && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        bottom: -1,
                        width: 6,
                        left: col.fixed === 'right' && getShadow && getShadow(col) ? -6 : undefined,
                        right: col.fixed === 'left' && getShadow && getShadow(col) ? -6 : undefined,
                        boxShadow: getShadow && getShadow(col),
                      }}
                    />
                  )}
                  {col.render ? (
                    <>{col.render(items, index)}</>
                  ) : (
                    <>
                      <Typography variant={col.variant || 'caption'}>
                        {items[`${col.dataIndex}`]}
                      </Typography>
                    </>
                  )}
                </Box>
              </Collapse>
            </TableCellTD>
          </TableRow>
        ))}
    </>
  );
}
const TableCustom: React.FC<Props> = props => {
  const {
    dataSource,
    columns,
    style,
    styleTable,
    styleTableContainer,
    paginationProps,
    loading,
    caption,
    noColumnIndex,
    stickyHeader,
    onRowClick,
    fixIndexColumn,
    header,
    noHeaderColumns,
  } = props;
  const [scrollLeft, setScrollLeft] = React.useState(false);
  const [scrollRight, setScrollRight] = React.useState(false);
  const classes = useStyle(props);
  const container = React.useRef<HTMLDivElement>(null);
  const intl = useIntl();

  const getRowIndex = React.useCallback(
    (i: number) => {
      let index = i;
      if (paginationProps) {
        index += paginationProps.page * paginationProps.rowsPerPage;
      }
      return index;
    },
    [paginationProps],
  );

  const getColumn = React.useMemo(() => {
    return columns
      ? !noColumnIndex
        ? [
            {
              title: 'stt',
              dataIndex: 'index',
              fixed: fixIndexColumn ? 'left' : undefined,
              width: 70,
              styleHeader: { textAlign: 'center' },
              style: { textAlign: 'center' },
            } as Columns,
            ...columns.filter(v => !v.hidden),
          ]
        : [...columns.filter(v => !v.hidden)]
      : [];
  }, [columns, fixIndexColumn, noColumnIndex]);

  const isTreeTable = React.useMemo(() => {
    const nextRowIndex = getColumn.filter((col: Columns) => col.nextRowsProps?.isNextRow);
    return nextRowIndex.length > 0;
  }, [getColumn]);

  const getDataSource = React.useMemo(() => {
    const temp = dataSource
      ? dataSource.map((v: some, index: number) => {
          return { index: getRowIndex(index + 1), ...v };
        })
      : undefined;
    return temp;
  }, [dataSource, getRowIndex]);

  const getWidth = React.useCallback(
    (col: Columns) => {
      let width = 0;
      if (col.fixed !== undefined) {
        const columnsTmp = col.fixed === 'left' ? [...getColumn] : [...getColumn].reverse();
        for (let i = 0; i < columnsTmp.length; i += 1) {
          if (col.title === columnsTmp[i].title) {
            break;
          }
          width += columnsTmp[i].fixed ? (columnsTmp[i].width || 0) + 1 : 0;
        }
      }
      return width;
    },
    [getColumn],
  );
  const getShadow = React.useCallback(
    (col: Columns) => {
      if (col.fixed) {
        let isLast = false;
        const columnsTmp = col.fixed === 'left' ? [...getColumn].reverse() : [...getColumn];
        const lastEle = columnsTmp.find(v => v.fixed === col.fixed);
        if (lastEle?.title === col.title) {
          isLast = true;
        }
        if (isLast) {
          if (col.fixed === 'left' && scrollLeft) {
            return 'inset 10px 0 8px -8px rgba(0, 0, 0, 0.15)';
          }
          if (col.fixed === 'right' && scrollRight) {
            return 'inset -10px 0 8px -8px rgba(0, 0, 0, 0.15)';
          }
        }
      }
      return undefined;
    },
    [getColumn, scrollLeft, scrollRight],
  );

  React.useEffect(() => {
    if (
      container.current?.offsetWidth &&
      container.current?.scrollWidth &&
      container.current.offsetWidth < container.current.scrollWidth
    ) {
      setScrollRight(true);
    }
  }, []);
  return (
    <Paper
      style={{
        position: 'relative',
        borderRadius: 0,
        ...style,
      }}
    >
      {header}
      <div
        style={{
          overflow: 'hidden',
          borderTop: `1px solid ${GREY_100}`,
          // padding: '0px 8px',
        }}
      >
        <TableContainerCS
          ref={container}
          style={styleTableContainer}
          onScrollCapture={(e: any) => {
            if (e.currentTarget.scrollLeft) {
              setScrollLeft(true);
            } else {
              setScrollLeft(false);
            }
            if (
              e.currentTarget.scrollWidth -
              e.currentTarget.clientWidth -
              e.currentTarget.scrollLeft
            ) {
              setScrollRight(true);
            } else {
              setScrollRight(false);
            }
          }}
        >
          <Table
            stickyHeader={stickyHeader}
            className="custom-table"
            style={{ borderCollapse: 'separate', ...styleTable }}
          >
            {(!getDataSource || (getDataSource && getDataSource.length === 0)) && (
              <caption style={{ background: 'white' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {caption ? (
                    <>{caption}</>
                  ) : (
                    <Col style={{ alignItems: 'center', margin: '12px' }}>
                      <IconButton
                        disableFocusRipple
                        disableRipple
                        disableTouchRipple
                        disabled
                        style={{
                          backgroundColor: GREY_100,
                          margin: '12px',
                          width: '250px',
                          height: '250px',
                        }}
                      >
                        <IconBox />
                      </IconButton>
                      <Typography variant="body2" color="textSecondary">
                        <FormattedMessage id="noData" />
                      </Typography>
                    </Col>
                  )}
                </div>
              </caption>
            )}
            <TableHead style={{ display: noHeaderColumns ? 'none' : undefined }}>
              <TableRow>
                {isTreeTable && <TableCellTD />}
                {getColumn
                  .filter((col: Columns) => !col.nextRowsProps?.isNextRow)
                  .map((col: Columns, index: number) => (
                    <TableCellTD
                      key={index}
                      style={{
                        padding: '8px 0px',
                        ...col.styleHeader,
                        width: col.width,
                        minWidth: col.fixed ? col.width : undefined,
                        position: col.fixed ? 'sticky' : undefined,
                        left: col.fixed === 'left' ? getWidth(col) : undefined,
                        right: col.fixed === 'right' ? getWidth(col) : undefined,
                        borderRight:
                          col.fixed === 'left' && getShadow(col)
                            ? `0.5px solid ${GREY_100}`
                            : undefined,
                        borderLeft:
                          col.fixed === 'right' && getShadow(col)
                            ? `0.5px solid ${GREY_100}`
                            : undefined,
                      }}
                    >
                      {col.fixed && (
                        <div
                          style={{
                            position: 'absolute',
                            top: 0,
                            bottom: -1,
                            width: 6,
                            left: col.fixed === 'right' && getShadow(col) ? -5 : undefined,
                            right: col.fixed === 'left' && getShadow(col) ? -5 : undefined,
                            boxShadow: getShadow(col),
                          }}
                        />
                      )}
                      <div
                        style={{
                          padding: '0px 8px',
                          // borderRight:
                          //   col.fixed === 'left' && getShadow(col)
                          //     ? undefined
                          //     : `0.5px solid ${GREY_100}`,
                        }}
                      >
                        {col.title && (
                          <Typography variant="caption" style={{ whiteSpace: 'nowrap' }}>
                            <FormattedMessage id={col.title} />
                          </Typography>
                        )}
                      </div>
                    </TableCellTD>
                  ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {getDataSource &&
                getDataSource.map((items: some, index: number) => (
                  <RowCustom
                    key={index}
                    items={items}
                    index={index}
                    getColumn={getColumn}
                    getWidth={getWidth}
                    getShadow={getShadow}
                    hiddenArrow={
                      !!getColumn.filter(
                        (col: Columns) =>
                          col.nextRowsProps?.hiddenArrow &&
                          col.nextRowsProps?.hiddenArrow(items, index) === true,
                      ).length
                    }
                    onRowClick={() => onRowClick && onRowClick(items, index)}
                  />
                ))}
              <TableRow hover key="extendRow">
                {getColumn
                  .filter((col: Columns) => col.lastCell)
                  .map((col: Columns, i: number) => (
                    <TableCellTD
                      key={i}
                      rowSpan={col.lastCell?.rowSpan}
                      colSpan={col.lastCell?.colSpan}
                      className="custom-table-cell"
                      style={{
                        ...col.style,
                        position: col.fixed ? 'sticky' : undefined,
                        left: col.fixed === 'left' ? getWidth(col) : undefined,
                        right: col.fixed === 'right' ? getWidth(col) : undefined,
                        borderLeft:
                          col.fixed === 'right' && getShadow(col)
                            ? `0.5px solid ${GREY_100}`
                            : undefined,
                        // background:
                        //   col.fixed === 'right' && getShadow(col) ? 'white' : undefined,
                        cursor: onRowClick && !col.disableAction ? 'pointer' : undefined,
                      }}
                      onClick={(e: any) => {
                        col.disableAction && e.stopPropagation();
                      }}
                    >
                      {col.fixed && (
                        <div
                          style={{
                            position: 'absolute',
                            top: 0,
                            bottom: -1,
                            width: 6,
                            left: col.fixed === 'right' && getShadow(col) ? -6 : undefined,
                            right: col.fixed === 'left' && getShadow(col) ? -6 : undefined,
                            boxShadow: getShadow(col),
                          }}
                        />
                      )}
                      {col.lastCell && <>{col?.lastCell?.render && col?.lastCell?.render()}</>}
                    </TableCellTD>
                  ))}
              </TableRow>
            </TableBody>
          </Table>
          {loading && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                background: fade(GREY_100, 0.7),
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <LoadingIcon />
            </div>
          )}
        </TableContainerCS>
      </div>
      {paginationProps && (
        <TablePagination
          component={Row}
          {...paginationProps}
          classes={{
            root: classes.root,
            selectRoot: classes.selectRoot,
            selectIcon: classes.selectIcon,
            input: classes.input,
            actions: classes.actions,
            caption: classes.caption,
          }}
          labelRowsPerPage={intl.formatMessage({ id: 'labelRowPerPage' })}
          ActionsComponent={TablePaginationActionsCustom}
        />
      )}
    </Paper>
  );
};

export default TableCustom;
