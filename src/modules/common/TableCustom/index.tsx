import React from 'react';
import {
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell as TableCellRaw,
  TableContainer,
  TableHead,
  TablePagination,
  TablePaginationProps,
  TableRow as TableRowRaw,
  Theme,
  Typography,
} from '@material-ui/core';
import { withStyles, createStyles, makeStyles } from '@material-ui/styles';
import { fade } from '@material-ui/core/styles';
import { Variant } from '@material-ui/core/styles/createTypography';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { FormattedMessage, useIntl } from 'react-intl';
import { BLUE_200, GREEN_50, GREY_100, WHITE } from '../../../assets/theme/colors';
import { ReactComponent as IconBox } from '../../../assets/icons/ic_nodata.svg';
import { Col, Row } from '../Elements';
import LoadingIcon from '../LoadingIcon';
import './table.css';
import TablePaginationActionsCustom from './TablePaginationActionsCustom';
import TablePaginationLoadMore, {
  TablePaginationLoadMoreProps,
} from './TablePaginationLoadMore';
import { some } from '../../../constants/constants';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cover: {
      overflow: 'hidden',
      borderTop: `1px solid ${GREY_100}`,
      padding: '0px 8px',
    },
    paper: {
      position: 'relative',
      borderRadius: 0,
    },
    table: { borderCollapse: 'separate' },
    cellHeader: { padding: '8px 0px' },
  })
);

export const TableRow = withStyles(() => ({
  root: {
    '&:hover > td': { background: GREEN_50 },
  },
}))(TableRowRaw);

export const TableCell = withStyles(() => ({
  root: {
    padding: '12px 8px',
    background: WHITE,
    borderBottom: `1px solid ${GREY_100}`,
    // '&:hover': { background: PURPLE_50 },
  },
}))(TableCellRaw);

