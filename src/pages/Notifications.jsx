import React, { useState } from "react";
import {
  Bell,
  CheckCircle,
  AlertCircle,
  Info,
  Clock,
  Trash2,
  Filter,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Notifications = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "success",
      title: "Soil Analysis Complete",
      message:
        "Your soil analysis report is ready. Check your recommendations for optimal crop selection.",
      time: "2 hours ago",
      read: false,
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
    },
    {
      id: 2,
      type: "warning",
      title: "Irrigation Alert",
      message:
        "Field A requires irrigation. Current soil moisture is below optimal levels.",
      time: "4 hours ago",
      read: false,
      icon: <AlertCircle className="w-5 h-5 text-yellow-600" />,
    },
    {
      id: 3,
      type: "info",
      title: "Market Price Update",
      message:
        "Wheat prices have increased by 8% in your region. Consider timing your harvest.",
      time: "1 day ago",
      read: true,
      icon: <Info className="w-5 h-5 text-blue-600" />,
    },
    {
      id: 4,
      type: "success",
      title: "Crop Health Check",
      message:
        "Your corn crop is showing excellent growth. All parameters are within normal range.",
      time: "2 days ago",
      read: true,
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
    },
    {
      id: 5,
      type: "warning",
      title: "Pest Alert",
      message:
        "Potential pest activity detected in Field B. Schedule inspection within 24 hours.",
      time: "3 days ago",
      read: true,
      icon: <AlertCircle className="w-5 h-5 text-yellow-600" />,
    },
    {
      id: 6,
      type: "info",
      title: "Weather Forecast",
      message:
        "Heavy rainfall expected in the next 48 hours. Adjust your irrigation schedule accordingly.",
      time: "4 days ago",
      read: true,
      icon: <Info className="w-5 h-5 text-blue-600" />,
    },
  ]);

  const getFilteredNotifications = () => {
    if (activeFilter === "all") return notifications;
    return notifications.filter(
      (notification) => notification.type === activeFilter
    );
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const deleteNotification = (id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };

  const getUnreadCount = () => notifications.filter((n) => !n.read).length;

  const getTypeColor = (type) => {
    switch (type) {
      case "success":
        return "border-l-green-500 bg-green-50";
      case "warning":
        return "border-l-yellow-500 bg-yellow-50";
      case "info":
        return "border-l-blue-500 bg-blue-50";
      default:
        return "border-l-gray-500 bg-gray-50";
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case "success":
        return "Success";
      case "warning":
        return "Warning";
      case "info":
        return "Info";
      default:
        return "General";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white pb-20">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm sticky top-0 z-40 border-b border-green-100">
        <div className="flex flex-col sm:flex-row justify-between items-center px-4 py-4 md:px-8 gap-2">
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            {/* Back to Home Button */}
            <button
              className="bg-green-600 text-white rounded px-3 py-2 text-sm font-bold mr-2 transition-colors duration-200 hover:bg-green-700"
              onClick={() => navigate("/")}
            >
              Back to Home
            </button>
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Bell className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Notifications</h1>
              <p className="text-sm text-gray-600">
                {getUnreadCount()} unread • {notifications.length} total
              </p>
            </div>
          </div>
          <button
            onClick={markAllAsRead}
            className="px-4 py-2 text-green-600 hover:text-green-700 font-medium transition-colors duration-200 w-full sm:w-auto"
          >
            Mark all read
          </button>
        </div>
      </div>

      <div className="px-2 py-4 sm:px-4 md:px-8">
        {/* Filter Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border border-green-100 mb-6">
          <div className="flex flex-col sm:flex-row border-b border-gray-200">
            {["all", "success", "warning", "info"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`flex-1 px-4 py-3 text-center font-medium transition-colors duration-200 ${
                  activeFilter === filter
                    ? "text-green-600 border-b-2 border-green-600 bg-green-50"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {filter === "all" ? "All" : getTypeLabel(filter)}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {getFilteredNotifications().length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No notifications
              </h3>
              <p className="text-gray-600">You're all caught up!</p>
            </div>
          ) : (
            getFilteredNotifications().map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-2xl shadow-sm border border-green-100 overflow-hidden transition-all duration-200 hover:shadow-md ${
                  !notification.read ? "ring-2 ring-green-200" : ""
                } flex flex-col sm:flex-row`}
              >
                <div
                  className={`border-l-4 ${getTypeColor(notification.type)}`}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="flex-shrink-0 mt-1">
                          {notification.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {notification.title}
                            </h3>
                            {!notification.read && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                New
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 mb-3 leading-relaxed">
                            {notification.message}
                          </p>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="w-4 h-4 mr-1" />
                              {notification.time}
                            </div>
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              {getTypeLabel(notification.type)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors duration-200"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg border border-green-100 p-6 hidden md:block">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex flex-col items-center p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors duration-200">
              <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
              <span className="text-sm font-medium text-gray-700">
                Mark All Read
              </span>
            </button>
            <button className="flex flex-col items-center p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors duration-200">
              <Filter className="w-6 h-6 text-blue-600 mb-2" />
              <span className="text-sm font-medium text-gray-700">Filter</span>
            </button>
            <button className="flex flex-col items-center p-4 bg-yellow-50 rounded-xl hover:bg-yellow-100 transition-colors duration-200">
              <AlertCircle className="w-6 h-6 text-yellow-600 mb-2" />
              <span className="text-sm font-medium text-gray-700">Alerts</span>
            </button>
            <button className="flex flex-col items-center p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors duration-200">
              <Bell className="w-6 h-6 text-purple-600 mb-2" />
              <span className="text-sm font-medium text-gray-700">
                Settings
              </span>
            </button>
          </div>
        </div>
      </div>
      {/* Back to Home Button */}
    </div>
  );
};

export default Notifications;
