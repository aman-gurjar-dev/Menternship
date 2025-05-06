require("dotenv").config(); // Load environment variables from .env file

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const socketIo = require("socket.io");
const socket = require("./socket");
const socketMiddleware = require("./socketMiddleware");
const http = require("http");

// Import models
const userModel = require("./models/allUser.js");
const goalModel = require("./models/goal.js");
const mentorModel = require("./models/mentor.js");
const Message = require("./models/message.js");
const Conversation = require("./models/Conversation");

const { OpenAI } = require('openai');
const app = express();
const server = http.createServer(app);

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      process.env.FRONTEND_URL?.replace(/\/$/, '') || 'https://menternship.vercel.app',
      'http://localhost:5173',
      'https://menternship-mini-project.vercel.app'
    ];
    if (!origin || allowedOrigins.includes(origin.replace(/\/$/, ''))) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Add a health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

const io = socketIo(server, {
  cors: {
    origin: (origin, callback) => {
      const allowedOrigins = [
        process.env.FRONTEND_URL?.replace(/\/$/, '') || 'http://localhost:5173',
        'http://localhost:5173'
      ];
      if (!origin || allowedOrigins.includes(origin.replace(/\/$/, ''))) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ["GET", "POST"],
    credentials: true
  },
});

// Apply socket middleware
io.use(socketMiddleware);

// Start Socket.IO
io.listen(3001, () => {
  console.log("Socket.IO server listening on port 3001");
});

// ==============================================
// ✅ Database Connection
// ==============================================
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });
    console.log("✅ MongoDB Connected Successfully!");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  }
};

connectDB(); // Initialize database connection

// ==============================================
// ✅ Middleware Setup
// ==============================================
app.use(express.json({ limit: "5mb" })); // Parse JSON bodies with 5MB limit
app.use(express.urlencoded({ extended: true, limit: "5mb" })); // Parse URL-encoded bodies

// JWT Configuration
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

// OpenAI Configuration (should be moved to environment variables)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "your-api-key-here",
});

// ==============================================
// ✅ Authentication Middleware
// ==============================================
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  
  // Check if authorization header exists and is in correct format
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access Denied! No valid token provided." });
  }
  
  const token = authHeader.split(" ")[1]; // Extract token from header
  
  // Verify JWT token
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Invalid or Expired Token!" });
    req.user = decoded; // Attach decoded user to request object
    next(); // Proceed to next middleware/route
  });
};

// ==============================================
// ✅ Authentication Routes
// ==============================================

/**
 * @route POST /Register
 * @description Register a new user
 * @access Public
 */
