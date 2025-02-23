import React from 'react'

function AccountTab({ name, selectedView, setSelectedView }) {
  return (
    <div onClick={() => setSelectedView(name)}>
      {name === selectedView
        ? <button className='p-2 bg-red-600 font-bold text-white'>{name}</button>
        : <button className='p-2 bg-slate-300 text-slate-500 opacity-75'>{name}</button>
      }
    </div>
  )
}

export default AccountTab