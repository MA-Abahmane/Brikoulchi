import { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    setUsers(storedUsers);
  }, []);

  return (
    <div className="admin-page-container">
      <h1 className="page-title">Users</h1>
      <div className="card" style={{ minHeight: 'calc(100vh - 200px)' }}>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Username</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Profile</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.username}>
                  <td>{user.username}</td>
                  <td>{`${user.firstName} ${user.lastName}`}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    {user.profileImage ? (
                      <img 
                        src={user.profileImage} 
                        alt="Profile" 
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm">
                        {user.firstName[0]}{user.lastName[0]}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Users;