app.post("/api/students/register", async (req, res) => {
  try {
    const { name, email, username, password, confirmPassword } = req.body;
    
    // Validate required fields
    if (!name || !email || !username || !password || !confirmPassword) {
      return res.status(400).json({ error: "All fields are required" });
    }
    
    // Check password match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }
    
    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "Email already exists" });

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await userModel.create({ 
      name, 
      email, 
      username, 
      password: hashedPassword 
    });
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: createdUser._id, email: createdUser.email }, 
      JWT_SECRET, 
      { expiresIn: "1h" }
    );

    res.status(201).json({ 
      message: "User Registered Successfully", 
      token 
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post('/api/mentors/register', async (req, res) => {
  try {
    const { name, username, email, password, expertise, yearsOfExperience } = req.body;

    // Basic validation
    if (!name || !username || !email || !password || !expertise || !yearsOfExperience) {
      return res.status(400).json({
        error: 'All fields are required',
        details: {
          name: !name ? 'Required' : undefined,
          username: !username ? 'Required' : undefined,
          email: !email ? 'Required' : undefined,
          password: !password ? 'Required' : undefined,
          expertise: !expertise ? 'Required' : undefined,
          yearsOfExperience: !yearsOfExperience ? 'Required' : undefined
        }
      });
    }

    // Check if mentor already exists
    const existingMentor = await mentorModel.findOne({
      $or: [
        { email: { $regex: new RegExp(`^${email}$`, 'i') } },
        { username: { $regex: new RegExp(`^${username}$`, 'i') } }
      ]
    });

    if (existingMentor) {
      const conflicts = {};
      if (existingMentor.email.toLowerCase() === email.toLowerCase()) {
        conflicts.email = 'Email already in use';
      }
      if (existingMentor.username.toLowerCase() === username.toLowerCase()) {
        conflicts.username = 'Username already in use';
      }
      return res.status(409).json({ error: 'Conflict detected', details: conflicts });
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new mentor with hashed password
    const mentor = new mentorModel({
      name,
      username,
      email,
      password: hashedPassword, // Store the hashed password
      expertise: Array.isArray(expertise) ? expertise : [expertise],
      yearsOfExperience,
      profileImage: req.body.profileImage || 'default-mentor.jpg',
      about: req.body.about || 'Professional mentor',
      availability: {
        days: req.body.availability?.days || [],
        hours: req.body.availability?.hours || '9:00 AM - 5:00 PM'
      }
    });

    await mentor.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: mentor._id, role: 'mentor' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return response without password
    const mentorData = mentor.toObject();
    delete mentorData.password;

    res.status(201).json({
      success: true,
      message: 'Mentor registered successfully',
      id: mentor._id,
      token,
      mentor: mentorData
    });

  } catch (err) {
    console.error('Registration error:', err);
    
    // Handle validation errors
    if (err.name === 'ValidationError') {
      const errors = {};
      Object.keys(err.errors).forEach(key => {
        errors[key] = err.errors[key].message;
      });
      return res.status(400).json({ error: 'Validation failed', details: errors });
    }
    
    // Handle duplicate key errors
    if (err.code === 11000) {
      return res.status(409).json({ 
        error: 'Duplicate key error',
        details: { [Object.keys(err.keyPattern)[0]]: 'Already exists' }
      });
    }
    
    res.status(500).json({ 
      error: 'Registration failed',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// Add this to your app.js
app.get('/api/mentors/me', verifyToken, async (req, res) => {
  try {
    const mentor = await mentorModel.findById(req.user.userId)
      .select('-password')
      .populate({
        path: 'followers',
        select: 'name email profileImage interests'
      })
      .populate({
        path: 'slots.bookedBy',
        select: 'name email'
      })
      .populate({
        path: 'reviews.userId',
        select: 'name profileImage'
      })
      .lean();

    if (!mentor) {
      return res.status(404).json({ 
        success: false,
        error: 'Mentor not found' 
      });
    }

    // Calculate all dashboard metrics
    const pendingMessages = await calculatePendingMessages(mentor._id);
    const sessionActivity = calculateSessionActivity(mentor.slots || []);
    const studentDistribution = calculateStudentDistribution(mentor.followers || []);
    const averageResponseTime = calculateAverageResponseTime(mentor.reviews || []);
    const completedSessions = (mentor.slots || []).filter(s => s.status === 'completed').length;
    const upcomingSessions = (mentor.slots || []).filter(s => s.status === 'booked').length;
    const followersCount = mentor.followers?.length || 0;

    // Add calculated fields to mentor data
    const enhancedMentor = {
      ...mentor,
      name: mentor.name,
      sessionActivity,
      studentDistribution,
      averageResponseTime,
      pendingMessages,
      completedSessions,
      upcomingSessions,
      followersCount,
      averageRating: calculateAverageRating(mentor.reviews || [])
    };

    res.status(200).json(enhancedMentor);

  } catch (err) {
    console.error('Error fetching mentor:', err);
    res.status(500).json({
      success: false,
      error: 'Server error',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});


// Helper functions with complete implementation
async function calculatePendingMessages(mentorId) {
  try {
    // Count unread messages for this mentor
    const count = await Message.countDocuments({
      recipient: mentorId,
      read: false
    });
    return count;
  } catch (err) {
    console.error('Error counting pending messages:', err);
    return 0;
  }
}

function calculateSessionActivity(slots) {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentYear = new Date().getFullYear();
  const sessionsByMonth = {};
  
  // Initialize all months with 0 sessions
  monthNames.forEach(month => {
    sessionsByMonth[month] = 0;
  });

  // Count sessions by month for the current year
  slots.forEach(slot => {
    if (slot.date) {
      const slotDate = new Date(slot.date);
      if (slotDate.getFullYear() === currentYear) {
        const month = monthNames[slotDate.getMonth()];
        sessionsByMonth[month]++;
      }
    }
  });

  // Convert to array format for the chart (last 6 months)
  const currentMonth = new Date().getMonth();
  const result = [];
  
  for (let i = 5; i >= 0; i--) {
    const monthIndex = (currentMonth - i + 12) % 12;
    const month = monthNames[monthIndex];
    result.push({
      month,
      sessions: sessionsByMonth[month] || 0
    });
  }

  return result;
}

function calculateStudentDistribution(followers) {
  const distribution = {
    'React': 0,
    'Node.js': 0,
    'Career': 0,
    'Other': 0
  };

  if (!followers || followers.length === 0) {
    return [
      { name: 'React', value: 35 },
      { name: 'Node.js', value: 25 },
      { name: 'Career', value: 20 },
      { name: 'Other', value: 20 }
    ];
  }

  // Count followers by their primary interest
  followers.forEach(follower => {
    const interest = follower.interests?.[0] || 'Other';
    if (distribution.hasOwnProperty(interest)) {
      distribution[interest]++;
    } else {
      distribution['Other']++;
    }
  });

  // Convert to array format
  return Object.entries(distribution).map(([name, value]) => ({
    name,
    value
  }));
}

function calculateAverageResponseTime(reviews) {
  if (!reviews || reviews.length === 0) return 'Not available';
  
  // Calculate average response time in minutes
  const totalResponseTime = reviews.reduce((sum, review) => {
    if (review.responseTime) {
      return sum + review.responseTime;
    }
    return sum;
  }, 0);

  const averageMinutes = Math.round(totalResponseTime / reviews.length);
  
  // Format as hours and minutes
  const hours = Math.floor(averageMinutes / 60);
  const minutes = averageMinutes % 60;
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

function calculateAverageRating(reviews) {
  if (!reviews || reviews.length === 0) return 0;
  
  const sum = reviews.reduce((total, review) => {
    return total + (review.rating || 0);
  }, 0);

  const average = sum / reviews.length;
  return parseFloat(average.toFixed(1)); // Round to 1 decimal place
}

//update mentor profile
// Add this to your app.js
// Add this to your app.js
app.put('/api/mentors/update-profile', verifyToken, async (req, res) => {
  try {
    console.log('User  ID:', req.user.userId); // Log the user ID

    if (!mongoose.Types.ObjectId.isValid(req.user.userId)) {
      return res.status(400).json({ success: false, error: 'Invalid user ID' });
    }

    const { name, email, bio, expertise, sessionRate, availability } = req.body;

    // Validate input
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        error: 'Name and email are required'
      });
    }

    if (!Array.isArray(expertise)) {
      return res.status(400).json({
        success: false,
        error: 'Expertise must be an array'
      });
    }

    // Prepare update data
    const updateData = {
      name,
      email,
      bio,
      expertise,
      sessionRate: Number(sessionRate) || 0,
      availability: availability || {
        days: [],
        hours: '9:00 AM - 5:00 PM'
      }
    };

    // Update mentor profile
    const updatedMentor = await mentorModel.findByIdAndUpdate(
      req.user.userId,
      { $set: updateData },
      { new: true, runValidators: true }
    )
    .select('-password')
    .populate('followers', 'name email profileImage')
    .populate('slots.bookedBy', 'name email')
    .populate('reviews.userId', 'name profileImage');

    if (!updatedMentor) {
      return res.status(404).json({
        success: false,
        error: 'Mentor not found'
      });
    }
    // Recalculate stats
    const pendingMessages = await calculatePendingMessages(updatedMentor._id);
    const sessionActivity = calculateSessionActivity(updatedMentor.slots || []);
    const studentDistribution = calculateStudentDistribution(updatedMentor.followers || []);
    const averageResponseTime = calculateAverageResponseTime(updatedMentor.reviews || []);
    const completedSessions = (updatedMentor.slots || []).filter(s => s.status === 'completed').length;
    const upcomingSessions = (updatedMentor.slots || []).filter(s => s.status === 'booked').length;
    const followersCount = updatedMentor.followers?.length || 0;

    // Add calculated fields
    const enhancedMentor = {
      ...updatedMentor.toObject(),
      sessionActivity,
      studentDistribution,
      averageResponseTime,
      pendingMessages,
      completedSessions,
      upcomingSessions,
      followersCount,
      averageRating: calculateAverageRating(updatedMentor.reviews || [])
    };

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      updatedMentor: enhancedMentor
    });

  } catch (err) {
    console.error('Error updating mentor profile:', err);
    
    // Handle duplicate key errors
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Email already exists'
      });
    }
    
    // Handle validation errors
    if (err.name === 'ValidationError') {
      const errors = {};
      Object.keys(err.errors).forEach(key => {
        errors[key] = err.errors[key].message;
      });
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server error',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

app.post("/Login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Determine if user is mentor or student
    const isMentor = email.endsWith("@menternship.com");
    const model = isMentor ? mentorModel : userModel;

    // Find user by email
    const user = await model.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate JWT token with role
    const token = jwt.sign(
      { 
        userId: user._id, 
        email: user.email,
        role: isMentor ? "mentor" : "student" // Include role in token
      }, 
      JWT_SECRET, 
      { expiresIn: "1h" }
    );

    res.status(200).json({ 
      message: "Login Successful", 
      token,
      role: isMentor ? "mentor" : "student", // Send role in response
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ==============================================
// ✅ User Profile Routes
// ==============================================

/**
 * @route GET /Profile
 * @description Get authenticated user's profile
 * @access Private
 */
app.get("/Profile", verifyToken, async (req, res) => {
  try {
    const user = await userModel.findById(req.user.userId).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ 
      message: "Profile retrieved successfully", 
      user 
    });
  } catch (error) {
    console.error("Profile Fetch Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * @route PUT /Profile
 * @description Update user profile
 * @access Private
 */
app.put("/Profile", verifyToken, async (req, res) => {
  try {
    const { name, phone, college, role, bio, username } = req.body;

    const updatedUser = await userModel.findByIdAndUpdate(
      req.user.userId,
      { name, phone, college, role, bio, username },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ 
      message: "Profile updated successfully", 
      user: updatedUser 
    });
  } catch (error) {
    console.error("Profile Update Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * @route PUT /changePassword
 * @description Change user password
 * @access Private
 */
app.put("/changePassword", verifyToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Find user and validate current password
    const user = await userModel.findById(req.user.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ error: "Current password is incorrect" });

    // Hash and save new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ 
      message: "Password changed successfully" 
    });
  } catch (error) {
    console.error("Change Password Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ==============================================
// ✅ Goal Management Routes
// ==============================================

/**
 * @route POST /api/goals
 * @description Create a new goal
 * @access Private
 */
app.post("/api/goals", verifyToken, async (req, res) => {
  try {
    const { title, totalDays } = req.body;
    
    // Validate input
    if (!title || !totalDays) {
      return res.status(400).json({ error: "Title and duration are required" });
    }
    
    // Create new goal
    const newGoal = await goalModel.create({
      userId: req.user.userId,
      title,
      totalDays,
      completedDays: 0,
      skippedDays: 0,
    });
    
    res.status(201).json(newGoal);
  } catch (error) {
    console.error("Goal Creation Error:", error);
    res.status(500).json({ error: "Error creating goal" });
  }
});

/**
 * @route GET /api/goals
 * @description Get all goals for authenticated user
 * @access Private
 */
app.get("/api/goals", verifyToken, async (req, res) => {
  try {
    const goals = await goalModel.find({ userId: req.user.userId });
    res.status(200).json(goals);
  } catch (error) {
    console.error("Goal Fetch Error:", error);
    res.status(500).json({ error: "Error fetching goals" });
  }
});

/**
 * @route PUT /api/goals/:id
 * @description Update a specific goal
 * @access Private
 */
app.put("/api/goals/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { completedDays, skippedDays } = req.body;
    
    // Update goal and validate ownership
    const updatedGoal = await goalModel.findOneAndUpdate(
      { _id: id, userId: req.user.userId },
      { completedDays, skippedDays },
      { new: true }
    );
    
    if (!updatedGoal) return res.status(404).json({ error: "Goal not found" });
    
    res.status(200).json(updatedGoal);
  } catch (error) {
    console.error("Goal Update Error:", error);
    res.status(500).json({ error: "Error updating goal" });
  }
});

/**
 * @route DELETE /api/goals/:id
 * @description Delete a specific goal
 * @access Private
 */
app.delete("/api/goals/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Delete goal and validate ownership
    const deletedGoal = await goalModel.findOneAndDelete({ 
      _id: id, 
      userId: req.user.userId 
    });
    
    if (!deletedGoal) return res.status(404).json({ error: "Goal not found" });
    
    res.status(200).json({ 
      message: "Goal deleted successfully" 
    });
  } catch (error) {
    console.error("Goal Deletion Error:", error);
    res.status(500).json({ error: "Error deleting goal" });
  }
});

// ==============================================
// ✅ Mentor Management Routes
// ==============================================

/**
 * @route GET /mentors
 * @description Get all mentors
 * @access Public
 */
app.get("/mentors", async (req, res) => {
  try {
    const mentors = await mentorModel.find();
    res.status(200).json(mentors);
  } catch (error) {
    console.error("Mentor Fetch Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * @route GET /mentors/:id
 * @description Get a specific mentor by ID
 * @access Public
 */
app.get("/mentors/:id", async (req, res) => {
  try {
    const mentor = await mentorModel.findById(req.params.id);
    if (!mentor) return res.status(404).json({ error: "Mentor not found!" });
    res.json(mentor);
  } catch (error) {
    res.status(500).json({ error: "Server Error!" });
  }
});

/**
 * @route POST /api/followMentor/:mentorId
 * @description Follow or unfollow a mentor
 * @access Private
 */
app.post("/api/followMentor/:mentorId", verifyToken, async (req, res) => {
  try {
    const { mentorId } = req.params;
    const userId = req.user.userId;

    // Validate ObjectIds
    if (!mongoose.Types.ObjectId.isValid(mentorId) || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ 
        success: false,
        error: "Invalid mentor or user ID" 
      });
    }

    // Find user and mentor
    const user = await userModel.findById(userId);
    const mentor = await mentorModel.findById(mentorId);

    if (!user) {
      return res.status(404).json({ 
        success: false,
        error: "User not found" 
      });
    }

    if (!mentor) {
      return res.status(404).json({ 
        success: false,
        error: "Mentor not found" 
      });
    }

    // Check if user already follows the mentor
    const isFollowing = user.followedMentors.some(id => 
      id.toString() === mentorId.toString()
    );

    // Start a session for transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Toggle follow status
      if (isFollowing) {
        // Unfollow
        await userModel.findByIdAndUpdate(
          userId,
          { $pull: { followedMentors: mentorId } },
          { session }
        );
        await mentorModel.findByIdAndUpdate(
          mentorId,
          { $pull: { followers: userId } },
          { session }
        );
      } else {
        // Follow
        await userModel.findByIdAndUpdate(
          userId,
          { $addToSet: { followedMentors: mentorId } },
          { session }
        );
        await mentorModel.findByIdAndUpdate(
          mentorId,
          { $addToSet: { followers: userId } },
          { session }
        );
      }

      // Commit the transaction
      await session.commitTransaction();

      res.status(200).json({
        success: true,
        message: isFollowing ? "Mentor unfollowed" : "Mentor followed",
        followed: !isFollowing
      });

    } catch (err) {
      // Abort transaction on error
      await session.abortTransaction();
      throw err;
    } finally {
      session.endSession();
    }

  } catch (error) {
    console.error("Follow/Unfollow Error:", error);
    res.status(500).json({ 
      success: false,
      error: "Failed to update follow status",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * @route GET /api/followedMentors
 * @description Get list of mentors followed by the user
 * @access Private
 */
app.get("/api/followedMentors", verifyToken, async (req, res) => {
  try {
    const user = await userModel.findById(req.user.userId)
      .populate("followedMentors", "name bio expertise profileImage");
      
    if (!user) return res.status(404).json({ error: "User not found" });
    
    res.status(200).json({ 
      followedMentors: user.followedMentors 
    });
  } catch (error) {
    console.error("Fetch Followed Mentors Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//same👇☝️

// Add this to your backend routes (app.js or routes file)
app.get("/api/students/followedMentors", verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    // Find the student and populate the followed mentors with their details
    const student = await userModel.findById(userId)
      .select('followedMentors')
      .populate({
        path: 'followedMentors',
        select: '_id name profileImage specialization email', // Include any other fields you need
      });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json({
      success: true,
      followedMentors: student.followedMentors || []
    });

  } catch (error) {
    console.error("Error fetching followed mentors:", error);
    res.status(500).json({ 
      success: false,
      error: "Internal Server Error",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * @route POST /api/unfollowMentor/:mentorId
 * @description Unfollow a mentor
 * @access Private
 */
app.post("/api/unfollowMentor/:mentorId", verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const mentorId = req.params.mentorId;

    // Start a session for transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // 1. Remove mentor from user's followed list
      const user = await userModel.findByIdAndUpdate(
        userId,
        { $pull: { followedMentors: mentorId } },
        { new: true, session }
      );

      if (!user) {
        throw new Error("User not found");
      }

      // 2. Remove user from mentor's followers list
      const mentor = await mentorModel.findByIdAndUpdate(
        mentorId,
        { $pull: { followers: userId } },
        { new: true, session }
      );

      if (!mentor) {
        throw new Error("Mentor not found");
      }

      // Commit the transaction
      await session.commitTransaction();
      
      res.status(200).json({ 
        success: true,
        message: "Unfollowed successfully" 
      });

    } catch (err) {
      // Abort transaction on error
      await session.abortTransaction();
      throw err;
    } finally {
      session.endSession();
    }

  } catch (err) {
    console.error("Unfollow Error:", err);
    res.status(500).json({ 
      success: false,
      error: err.message || "Internal Server Error" 
    });
  }
});

// ==============================================
// ✅ Chat & Messaging Routes
// ==============================================

/**
 * @route POST /save-chat
 * @description Save chat message history
 * @access Public (should be protected in production)
 */
app.post("/save-chat", async (req, res) => {
  try {
    const { userId, message } = req.body;
    
    // Validate input
    if (!userId || !message || !message.text || !message.sender) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Update user's chat history
    const user = await userModel.findByIdAndUpdate(
      userId,
      { $push: { chatHistory: message } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ 
      success: true, 
      message: "Chat saved successfully" 
    });
  } catch (err) {
    console.error("Error saving chat:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * @route GET /get-chat/:userId
 * @description Get chat history for a user
 * @access Public (should be protected in production)
 */
app.get("/get-chat/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Find user and return chat history
    const user = await userModel.findById(userId).select("chatHistory");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ 
      chatHistory: user.chatHistory 
    });
  } catch (err) {
    console.error("Error fetching chat history:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post('/api/copilotkit/respond', async (req, res) => {
  const { message } = req.body;

  // Validate input
  if (!message) {
    return res.status(400).json({ error: 'Message is required.' });
  }

  try {
    // Get AI completion from OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { 
          role: 'system', 
          content: "You are a helpful AI assistant focused on mentorship, career guidance, and skill development." 
        },
        { role: 'user', content: message }
      ],
      temperature: 0.7,
    });

    const aiResponse = completion.choices[0]?.message?.content?.trim();
    res.json({ 
      response: aiResponse 
    });
  } catch (err) {
    console.error('Error getting AI response:', err);
    res.status(500).json({ error: 'Failed to get AI response.' });
  }
});

/**
 * @route GET /api/messages/:mentorId
 * @description Get messages between user and mentor
 * @access Private
 */
app.get("/api/messages/:mentorId", verifyToken, async (req, res) => {
  const { mentorId } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(mentorId)) {
      return res.status(400).json({ error: 'Invalid mentor ID' });
    }
    // Find conversation and populate messages
    const conversation = await Conversation.findOne({
      userId: req.user.userId,
      mentorId
    }).populate("messages");

    if (!conversation) {
      return res.status(404).json({ 
        message: "No conversation found" 
      });
    }

    res.status(200).json(conversation.messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * @route POST /api/messages/:mentorId
 * @description Send a message to a mentor
 * @access Private
 */
app.post("/api/messages/:mentorId", verifyToken, async (req, res) => {
  const { mentorId } = req.params;
  const { text } = req.body;

  // Validate input
  if (!text) {
    return res.status(400).json({ 
      error: "Message text is required" 
    });
  }

  try {
    const senderId = req.user.userId;

    // Find or create conversation
    let conversation = await Conversation.findOne({
      userId: senderId,
      mentorId: mentorId
    });

    // Create new message
    const newMessage = {
      text,
      sender: req.user.role === 'Mentor' ? 'mentor' : 'user',
      timestamp: new Date()
    };

    if (conversation) {
      // Add to existing conversation
      conversation.messages.push(newMessage);
    } else {
      // Create new conversation
      conversation = new Conversation({
        userId: senderId,
        mentorId: mentorId,
        messages: [newMessage]
      });
    }

    // Save conversation
    await conversation.save();
    res.status(201).json(conversation);
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ error: "Server error" });
  }
});




// Follow/unfollow mentor
app.post('/api/mentors/:id/follow', verifyToken, async (req, res) => {
  try {
    const mentor = await mentorModel.findById(req.params.id);
    const student = await User.findById(req.user.id);
    
    if (!mentor || !student) {
      return res.status(404).json({ error: 'Not found' });
    }

    const isFollowing = student.followedMentors.includes(mentor._id);

    if (isFollowing) {
      await User.findByIdAndUpdate(req.user.id, { $pull: { followedMentors: mentor._id } });
      await mentorModel.findByIdAndUpdate(mentor._id, { $pull: { followers: req.user.id } });
    } else {
      await User.findByIdAndUpdate(req.user.id, { $addToSet: { followedMentors: mentor._id } });
      await mentorModel.findByIdAndUpdate(mentor._id, { $addToSet: { followers: req.user.id } });
    }

    res.json({ success: true, isFollowing: !isFollowing });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add mentor review
app.post('/api/mentors/:id/reviews', verifyToken, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Invalid rating' });
    }

    const student = await User.findById(req.user.id).select('name profileImage');
    const newReview = {
      userId: req.user.id,
      user: student.name,
      rating,
      comment,
      createdAt: new Date()
    };

    const mentor = await mentorModel.findByIdAndUpdate(
      req.params.id,
      { $push: { reviews: newReview } },
      { new: true, lean: { virtuals: true } }
    );

    res.json({ success: true, mentor });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ========================
// STUDENT PROFILE ROUTES
// ========================

// Get student profile
app.get('/api/students/:id', verifyToken, async (req, res) => {
  try {
    const student = await User.findById(req.params.id)
      .select('-password -chatHistory -__v')
      .populate('followedMentors', 'name profileImage expertise rating')
      .lean();

    if (!student) return res.status(404).json({ error: 'Student not found' });
    student.followedMentorsCount = student.followedMentors.length;
    res.json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get followed mentors
app.get('/api/students/:id/followed-mentors', verifyToken, async (req, res) => {
  try {
    if (req.user.id !== req.params.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const student = await User.findById(req.params.id)
      .select('followedMentors')
      .populate('followedMentors', 'name profileImage expertise rating about')
      .lean();

    res.json(student.followedMentors || []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update learning goals
app.patch('/api/students/:id/learning-goals', verifyToken, async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const student = await User.findByIdAndUpdate(
      req.params.id,
      { $set: { learningGoals: req.body.learningGoals } },
      { new: true, select: 'learningGoals' }
    );

    res.json({ success: true, learningGoals: student.learningGoals });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// =================
// SESSION ROUTES
// =================

// Book a session
app.post('/api/sessions', verifyToken, async (req, res) => {
  try {
    const { mentorId, date, time } = req.body;
    if (!mentorId || !date || !time) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const mentor = await mentorModel.findById(mentorId);
    const student = await User.findById(req.user.id);
    if (!mentor || !student) {
      return res.status(404).json({ error: 'Not found' });
    }

    const slotIndex = mentor.slots.findIndex(slot => 
      slot.date === date && 
      slot.time === time && 
      slot.status === 'available'
    );

    if (slotIndex === -1) {
      return res.status(400).json({ error: 'Slot not available' });
    }

    mentor.slots[slotIndex].status = 'booked';
    mentor.slots[slotIndex].bookedBy = req.user.id;
    await mentor.save();

    await User.findByIdAndUpdate(req.user.id, {
      $push: { bookedSessions: { mentor: mentorId, date, time } }
    });

    res.json({
      success: true,
      message: 'Session booked successfully',
      session: { mentor: mentorId, student: req.user.id, date, time }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ============================================================================================================
// USER OR MENTOR
// ============================================================================================================


// Get Current User Info - Works for both Students and Mentors
app.get('/api/users/me', verifyToken, async (req, res) => {
  try {
    console.log("🔐 User ID from token:", req.user.userId);

    // Try to find the user in student collection
    let user = await userModel.findById(req.user.userId)
      .select('-password')
      .populate({
        path: 'followedMentors',
        select: '_id name profileImage'
      })
      .lean();

    console.log("📘 Student Lookup Result:", user);

    // If not found in students, check mentors
    if (!user) {
      const mentor = await mentorModel.findById(req.user.userId)
        .select('-password')
        .lean();

      console.log("📗 Mentor Lookup Result:", mentor);

      if (!mentor) {
        console.log("❌ No user found in student or mentor collections.");
        return res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }

      // Return mentor data
      return res.status(200).json({
        success: true,
        user: {
          ...mentor,
          isMentor: true,
          isStudent: false
        },
        userType: 'Mentor'
      });
    }

    // Return student data
    res.status(200).json({
      success: true,
      user: {
        ...user,
        isMentor: user.role === 'Mentor',
        isStudent: user.role === 'Student'
      },
      userType: user.role
    });

  } catch (err) {
    console.error('🚨 Error fetching user data:', err);
    res.status(500).json({
      success: false,
      error: 'Server error',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});
// Get Followers of a Mentor
app.get('/api/mentors/followers', verifyToken, async (req, res) => {
  try {
    const mentorId = req.user.userId;

    if (!mongoose.Types.ObjectId.isValid(mentorId)) {
      return res.status(400).json({ error: 'Invalid mentor ID' });
    }

    const mentor = await mentorModel.findById(mentorId)
      .populate({
        path: 'followers',
        select: 'name profileImage',
      })
      .lean();

    if (!mentor) {
      return res.status(404).json({ error: 'Mentor not found' });
    }

    res.status(200).json({
      success: true,
      followers: mentor.followers || []
    });
  } catch (err) {
    console.error('🚨 Error fetching followers:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


app.get('/api/mentors/:id', async (req, res) => {
  try {
    const mentor = await mentorModel.findById(req.params.id)
      .select('-followers')
      .lean({ virtuals: true });
      
    if (!mentor) return res.status(404).json({ error: 'Mentor not found' });
    mentor.reviews = mentor.reviews || [];
    res.json(mentor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ==================================================================================================
    //sending and faccing messages

  app.post('/api/messages/:send', verifyToken, async (req, res) => {
  try {
    const { text, receiverId } = req.body; // Changed from recipientId to match frontend
    const senderId = req.userId;
    const senderType = req.user.role; // Make sure your JWT includes role/type
    console.log("Sender ID:", senderId);
    console.log("Receiver ID:", receiverId);
    console.log("Text Message:" , text);
    console.log("Sender Type:", senderType);
    console.log("Receiver Type:", receiverId);
    const receiverType = senderType === 'Mentor' ? 'studentdata' : 'Mentor';

    // Validation
    if (!text || !receiverId) {
      return res.status(400).json({ success: false, message: 'Text and receiver ID are required' });
    }

    // Validate recipient exists
    const recipientModel = receiverType === 'Mentor' ? Mentor : User;
    const recipient = await recipientModel.findById(receiverId);
    if (!recipient) {
      return res.status(404).json({ success: false, message: 'Recipient not found' });
    }

    // Find or create conversation
    let conversation = await Conversation.findOne({
      $or: [
        { userId: senderId, mentorId: receiverId },
        { userId: receiverId, mentorId: senderId }
      ]
    });

    if (!conversation) {
      conversation = new Conversation({
        userId: senderType === 'studentdata' ? senderId : receiverId,
        mentorId: senderType === 'Mentor' ? senderId : receiverId,
        messages: [],
        lastMessageAt: new Date()
      });
      await conversation.save();
    }

    // Create and save message
    const message = new Message({
      conversationId: conversation._id,
      senderId,
      receiverId,
      senderType,
      receiverType,
      text,
      status: "sent"
    });
    await message.save();

    // Update conversation
    conversation.messages.push(message._id);
    conversation.lastMessageAt = new Date();
    await conversation.save();

    // Emit socket event
    const io = req.app.get('socketio');
    io.to(receiverId).emit('receiveMessage', message);

    return res.status(200).json({ 
      success: true,
      message: 'Message sent successfully',
      data: message
    });

  } catch (error) {
    console.error("Error saving message:", error);
    return res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});
    

app.post('/api/messages', verifyToken, async (req, res) => {
  try {
    const senderId = req.user.id;  // Sender ID from JWT (ensure it's a valid ObjectId)
    const { receiverId, text } = req.body; // Receiver ID and message text from the request body
    console.log("Sender ID:", senderId);
    console.log("Receiver ID:", receiverId);
    console.log("Text Message:" , text);
    // Check if the senderId and receiverId are valid ObjectIds
    if (!mongoose.Types.ObjectId.isValid(senderId) || !mongoose.Types.ObjectId.isValid(receiverId)) {
      return res.status(400).json({ message: 'Invalid sender or receiver ID' });
    }

    // Try to find an existing conversation
    let conversation = await Conversation.findOne({
      $or: [
        { userId: senderId, mentorId: receiverId },
        { userId: receiverId, mentorId: senderId }
      ]
    });

    // If no conversation exists, create a new one
    if (!conversation) {
      conversation = new Conversation({
        userId: senderId,
        mentorId: receiverId
      });
      await conversation.save();
    }

    // Create a new message
    const message = new Message({
      conversationId: conversation._id,  // Reference to the conversation
      senderId: senderId,  // The sender's ObjectId
      receiverId: receiverId,  // The receiver's ObjectId
      senderType: 'studentdata',  // Or 'Mentor' based on your logic
      receiverType: 'Mentor',  // Or 'studentdata' based on your logic
      text: text,  // Message content
      status: 'sent',  // Initial status
    });

    // Save the message
    await message.save();

    // Update the conversation's last message timestamp
    conversation.lastMessageAt = new Date();
    await conversation.save();

    return res.status(201).json({ message: 'Message sent successfully', message });
  } catch (error) {
    console.error("Error saving message:", error);
    return res.status(500).json({ message: 'Server error' });
  }
});


    





// ==================================================================================================
// ==============================================
// ✅ Root Route
// ==============================================
app.get("/", (req, res) => {
  res.send("🚀 Goal Tracker API is running");
});

// ==============================================
// ✅ Server Startup
// ==============================================
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// Add a catch-all route for 404s
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Export the Express app for Vercel
module.exports = app;
