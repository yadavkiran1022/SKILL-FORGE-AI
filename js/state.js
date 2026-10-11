// =============================================
// STATE MANAGEMENT
// ---------------------------------------------
// Per-user data isolation. Each user's progress is stored under its own
// localStorage key (skillforge_state_<email>), so one user's data is never
// mixed with another user's data on the same browser. Guests share a
// dedicated "guest" store. A marker (skillforge_logged_in_email) remembers
// which user's data is loaded so it survives page reloads.
// =============================================
const STATE_KEY = 'skillforge_state_';
const GUEST_EMAIL = 'explorer@skillforge.ai';
const LOGGED_IN_EMAIL_KEY = 'skillforge_logged_in_email';

function getDefaultState() {
  return {
    user: { name: 'Explorer', email: 'explorer@skillforge.ai', isLoggedIn: false, verified: false, verificationMethod: 'email' },
    xp: 0,
    level: 1,
    streak: 0,
    lastActiveDate: null,
    badges: {},
    habits: [
      { id: 'h1', name: 'Read for 20 minutes', completed: false, streak: 0 },
      { id: 'h2', name: 'Practice a skill', completed: false, streak: 0 },
      { id: 'h3', name: 'Exercise / stretch', completed: false, streak: 0 },
      { id: 'h4', name: 'Learn something new', completed: false, streak: 0 },
    ],
    chatCount: 0,
    assessmentCount: 0,
    assessmentCompleted: false,
    assessmentScore: 0,
    speakingPracticed: 0,
    creativityCompleted: 0,
    theme: 'dark',
    notificationsEnabled: false,
    courses: {},
    courseProgress: {},
    certificates: {},
    completedCourseIds: []
  };
}

// Build a safe per-user storage key from an email address.
function getStorageKeyForEmail(email) {
  const safe = (email || GUEST_EMAIL).toLowerCase().replace(/[^a-z0-9@._-]/g, '_');
  return STATE_KEY + safe;
}

let activeStorageEmail = getInitialUserEmail();

// The storage key for the currently active user.
function getCurrentStorageKey() {
  return getStorageKeyForEmail(activeStorageEmail);
}

// Which user's data should be loaded on startup (from the login marker).
function getInitialUserEmail() {
  const logged = localStorage.getItem(LOGGED_IN_EMAIL_KEY);
  if (logged) return logged;
  return GUEST_EMAIL;
}

function loadStateForEmail(email) {
  const targetEmail = (email || GUEST_EMAIL).trim().toLowerCase();
  const saved = localStorage.getItem(getStorageKeyForEmail(targetEmail));
  if (!saved) return null;

  try {
    const parsed = JSON.parse(saved);
    const savedEmail = parsed && parsed.user && parsed.user.email
      ? parsed.user.email.trim().toLowerCase()
      : '';

    // Never let a state written for another identity become this user's data.
    if (savedEmail !== targetEmail) return null;

    const defaults = getDefaultState();
    for (const key in defaults) {
      if (!(key in parsed)) parsed[key] = defaults[key];
    }
    return parsed;
  } catch (e) { /* ignore invalid saved state */ }
  return null;
}

let state = loadState();

function loadState() {
  const email = getInitialUserEmail();
  return loadStateForEmail(email) || getDefaultState();
}

function saveState() {
  if (!state) return;
  const key = getCurrentStorageKey();
  localStorage.setItem(key, JSON.stringify(state));
}

// Switch the active data store to a specific user (by email).
// Saves the current user's data, then loads (or creates) the target user's data.
function switchUserTo(email) {
  const targetEmail = (email && email.trim()) ? email.trim().toLowerCase() : GUEST_EMAIL;

  // Save the current user's data first (no-op if state is not initialized yet).
  if (state) saveState();

  // Keep the active storage identity separate from mutable profile fields.
  activeStorageEmail = targetEmail;

  // Remember which user is logged in (so reloads load the right data).
  if (targetEmail === GUEST_EMAIL) {
    localStorage.removeItem(LOGGED_IN_EMAIL_KEY);
  } else {
    localStorage.setItem(LOGGED_IN_EMAIL_KEY, targetEmail);
  }

  // Load the target user's state (or a fresh default if they have none).
  state = loadStateForEmail(targetEmail) || getDefaultState();

  // Ensure the guest identity is applied when switching to the guest store.
  state.user.email = targetEmail;
  if (targetEmail === GUEST_EMAIL) {
    state.user.isLoggedIn = false;
    state.user.verified = false;
    state.user.name = 'Explorer';
  }
  return state;
}

