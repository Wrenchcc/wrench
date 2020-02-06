// @ts-nocheck
import React from 'react'
import styled from 'styled-components'
import { useTable, useBlockLayout, usePagination } from 'react-table'

const Base = styled.section`
  table {
    width: 100%;
    border-spacing: 0;
    border: 1px solid #e6e7e9;
    margin-bottom: 40px;
    box-sizing: border-box;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid #e6e7e9;
      border-right: 1px solid #e6e7e9;
      height: 45px;
      line-height: 26px;
      overflow: hidden;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      :last-child {
        border-right: 0;
      }
    }
  }

  th {
    text-align: left;
    font-weight: 500;
  }

  .pagination {
    padding: 0.5rem;
  }
`

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
    },
    useBlockLayout
  )

  return (
    <Base>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </Base>
  )
}

export default Table
