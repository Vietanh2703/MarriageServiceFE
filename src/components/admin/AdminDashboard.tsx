import React, { useState, useEffect, useRef } from 'react';
import { 
  FaUsers, 
  FaHandshake, 
  FaComments, 
  FaDollarSign, 
  FaSync, 
  FaCalendarAlt 
} from 'react-icons/fa';
import { apiRequest, API_CONFIG } from '../../utils/apiConfig';
import './AdminDashboard.css';
import CountUp from 'react-countup';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import type { Chart } from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Interface for UserRole
interface UserRole {
  id: string;
  name: string;
}

// Interface for User data
interface User {
  userId: string;
  firebaseId: string;
  avatar: string | null;
  userName: string;
  email: string;
  firstName: string;
  lastName: string | null;
  birthday: string;
  address: string | null;
  phoneNumber: string;
  roleId: string;
  role: string | null;
  isDeleted: boolean;
  lastUpdatedBy: string;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  userRoles: UserRole[];
}


// Interface for Dashboard stats
interface DashboardStats {
  totalUsers: number;
  totalPartners: number;
  totalFeedback: number;
  totalRevenue: number;
  userGrowth: {
    labels: string[];
    data: number[];
  };
  revenueData: {
    labels: string[];
    data: number[];
  };
  serviceDistribution: {
    labels: string[];
    data: number[];
  };
  feedbackRatings: {
    labels: string[];
    data: number[];
  };
}

// Activity item interface
interface ActivityItem {
  id: string;
  type: 'user' | 'partner' | 'feedback' | 'payment';
  icon: React.ReactNode;
  text: string;
  time: string;
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalPartners: 0,
    totalFeedback: 0,
    totalRevenue: 0,
    userGrowth: {
      labels: [],
      data: []
    },
    revenueData: {
      labels: [],
      data: []
    },
    serviceDistribution: {
      labels: [],
      data: []
    },
    feedbackRatings: {
      labels: [],
      data: []
    }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const userGrowthRef = useRef<Chart<'line'> | null>(null);
  const revenueRef = useRef<Chart<'bar'> | null>(null);
  const servicesRef = useRef<Chart<'doughnut'> | null>(null);
  const feedbackRef = useRef<Chart<'doughnut'> | null>(null);

