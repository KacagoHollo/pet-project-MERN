import React, {useState} from 'react'
import http from 'axios'

function ProfileDetails({user}) {
  return (
    <div>
        <h2>{user.name}</h2>
    </div>
  )
}

export default ProfileDetails