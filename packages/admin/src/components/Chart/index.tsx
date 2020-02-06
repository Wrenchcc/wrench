// @ts-nocheck
import React from 'react'
import { LineChart, Line, CartesianGrid, XAxis, Tooltip } from 'recharts'

const data = [
  {
    name: 'Aug 2019',
    count: 100,
  },
  {
    name: 'Sep 2019',
    count: 370,
  },
  {
    name: 'Dec 2019',
    count: 401,
  },
  {
    name: 'Jan 2019',
    count: 487,
  },
]

function Chart() {
  return (
    <>
      <LineChart width={500} height={300} data={data}>
        <CartesianGrid vertical={false} stroke="#e6e7e9" />
        <XAxis dataKey="name" tickLine={false} stroke="#e6e7e9" />
        {/* <YAxis tickLine={false} stroke="#e6e7e9" /> */}

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
        {data[0].name}
      </span>
    </>
  )
}

export default Chart
