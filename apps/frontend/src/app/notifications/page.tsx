"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  MessageSquare, 
  DollarSign, 
  Eye, 
  TrendingUp, 
  TrendingDown,
  Star,
  Heart,
  ShoppingCart,
  AlertCircle,
  CheckCircle,
  Clock,
  Filter,
  X,
  MoreHorizontal
} from "lucide-react";

interface Notification {
  id: string;
  type: 'message' | 'offer' | 'price_drop' | 'new_listing' | 'sold' | 'in_demand' | 'viewed' | 'system';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
  actionUrl?: string;
  metadata?: {
    listingId?: string;
    listingTitle?: string;
    price?: number;
    originalPrice?: number;
    viewerName?: string;
    sellerName?: string;
    offerAmount?: number;
  };
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread' | 'messages' | 'offers' | 'alerts' | 'views'>('all');
  const [isClient, setIsClient] = useState(false);

  const user = useSelector((state: RootState) => state.auth.user);

  // Mock notifications for demo purposes
  const mockNotifications: Notification[] = [
    // Message Notifications
    {
      id: "1",
      type: "message",
      title: "New Message from Sarah Johnson",
      message: "Hi! I'm interested in your iPhone 13 Pro. Is it still available?",
      timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 minutes ago
      isRead: false,
      priority: "high",
      actionUrl: "/messages",
      metadata: {
        listingId: "listing1",
        listingTitle: "iPhone 13 Pro",
        sellerName: "Sarah Johnson"
      }
    },
    {
      id: "2",
      type: "offer",
      title: "New Offer Received",
      message: "Mike Chen made an offer of $1,800 for your MacBook Pro 16-inch",
      timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 minutes ago
      isRead: false,
      priority: "high",
      actionUrl: "/messages",
      metadata: {
        listingId: "listing2",
        listingTitle: "MacBook Pro 16-inch",
        offerAmount: 1800,
        sellerName: "Mike Chen"
      }
    },
    {
      id: "3",
      type: "message",
      title: "Message from Emma Wilson",
      message: "Thanks for your interest! The handbag is still available.",
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
      isRead: true,
      priority: "medium",
      actionUrl: "/messages",
      metadata: {
        listingId: "listing3",
        listingTitle: "Designer Handbag",
        sellerName: "Emma Wilson"
      }
    },

    // Price Drop Alerts
    {
      id: "4",
      type: "price_drop",
      title: "Price Drop Alert",
      message: "iPhone 14 Pro Max dropped from $1,100 to $950",
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
      isRead: false,
      priority: "medium",
      actionUrl: "/listing/iphone14",
      metadata: {
        listingId: "listing4",
        listingTitle: "iPhone 14 Pro Max",
        price: 950,
        originalPrice: 1100
      }
    },
    {
      id: "5",
      type: "price_drop",
      title: "Price Drop Alert",
      message: "Samsung Galaxy S23 Ultra dropped from $1,200 to $1,050",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      isRead: true,
      priority: "medium",
      actionUrl: "/listing/samsung-s23",
      metadata: {
        listingId: "listing5",
        listingTitle: "Samsung Galaxy S23 Ultra",
        price: 1050,
        originalPrice: 1200
      }
    },

    // New Listing Alerts
    {
      id: "6",
      type: "new_listing",
      title: "New Listing in Your Watchlist",
      message: "AirPods Pro 2nd Gen just listed for $180",
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
      isRead: false,
      priority: "medium",
      actionUrl: "/listing/airpods-pro",
      metadata: {
        listingId: "listing6",
        listingTitle: "AirPods Pro 2nd Gen",
        price: 180
      }
    },
    {
      id: "7",
      type: "new_listing",
      title: "New Listing Alert",
      message: "Nintendo Switch OLED just listed for $280",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
      isRead: true,
      priority: "low",
      actionUrl: "/listing/nintendo-switch",
      metadata: {
        listingId: "listing7",
        listingTitle: "Nintendo Switch OLED",
        price: 280
      }
    },

    // Sold/In Demand Alerts
    {
      id: "8",
      type: "sold",
      title: "Item Sold!",
      message: "Congratulations! Your MacBook Air M2 sold for $1,200",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
      isRead: false,
      priority: "high",
      actionUrl: "/dashboard/sales",
      metadata: {
        listingId: "listing8",
        listingTitle: "MacBook Air M2",
        price: 1200
      }
    },
    {
      id: "9",
      type: "in_demand",
      title: "High Demand Alert",
      message: "Your iPhone 13 Pro has 15 new views in the last hour!",
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
      isRead: true,
      priority: "medium",
      actionUrl: "/listing/iphone13",
      metadata: {
        listingId: "listing9",
        listingTitle: "iPhone 13 Pro"
      }
    },

    // Viewed By Alerts
    {
      id: "10",
      type: "viewed",
      title: "Your Listing Was Viewed",
      message: "Alex Thompson viewed your Designer Handbag listing",
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
      isRead: false,
      priority: "low",
      actionUrl: "/listing/designer-handbag",
      metadata: {
        listingId: "listing10",
        listingTitle: "Designer Handbag",
        viewerName: "Alex Thompson"
      }
    },
    {
      id: "11",
      type: "viewed",
      title: "Multiple Views on Your Listing",
      message: "5 people viewed your Gaming Laptop in the last 2 hours",
      timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(), // 18 hours ago
      isRead: true,
      priority: "low",
      actionUrl: "/listing/gaming-laptop",
      metadata: {
        listingId: "listing11",
        listingTitle: "Gaming Laptop"
      }
    },

    // System Notifications
    {
      id: "12",
      type: "system",
      title: "Profile Update Required",
      message: "Complete your profile to increase trust with buyers",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 24 hours ago
      isRead: false,
      priority: "medium",
      actionUrl: "/profile/setup",
      metadata: {}
    },
    {
      id: "13",
      type: "system",
      title: "Payment Method Added",
      message: "Your PayPal account has been successfully linked",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      isRead: true,
      priority: "low",
      actionUrl: "/profile/payment",
      metadata: {}
    }
  ];

