import React from 'react'
import { User } from '../../shared/types/user'

const UserDetails = () => {
  const userDetails: User = JSON.parse(localStorage.getItem(
    'userDetails'
  ) as string)

  return (
    <>
      <h1>User Details</h1>
      {/* Find a way to DRY this */}
      <div>
        <strong>Username</strong>: {userDetails.username} <br />
        <strong>Email</strong>: {userDetails.email}
        <br />
        <strong>Company</strong> Name: {userDetails.company.name}
        <br />
      </div>
    </>
  )
}

export default UserDetails
