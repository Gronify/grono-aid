import React, { useMemo } from 'react';
//import { Callout, Card } from '@blueprintjs/core';
import { Column, useSortBy, useTable } from 'react-table';

//import { LoadingFullBlock } from '../LoadingFullBlock';

type Props<T extends object> = {
  columns: Column<T>[],
  data: T[],
  isLoading: boolean;
  msgNoData?: string;
}

const Table = <T extends object>({ columns, data, msgNoData, isLoading }: Props<T>) => {
  const defaultColumn = React.useMemo(
    () => ({
      width: 0,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    flatHeaders,
    rows,
    prepareRow,
  } = useTable({
    defaultColumn,
    columns,
    data,
  },
    useSortBy)

  const colGroups = useMemo(() => {
    return (
      <colgroup>
        {flatHeaders.map((head) => {
          return (
            <col
              key={head.id}
              style={{ width: head.width ? `${head.width}px` : undefined }}
            />
          );
        })}
      </colgroup>
    );
  }, [flatHeaders]);


  if (isLoading && data.length === 0) {
    return (
      <div className="table-wrapper-first-loading">
        {/* {isLoading ? <LoadingFullBlock /> : null} */}
      </div>
    )
  }

  if (msgNoData && data.length === 0 && !isLoading) {
    return (
      <div>
        {msgNoData}
      </div>
    )
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

      {/* {isLoading ? <LoadingFullBlock /> : null} */}

      <table
        className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-auto"
        {...getTableProps()}
      >
        {colGroups}
        <thead className='text-s py-6 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th className='px-6 py-3' {...column.getHeaderProps(column.getSortByToggleProps())} >{column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' ↓'
                        : ' ↑'
                      : ''}
                  </span></th>

              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600' {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td className='px-6 py-4' {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>




    </div>
  );
}

export default Table;