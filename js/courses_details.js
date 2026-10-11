// =============================================
// COURSE DETAILS LOADER
// =============================================
// Loaded AFTER js/courses.js and the COURSE_DETAILS part files
// (courses_details_p1.js ... courses_details_p6.js).
// Merges the enriched, comprehensive lesson content into the COURSES dataset
// so every lesson shows complete information about its topic.
(function enrichCourses() {
  if (typeof COURSES === 'undefined') {
    console.warn('COURSES not found. Load js/courses.js first.');
    return;
  }
  if (typeof COURSE_DETAILS === 'undefined') {
    console.warn('COURSE_DETAILS not found. Load the course detail part files first.');
    return;
  }
  COURSES.forEach(function (course) {
    const details = COURSE_DETAILS[course.id];
    if (!details) return;
    course.lessons.forEach(function (lesson, i) {
      const d = details[i];
      if (!d) return;
      lesson.shortTheory = lesson.theory; // keep the original short summary
      lesson.detail = d;                  // attach the enriched content
    });
  });
})();