  // Fetch all users and count total
  const fetchTotalUsers = async (): Promise<{total: number, growth: {labels: string[], data: number[]}}> => {
    try {
      const token = localStorage.getItem('accessToken');

      const response = await apiRequest(API_CONFIG.ENDPOINTS.USER.GET_ALL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();

        let users: User[] = [];

        if (Array.isArray(data)) {
          users = data;
        } else if (data.result && Array.isArray(data.result)) {
          users = data.result;
        } else if (data.users && Array.isArray(data.users)) {
          users = data.users;
        } else if (data.data && Array.isArray(data.data)) {
          users = data.data;
        }

        const activeUsers = users.filter(user => !user.isDeleted);
        
        // Generate user growth data (last 6 months)
        const months = [];
        const userData = [];
        const now = new Date();
        
        for (let i = 5; i >= 0; i--) {
          const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
          const monthName = month.toLocaleString('default', { month: 'short' });
          months.push(monthName);
          
          // Count users created before or during this month
          const count = users.filter(user => {
            const createdDate = new Date(user.createdAt);
            return createdDate <= new Date(now.getFullYear(), now.getMonth() - i + 1, 0);
          }).length;
          
          userData.push(count);
        }

        return {
          total: activeUsers.length,
          growth: {
            labels: months,
            data: userData
          }
        };
      } else {
        console.error('Failed to fetch users:', response.status);
        return {
          total: 0,
          growth: {
            labels: [],
            data: []
          }
        };
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      return {
        total: 0,
        growth: {
          labels: [],
          data: []
        }
      };
    }
  };

  // Fetch partners data
  const fetchPartners = async (): Promise<{ total: number, distribution: { labels: string[], data: number[] } }> => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await apiRequest(API_CONFIG.ENDPOINTS.USER.COUNT_PARTNERS, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        const total = typeof data === 'number' ? data : 0;
        return {
          total,
          distribution: {
            labels: ['Wedding Planning', 'Photography', 'Catering', 'Venue', 'Decoration'],
            data: [0, 1, 0, 0, 0] // Only Photography has 1, others are 0
          }
        };
      } else {
        return {
          total: 0,
          distribution: {
            labels: ['Wedding Planning', 'Photography', 'Catering', 'Venue', 'Decoration'],
            data: [0, 1, 0, 0, 0]
          }
        };
      }
    } catch (error) {
      return {
        total: 0,
        distribution: {
          labels: ['Wedding Planning', 'Photography', 'Catering', 'Venue', 'Decoration'],
          data: [0, 1, 0, 0, 0]
        }
      };
    }
  };

  // Generate mock revenue data (for now)
  const generateRevenueData = (): {total: number, data: {labels: string[], data: number[]}} => {
    const months = [];
    const revenueData: number[] = [];
    const now = new Date();
    const totalRevenue = 300000;
    const numMonths = 6;

// Start with equal base
    let base = Math.floor(totalRevenue / numMonths); // 50000
    let revenues = Array(numMonths).fill(base);

// Randomly adjust to make them different
    let adjustments = [0, 1, 2, 3, 4, 5].map(() => Math.floor(Math.random() * 10000) - 5000);
    let sumAdjustments = adjustments.reduce((a, b) => a + b, 0);

// Adjust so the sum is still 0
    adjustments[0] -= sumAdjustments;

// Apply adjustments and ensure all are positive and unique
    for (let i = 0; i < numMonths; i++) {
      revenues[i] += adjustments[i];
    }
    while (new Set(revenues).size < revenues.length || revenues.some(r => r <= 0)) {
      // If not unique or negative, re-randomize
      adjustments = [0, 1, 2, 3, 4, 5].map(() => Math.floor(Math.random() * 10000) - 5000);
      sumAdjustments = adjustments.reduce((a, b) => a + b, 0);
      adjustments[0] -= sumAdjustments;
      for (let i = 0; i < numMonths; i++) {
        revenues[i] = base + adjustments[i];
      }
    }

    for (let i = 5; i >= 0; i--) {
      const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthName = month.toLocaleString('default', { month: 'short' });
      months.push(monthName);
      revenueData.push(revenues[5 - i]);
    }

    return {
      total: totalRevenue,
      data: {
        labels: months,
        data: revenueData
      }
    };
  };

  const fetchFeedbackData = async (): Promise<{ total: number, ratings: { labels: string[], data: number[] } }> => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await apiRequest(API_CONFIG.ENDPOINTS.FEEDBACK.GET_ALL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        const feedbacks = Array.isArray(data.result) ? data.result : [];
        const activeFeedbacks = feedbacks.filter((f: any) => !f.isDeleted);

        // Count by point (1-5 stars)
        const ratings = [5, 4, 3, 2, 1].map(star =>
            activeFeedbacks.filter((f: any) => f.point === star).length
        );

        return {
          total: activeFeedbacks.length,
          ratings: {
            labels: ['5 Stars', '4 Stars', '3 Stars', '2 Stars', '1 Star'],
            data: ratings
          }
        };
      } else {
        return {
          total: 0,
          ratings: {
            labels: ['5 Stars', '4 Stars', '3 Stars', '2 Stars', '1 Star'],
            data: [0, 0, 0, 0, 0]
          }
        };
      }
    } catch (error) {
      return {
        total: 0,
        ratings: {
          labels: ['5 Stars', '4 Stars', '3 Stars', '2 Stars', '1 Star'],
          data: [0, 0, 0, 0, 0]
        }
      };
    }
  };

  // Generate mock recent activities
  const generateRecentActivities = (): ActivityItem[] => {
    return [
      {
        id: '1',
        type: 'user',
        icon: <FaUsers />,
        text: 'New user registered: <strong>vietanh2732004@gmail.com</strong>',
        time: '2 hours ago'
      },
      {
        id: '2',
        type: 'partner',
        icon: <FaHandshake />,
        text: 'New partner request submitted for <strong>Wedding Photography</strong>',
        time: '5 hours ago'
      },
      {
        id: '3',
        type: 'feedback',
        icon: <FaComments />,
        text: '5-star feedback received for <strong>Catering Service</strong>',
        time: '1 day ago'
      },
      {
        id: '4',
        type: 'payment',
        icon: <FaDollarSign />,
        text: 'Payment processed: <strong>₫30000</strong>',
        time: '2 days ago'
      },
      {
        id: '5',
        type: 'user',
        icon: <FaUsers />,
        text: 'User updated profile: <strong>trangpham@gmail.com</strong>',
        time: '3 days ago'
      }
    ];
  };

  // Fetch dashboard stats
  const fetchDashboardStats = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Fetch users data
      const userData = await fetchTotalUsers();
      
      // Fetch partners data
      const partnersData = await fetchPartners();
      
      // Generate revenue data (mock for now)
      const revenueData = generateRevenueData();
      
      // Generate feedback data (mock for now)
      const feedbackData = await fetchFeedbackData();
      
      // Generate activities
      const activitiesData = generateRecentActivities();
      
      setStats({
        totalUsers: userData.total,
        totalPartners: partnersData.total,
        totalFeedback: feedbackData.total,
        totalRevenue: revenueData.total,
        userGrowth: userData.growth,
        revenueData: revenueData.data,
        serviceDistribution: partnersData.distribution,
        feedbackRatings: feedbackData.ratings
      });
      
      setActivities(activitiesData);

    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      setError('Failed to load dashboard data');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  // Handle refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchDashboardStats();
  };

  // Chart options and configs
  const userGrowthChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: 'index' as const,
        intersect: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  const revenueChartOptions = {
    // ...
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label) label += ': ';
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
              }).format(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          callback: function(value: any) {
            return new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND',
              notation: 'compact',
              compactDisplay: 'short'
            }).format(value);
          }
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          boxWidth: 15,
          padding: 15
        }
      }
    },
    cutout: '70%'
  };

  // Chart data
  const userGrowthData = {
    labels: stats.userGrowth.labels,
    datasets: [
      {
        label: 'Total Users',
        data: stats.userGrowth.data,
        borderColor: '#4facfe',
        backgroundColor: 'rgba(79, 172, 254, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true
      }
    ]
  };

  const revenueData = {
    labels: stats.revenueData.labels,
    datasets: [
      {
        label: 'Revenue',
        data: stats.revenueData.data,
        backgroundColor: '#43e97b',
        borderColor: '#43e97b',
        borderWidth: 2,
        borderRadius: 5,
        maxBarThickness: 35
      }
    ]
  };

  const serviceDistributionData = {
    labels: stats.serviceDistribution.labels,
    datasets: [
      {
        data: stats.serviceDistribution.data,
        backgroundColor: [
          '#4facfe',
          '#43e97b',
          '#fa709a',
          '#fee140',
          '#a8edea'
        ],
        borderWidth: 0
      }
    ]
  };

  const feedbackRatingsData = {
    labels: stats.feedbackRatings.labels,
    datasets: [
      {
        data: stats.feedbackRatings.data,
        backgroundColor: [
          '#43e97b',
          '#4facfe',
          '#fee140',
          '#fa709a',
          '#e53e3e'
        ],
        borderWidth: 0
      }
    ]
  };

  if (isLoading) {
    return (
      <div className="admin-dashboard-container">
        <div className="admin-dashboard-loading">
          <div className="admin-dashboard-loading-spinner"></div>
          <p>Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-dashboard-container">
        <div className="admin-dashboard-error">
          <div className="admin-dashboard-error-icon">⚠️</div>
          <p>Error: {error}</p>
          <button className="admin-dashboard-retry-button" onClick={handleRefresh}>
            <FaSync /> Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard-header">
        <div className="admin-dashboard-header-content">
          <h1>Dashboard Overview</h1>
          <p>Welcome back! Here's what's happening on your platform today.</p>
        </div>
        <button 
          className="admin-dashboard-refresh-button" 
          onClick={handleRefresh}
          disabled={isRefreshing}
        >
          <FaSync className={isRefreshing ? 'spinning' : ''} />
          <span>{isRefreshing ? 'Refreshing...' : 'Refresh Data'}</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="admin-dashboard-stats">
        <div className="admin-dashboard-stat-card">
          <div className="admin-dashboard-stat-icon users">
            <FaUsers />
          </div>
          <div className="admin-dashboard-stat-content">
            <div className="admin-dashboard-stat-number">
              <CountUp end={stats.totalUsers} duration={2} separator="," />
            </div>
            <div className="admin-dashboard-stat-label">Total Users</div>
          </div>
        </div>

        <div className="admin-dashboard-stat-card">
          <div className="admin-dashboard-stat-icon partners">
            <FaHandshake />
          </div>
          <div className="admin-dashboard-stat-content">
            <div className="admin-dashboard-stat-number">
              <CountUp end={stats.totalPartners} duration={2} separator="," />
            </div>
            <div className="admin-dashboard-stat-label">Total Partners</div>
          </div>
        </div>

        <div className="admin-dashboard-stat-card">
          <div className="admin-dashboard-stat-icon feedback">
            <FaComments />
          </div>
          <div className="admin-dashboard-stat-content">
            <div className="admin-dashboard-stat-number">
              <CountUp end={stats.totalFeedback} duration={2} separator="," />
            </div>
            <div className="admin-dashboard-stat-label">Total Feedback</div>
          </div>
        </div>

        <div className="admin-dashboard-stat-card">
          <div className="admin-dashboard-stat-icon revenue">
            <FaDollarSign />
          </div>
          <div className="admin-dashboard-stat-content">
            <div className="admin-dashboard-stat-number">
              <CountUp 
                end={stats.totalRevenue} 
                duration={2.5} 
                separator="," 
                decimals={0} 
                prefix="₫" 
              />
            </div>
            <div className="admin-dashboard-stat-label">Total Revenue</div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="admin-dashboard-charts">
        <div className="admin-dashboard-chart-container user-growth">
          <div className="admin-dashboard-chart-header">
            <h2>User Growth</h2>
            <div className="admin-dashboard-chart-legend">
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: '#4facfe' }}></div>
                <span>Total Users</span>
              </div>
            </div>
          </div>
          <div className="admin-dashboard-chart">
            <Line
                data={userGrowthData}
                options={userGrowthChartOptions}
                ref={userGrowthRef}
            />
          </div>
        </div>

        <div className="admin-dashboard-chart-container revenue">
          <div className="admin-dashboard-chart-header">
            <h2>Monthly Revenue</h2>
            <div className="admin-dashboard-chart-period">
              <FaCalendarAlt />
              <span>Last 6 Months</span>
            </div>
          </div>
          <div className="admin-dashboard-chart">
            <Bar
                data={revenueData}
                options={revenueChartOptions}
                ref={revenueRef}
            />
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="admin-dashboard-content">
        <div className="admin-dashboard-section">
          <div className="admin-dashboard-section-header">
            <h2>Recent Activity</h2>
            <a href="#" className="admin-dashboard-view-all-link">View All</a>
          </div>
          <div className="admin-dashboard-activity-list">
            {activities.map(activity => (
              <div className="admin-dashboard-activity-item" key={activity.id}>
                <div className={`admin-dashboard-activity-avatar ${activity.type}`}>
                  {activity.icon}
                </div>
                <div className="admin-dashboard-activity-content">
                  <div className="admin-dashboard-activity-text" dangerouslySetInnerHTML={{ __html: activity.text }}></div>
                  <div className="admin-dashboard-activity-time">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-dashboard-charts-secondary">
          <div className="admin-dashboard-chart-container services">
            <div className="admin-dashboard-chart-header">
              <h2>Service Distribution</h2>
            </div>
            <div className="admin-dashboard-chart doughnut-chart">
              <Doughnut
                  data={serviceDistributionData}
                  options={doughnutOptions}
                  ref={servicesRef}
              />
            </div>
          </div>

          <div className="admin-dashboard-chart-container feedback">
            <div className="admin-dashboard-chart-header">
              <h2>Feedback Ratings</h2>
            </div>
            <div className="admin-dashboard-chart doughnut-chart">
              <Doughnut
                  data={feedbackRatingsData}
                  options={doughnutOptions}
                  ref={feedbackRef}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;