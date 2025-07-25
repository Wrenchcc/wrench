// @ts-nocheck
import React from 'react'
import { LineChart, Line, CartesianGrid, XAxis, Tooltip } from 'recharts'

function Chart({ data }) {
  return (
    <>
      <LineChart width={500} height={300} data={data}>
        <CartesianGrid vertical={false} stroke="#e6e7e9" />
        <XAxis dataKey="date" tickLine={false} stroke="#e6e7e9" />

        <Tooltip />
        <Line type="monotone" dataKey="count" stroke="black" strokeWidth={3} />
      </LineChart>
      <span
        style={{
          position: 'absolute',
          fontFamily: '"Inter var", system-ui, sans-serif',
          color: '#6d6f76',
          fontWeight: 500,
          bottom: 54,
        }}
      >
        {data && data[0]?.date}
      </span>
    </>
  )
}

export default Chart
