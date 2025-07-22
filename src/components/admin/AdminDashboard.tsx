import React, { useState, useEffect } from 'react';
import { 
  FaUsers, 
  FaHandshake, 
  FaComments
} from 'react-icons/fa';
import { 
  Chart as ChartJS, 
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
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

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

// Mock data for dashboard
const mockData = {
  stats: {
    totalUsers: 1248,
    activePartners: 37,
    pendingRequests: 12,
    totalFeedback: 156
  },
  userGrowth: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    data: [120, 150, 180, 220, 270, 310, 350, 400, 450, 520, 600, 1248]
  },
  userTypes: {
    labels: ['Regular Users', 'Premium Users', 'Partners'],
    data: [850, 361, 37]
  },
  recentActivity: [
    { id: 1, type: 'user', action: 'New user registered', name: 'Nguyen Van A', time: '2 hours ago' },
    { id: 2, type: 'partner', action: 'New partner request', name: 'Wedding Studio XYZ', time: '3 hours ago' },
    { id: 3, type: 'feedback', action: 'New feedback received', name: 'Tran Thi B', time: '5 hours ago' },
    { id: 4, type: 'user', action: 'User profile updated', name: 'Le Van C', time: '6 hours ago' },
    { id: 5, type: 'partner', action: 'Partner request approved', name: 'Elegant Events', time: '1 day ago' }
  ],
  feedbackRatings: {
    labels: ['5 Stars', '4 Stars', '3 Stars', '2 Stars', '1 Star'],
    data: [78, 42, 20, 10, 6]
  },
  revenue: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    data: [15000000, 18500000, 22000000, 25500000, 30000000, 35000000, 42000000, 48000000, 52000000, 58000000, 65000000, 75000000]
  }
};

const AdminDashboard: React.FC = () => {
  const [data, setData] = useState(mockData);
  
  // In a real application, you would fetch this data from an API
  useEffect(() => {
    // Simulating API call
    const fetchData = async () => {
      try {
        // const response = await fetch('/api/admin/dashboard');
        // const data = await response.json();
        // setData(data);
        
        // Using mock data for now
        setData(mockData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    
    fetchData();
  }, []);
  
  // Chart options and data
  const userGrowthOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'User Growth (2025)',
        font: {
          size: 16
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Users'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Month'
        }
      }
    }
  };
  
  const userGrowthData = {
    labels: data.userGrowth.labels,
    datasets: [
      {
        label: 'Total Users',
        data: data.userGrowth.data,
        borderColor: '#4a6cf7',
        backgroundColor: 'rgba(74, 108, 247, 0.1)',
        tension: 0.3,
        fill: true
      }
    ]
  };
  
  const userTypesData = {
    labels: data.userTypes.labels,
    datasets: [
      {
        data: data.userTypes.data,
        backgroundColor: [
          'rgba(74, 108, 247, 0.7)',
          'rgba(40, 167, 69, 0.7)',
          'rgba(255, 193, 7, 0.7)'
        ],
        borderColor: [
          'rgba(74, 108, 247, 1)',
          'rgba(40, 167, 69, 1)',
          'rgba(255, 193, 7, 1)'
        ],
        borderWidth: 1
      }
    ]
  };
  
  const feedbackOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: 'Feedback Distribution',
        font: {
          size: 16
        }
      },
    },
  };
  
  const feedbackData = {
    labels: data.feedbackRatings.labels,
    datasets: [
      {
        label: 'Feedback Count',
        data: data.feedbackRatings.data,
        backgroundColor: [
          'rgba(40, 167, 69, 0.7)',
          'rgba(74, 108, 247, 0.7)',
          'rgba(255, 193, 7, 0.7)',
          'rgba(255, 159, 64, 0.7)',
          'rgba(220, 53, 69, 0.7)'
        ],
        borderColor: [
          'rgba(40, 167, 69, 1)',
          'rgba(74, 108, 247, 1)',
          'rgba(255, 193, 7, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(220, 53, 69, 1)'
        ],
        borderWidth: 1
      }
    ]
  };
  
  const revenueOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Monthly Revenue (2025)',
        font: {
          size: 16
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Revenue (VND)'
        },
        ticks: {
          callback: function(value: any) {
            if (value >= 1000000) {
              return (value / 1000000) + 'M';
            }
            return value;
          }
        }
      },
      x: {
        title: {
          display: true,
          text: 'Month'
        }
      }
    }
  };
  
  const revenueData = {
    labels: data.revenue.labels,
    datasets: [
      {
        label: 'Revenue (VND)',
        data: data.revenue.data,
        borderColor: '#28a745',
        backgroundColor: 'rgba(40, 167, 69, 0.1)',
        tension: 0.3,
        fill: true
      }
    ]
  };
  
  return (
    <div className="admin-dashboard">
      {/* Stats Cards */}
      <div className="admin-grid">
        <div className="admin-card">
          <div className="stat-card">
            <div className="stat-card-icon primary">
              <FaUsers />
            </div>
            <div className="stat-card-content">
              <h3>{data.stats.totalUsers}</h3>
              <p>Total Users</p>
            </div>
          </div>
        </div>
        
        <div className="admin-card">
          <div className="stat-card">
            <div className="stat-card-icon success">
              <FaHandshake />
            </div>
            <div className="stat-card-content">
              <h3>{data.stats.activePartners}</h3>
              <p>Active Partners</p>
            </div>
          </div>
        </div>
        
        <div className="admin-card">
          <div className="stat-card">
            <div className="stat-card-icon warning">
              <FaHandshake />
            </div>
            <div className="stat-card-content">
              <h3>{data.stats.pendingRequests}</h3>
              <p>Pending Partner Requests</p>
            </div>
          </div>
        </div>
        
        <div className="admin-card">
          <div className="stat-card">
            <div className="stat-card-icon danger">
              <FaComments />
            </div>
            <div className="stat-card-content">
              <h3>{data.stats.totalFeedback}</h3>
              <p>Total Feedback</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Charts */}
      <div className="admin-grid">
        <div className="admin-card admin-grid-col-2">
          <div className="admin-card-header">
            <h2 className="admin-card-title">User Growth</h2>
          </div>
          <div className="admin-card-body" style={{ height: '300px' }}>
            <Line options={userGrowthOptions} data={userGrowthData} />
          </div>
        </div>
        
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">User Types</h2>
          </div>
          <div className="admin-card-body" style={{ height: '300px' }}>
            <Pie data={userTypesData} />
          </div>
        </div>
      </div>
      
      <div className="admin-grid">
        <div className="admin-card admin-grid-col-2">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Revenue Chart</h2>
          </div>
          <div className="admin-card-body" style={{ height: '300px' }}>
            <Line options={revenueOptions} data={revenueData} />
          </div>
        </div>
        
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Feedback Ratings</h2>
          </div>
          <div className="admin-card-body" style={{ height: '300px' }}>
            <Bar options={feedbackOptions} data={feedbackData} />
          </div>
        </div>
      </div>
      
      <div className="admin-grid">
        <div className="admin-card admin-grid-col-3">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Recent Activity</h2>
          </div>
          <div className="admin-card-body">
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Activity</th>
                    <th>Name</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {data.recentActivity.map(activity => (
                    <tr key={activity.id}>
                      <td>{activity.action}</td>
                      <td>{activity.name}</td>
                      <td>{activity.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;