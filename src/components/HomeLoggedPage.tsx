import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import Slideshow from './AdvertisingSlideshow';
import { buildApiUrl } from '../utils/apiConfig';
import './HomeLoggedPage.css';
import HomeNavbar from "./HomeNavbar";
import Footer from "./Footer";
import VoucherCard from './VoucherCard';

// TypeScript interfaces
interface UserInfo {
	email: string;
	userName: string;
	id?: string;
	[key: string]: unknown;
}

interface DecodedToken {
	email?: string;
	sub?: string;
	user_email?: string;
	username?: string;
	unique_name?: string;
	nameid?: string;
	'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'?: string;
	'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'?: string;
	'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'?: string;
}

const serviceNavItems = [
	{
		icon: "💐",
		text: "Trang Trí",
		path: "/services/decoration"
	},
	{
		icon: "👗",
		text: "Trang Phục",
		path: "/services/wedding-attire"
	},
	{
		icon: "🚗",
		text: "Xe Cưới",
		path: "/services/wedding-cars"
	},
	{
		icon: "📸",
		text: "Chụp Ảnh",
		path: "/services/photography"
	},
	{
		icon: "💄",
		text: "Trang Điểm",
		path: "/services/makeup"
	},
	{
		icon: "🎂",
		text: "Ẩm Thực",
		path: "/services/catering"
	},
	{
		icon: "💌",
		text: "Thiệp Cưới",
		path: "/services/invitation-design"
	},
	{
		icon: "✨",
		text: "Nghi Lễ",
		path: "/services/wedding-ceremony"
	}
];


