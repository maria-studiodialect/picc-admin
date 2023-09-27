'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import socket from '../../utils/sockets';
import {remove} from "next/dist/build/webpack/loaders/resolve-url-loader/lib/file-protocol";

export default function Home() {
    const [users, setUsers] = useState([]); // Initialize with an empty array
    const [mainUser, setMainUser] = useState(null); // Initialize with an empty array


    useEffect(() => {
    socket.emit('UsersRequest');
    socket.on('User List', (userList) => {
      setUsers(userList)
    }); 
  }, []);

    useEffect(() => {
        socket.on('Main User', (user) => {
            console.log('received message!')
            setMainUser(user)
        });
    }, []);

  function removeUser(id) {
      socket.emit('Remove User', id);
  }

    function removeMainUser(id) {
        console.log(id)
        socket.emit('Remove Main User', id);
    }

    function makeActive(id) {
        socket.emit('Make Active', id);
    }

  console.log('userList ' + users)

  return (
      <div className='md:grid grid-cols-2 gap-10'>
        <div>
          <div className='mb-2 text-2xl font-bold'>User List</div>
          <div>
          {users.length > 0 ?
          users.map((user, i) => (
            <div key={i} className='border my-2 md:w-full rounded-lg py-2 px-4 flex justify-between'>
              {user}
                <div>
                    <span className='underline mr-2 cursor-pointer'  onClick={() => makeActive(user)}>Make active</span>
                    <span className='underline mr-2 text-red-500 cursor-pointer' onClick={() => removeUser(user)}>Delete</span>
                </div>
            </div>
          ))
              :
              <div>No active users</div>
          }
          </div>
        </div>
          <div>
              <div className='mb-2 text-2xl font-bold'>
                  Active User
              </div>
              {mainUser ?
              <div className='border my-2 md:w-full rounded-lg py-2 px-4 flex justify-between'>
                  {mainUser}
                  <span className='underline mr-2 text-red-500 cursor-pointer' onClick={() => removeMainUser(mainUser)}>Delete</span>
              </div>
                  :
                  <div>No active user</div>
              }
          </div>
      </div>
  )
}
