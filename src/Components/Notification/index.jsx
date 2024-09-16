import React from "react";

const NotificationDropdown = ({ notifications }) => {
  return (
    <div className="notification-dropdown">
      <button className="notification-icon">
        <i className="fas fa-bell"></i>
        {notifications.length > 0 && (
          <span className="badge">{notifications.length}</span>
        )}
      </button>
      <div className="dropdown-content">
        {notifications.map((notification, index) => (
          <div key={index} className="notification-item">
            <h4>{notification.title}</h4>
            <p>{notification.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationDropdown;
