// src/components/profile-view/delete-profile.jsx
import { Button } from 'react-bootstrap';

export const DeleteProfile = ({ user, token }) => {
  const handleDelete = () => {
    if (
      window.confirm(
        'Are you sure you want to delete your account? This action cannot be undone.'
      )
    ) {
      fetch(
        `https://movies-app2024-74d588eb4f3d.herokuapp.com/users/${user.Username}`,
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        }
      )
        .then(() => {
          alert('Account deleted');
          // Perform logout and redirect to the login screen
          localStorage.clear();
          window.location.href = '/login';
        })
        .catch((error) => console.error('Error deleting account:', error));
    }
  };

  return (
    <div>
      <h4>Delete Account</h4>
      <Button variant="secondary" onClick={handleDelete}>
        Delete Profile
      </Button>
    </div>
  );
};
