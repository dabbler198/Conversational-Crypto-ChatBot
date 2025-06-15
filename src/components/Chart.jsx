import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function Chart({ data }) {

  if (!data?.length) return <p>No data to display</p>;

  return (
    <div className="overflow-x-auto">
    <div className="min-w-[400px] h-48">
        <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="date" tick={{ fontSize: 10 }} />
          <YAxis tick={{ fontSize: 10 }} />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} dot={false} />
        </LineChart>
        </ResponsiveContainer>
    </div>
    </div>    
  );
}