  // Prevent hydration mismatch and initialize notifications
  useEffect(() => {
    setIsClient(true);
    setNotifications(mockNotifications);
  }, []);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <MessageSquare className="w-5 h-5 text-blue-500" />;
      case 'offer':
        return <DollarSign className="w-5 h-5 text-green-500" />;
      case 'price_drop':
        return <TrendingDown className="w-5 h-5 text-red-500" />;
      case 'new_listing':
        return <Star className="w-5 h-5 text-purple-500" />;
      case 'sold':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'in_demand':
        return <TrendingUp className="w-5 h-5 text-orange-500" />;
      case 'viewed':
        return <Eye className="w-5 h-5 text-gray-500" />;
      case 'system':
        return <AlertCircle className="w-5 h-5 text-blue-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
  };

  const filteredNotifications = notifications.filter(notification => {
    switch (filter) {
      case 'unread':
        return !notification.isRead;
      case 'messages':
        return notification.type === 'message' || notification.type === 'offer';
      case 'offers':
        return notification.type === 'offer';
      case 'alerts':
        return ['price_drop', 'new_listing', 'sold', 'in_demand'].includes(notification.type);
      case 'views':
        return notification.type === 'viewed';
      default:
        return true;
    }
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Notifications</h1>
            <p className="text-xl text-gray-600">
              {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
            </p>
          </div>
          {unreadCount > 0 && (
            <Button
              onClick={markAllAsRead}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Mark All Read</span>
            </Button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { key: 'all', label: 'All', count: notifications.length },
            { key: 'unread', label: 'Unread', count: unreadCount },
            { key: 'messages', label: 'Messages', count: notifications.filter(n => n.type === 'message' || n.type === 'offer').length },
            { key: 'offers', label: 'Offers', count: notifications.filter(n => n.type === 'offer').length },
            { key: 'alerts', label: 'Alerts', count: notifications.filter(n => ['price_drop', 'new_listing', 'sold', 'in_demand'].includes(n.type)).length },
            { key: 'views', label: 'Views', count: notifications.filter(n => n.type === 'viewed').length }
          ].map(({ key, label, count }) => (
            <Button
              key={key}
              onClick={() => setFilter(key as any)}
              variant={filter === key ? "default" : "outline"}
              className={`flex items-center space-x-2 ${
                filter === key 
                  ? "bg-purple-600 hover:bg-purple-700 text-white" 
                  : "hover:bg-gray-50"
              }`}
            >
              <span>{label}</span>
              {count > 0 && (
                <Badge 
                  variant="secondary" 
                  className={`ml-1 ${
                    filter === key 
                      ? "bg-purple-500 text-white" 
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {count}
                </Badge>
              )}
            </Button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <Card className="bg-white shadow-sm border-0">
              <CardContent className="p-12 text-center">
                <Bell className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {filter === 'all' ? 'No notifications yet' : `No ${filter} notifications`}
                </h3>
                <p className="text-gray-600">
                  {filter === 'all' 
                    ? 'You\'ll see notifications about messages, offers, and updates here'
                    : `You don't have any ${filter} notifications at the moment`
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredNotifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={`bg-white shadow-sm border-0 transition-all hover:shadow-md ${
                  !notification.isRead ? 'border-l-4 border-l-purple-500' : ''
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    {/* Icon */}
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className={`font-semibold ${
                              !notification.isRead ? 'text-gray-900' : 'text-gray-700'
                            }`}>
                              {notification.title}
                            </h3>
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            )}
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${getPriorityColor(notification.priority)}`}
                            >
                              {notification.priority}
                            </Badge>
                          </div>
                          
                          <p className="text-gray-600 mb-2">
                            {notification.message}
                          </p>

                          {/* Metadata */}
                          {notification.metadata && (
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              {notification.metadata.listingTitle && (
                                <span className="flex items-center space-x-1">
                                  <ShoppingCart className="w-3 h-3" />
                                  <span>{notification.metadata.listingTitle}</span>
                                </span>
                              )}
                              {notification.metadata.price && (
                                <span className="flex items-center space-x-1">
                                  <DollarSign className="w-3 h-3" />
                                  <span>${notification.metadata.price.toFixed(2)}</span>
                                </span>
                              )}
                              {notification.metadata.viewerName && (
                                <span className="flex items-center space-x-1">
                                  <Eye className="w-3 h-3" />
                                  <span>{notification.metadata.viewerName}</span>
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-2 ml-4">
                          <div className="text-right">
                            <div className="flex items-center space-x-1 text-sm text-gray-500">
                              <Clock className="w-3 h-3" />
                              <span>{formatTimestamp(notification.timestamp)}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-1">
                            {!notification.isRead && (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => markAsRead(notification.id)}
                                className="h-8 w-8 p-0"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => deleteNotification(notification.id)}
                              className="h-8 w-8 p-0 text-gray-400 hover:text-red-500"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
