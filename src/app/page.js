'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import socket from '../../utils/sockets';
import {remove} from "next/dist/build/webpack/loaders/resolve-url-loader/lib/file-protocol";

export default function Home() {
    const [users, setUsers] = useState([]); // Initialize with an empty array

  useEffect(() => {
    socket.emit('UsersRequest');
    socket.on('User List', (userList) => {
      setUsers(userList)
    }); 
  }, []);

  function removeUser(id) {
      socket.emit('Remove User', id);
  }

  console.log(users)

  return (
    <div>
      <div className='mb-2 text-2xl font-bold'>User List</div>
      <div>
      {users.length > 0 ?
      users.map((user, i) => (
        <div key={i} className='border my-2 md:w-1/3 rounded-lg py-2 px-4 flex justify-between'>
          {user}
            <div>
                {i > 0 && <span className='underline mr-2 cursor-pointer'>Make active</span>}
                <span className='underline mr-2 text-red-500 cursor-pointer' onClick={() => removeUser(user)}>Delete</span>
            </div>
        </div>
      ))
          :
          <div>No active users</div>
      }
      </div>
    </div>
  )
}
