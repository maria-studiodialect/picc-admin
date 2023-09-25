'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import socket from '../../utils/sockets';

export default function Home() {
  const [users, setUsers] = useState(null)

  useEffect(() => {
    socket.emit('UsersRequest');
    socket.on('User List', (userList) => {
      setUsers(userList)
    }); 
  }, [socket]);

  return (
    <div>
      <div className='mb-2 text-2xl font-bold'>User List</div>
      <div>
      {users &&
      users.map((user, i) => (
        <div key={i} className='border my-2 w-1/3 rounded-lg py-2 px-4'>
          {user}
          <span></span>
        </div>
      ))
      }
      </div>
    </div>
  )
}
