import React from "react"
import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  const notificationStyle = {
    color: notification.type === "error" ? "red" : "green",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  }

  if (notification.message === null) {
    return null
  }

  return <div style={notificationStyle}>{notification.message}</div>
}

export default Notification
