// import { MainPostItem, MainPostItemLoading } from "@/components/main";
// import { SharedPagination } from "@/components/shared";
// import { PostWithCategoryWithProfile } from "@/types/collection";
// import { createClient } from "@/utils/supabase/server";
// import { cookies } from "next/headers";
// import { notFound } from "next/navigation";
// import { Suspense } from "react";
// import { v4 } from "uuid";
// import Link from "next/link";

// export const revalidate = 0;

// interface HomePageProps {
//   searchParams: { [key: string]: string | string[] | undefined };
// }

// // You can configure these in a separate config file
// const siteConfig = {
//   title: "Latest Posts",
//   description: "Discover the latest insights, tutorials, and thoughts from our blog.",
//   maxDisplay: 5 // Show first 5 posts prominently, then paginate
// };

// export default async function HomePage({ searchParams }: HomePageProps) {
//   const cookieStore = cookies();
//   const supabase = createClient(cookieStore);

//   // Fetch total pages
//   const { count } = await supabase
//     .from("posts")
//     .select("*", { count: "exact", head: true });

//   // Pagination
//   const limit = 10;
//   const totalPages = count ? Math.ceil(count / limit) : 0;
//   const page =
//     typeof searchParams.page === "string" &&
//     +searchParams.page > 1 &&
//     +searchParams.page <= totalPages
//       ? +searchParams.page
//       : 1;
//   const from = (page - 1) * limit;
//   const to = page ? from + limit : limit;

//   // Fetch posts
//   const { data, error } = await supabase
//     .from("posts")
//     .select(`*, categories(*), profiles(*)`)
//     .eq("published", true)
//     .order("created_at", { ascending: false })
//     .range(from, to)
//     .returns<PostWithCategoryWithProfile[]>();

//   if (!data || error || !data.length) {
//     notFound();
//   }

//   return (
//     <>
//       <div className="divide-y divide-gray-200 dark:divide-gray-700">
//         {/* Header Section */}
//         <div className="space-y-2 pt-6 pb-8 md:space-y-5">
//           <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
//             {siteConfig.title}
//           </h1>
//           <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
//             {siteConfig.description}
//           </p>
//         </div>

//         {/* Posts List */}
//         <div className="space-y-6 pt-8">
//           {!data.length && (
//             <p className="text-gray-500 dark:text-gray-400">No posts found.</p>
//           )}
          
//           {data.slice(0, siteConfig.maxDisplay).map((post) => (
//             <div key={post.id} className="py-6 first:pt-0">
//               <Suspense fallback={<MainPostItemLoading />}>
//                 <MainPostItem post={post} />
//               </Suspense>
//             </div>
//           ))}
          
//           {/* Additional posts if more than maxDisplay */}
//           {data.length > siteConfig.maxDisplay && (
//             <div className="space-y-6 border-t border-gray-200 pt-6 dark:border-gray-700">
//               <h2 className="text-2xl font-bold leading-8 tracking-tight text-gray-900 dark:text-gray-100">
//                 More Posts
//               </h2>
//               {data.slice(siteConfig.maxDisplay).map((post) => (
//                 <div key={post.id} className="py-4">
//                   <Suspense fallback={<MainPostItemLoading />}>
//                     <MainPostItem post={post} />
//                   </Suspense>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* All Posts Link */}
//       {totalPages > 1 && page === 1 && (
//         <div className="flex justify-end text-base leading-6 font-medium pt-6">
//           <Link
//             href="?page=2"
//             className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
//             aria-label="View all posts"
//           >
//             All Posts &rarr;
//           </Link>
//         </div>
//       )}

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="pt-8">
//           <SharedPagination
//             page={page}
//             totalPages={totalPages}
//             baseUrl="/"
//             pageUrl="?page="
//           />
//         </div>
//       )}
//     </>
//   );
// }

'use client'
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Calendar, Clock, MessageCircle, ArrowRight, User, Search, Filter, TrendingUp, ChevronDown, X } from 'lucide-react';
import { createClient } from "@/utils/supabase/client";
import { format, parseISO, subDays, isAfter } from "date-fns";
import readingTime from "reading-time";
import Image from "next/image";
import { useRouter } from 'next/navigation';

// Types
interface PostWithCategoryWithProfile {
  id: string;
  title: string;
  description: string;
  content: string;
  slug: string;
  image?: string;
  created_at: string;
  updated_at: string;
  published: boolean;
  categories?: {
    title: string;
  };
  profiles?: {
    full_name?: string;
    avatar_url?: string;
  };
}

interface Comment {
  id: string;
  post_id: string;
  created_at: string;
}

