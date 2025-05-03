import { useState } from 'react';
import { Star, Filter, ChevronLeft, ChevronRight, MessageCircle, ThumbsUp } from 'react-feather';
import { Avatar, Badge, Button } from '../components/ui';

const MentorReviews = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  
  // Sample data - replace with real data from your API
  const reviews = [
    {
      id: 1,
      student: {
        name: 'Alex Johnson',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        course: 'React Advanced'
      },
      rating: 5,
      date: '2023-06-15',
      comment: 'Sarah was incredibly knowledgeable and patient. She helped me understand complex React concepts that I had been struggling with for weeks. Highly recommend!',
      reply: 'Thanks Alex! It was a pleasure working with you.',
      likes: 12,
      featured: true
    },
    {
      id: 2,
      student: {
        name: 'Maria Garcia',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        course: 'Node.js Fundamentals'
      },
      rating: 4,
      date: '2023-05-28',
      comment: 'Great mentor with practical industry experience. The sessions were very productive.',
      likes: 5,
      featured: false
    },
    {
      id: 3,
      student: {
        name: 'Sam Wilson',
        avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
        course: 'Career Coaching'
      },
      rating: 5,
      date: '2023-05-10',
      comment: 'Sarah provided invaluable career advice that helped me land my dream job. Her insights into the tech industry were spot on.',
      likes: 8,
      featured: true
    },
  ];

  const ratingDistribution = [
    { stars: 5, count: 42, percentage: 68 },
    { stars: 4, count: 15, percentage: 24 },
    { stars: 3, count: 3, percentage: 5 },
    { stars: 2, count: 1, percentage: 2 },
    { stars: 1, count: 1, percentage: 2 }
  ];

  const averageRating = 4.8;
  const totalReviews = 62;

  // Filter reviews based on active filter
  const filteredReviews = activeFilter === 'all' 
    ? reviews 
    : activeFilter === 'featured' 
      ? reviews.filter(r => r.featured)
      : reviews.filter(r => r.rating === parseInt(activeFilter));

  // Pagination logic
  const reviewsPerPage = 5;
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
  const paginatedReviews = filteredReviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Ratings Summary - Left Sidebar */}
        <div className="md:w-1/3">
          <div className="bg-white rounded-lg shadow p-6 sticky top-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Ratings & Reviews</h2>
            
            <div className="flex items-center mb-6">
              <div className="text-5xl font-bold text-gray-900 mr-4">{averageRating}</div>
              <div>
                <div className="flex mb-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${star <= Math.floor(averageRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-500">{totalReviews} reviews</p>
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-3 mb-6">
              {ratingDistribution.map((item) => (
                <div key={item.stars} className="flex items-center">
                  <div className="flex items-center w-16">
                    <span className="text-sm font-medium text-gray-900 mr-1">{item.stars}</span>
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  </div>
                  <ProgressBar
                    value={item.percentage}
                    className="flex-1 mx-2 h-2"
                    color="yellow"
                  />
                  <span className="text-sm text-gray-500 w-8 text-right">{item.count}</span>
                </div>
              ))}
            </div>

            {/* Review Filters */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                <Filter className="h-4 w-4 mr-2 text-gray-400" />
                Filter by
              </h3>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={activeFilter === 'all' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => {
                    setActiveFilter('all');
                    setCurrentPage(1);
                  }}
                >
                  All ({totalReviews})
                </Button>
                <Button
                  variant={activeFilter === '5' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => {
                    setActiveFilter('5');
                    setCurrentPage(1);
                  }}
                >
                  5 Stars ({ratingDistribution[0].count})
                </Button>
                <Button
                  variant={activeFilter === '4' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => {
                    setActiveFilter('4');
                    setCurrentPage(1);
                  }}
                >
                  4 Stars ({ratingDistribution[1].count})
                </Button>
                <Button
                  variant={activeFilter === 'featured' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => {
                    setActiveFilter('featured');
                    setCurrentPage(1);
                  }}
                >
                  Featured
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews List - Main Content */}
        <div className="md:w-2/3">
          {paginatedReviews.length > 0 ? (
            <div className="space-y-6">
              {paginatedReviews.map((review) => (
                <div key={review.id} className="bg-white rounded-lg shadow p-6">
                  {review.featured && (
                    <Badge variant="primary" className="mb-3">
                      Featured Review
                    </Badge>
                  )}
                  
                  <div className="flex items-start">
                    <Avatar 
                      src={review.student.avatar} 
                      alt={review.student.name}
                      size="md"
                    />
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{review.student.name}</h3>
                          <p className="text-sm text-gray-500">{review.student.course}</p>
                        </div>
                        <div className="flex items-center">
                          <span className="text-gray-900 font-medium mr-1">{review.rating}</span>
                          <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                        </div>
                      </div>
                      
                      <div className="mt-3 text-gray-700">
                        <p>{review.comment}</p>
                      </div>
                      
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            <span>{review.likes}</span>
                          </button>
                          <button className="text-sm text-gray-500 hover:text-gray-700">
                            Reply
                          </button>
                        </div>
                        <span className="text-sm text-gray-400">
                          {new Date(review.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      
                      {review.reply && (
                        <div className="mt-4 pl-4 border-l-2 border-blue-200">
                          <div className="flex items-start">
                            <MessageCircle className="h-5 w-5 text-blue-500 mt-1 mr-3" />
                            <div>
                              <h4 className="text-sm font-medium text-gray-900">Your Response</h4>
                              <p className="mt-1 text-gray-700">{review.reply}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-6">
                  <Button
                    variant="outline"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    icon={<ChevronLeft className="h-4 w-4" />}
                  >
                    Previous
                  </Button>
                  
                  <div className="flex items-center space-x-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${currentPage === page ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  
                  <Button
                    variant="outline"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    iconRight={<ChevronRight className="h-4 w-4" />}
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <div className="mx-auto h-24 w-24 text-gray-300 mb-4">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No reviews found</h3>
              <p className="text-gray-500">
                {activeFilter === 'all' 
                  ? "You don't have any reviews yet." 
                  : `No reviews match your ${activeFilter} filter.`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MentorReviews;