function resetAllData() {
  if (confirm('Reset all progress? This cannot be undone.')) {
    localStorage.removeItem(getCurrentStorageKey());
    state = getDefaultState();
    saveState();
    updateAllUI();
    showToast('Data reset complete');
  }
}

// =============================================
// XP SYSTEM
// =============================================
function addXP(amount) {
  state.xp += amount;
  const xpForNextLevel = state.level * 100;
  while (state.xp >= xpForNextLevel) {
    state.xp -= xpForNextLevel;
    state.level++;
    showToast(`🎉 Level Up! You're now level ${state.level}!`);
    checkBadges();
  }
  saveState();
  updateAllUI();
  showXPToast(amount);
}

function showXPToast(amount) {
  const toast = document.getElementById('xpToast');
  if (!toast) return;
  toast.textContent = `+${amount} XP`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

function showToast(msg) {
  const toast = document.getElementById('xpToast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// =============================================
// BADGES
// =============================================
function checkBadges() {
  const badges = state.badges;
  if (state.chatCount >= 1 && !badges['first-chat']) {
    badges['first-chat'] = true;
    showToast('💬 Badge Unlocked: First Chat!');
  }
  if (state.assessmentCount >= 1 && !badges['assessment-pro']) {
    badges['assessment-pro'] = true;
    showToast('📊 Badge Unlocked: Assessment Pro!');
  }
  if (state.streak >= 3 && !badges['habit-streak-3']) {
    badges['habit-streak-3'] = true;
    showToast('🔥 Badge Unlocked: 3-Day Streak!');
  }
  if (state.streak >= 7 && !badges['habit-streak-7']) {
    badges['habit-streak-7'] = true;
    showToast('🔥 Badge Unlocked: 7-Day Streak!');
  }
  if (state.level >= 5 && !badges['level-5']) {
    badges['level-5'] = true;
    showToast('🏆 Badge Unlocked: Level 5!');
  }
  if (state.level >= 10 && !badges['level-10']) {
    badges['level-10'] = true;
    showToast('🏆 Badge Unlocked: Level 10!');
  }
  if (state.creativityCompleted >= 1 && !badges['creativity']) {
    badges['creativity'] = true;
    showToast('🎨 Badge Unlocked: Creative Mind!');
  }
  if (state.speakingPracticed >= 1 && !badges['speaker']) {
    badges['speaker'] = true;
    showToast('🎤 Badge Unlocked: Speaker!');
  }
  if (state.completedCourseIds && state.completedCourseIds.length >= 1 && !badges['first-course']) {
    badges['first-course'] = true;
    showToast('📚 Badge Unlocked: First Course!');
  }
  if (state.completedCourseIds && state.completedCourseIds.length >= 5 && !badges['course-5']) {
    badges['course-5'] = true;
    showToast('🎓 Badge Unlocked: 5 Courses Completed!');
  }
  if (state.completedCourseIds && state.completedCourseIds.length >= 10 && !badges['course-10']) {
    badges['course-10'] = true;
    showToast('🏅 Badge Unlocked: 10 Courses Completed!');
  }
  if (state.user && state.user.verified && !badges['verified']) {
    badges['verified'] = true;
    showToast('🛡️ Badge Unlocked: Verified Member!');
  }
  saveState();
}

// =============================================
// STREAK MANAGEMENT
// =============================================
function updateStreak() {
  const today = new Date().toDateString();
  if (state.lastActiveDate === today) return;

  const yesterday = new Date(Date.now() - 86400000).toDateString();
  if (state.lastActiveDate === yesterday) {
    state.streak++;
  } else if (state.lastActiveDate !== today) {
    state.streak = 1;
  }
  state.lastActiveDate = today;
  saveState();
  updateAllUI();
}

// =============================================
// THEME TOGGLE
// =============================================
function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  state.theme = next;
  saveState();
  const toggle = document.getElementById('themeToggle');
  if (toggle) toggle.textContent = next === 'dark' ? '🌙' : '☀️';
}

function getBadgeCount() {
  return Object.values(state.badges).filter(Boolean).length;
}