// Sort options
const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'most-discussed', label: 'Most Discussed' },
  { value: 'recently-updated', label: 'Recently Updated' }
];

// Date filter options
const DATE_FILTERS = [
  { value: 'all', label: 'All Time' },
  { value: 'week', label: 'Past Week' },
  { value: 'month', label: 'Past Month' },
  { value: 'quarter', label: 'Past 3 Months' },
  { value: 'year', label: 'Past Year' }
];

const BlogLandingPage = () => {
  // State management
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleBlogs, setVisibleBlogs] = useState(6);
  const [sortBy, setSortBy] = useState('newest');
  const [dateFilter, setDateFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  
  // Supabase data state
  const [posts, setPosts] = useState<PostWithCategoryWithProfile[]>([]);
  const [comments, setComments] = useState<{[key: string]: Comment[]}>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPosts, setTotalPosts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Configuration
  const POSTS_PER_PAGE = 10;
  const DEFAULT_AVATAR = "/images/avatar.png";
  const DEFAULT_COVER = "/images/not-found.jpg";
  
  // Initialize Supabase client
  const supabase = createClient();

  // Fetch posts from Supabase
  const fetchPosts = useCallback(async (page = 1, category = 'All', search = '', sort = 'newest', dateRange = 'all') => {
    try {
      setLoading(true);
      setError(null);
      
      const from = (page - 1) * POSTS_PER_PAGE;
      const to = from + POSTS_PER_PAGE - 1;
      
      // Build query
      let query = supabase
        .from("posts")
        .select(`*, categories(*), profiles(*)`, { count: 'exact' })
        .eq("published", true);
      
      // Add category filter
      if (category !== 'All') {
        query = query.eq("categories.title", category);
      }
      
      // Add search filter
      if (search) {
        query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%,content.ilike.%${search}%`);
      }
      
      // Add date filter
      if (dateRange !== 'all') {
        let daysAgo;
        switch (dateRange) {
          case 'week': daysAgo = 7; break;
          case 'month': daysAgo = 30; break;
          case 'quarter': daysAgo = 90; break;
          case 'year': daysAgo = 365; break;
          default: daysAgo = null;
        }
        
        if (daysAgo) {
          const dateThreshold = subDays(new Date(), daysAgo).toISOString();
          query = query.gte('created_at', dateThreshold);
        }
      }
      
      // Apply sorting
      switch (sort) {
        case 'newest':
          query = query.order("created_at", { ascending: false });
          break;
        case 'oldest':
          query = query.order("created_at", { ascending: true });
          break;
        case 'recently-updated':
          query = query.order("updated_at", { ascending: false });
          break;
        case 'most-discussed':
          // We'll sort by comments count after fetching
          query = query.order("created_at", { ascending: false });
          break;
      }
      
      // Apply pagination
      query = query.range(from, to);
      
      const { data, error: fetchError, count } = await query;
      
      if (fetchError) {
        throw fetchError;
      }
      
      // Fetch comments for each post
      let postsWithComments = data || [];
      if (postsWithComments.length > 0) {
        const postIds = postsWithComments.map(post => post.id);
        const commentsMap = await fetchCommentsForPosts(postIds);
        
        // If sorting by most discussed, sort posts by comment count
        if (sort === 'most-discussed') {
          postsWithComments = postsWithComments.sort((a, b) => {
            const aComments = commentsMap[a.id]?.length || 0;
            const bComments = commentsMap[b.id]?.length || 0;
            return bComments - aComments;
          });
        }
      }
      
      setPosts(postsWithComments);
      setTotalPosts(count || 0);
      
    } catch (err:any) {
      console.error('Error fetching posts:', err);
      setError(err.message || 'Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase]);

  // Fetch comments for posts
  const fetchCommentsForPosts = useCallback(async (postIds: string[]) => {
    try {
      const { data: commentsData, error } = await supabase
        .from("comments")
        .select("id, post_id, created_at")
        .in("post_id", postIds)
        .order("created_at", { ascending: true });

      if (error) throw error;

      // Group comments by post_id
      const commentsMap = commentsData?.reduce((acc, comment) => {
        if (!acc[comment.post_id]) {
          acc[comment.post_id] = [];
        }
        acc[comment.post_id].push(comment);
        return acc;
      }, {}) || {};

      setComments(commentsMap);
      return commentsMap;
    } catch (err) {
      console.error('Error fetching comments:', err);
      return {};
    }
  }, [supabase]);

  // Fetch unique categories
  const fetchCategories = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("categories")
        .select("title")
        .order("title");
      
      if (error) throw error;
      
      return ['All', ...(data?.map(cat => cat.title) || [])];
    } catch (err) {
      console.error('Error fetching categories:', err);
      return ['All'];
    }
  }, [supabase]);

  // Get categories with memoization
  const [categories, setCategories] = useState(['All']);
  
  useEffect(() => {
    fetchCategories().then(setCategories);
  }, [fetchCategories]);

  // Effect to fetch posts when filters change
  useEffect(() => {
    fetchPosts(1, selectedCategory, searchQuery, sortBy, dateFilter);
    setCurrentPage(1);
    setVisibleBlogs(6);
  }, [selectedCategory, searchQuery, sortBy, dateFilter, fetchPosts]);

  // Transform posts to match the blog structure
  const transformedPosts = useMemo(() => {
    return posts.map(post => {
      const readTime = readingTime(post.content || "");
      const postComments = comments[post.id] || [];
      
      return {
        id: post.id,
        image: post.image || DEFAULT_COVER,
        category: post.categories?.title || "Uncategorized",
        title: post.title || "Untitled",
        description: post.description || "",
        releaseDate: post.updated_at || post.created_at,
        readTime: `${Math.ceil(readTime.minutes)} min`,
        totalComments: postComments.length,
        author: {
          name: post.profiles?.full_name || "Anonymous",
          image: post.profiles?.avatar_url || DEFAULT_AVATAR,
          tag: "Author",
          bio: "Author"
        },
        slug: post.slug
      };
    });
  }, [posts, comments]);

  //  // Filter and search functionality (now working with real data)
  const filteredBlogs = useMemo(() => {
    return transformedPosts;
  }, [transformedPosts]);

  // Pagination
  const displayedBlogs = filteredBlogs.slice(0, visibleBlogs);
  const hasMoreBlogs = visibleBlogs < filteredBlogs.length || filteredBlogs.length === POSTS_PER_PAGE;

  // Helper functions
  const formatDate = useCallback((dateString) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - date.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays < 7) {
        return `${diffDays} days ago`;
      }
      
      return format(parseISO(dateString), 'MMM dd, yyyy');
    } catch (err) {
      return 'Recently';
    }
  }, []);

  const getCategoryColor = useCallback((category) => {
    const colors = {
      'Technology': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      'Business': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Design': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'Marketing': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
      'Development': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
      'Productivity': 'bg-orange-500/20 text-orange-400 border-orange-500/30'
    };
    return colors[category] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  }, []);

  // Event handlers
  const loadMore = useCallback(async () => {
    if (visibleBlogs >= filteredBlogs.length && filteredBlogs.length === POSTS_PER_PAGE) {
      // Fetch next page
      const nextPage = currentPage + 1;
      try {
        const from = (nextPage - 1) * POSTS_PER_PAGE;
        const to = from + POSTS_PER_PAGE - 1;
        
        let query = supabase
          .from("posts")
          .select(`*, categories(*), profiles(*)`)
          .eq("published", true);
        
        if (selectedCategory !== 'All') {
          query = query.eq("categories.title", selectedCategory);
        }
        
        if (searchQuery) {
          query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%`);
        }
        
        // Apply date filter
        if (dateFilter !== 'all') {
          let daysAgo;
          switch (dateFilter) {
            case 'week': daysAgo = 7; break;
            case 'month': daysAgo = 30; break;
            case 'quarter': daysAgo = 90; break;
            case 'year': daysAgo = 365; break;
          }
          
          if (daysAgo) {
            const dateThreshold = subDays(new Date(), daysAgo).toISOString();
            query = query.gte('created_at', dateThreshold);
          }
        }
        
        query = query.range(from, to);
        
        const { data, error } = await query;
        
        if (error) throw error;
        
        if (data && data.length > 0) {
          setPosts(prev => [...prev, ...data]);
          const postIds = data.map(post => post.id);
          await fetchCommentsForPosts(postIds);
          setCurrentPage(nextPage);
        }
      } catch (err) {
        console.error('Error loading more posts:', err);
      }
    } else {
      setVisibleBlogs(prev => prev + 6);
    }
  }, [visibleBlogs, filteredBlogs.length, currentPage, selectedCategory, searchQuery, dateFilter, supabase, fetchCommentsForPosts]);

  // Handle search with debouncing
  const [searchTimeout, setSearchTimeout] = useState(null);
  
  const handleSearchChange = useCallback((value) => {
    setSearchQuery(value);
    
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    
    const timeout = setTimeout(() => {
      // Search will be triggered by the useEffect dependency
    }, 500);
    
    // setSearchTimeout(timeout);
  }, [searchTimeout]);
  const router = useRouter();
  // Loading component
  const LoadingCard = () => (
    <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden shadow-xl animate-pulse">
      <div className="h-56 bg-gray-800"></div>
      <div className="p-6">
        <div className="h-4 bg-gray-800 rounded w-20 mb-4"></div>
        <div className="h-6 bg-gray-800 rounded w-3/4 mb-3"></div>
        <div className="h-4 bg-gray-800 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-800 rounded w-2/3 mb-6"></div>
        <div className="flex items-center gap-4 mb-6">
          <div className="h-3 bg-gray-800 rounded w-16"></div>
          <div className="h-3 bg-gray-800 rounded w-12"></div>
          <div className="h-3 bg-gray-800 rounded w-14"></div>
        </div>
        <div className="flex items-center justify-between border-t border-gray-800 pt-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-800 rounded-full"></div>
            <div>
              <div className="h-4 bg-gray-800 rounded w-24 mb-1"></div>
              <div className="h-3 bg-gray-800 rounded w-16"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white">
      {/* Enhanced Hero Section - More Personal */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-cyan-500/10 blur-3xl" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent animate-gradient-x">
              My Thoughts & Stories
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Welcome to my corner of the internet. Here I share my experiences, learnings, and musings on technology, life, and everything in between.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute z-50 left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
                />
              </div>
            </div>

            {/* Filter Controls */}
            <div className="flex relative flex-col sm:flex-row items-center justify-center gap-3 mb-8">
                {/* Category Dropdown */}
                <div className="relative">
                    <button
                    onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                    onBlur={() => setTimeout(() => setIsCategoryDropdownOpen(false), 200)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-lg hover:bg-gray-700/60 hover:border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-200 group"
                    aria-label="Select category"
                    aria-expanded={isCategoryDropdownOpen}
                    >
                    <span className="text-gray-400 text-sm">Category:</span>
                    <span className="text-gray-100 font-medium">{selectedCategory}</span>
                    <ChevronDown className={`w-4 h-4 text-gray-500 group-hover:text-gray-400 transition-all duration-200 ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {/* Category Dropdown Menu */}
                    {isCategoryDropdownOpen && (
                    <div className="top-full left-0 mt-2 w-64 max-h-120 overflow-y-auto bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 rounded-lg shadow-2xl shadow-black/20 z-50 py-1">
                        <div className="max-h-64 overflow-y-auto">
                        {categories.map((category) => (
                            <button
                            key={category}
                            onClick={() => {
                                setSelectedCategory(category);
                                setIsCategoryDropdownOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2.5 transition-all duration-150 ${
                                selectedCategory === category 
                                ? 'bg-emerald-500/10 text-emerald-400 border-l-2 border-emerald-400' 
                                : 'text-gray-300 hover:bg-gray-800/50 hover:text-gray-100 border-l-2 border-transparent'
                            }`}
                            >
                            {category}
                            </button>
                        ))}
                        </div>
                    </div>
                    )}
                </div>

                {/* Sort Dropdown */}
                <div className="relative">
                    <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none px-4 py-2.5 pr-10 bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-lg text-gray-100 hover:bg-gray-700/60 hover:border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-200 cursor-pointer"
                    aria-label="Sort by"
                    >
                    {SORT_OPTIONS.map(option => (
                        <option key={option.value} value={option.value} className="bg-gray-900">
                        {option.label}
                        </option>
                    ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>

                {/* Date Filter Dropdown */}
                <div className="relative">
                    <select
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="appearance-none px-4 py-2.5 pr-10 bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-lg text-gray-100 hover:bg-gray-700/60 hover:border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-200 cursor-pointer"
                    aria-label="Filter by date"
                    >
                    {DATE_FILTERS.map(option => (
                        <option key={option.value} value={option.value} className="bg-gray-900">
                        {option.label}
                        </option>
                    ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>

                {/* Active Filters Display */}
                {(selectedCategory !== 'All' || searchQuery || dateFilter !== 'all') && (
                    <button
                    onClick={() => {
                        setSelectedCategory('All');
                        setSearchQuery('');
                        setDateFilter('all');
                        setSortBy('newest');
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 bg-red-900/20 backdrop-blur-sm text-red-400 border border-red-500/30 rounded-lg hover:bg-red-900/30 hover:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all duration-200 group"
                    aria-label="Clear all filters"
                    >
                    <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />
                    <span className="text-sm font-medium">Clear Filters</span>
                    </button>
                )}
                </div>

            {/* Results Summary */}
            <div className="text-sm text-gray-400">
              {loading ? (
                <span>Loading posts...</span>
              ) : (
                <span>
                  Found {totalPosts} {totalPosts === 1 ? 'post' : 'posts'}
                  {selectedCategory !== 'All' && ` in ${selectedCategory}`}
                  {dateFilter !== 'all' && ` from ${DATE_FILTERS.find(d => d.value === dateFilter)?.label.toLowerCase()}`}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Blog Grid Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Error State */}
          {error && (
            <div className="bg-red-900/20 border border-red-500/30 text-red-400 px-6 py-4 rounded-lg mb-8">
              <p>Error loading posts: {error}</p>
              <button 
                onClick={() => fetchPosts(1, selectedCategory, searchQuery, sortBy, dateFilter)}
                className="mt-2 text-red-300 hover:text-red-200 underline"
              >
                Try again
              </button>
            </div>
          )}

          {/* Blog Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {loading ? (
              // Loading state
              Array.from({ length: 6 }).map((_, index) => (
                <LoadingCard key={index} />
              ))
            ) : (
              // Actual posts
              displayedBlogs.map((blog, index) => (
                <article 
                  key={blog.id}
                  onClick={()=>{router.push(`/posts/${blog.slug}`)}}
                  className="bg-gray-900/40 hover:cursor-pointer backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-emerald-500/10 hover:border-emerald-500/30 transform hover:scale-[1.02] transition-all duration-300 group"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: 'fadeInUp 0.6s ease-out forwards'
                  }}
                >
                  {/* Blog Image with overlay */}
                  <div className="relative overflow-hidden h-56">
                    <Image 
                      src={blog.image} 
                      alt={blog.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-4 py-1.5 rounded-full bg-emerald-100 text-sm font-medium border backdrop-blur-sm ${getCategoryColor(blog.category)}`}>
                        {blog.category}
                      </span>
                    </div>
                  </div>

                  {/* Blog Content */}
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-3 group-hover:text-emerald-400 transition-colors duration-200 line-clamp-2">
                      {blog.title}
                    </h2>
                    
                    <p className="text-gray-300 mb-4 line-clamp-3 leading-relaxed">
                      {blog.description}
                    </p>

                    {/* Meta Information */}
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(blog.releaseDate)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {blog.readTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        {blog.totalComments} {blog.totalComments === 1 ? 'comment' : 'comments'}
                      </div>
                    </div>
                    
                    {/* Author Section */}
                    <div className="flex items-center justify-between border-t border-gray-800 pt-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Image 
                            src={blog.author.image} 
                            alt={blog.author.name}
                            width={48}
                            height={48}
                            className="rounded-full object-cover border-2 border-gray-700 group-hover:border-emerald-500/50 transition-colors duration-200"
                          />
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-gray-900" />
                        </div>
                        <div>
                          <p className="font-medium text-white group-hover:text-emerald-400 transition-colors duration-200">
                            {blog.author.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            {blog.author.bio}
                          </p>
                        </div>
                      </div>
                      
                      <a 
                        href={`/posts/${blog.slug}`}
                        className="text-emerald-400 hover:text-emerald-300 font-medium inline-flex items-center gap-2 group/btn px-4 py-2 rounded-lg hover:bg-emerald-500/10 transition-all duration-200"
                        aria-label={`Read more about ${blog.title}`}
                      >
                        Read More
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                      </a>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>

          {/* Empty State */}
          {!loading && filteredBlogs.length === 0 && !error && (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800 rounded-full mb-4">
                <Search className="w-8 h-8 text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-300 mb-2">No posts found</h3>
              <p className="text-gray-400 mb-4">Try adjusting your search or filters</p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                  setDateFilter('all');
                  setSortBy('newest');
                }}
                className="text-emerald-400 hover:text-emerald-300"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Load More Section */}
          {!loading && hasMoreBlogs && (
            <div className="text-center mt-12">
              <button 
                onClick={loadMore}
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-medium px-8 py-3 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-emerald-500/25 inline-flex items-center gap-2"
              >
                Load More Posts
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-gray-400 text-sm mt-2">
                Showing {displayedBlogs.length} of {totalPosts} posts
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Newsletter Section - Made more personal */}
      {/* <section className="border-t border-gray-800 bg-gradient-to-b from-gray-900/50 to-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Never Miss a Post
            </h2>
            <p className="text-gray-300 mb-8">
              Join my newsletter and get notified whenever I publish something new
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-emerald-500/25"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-4">
              I respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section> */}

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }

                .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .line-clamp-3 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
      `}</style>
    </div>
  );
};

export default BlogLandingPage;