const HomeLoggedPage = () => {
	const navigate = useNavigate();

	// State management
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [visiblePartners, setVisiblePartners] = useState(4);
	const [visibleServices, setVisibleServices] = useState(6);
	const [visibleVouchers, setVisibleVouchers] = useState(3);
	const [visibleBlogs, setVisibleBlogs] = useState(3);
	const [visibleEvents, setVisibleEvents] = useState(4);
	const [visibleNews, setVisibleNews] = useState(3);

	const partners = [
		{
			id: 1,
			name: "Wedding Paradise",
			logo: "/logo.png",
			rating: 4.8,
			reviews: 156,
			description: "Chuyên tổ chức tiệc cưới cao cấp"
		},
		{
			id: 2,
			name: "Floral Elegance",
			logo: "/decor.jpg",
			rating: 4.7,
			reviews: 120,
			description: "Trang trí hoa tươi và backdrop chuyên nghiệp"
		},
		{
			id: 3,
			name: "Gourmet Catering",
			logo: "/nau-an.jpg",
			rating: 4.9,
			reviews: 98,
			description: "Ẩm thực Âu - Á phong phú, đa dạng"
		},
		{
			id: 4,
			name: "Luxury Cars",
			logo: "/xe-cuoi.jpg",
			rating: 4.6,
			reviews: 75,
			description: "Dịch vụ cho thuê xe cưới hạng sang"
		},
		{
			id: 5,
			name: "Dream Weddings",
			logo: "/logo.png",
			rating: 4.8,
			reviews: 156,
			description: "Dịch vụ tổ chức tiệc cưới trọn gói"
		},
		{
			id: 6,
			name: "Elegant Bride",
			logo: "/vay-cuoi.jpg",
			rating: 4.7,
			reviews: 130,
			description: "Thiết kế và may đo váy cưới cao cấp"
		},
		{
			id: 7,
			name: "Perfect Moments",
			logo: "/photo-service.jpg",
			rating: 4.9,
			reviews: 200,
			description: "Gói chụp ảnh cưới chuyên nghiệp"
		},
		{
			id: 8,
			name: "Gourmet Catering",
			logo: "/nau-an.jpg",
			rating: 4.9,
			reviews: 180,
			description: "Dịch vụ ẩm thực tiệc cưới đẳng cấp"
		},
	];

	const suggestedServices = [
		{
			id: 1,
			name: "Gói chụp ảnh cưới cao cấp",
			image: "/photo-service.jpg",
			provider: "Studio Love",
			rating: 4.9,
			price: "15,000,000đ",
			description: "Trọn gói chụp ảnh cưới cao cấp"
		},
		{
			id: 2,
			name: "Trang trí tiệc cưới cơ bản",
			image: "/decor.jpg",
			provider: "Paradise Decor",
			rating: 4.8,
			price: "10,000,000đ",
			description: "Gói trang trí tiệc cưới cơ bản"
		},
		{
			id: 3,
			name: "Xe cưới hạng sang",
			image: "/xe-cuoi.jpg",
			provider: "Luxury Cars",
			rating: 4.7,
			price: "20,000,000đ",
			description: "Dịch vụ cho thuê xe cưới hạng sang"
		},
		{
			id: 4,
			name: "Trang điểm cô dâu",
			image: "/trang-diem.jpeg",
			provider: "Beauty Studio",
			rating: 4.9,
			price: "5,000,000đ",
			description: "Dịch vụ trang điểm cô dâu chuyên nghiệp"
		},
		{
			id: 5,
			name: "Thiệp cưới cao cấp",
			image: "/thiep-cuoi.jpg",
			provider: "Cardinal",
			rating: 4.8,
			price: "2,000,000đ",
			description: "In ấn thiệp cưới cao cấp, thiết kế độc quyền"
		},
		{
			id: 6,
			name: "Bánh cưới đa dạng",
			image: "/nau-an.jpg",
			provider: "Gourmet Bakery",
			rating: 4.9,
			price: "3,000,000đ",
			description: "Đặt bánh cưới theo yêu cầu, nhiều hương vị"
		},
	];
	const blogs = [
		{
			id: 1,
			title: "Top 10 xu hướng trang trí tiệc cưới 2025",
			image: "/decor.jpg",
			date: "18/06/2025",
			author: "Wedding Expert",
			excerpt: "Khám phá những xu hướng trang trí tiệc cưới mới nhất..."
		},
		{
			id: 2,
			title: "Kinh nghiệm chọn váy cưới cho cô dâu",
			image: "/vay-cuoi.jpg",
			date: "12/06/2025",
			author: "Fashion Guru",
			excerpt: "Những điều cần lưu ý khi chọn váy cưới..."
		},
		{
			id: 3,
			title: "Những địa điểm chụp ảnh cưới lý tưởng",
			image: "/photo-service.jpg",
			date: "05/06/2025",
			author: "Photo Master",
			excerpt: "Gợi ý những địa điểm chụp ảnh cưới đẹp và lãng mạn..."
		},
	];

	const events = [
		{
			id: 1,
			title: "Triển lãm cưới Wedding Fair 2025",
			image: "/welcome.png",
			date: "25/07/2025",
			location: "Trung tâm Hội nghị Quốc gia, Hà Nội",
			description: "Triển lãm cưới lớn nhất năm với nhiều ưu đãi hấp dẫn"
		},
		{
			id: 2,
			title: "Hội thảo lập kế hoạch cưới",
			image: "/decor.jpg",
			date: "20/07/2025",
			location: "Khách sạn Rex, TP.HCM",
			description: "Hội thảo chia sẻ kinh nghiệm lập kế hoạch cưới hoàn hảo"
		},
		{
			id: 3,
			title: "Triển lãm váy cưới 2025",
			image: "/decor.jpg",
			date: "15/07/2025",
			location: "Saigon Exhibition and Convention Center, TP.HCM",
			description: "Triển lãm giới thiệu bộ sưu tập váy cưới mới nhất"
		},
	];

	const news = [
		{
			id: 1,
			title: "Xu hướng trang trí tiệc cưới mùa thu 2025",
			image: "/decor.jpg",
			date: "19/06/2025",
			category: "Xu hướng"
		},
		{
			id: 2,
			title: "Top 5 địa điểm chụp ảnh cưới đẹp tại Hà Nội",
			image: "/photo-service.jpg",
			date: "18/06/2025",
			category: "Địa điểm"
		},
		{
			id: 3,
			title: "Cách chọn váy cưới phù hợp với dáng người",
			image: "/vay-cuoi.jpg",
			date: "17/06/2025",
			category: "Tư vấn"
		},
		{
			id: 4,
			title: "Những món ăn không thể thiếu trong tiệc cưới",
			image: "/nau-an.jpg",
			date: "16/06/2025",
			category: "Ẩm thực"
		}
	];

	const adBanner = {
		image: "/ads.jpg",
		title: "Wedding Fair 2025",
		description: "Triển lãm cưới lớn nhất năm - Ưu đãi lên đến 50%"
	};

	const voucherList = [
		{
			code: "WEDDING2025",
			discount: "Giảm 25%",
			expireDate: "2025-12-31T23:59:59",
			description: "Ưu đãi cho dịch vụ trang trí tiệc cưới"
		},
		{
			code: "SUMMER2025",
			discount: "Giảm 1.500.000đ",
			expireDate: "2025-08-31T23:59:59",
			description: "Áp dụng cho gói chụp ảnh cưới"
		},
		{
			code: "SPECIAL2025",
			discount: "Giảm 30%",
			expireDate: "2025-07-31T23:59:59",
			description: "Ưu đãi đặc biệt cho gói dịch vụ trọn gói"
		},
		{
			code: "NEWYEAR2025",
			discount: "Giảm 2.000.000đ",
			expireDate: "2025-06-21T23:59:59",
			description: "Ưu đãi đặc biệt cho dịch vụ váy cưới cao cấp"
		}
	];

	// Extract user info from token
	const getUserInfoFromToken = (token: string): UserInfo | null => {
		try {
			const decodedToken = jwtDecode<DecodedToken>(token);

			const email = decodedToken.email ||
						 decodedToken.sub ||
						 decodedToken.user_email ||
						 decodedToken.username ||
						 decodedToken.unique_name ||
						 decodedToken.nameid ||
						 decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] ||
						 decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];

			return email ? { email, userName: email } : null;
		} catch {
			return null;
		}
	};

	// Fetch user data from API
	const fetchUserData = async (email: string, accessToken: string): Promise<UserInfo | null> => {
		try {
			const encodedEmail = encodeURIComponent(email);
			const response = await axios.get(buildApiUrl(`/user/email/${encodedEmail}`), {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${accessToken}`
				}
			});

			if (response.data.isSuccess && response.data.result) {
				return response.data.result;
			}
			return null;
		} catch (error) {
			const axiosError = error as { response?: { status: number } };
			if (axiosError.response?.status === 401) {
				throw new Error('Unauthorized');
			}
			return null;
		}
	};

	// Main authentication check
	useEffect(() => {
		const checkAuthentication = async () => {
			const accessToken = localStorage.getItem('accessToken');
			const refreshToken = localStorage.getItem('refreshToken');

			if (!accessToken || !refreshToken) {
				setTimeout(() => {
					const retryAccessToken = localStorage.getItem('accessToken');
					const retryRefreshToken = localStorage.getItem('refreshToken');

					if (!retryAccessToken || !retryRefreshToken) {
						navigate('/login');
					} else {
						checkAuthentication();
					}
				}, 2000);
				return;
			}

			const userInfoFromToken = getUserInfoFromToken(accessToken);

			if (!userInfoFromToken) {
				navigate('/login');
				return;
			}

			try {
				const userData = await fetchUserData(userInfoFromToken.email, accessToken);

				if (userData) {
					localStorage.setItem('userInfo', JSON.stringify(userData));
				}
				setIsAuthenticated(true);
			} catch (error) {
				const err = error as Error;
				if (err.message === 'Unauthorized') {
					navigate('/login');
				} else {
					setIsAuthenticated(true);
				}
			}
		};

		// Initial check with delay
		const initialDelay = setTimeout(checkAuthentication, 500);

		// Listen for storage changes
		const handleStorageChange = (e: StorageEvent) => {
			if (e.key === 'accessToken' || e.key === 'refreshToken' || e.key === 'userInfo') {
				checkAuthentication();
			}
		};

		const handleUserInfoUpdate = () => checkAuthentication();

		window.addEventListener('storage', handleStorageChange);
		window.addEventListener('userInfoUpdated', handleUserInfoUpdate);

		return () => {
			clearTimeout(initialDelay);
			window.removeEventListener('storage', handleStorageChange);
			window.removeEventListener('userInfoUpdated', handleUserInfoUpdate);
		};
	}, [navigate]);

	// Don't render if not authenticated
	if (!isAuthenticated) {
		return <div>Loading...</div>;
	}

	return (
		<div className={`home-logged-page`}>
			<HomeNavbar />
			<Slideshow />

			<div className="service-navbar">
				{serviceNavItems.map((item, index) => (
					<Link key={index} to={item.path} className="service-nav-item">
						<span className="service-nav-icon">{item.icon}</span>
						<span className="service-nav-text">{item.text}</span>
					</Link>
				))}
			</div>

			<div className="content-container">
				<div className="left-column">
					{/* Popular Partners Section */}
					<section className="section">
						<div className="section-title">
							Đối tác được tìm kiếm nhiều nhất
							<button className="view-more-btn" onClick={() => setVisiblePartners(prev => prev + 4)}>
								Xem thêm <span>→</span>
							</button>
						</div>
						<div className="cards-grid">
							{partners.slice(0, visiblePartners).map(partner => (
								<div key={partner.id} className="card partner-card fade-in">
									<img src={partner.logo} alt={partner.name} className="partner-logo" />
									<div className="partner-info">
										<h3>{partner.name}</h3>
										<div className="rating">★ {partner.rating} ({partner.reviews} đánh giá)</div>
										<p>{partner.description}</p>
									</div>
								</div>
							))}
						</div>
					</section>

					{/* Suggested Services Section */}
					<section className="section">
						<div className="section-title">
							Dịch vụ đề xuất
							<button className="view-more-btn" onClick={() => setVisibleServices(prev => prev + 3)}>
								Xem thêm <span>→</span>
							</button>
						</div>
						<div className="cards-grid">
							{suggestedServices.slice(0, visibleServices).map(service => (
								<div key={service.id} className="card fade-in">
									<img src={service.image} alt={service.name} className="service-image" />
									<div className="service-info">
										<h3>{service.name}</h3>
										<p>{service.provider}</p>
										<div className="rating">★ {service.rating}</div>
										<p className="price">{service.price}</p>
									</div>
								</div>
							))}
						</div>
					</section>

					{/* Vouchers & Offers Section */}
					<section className="section">
						<div className="section-title">
							Voucher & Ưu đãi
							<button className="view-more-btn" onClick={() => setVisibleVouchers(prev => prev + 3)}>
								Xem thêm <span>→</span>
							</button>
						</div>
						<div className="vouchers-grid">
							{voucherList.slice(0, visibleVouchers).map((voucher, index) => (
								<VoucherCard
									key={index}
									code={voucher.code}
									discount={voucher.discount}
									expireDate={voucher.expireDate}
									description={voucher.description}
								/>
							))}
						</div>
					</section>

					{/* Blog Posts Section */}
					<section className="section">
						<div className="section-title">
							Blog & Tư vấn
							<button className="view-more-btn" onClick={() => setVisibleBlogs(prev => prev + 3)}>
								Xem thêm <span>→</span>
							</button>
						</div>
						{blogs.slice(0, visibleBlogs).map(blog => (
							<div key={blog.id} className="card blog-card fade-in">
								<img src={blog.image} alt={blog.title} className="blog-image" />
								<div className="blog-info">
									<h3>{blog.title}</h3>
									<div className="blog-meta">
										{blog.date} • {blog.author}
									</div>
									<p>{blog.excerpt}</p>
								</div>
							</div>
						))}
					</section>
				</div>

				<div className="right-column">
					{/* Banner quảng cáo */}
					<div className="vertical-banner">
						<img src={adBanner.image} alt={adBanner.title} />
						<div className="banner-content">
							<h3>{adBanner.title}</h3>
							<p>{adBanner.description}</p>
						</div>
					</div>

					{/* Sự kiện sắp diễn ra */}
					<section className="section">
						<div className="section-header">
							<h3 className="section-title">Sự kiện sắp diễn ra</h3>
							<button className="view-more-btn" onClick={() => setVisibleEvents(prev => prev + 2)}>
								Xem thêm
							</button>
						</div>
						{events.slice(0, visibleEvents).map(event => (
							<div key={event.id} className="event-card fade-in">
								<img src={event.image} alt={event.title} className="event-image" />
								<div className="event-date">{event.date}</div>
								<div className="event-info">
									<h3>{event.title}</h3>
									<p className="event-location">
										<i className="fas fa-map-marker-alt"></i>
										{event.location}
									</p>
									<button className="event-detail-btn">
										Xem chi tiết
									</button>
								</div>
							</div>
						))}
					</section>

					{/* Tin tức & Blog */}
					<section className="section">
						<div className="section-header">
							<h3 className="section-title">Tin tức mới nhất</h3>
							<button className="view-more-btn" onClick={() => setVisibleNews(prev => prev + 3)}>
								Xem thêm
							</button>
						</div>
						{news.slice(0, visibleNews).map(item => (
							<div key={item.id} className="news-card fade-in">
								<img src={item.image} alt={item.title} className="news-image" />
								<div className="news-info">
									<h4>{item.title}</h4>
									<div className="news-meta">
										<span className="news-date">
											<i className="far fa-calendar"></i>
											{item.date}
										</span>
										<span className="news-category">{item.category}</span>
									</div>
									<button className="news-detail-btn">
										Đọc thêm <i className="fas fa-arrow-right"></i>
									</button>
								</div>
							</div>
						))}
					</section>
				</div>
			</div>

			<Footer />
		</div>
	);
};

export default HomeLoggedPage;
