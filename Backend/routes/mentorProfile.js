const express = require('express');
const router = express.Router();
const Mentor = require('../models/mentor');
const User = require('../models/allUser');
const auth = require('../middleware/auth');

// @route   GET /api/mentors/:id
// @desc    Get mentor profile by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id)
      .select('-followers') // Exclude followers list for public view
      .lean({ virtuals: true }); // Include virtual properties

    if (!mentor) {
      return res.status(404).json({ error: 'Mentor not found' });
    }

    // Ensure reviews array exists
    mentor.reviews = mentor.reviews || [];
    
    res.json(mentor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/mentors/:id/follow
// @desc    Follow/unfollow a mentor
// @access  Private (student only)
router.post('/:id/follow', auth, async (req, res) => {
  try {
    const mentorId = req.params.id;
    const studentId = req.user.id;

    // Check if mentor exists
    const mentor = await Mentor.findById(mentorId);
    if (!mentor) {
      return res.status(404).json({ error: 'Mentor not found' });
    }

    // Check if student exists
    const student = await User.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const isFollowing = student.followedMentors.includes(mentorId);

    if (isFollowing) {
      // Unfollow
      await User.findByIdAndUpdate(studentId, {
        $pull: { followedMentors: mentorId }
      });
      await Mentor.findByIdAndUpdate(mentorId, {
        $pull: { followers: studentId }
      });
    } else {
      // Follow
      await User.findByIdAndUpdate(studentId, {
        $addToSet: { followedMentors: mentorId }
      });
      await Mentor.findByIdAndUpdate(mentorId, {
        $addToSet: { followers: studentId }
      });
    }

    res.json({ 
      success: true, 
      isFollowing: !isFollowing,
      followersCount: mentor.followers.length + (isFollowing ? -1 : 1)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/mentors/:id/reviews
// @desc    Add a review for mentor
// @access  Private (student only)
router.post('/:id/reviews', auth, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const mentorId = req.params.id;
    const studentId = req.user.id;

    // Validate rating
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Invalid rating' });
    }

    const student = await User.findById(studentId).select('name profileImage');
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const newReview = {
      userId: studentId,
      user: student.name,
      rating,
      comment,
      createdAt: new Date()
    };

    const mentor = await Mentor.findByIdAndUpdate(
      mentorId,
      { $push: { reviews: newReview } },
      { new: true, lean: { virtuals: true } }
    );

    res.json({
      success: true,
      mentor,
      newReview
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;