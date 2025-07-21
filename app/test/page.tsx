'use client'
import React, { useState } from 'react';
import { 
  Heart, 
  Bookmark, 
  Share2, 
  MessageCircle, 
  ArrowUp, 
  ArrowDown,
  Send,
  Calendar,
  Clock,
  Tag,
  User,
  Twitter,
  Facebook,
  Link,
  ChevronDown
} from 'lucide-react';

const BlogDetailPage = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(247);
  const [isLiked, setIsLiked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showComments, setShowComments] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Alex Johnson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      content: "This is exactly what I needed! The implementation details are spot on. Thanks for sharing this comprehensive guide.",
      timestamp: "2 hours ago",
      likes: 12,
      replies: []
    },
    {
      id: 2,
      author: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=40&h=40&fit=crop&crop=face",
      content: "Great article! I've been struggling with this concept for weeks. Your explanation made it click instantly.",
      timestamp: "5 hours ago",
      likes: 8,
      replies: [
        {
          id: 3,
          author: "Mike Rodriguez",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
          content: "Same here! The visual examples really helped.",
          timestamp: "3 hours ago",
          likes: 3
        }
      ]
    }
  ]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = () => {
    setShowShareMenu(!showShareMenu);
  };

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      const newCommentObj = {
        id: comments.length + 1,
        author: "You",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face",
        content: newComment,
        timestamp: "Just now",
        likes: 0,
        replies: []
      };
      setComments([newCommentObj, ...comments]);
      setNewComment('');
    }
  };

  const blogData = {
    title: "Building Modern Web Applications with Advanced Component Architecture",
    author: {
      name: "David Chen",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=60&h=60&fit=crop&crop=face",
      bio: "Senior Frontend Developer"
    },
    publishDate: "March 15, 2025",
    category: "Development",
    readTime: "12 min read",
    heroImage: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=1200&h=600&fit=crop",
    content: `
In the rapidly evolving landscape of web development, creating scalable and maintainable applications has become more crucial than ever. This comprehensive guide explores advanced component architecture patterns that will elevate your development workflow and create robust, future-proof applications.
g these concepts today will prepare you for the challenges and opportunities ahead.
    `
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative">
        <img 
          src={blogData.heroImage} 
          alt={blogData.title}
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        {/* Article Header */}
        <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-700 rounded-lg p-8 mb-8 shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-300">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-emerald-500 text-black px-3 py-1 rounded-full text-sm font-medium">
              {blogData.category}
            </span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            {blogData.title}
          </h1>
          
          {/* Author & Meta Info */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <img 
                src={blogData.author.avatar} 
                alt={blogData.author.name}
                className="w-12 h-12 rounded-full border-2 border-emerald-500"
              />
              <div>
                <h3 className="font-medium text-lg">{blogData.author.name}</h3>
                <p className="text-gray-400 text-sm">{blogData.author.bio}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-gray-300 text-sm">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {blogData.publishDate}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {blogData.readTime}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            {/* <button 
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                isLiked 
                  ? 'bg-emerald-500 text-black' 
                  : 'bg-gray-800 hover:bg-gray-700 text-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              {likes}
            </button> */}
            
            <button 
              onClick={handleBookmark}
              className={`p-2 rounded-lg transition-all duration-300 ${
                isBookmarked 
                  ? 'bg-emerald-500 text-black' 
                  : 'bg-gray-800 hover:bg-gray-700 text-white'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
            
            <div className="relative">
              <button 
                onClick={handleShare}
                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-300"
              >
                <Share2 className="w-4 h-4" />
              </button>
              
              {showShareMenu && (
                <div className="absolute top-12 right-0 bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-lg p-4 min-w-48 z-20">
                  <div className="flex flex-col gap-2">
                    <button className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded text-left">
                      <Twitter className="w-4 h-4 text-cyan-400" />
                      Share on Twitter
                    </button>
                    <button className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded text-left">
                      <Facebook className="w-4 h-4 text-blue-400" />
                      Share on Facebook
                    </button>
                    <button className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded text-left">
                      <Link className="w-4 h-4 text-gray-400" />
                      Copy Link
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-700 rounded-lg p-8 mb-8 shadow-lg">
          <div className="prose prose-lg prose-invert max-w-none">
            {blogData.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={index} className="text-4xl font-bold text-emerald-400 mb-6 mt-12">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              } else if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={index} className="text-2xl font-bold text-emerald-300 mb-4 mt-8">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              } else if (paragraph.trim()) {
                return (
                  <p key={index} className="text-gray-300 mb-6 leading-relaxed text-lg">
                    {paragraph.split('**').map((part, i) => 
                      i % 2 === 1 ? <strong key={i} className="text-white font-bold">{part}</strong> : part
                    )}
                  </p>
                );
              }
              return null;
            })}
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-700 rounded-lg p-8 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <MessageCircle className="w-6 h-6 text-emerald-400" />
              Comments ({comments.length})
            </h2>
            <button 
              onClick={() => setShowComments(!showComments)}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <ChevronDown className={`w-4 h-4 transition-transform ${showComments ? '' : 'rotate-180'}`} />
            </button>
          </div>

          {showComments && (
            <div>
              {/* Add Comment */}
              <div className="mb-8">
                <div className="flex gap-4">
                  <img 
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face"
                    alt="Your avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Share your thoughts..."
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg p-4 text-white placeholder-gray-400 resize-none focus:border-emerald-500 focus:outline-none"
                      rows={3}
                    />
                    <div className="flex justify-end mt-3">
                      <button
                        onClick={handleCommentSubmit}
                        className="bg-emerald-500 hover:bg-emerald-600 text-black px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2"
                      >
                        <Send className="w-4 h-4" />
                        Post Comment
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="border-l-2 border-gray-700 pl-6">
                    <div className="flex items-start gap-4">
                      <img 
                        src={comment.avatar}
                        alt={comment.author}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium">{comment.author}</h4>
                          <span className="text-gray-400 text-sm">{comment.timestamp}</span>
                        </div>
                        <p className="text-gray-300 mb-3">{comment.content}</p>
                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-1 text-gray-400 hover:text-emerald-400 transition-colors">
                            <ArrowUp className="w-4 h-4" />
                            {comment.likes}
                          </button>
                          <button className="flex items-center gap-1 text-gray-400 hover:text-red-400 transition-colors">
                            <ArrowDown className="w-4 h-4" />
                          </button>
                          <button className="text-gray-400 hover:text-white transition-colors text-sm">
                            Reply
                          </button>
                        </div>

                        {/* Replies */}
                        {comment.replies && comment.replies.length > 0 && (
                          <div className="mt-4 space-y-4 border-l-2 border-gray-800 pl-4">
                            {comment.replies.map((reply) => (
                              <div key={reply.id} className="flex items-start gap-3">
                                <img 
                                  src={reply.avatar}
                                  alt={reply.author}
                                  className="w-8 h-8 rounded-full"
                                />
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h5 className="font-medium text-sm">{reply.author}</h5>
                                    <span className="text-gray-400 text-xs">{reply.timestamp}</span>
                                  </div>
                                  <p className="text-gray-300 text-sm mb-2">{reply.content}</p>
                                  <div className="flex items-center gap-3">
                                    <button className="flex items-center gap-1 text-gray-400 hover:text-emerald-400 transition-colors text-xs">
                                      <ArrowUp className="w-3 h-3" />
                                      {reply.likes}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
          <div className='h-16'></div>
      </div>
    </div>
  );
};

export default BlogDetailPage;