export const useStylePagination = makeStyles((theme: Theme) => ({
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
      fontSize: 14,
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

export interface Column {
  title?: string;
  dataIndex?: string;
  key?: string;
  style?: React.CSSProperties;
  styleHeader?: React.CSSProperties | some;
  render?: (col: some, index: number) => JSX.Element;
  fixed?: 'right' | 'left';
  width?: number;
  hidden?: boolean;
  disableAction?: boolean;
  variant?: Variant | 'inherit';
  lastCell?: { rowSpan?: number; colSpan?: number; render?: () => JSX.Element };
}

export interface ExtendColumn {
  onOpen?: (open: boolean) => void;
  render?: (col: some, index: number) => JSX.Element;
  onClick?: (col: some, index: number) => JSX.Element;
}

export function RowCustom(props: {
  className?: ClassNameMap;
  items: some;
  index: number;
  getColumn: Column[];
  extendRow?: ExtendColumn;
  onRowClick?: (col: some, index: number) => void;
  getWidth?: (col: Column) => number;
  getShadow?: (col: Column) => string | undefined;
  styleRow?: React.CSSProperties;
}) {
  const {
    getColumn,
    onRowClick,
    getWidth,
    getShadow,
    items,
    index,
    styleRow,
    className,
    extendRow,
  } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow
        key={index}
        className={className?.row}
        onClick={() => onRowClick && onRowClick(items, index)}
        style={{ ...styleRow }}
      >
        {extendRow && (
          <TableCell
            style={{ width: 40 }}
            onClick={(e: any) => e.stopPropagation()}
          >
            <IconButton
              onClick={() => {
                setOpen(!open);
                extendRow.onOpen && extendRow.onOpen(!open);
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
          </TableCell>
        )}
        {getColumn.map((col: Column, i: number) => (
          <TableCell
            className={className?.cell}
            key={i}
            style={{
              ...col.style,
              position: col.fixed ? 'sticky' : undefined,
              left:
                col.fixed === 'left' ? getWidth && getWidth(col) : undefined,
              right:
                col.fixed === 'right' ? getWidth && getWidth(col) : undefined,
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
                  left:
                    col.fixed === 'right' && getShadow && getShadow(col)
                      ? -6
                      : undefined,
                  right:
                    col.fixed === 'left' && getShadow && getShadow(col)
                      ? -6
                      : undefined,
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
          </TableCell>
        ))}
      </TableRow>
      {extendRow && (
        <TableRow key={`extendRow-${index}`} className={className?.row}>
          <TableCell
            className={className?.cell}
            style={{
              padding: 0,
            }}
            onClick={(e: any) => {
              e.stopPropagation();
              extendRow.onClick && extendRow.onClick(items, index);
            }}
            colSpan={getColumn?.length + 1}
          >
            <Collapse in={open} timeout="auto">
              {extendRow.render && extendRow.render(items, index)}
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}
interface Props {
  id?: string;
  className?: ClassNameMap;
  style?: React.CSSProperties;
  styleTable?: React.CSSProperties;
  styleTableContainer?: React.CSSProperties;
  dataSource?: some[];
  columns: Column[];
  extendRow?: ExtendColumn;
  paginationProps?: TablePaginationProps;
  loading?: boolean;
  caption?: React.ReactNode;
  header?: React.ReactNode;
  noColumnIndex?: boolean;
  stickyHeader?: boolean;
  fixIndexColumn?: boolean;
  onRowClick?: (col: some, index: number) => void;
  noHeaderColumns?: boolean | false;
  paginationLoadMoreProps?: TablePaginationLoadMoreProps;
}

const TableCustom: React.FC<Props> = (props) => {
  const {
    id,
    className,
    dataSource,
    columns,
    extendRow,
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
    paginationLoadMoreProps,
  } = props;
  const [scrollLeft, setScrollLeft] = React.useState(false);
  const [scrollRight, setScrollRight] = React.useState(false);
  const classesPagination = useStylePagination();
  const classes = useStyles();

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
    [paginationProps]
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
            } as Column,
            ...columns.filter((v) => !v.hidden),
          ]
        : [...columns.filter((v) => !v.hidden)]
      : [];
  }, [columns, fixIndexColumn, noColumnIndex]);

  const getDataSource = React.useMemo(() => {
    const temp = dataSource
      ? dataSource.map((v: some, index: number) => {
          return { index: getRowIndex(index + 1), ...v };
        })
      : undefined;
    return temp;
  }, [dataSource, getRowIndex]);

  const getWidth = React.useCallback(
    (col: Column) => {
      let width = 0;
      if (col.fixed !== undefined) {
        const columnsTmp =
          col.fixed === 'left' ? [...getColumn] : [...getColumn].reverse();
        for (let i = 0; i < columnsTmp.length; i += 1) {
          if (col.title === columnsTmp[i].title) {
            break;
          }
          width += columnsTmp[i].fixed ? (columnsTmp[i].width || 0) + 1 : 0;
        }
      }
      return width;
    },
    [getColumn]
  );
  const getShadow = React.useCallback(
    (col: Column) => {
      if (col.fixed) {
        let isLast = false;
        const columnsTmp =
          col.fixed === 'left' ? [...getColumn].reverse() : [...getColumn];
        const lastEle = columnsTmp.find((v) => v.fixed === col.fixed);
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
    [getColumn, scrollLeft, scrollRight]
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
      id={id}
      className={`${classes.paper} ${className?.paper}`}
      style={style}
    >
      {header}
      <div className={`${classes.cover} ${className?.cover}`}>
        <TableContainer
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
            className={className?.table}
            style={styleTable}
          >
            {(!getDataSource ||
              (getDataSource && getDataSource.length === 0)) && (
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
            <TableHead
              className={className?.header}
              style={{ display: noHeaderColumns ? 'none' : undefined }}
            >
              <TableRow className={`${className?.row} ${className?.rowHeader}`}>
                {extendRow && <TableCell />}
                {getColumn.map((col: Column, index: number) => (
                  <TableCell
                    key={index}
                    className={`${classes?.cellHeader} ${className?.cell} ${className?.cellHeader}`}
                    style={{
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
                          left:
                            col.fixed === 'right' && getShadow(col)
                              ? -5
                              : undefined,
                          right:
                            col.fixed === 'left' && getShadow(col)
                              ? -5
                              : undefined,
                          boxShadow: getShadow(col),
                        }}
                      />
                    )}
                    <div>
                      {col.title && (
                        <Typography
                          variant="body2"
                          style={{ whiteSpace: 'nowrap' }}
                        >
                          <FormattedMessage id={col.title} />
                        </Typography>
                      )}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody className={className?.body}>
              {getDataSource &&
                getDataSource.map((items: some, index: number) => (
                  <RowCustom
                    key={index}
                    className={className}
                    items={items}
                    index={index}
                    getColumn={getColumn}
                    extendRow={extendRow}
                    getWidth={getWidth}
                    getShadow={getShadow}
                    onRowClick={() => onRowClick && onRowClick(items, index)}
                  />
                ))}
              <TableRow className={className?.row} key="extendRow">
                {getColumn
                  .filter((col: Column) => col.lastCell)
                  .map((col: Column, i: number) => (
                    <TableCell
                      key={i}
                      rowSpan={col.lastCell?.rowSpan}
                      colSpan={col.lastCell?.colSpan}
                      className="custom-table-cell"
                      style={{
                        ...col.style,
                        position: col.fixed ? 'sticky' : undefined,
                        left: col.fixed === 'left' ? getWidth(col) : undefined,
                        right:
                          col.fixed === 'right' ? getWidth(col) : undefined,
                        borderLeft:
                          col.fixed === 'right' && getShadow(col)
                            ? `0.5px solid ${GREY_100}`
                            : undefined,
                        // background:
                        //   col.fixed === 'right' && getShadow(col) ? 'white' : undefined,
                        cursor:
                          onRowClick && !col.disableAction
                            ? 'pointer'
                            : undefined,
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
                            left:
                              col.fixed === 'right' && getShadow(col)
                                ? -6
                                : undefined,
                            right:
                              col.fixed === 'left' && getShadow(col)
                                ? -6
                                : undefined,
                            boxShadow: getShadow(col),
                          }}
                        />
                      )}
                      {col.lastCell && (
                        <>{col?.lastCell?.render && col?.lastCell?.render()}</>
                      )}
                    </TableCell>
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
        </TableContainer>
      </div>
      {paginationProps && (
        <TablePagination
          component={Row}
          {...paginationProps}
          rowsPerPageOptions={
            paginationProps.rowsPerPageOptions || [10, 15, 20, 25, 30, 35, 40]
          }
          classes={{
            root: classesPagination.root,
            selectRoot: classesPagination.selectRoot,
            selectIcon: classesPagination.selectIcon,
            input: classesPagination.input,
            actions: classesPagination.actions,
            caption: classesPagination.caption,
          }}
          labelRowsPerPage={intl.formatMessage({ id: 'labelRowPerPage' })}
          ActionsComponent={TablePaginationActionsCustom}
        />
      )}
      {paginationLoadMoreProps && (
        <TablePaginationLoadMore {...paginationLoadMoreProps} />
      )}
    </Paper>
  );
};

export default TableCustom;
