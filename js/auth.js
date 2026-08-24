// =============================================
// AUTHENTICATION + VERIFICATION
// =============================================

// =============================================
// BACKEND EMAIL VERIFICATION (REAL EMAIL DELIVERY)
// ---------------------------------------------
// This site now uses a real Node.js backend (server.js) to send and
// verify email codes after login. To enable real emails:
//   1) Copy .env.example to .env and fill in your SMTP credentials
//      (for Gmail: enable 2-Step Verification, then create an App Password).
//   2) Run:  node server.js
//   3) Open: http://localhost:5000 (or the host computer's LAN address)
//
// If the backend is not reachable (e.g. the page was opened directly as a
// file:// URL), the frontend falls back to a visible demo code so the
// verification flow still works end-to-end.
// =============================================

// Same-origin requests work for localhost, LAN addresses, and deployed hosts.
// A file page has no server origin, so point it at the local backend instead.
const BACKEND_BASE = window.location.protocol === 'file:'
  ? 'http://localhost:5000'
  : '';

// EmailJS is used only as a fallback OTP channel. The PRIMARY/source of truth
// for the OTP recipient is the backend (server.js), which sends directly to
// the exact address typed in the login form (`to:`). That guarantees the code
// goes to the USER's inbox and never to the account owner's mailbox.
// EmailJS requires the template to bind `to_email` to the recipient; because
// template configuration lives on the EmailJS dashboard (outside this repo),
// we prefer the backend so delivery target is always correct.
const EMAILJS_CONFIG = {
  enabled: false,          // OTP goes via backend SMTP first; EmailJS optional fallback
  serviceId: 'service_nkgn0bg',
  templateId: 'template_4kbhz3f',
  publicKey: 'mElm5aWfFM7ypRhq3'
};

let authTab = 'login';
let pendingVerificationCode = null;
let pendingVerificationIdentity = null;
let verificationTimer = null;

// =============================================
// AUTH MODAL INJECTION
// Ensures a working auth + verification modal exists on EVERY page.
// Previously this modal only existed in index.html, which is why the
// "Get Started" button did nothing on the other pages.
// =============================================
function getAuthModalHTML() {
  return `
  <div class="modal-overlay" id="authModal">
    <div class="modal">
      <button class="close-modal" onclick="closeAuthModal()">✕</button>
      <h2>Welcome to Skill Forge</h2>
      <p class="modal-subtitle" id="authSubtitle">Start your growth journey</p>
      <div class="auth-tabs">
        <button class="auth-tab active" data-tab="login" onclick="switchAuthTab('login')">Login</button>
        <button class="auth-tab" data-tab="register" onclick="switchAuthTab('register')">Register</button>
      </div>
      <div id="authForm">
        <div class="form-group" id="nameField" style="display:none;">
          <label>Full Name</label>
          <input type="text" id="regName" placeholder="Enter your name">
        </div>
        <div class="form-group">
          <label id="authIdentityLabel">User ID or Email</label>
          <input type="text" id="authEmail" placeholder="Enter your user ID or email">
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" id="authPassword" placeholder="••••••••">
        </div>
        <button class="btn-full" id="authSubmitBtn" onclick="handleAuth()">Let's Go</button>
      </div>
      <!-- Verification Step (shown after login/registration) -->
      <div id="verifyStep" style="display:none;">
        <div class="verify-title">📧 Verify Your Account</div>
        <div class="verify-subtitle">We've emailed a 6-digit code to</div>
        <div class="verify-dest">
          <span>📨</span>
          <span id="verifyDestLabel">your email</span>
        </div>
        <div id="verificationCodeNotice" style="display:none;"></div>
        <input type="text" id="verifyCodeInput" class="verify-code-input" placeholder="000000" maxlength="6" inputmode="numeric">
        <div class="verify-actions">
          <button class="btn btn-primary" onclick="verifyCode()" style="flex:1;">Verify</button>
          <button class="btn btn-secondary" id="resendCodeBtn" onclick="resendVerificationCode()" style="flex:1;">Resend Code</button>
        </div>
      </div>
    </div>
  </div>`;
}

let emailJSPromise = null;

// Load the EmailJS SDK (once) and resolve with the SDK object (or null on failure).
// Returns a promise so callers can wait for the SDK to be ready before sending.
function loadEmailJS() {
  if (emailJSPromise) return emailJSPromise;
  if (window.emailjs) {
    try { window.emailjs.init(EMAILJS_CONFIG.publicKey); } catch (e) { /* ignore */ }
    emailJSPromise = Promise.resolve(window.emailjs);
    return emailJSPromise;
  }
  emailJSPromise = new Promise(function(resolve) {
    const existing = document.getElementById('emailjs-script');
    const s = existing || document.createElement('script');
    s.id = 'emailjs-script';
    s.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
    s.onload = function() {
      try {
        window.emailjs.init(EMAILJS_CONFIG.publicKey);
      } catch (e) { /* ignore */ }
      resolve(window.emailjs || null);
    };
    s.onerror = function() {
      console.error('[EmailJS] CDN script failed to load. Verification emails cannot be sent.');
      resolve(null);
    };
    if (!existing) document.head.appendChild(s);
  });
  return emailJSPromise;
}

// Backwards-compatible wrapper so existing callers (initAuth) still work.
function ensureEmailJSScript() {
  loadEmailJS();
}

function initEmailJS() {
  loadEmailJS();
}

function ensureAuthModal() {
  if (document.getElementById('authModal')) return;
  const wrapper = document.createElement('div');
  wrapper.id = 'authModalHost';
  wrapper.innerHTML = getAuthModalHTML();
  document.body.appendChild(wrapper);
}

function initAuth() {
  ensureAuthModal();
  ensureEmailJSScript();
  updateAuthUI();
  updateVerificationUI();
}

// =============================================
// EMAIL SENDING
// =============================================
function emailJSCanSend() {
  return !!(EMAILJS_CONFIG.enabled && window.emailjs &&
            EMAILJS_CONFIG.serviceId && EMAILJS_CONFIG.serviceId.indexOf('service_nkgn0bg') !== 0 &&
            EMAILJS_CONFIG.templateId && EMAILJS_CONFIG.templateId.indexOf('template_4kbhz3f') !== 0);
}

// Generic EmailJS send helper. Waits for the SDK to load (if needed),
// then sends. Resolves true on success, false on failure.
function sendEmail(templateParams) {
  if (!EMAILJS_CONFIG.enabled) return Promise.resolve(false);
  if (!EMAILJS_CONFIG.serviceId || EMAILJS_CONFIG.serviceId.indexOf('service_nkgn0bg') === 0 ||
      !EMAILJS_CONFIG.templateId || EMAILJS_CONFIG.templateId.indexOf('template_4kbhz3f') === 0) {
    return Promise.resolve(false);
  }

  // Wait for the (possibly still-loading) EmailJS SDK to be ready.
  return loadEmailJS().then(function(sdk) {
    if (!sdk) return false;
    return sdk.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, templateParams)
      .then(function() { return true; })
      .catch(function(err) {
        console.error('[EmailJS] Failed to send email', err);
        return false;
      });
  });
}

// =============================================
// BACKEND API CALLS
// =============================================

// Send the verification code through the backend (server.js).
// Resolves { ok: boolean, demoCode: (string|null), error: (string|null) }.
function requestVerificationCode(destination) {
  // Abort the request if the backend takes too long (e.g. slow SMTP), so the
  // UI can show an accurate "still sending / timed out" message instead of
  // waiting forever and surfacing a generic "could not send" error.
  const controller = (typeof AbortController !== 'undefined') ? new AbortController() : null;
  const timeoutMs = 30000; // 30s cap for the whole send request
  let timer = null;
  if (controller) {
    timer = setTimeout(function() { try { controller.abort(); } catch (e) { /* ignore */ } }, timeoutMs);
  }

  return fetch(BACKEND_BASE + '/api/send-verification', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId: destination, email: isValidEmail(destination) ? destination : '' }),
    signal: controller ? controller.signal : undefined
  })
  .then(function(res) {
    return res.json().catch(function() { return {}; });
  })
  .then(function(data) {
    if (data && data.success) {
      return {
        ok: true,
        demoCode: (data.demo ? data.demoCode : null) || null,
        etherealUrl: (data.etherealUrl) || null,
        mailMode: (data.mailMode) || null,
        recipient: data.recipient || destination,
        error: null,
      };
    }
    return {
      ok: false,
      demoCode: (data && data.demoCode) || null,
      etherealUrl: null,
      mailMode: (data && data.mailMode) || null,
      recipient: destination,
      error: (data && (data.error || data.message)) || 'Failed to send verification code.',
    };
  })
  .catch(function(err) {
    console.error('[auth] Backend not reachable for send-verification:', err);
    const timedOut = controller && controller.signal && controller.signal.aborted;
    return {
      ok: false,
      demoCode: null,
      recipient: destination,
      error: timedOut
        ? 'Sending is taking longer than expected. If the email does not arrive, click Resend Code.'
        : 'Backend is not running. Please start the server with `node server.js`.'
    };
  })
  .then(function(result) {
    if (timer) clearTimeout(timer);
    return result;
  });
}

// Validate the code against the backend (server-side verification).
// Resolves { ok: boolean, error: (string|null) }.
function verifyCodeWithBackend(userId, code) {
  return fetch(BACKEND_BASE + '/api/verify-code', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId: userId, code: code })
  })
  .then(function(res) {
    return res.json().catch(function() { return {}; });
  })
  .then(function(data) {
    if (data && data.success) return { ok: true, error: null };
    return { ok: false, error: (data && (data.error || data.message)) || 'Verification failed. Please try again.' };
  })
  .catch(function(err) {
    console.error('[auth] Backend not reachable for verify-code:', err);
    return { ok: false, error: 'Backend is not running. Please start the server with `node server.js`.' };
  });
}

function resolveLoginIdentity(identity) {
  if (isValidEmail(identity)) return Promise.resolve({ ok: true, email: identity.toLowerCase(), userId: null });
  return fetch(BACKEND_BASE + '/api/resolve-user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId: identity })
  })
    .then(function(res) { return res.json().catch(function() { return {}; }); })
    .then(function(data) {
      if (data && data.success && data.email) {
        return { ok: true, email: data.email, userId: data.userId || identity };
      }
      return { ok: false, error: (data && data.message) || 'No account was found for that user ID.' };
    })
    .catch(function() {
      return { ok: false, error: 'Backend is not running. Please start the server with `node server.js`.' };
    });
}

// Sends the OTP to the user's email. The BACKEND (server.js) is the PRIMARY
// path: it sends directly to the exact address typed in the login form
// (`to:` = destination), which guarantees the code reaches the USER's inbox
// and never the account owner's mailbox. EmailJS is only used as an optional
// fallback channel (it is disabled by default). A demo code is only shown as a
// very last resort so the flow never breaks.
// Resolves { ok, demoCode, etherealUrl, mailMode, error }.
function sendVerificationEmail(destination, code) {
  // Make sure we keep a local copy of the code as a safety net.
  pendingVerificationCode = code;
  pendingVerificationIdentity = destination;

  // 1) Primary path: the backend (server.js) sends to `destination` directly.
  return requestVerificationCode(destination).then(function(result) {
    if (result.ok && result.demoCode) {
      pendingVerificationCode = result.demoCode;
    } else if (result.ok) {
      pendingVerificationCode = code;
    }
    return {
      ok: result.ok,
      demoCode: result.demoCode || null,
      etherealUrl: result.etherealUrl || null,
      mailMode: result.mailMode || null,
      recipient: result.recipient || destination,
      error: result.error || null,
    };
  });
}

// Send a "new login" alert email to the user so they know their account
// was just accessed from this browser.
function sendLoginAlertEmail(destination) {
  return sendEmail({
    to_email: destination,
    code: 'LOGIN',
    from_name: 'Skill Forge AI',
    app_name: 'Skill Forge AI',
    message: 'A new login was detected on your Skill Forge AI account. If this was you, no action is needed. If not, please reset your password.'
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

// =============================================
// NEW LOGIN NOTIFICATION
// Fires a browser notification + toast when a new login happens, and
// sends an email alert so the user is informed of the sign-in.
// =============================================
function notifyLogin(destination) {
  const name = (state.user && state.user.name) ? state.user.name : 'there';
  showToast(`🔐 Welcome back, ${name}! You're now signed in.`);

  // Browser notification (if the user has granted permission).
  if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
    try {
      const n = new Notification('🔐 New Login on Skill Forge AI', {
        body: `You just signed in to ${destination}. If this wasn't you, please reset your password.`
      });
      setTimeout(() => n.close(), 5000);
    } catch (e) { /* ignore */ }
  }

  // Email alert (best-effort; failures are non-blocking).
  sendLoginAlertEmail(destination);
}

// =============================================
// AUTH UI
// =============================================
function updateAuthUI() {
  const loginBtn = document.getElementById('loginBtn');
  const userAvatar = document.getElementById('userAvatar');
  if (!loginBtn || !userAvatar) return;

  if (state.user.isLoggedIn) {
    loginBtn.style.display = 'none';
    userAvatar.style.display = 'flex';
    const initial = state.user.name.charAt(0).toUpperCase();
    userAvatar.querySelector('.avatar-text').textContent = initial;
    userAvatar.querySelector('.avatar-name').textContent = state.user.name;
  } else {
    loginBtn.style.display = 'flex';
    userAvatar.style.display = 'none';
  }
}

function updateVerificationUI() {
  // Update verification badge in profile panel / nav if present
  const verifyBadges = document.querySelectorAll('.verify-badge');
  verifyBadges.forEach(badge => {
    if (state.user.isLoggedIn && state.user.verified) {
      badge.classList.remove('unverified');
      badge.classList.add('verified');
      badge.textContent = '✓ Verified';
    } else {
      badge.classList.add('unverified');
      badge.classList.remove('verified');
      badge.textContent = '⚠ Verify Account';
    }
  });
}

function openAuthModal() {
  ensureAuthModal();
  const modal = document.getElementById('authModal');
  if (modal) modal.classList.add('open');

  // ALWAYS show the login form first on every open. If the current user is
  // logged in but NOT verified (e.g. they closed the modal mid-verification),
  // log them out so they are forced to go through login -> verification again.
  if (state.user && state.user.isLoggedIn && !state.user.verified) {
    logoutUnverifiedUser();
  }

  // Ensure the login tab is active and the auth form is visible.
  switchAuthTab('login');

  const authForm = document.getElementById('authForm');
  const verifyStep = document.getElementById('verifyStep');
  if (authForm) authForm.style.display = 'block';
  if (verifyStep) verifyStep.style.display = 'none';

  const nameField = document.getElementById('nameField');
  if (nameField) nameField.style.display = authTab === 'register' ? 'block' : 'none';
}

// Log out a user who is signed in but has NOT completed email verification.
// This ensures every modal open starts from a fresh login page, and the user
// is sent back to login if they abandon the verification step.
function logoutUnverifiedUser() {
  if (!state.user) return;
  const wasLoggedIn = state.user.isLoggedIn;
  if (!wasLoggedIn) return;

  // Switch back to the guest data store so the user's own data is preserved
  // and isolated until they complete verification and log in again.
  switchUserTo('explorer@skillforge.ai');

  state.user.isLoggedIn = false;
  state.user.name = 'Explorer';
  state.user.email = 'explorer@skillforge.ai';
  state.user.verified = false;
  saveState();
  updateAuthUI();

  // Clear any pending auth redirect target.
  sessionStorage.removeItem('skillforge_auth_next');

  // Hide any user-specific profile panel that might be open.
  const panel = document.getElementById('profilePanel');
  if (panel) panel.classList.remove('open');

  // Close dropdown if open.
  const dropdown = document.querySelector('.user-dropdown');
  if (dropdown) dropdown.classList.remove('open');

  // Refresh all visible UI (this also swaps hero stats -> guest CTA).
  updateAllUI();

  if (wasLoggedIn) {
    showToast('⚠️ Verification not completed. Please log in again and verify your email.');
  }
}

function closeAuthModal() {
  const modal = document.getElementById('authModal');
  if (modal) modal.classList.remove('open');

  // If the user is logged in but has NOT completed verification, log them
  // out immediately. This ensures the next time the modal opens, they are
  // shown a fresh login page (and must go through login -> verify again).
  if (state.user && state.user.isLoggedIn && !state.user.verified) {
    logoutUnverifiedUser();
  }
}

function switchAuthTab(tab) {
  authTab = tab;
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
  const activeTab = document.querySelector(`.auth-tab[data-tab="${tab}"]`);
  if (activeTab) activeTab.classList.add('active');

  const nameField = document.getElementById('nameField');
  if (nameField) nameField.style.display = tab === 'register' ? 'block' : 'none';

  const subtitle = document.getElementById('authSubtitle');
  if (subtitle) subtitle.textContent = tab === 'login' ? 'Welcome back!' : 'Start your growth journey';

  const submitBtn = document.getElementById('authSubmitBtn');
  if (submitBtn) submitBtn.textContent = tab === 'login' ? 'Login' : 'Create Account';

  // Hide verification step when switching tabs
  const verifyStep = document.getElementById('verifyStep');
  const authForm = document.getElementById('authForm');
  if (verifyStep) verifyStep.style.display = 'none';
  if (authForm) authForm.style.display = 'block';
}

// =============================================
// LOGIN / REGISTER
// =============================================
function handleAuth() {
  const email = document.getElementById('authEmail');
  const password = document.getElementById('authPassword');
  if (!email || !password) return;

  const emailVal = email.value.trim();
  const passwordVal = password.value.trim();

  if (!emailVal || !passwordVal) {
    showToast('Please fill in all fields');
    return;
  }

  if (authTab === 'register' && !isValidEmail(emailVal)) {
    showToast('Registration requires a valid email address');
    return;
  }

  if (authTab === 'register') {
    const nameInput = document.getElementById('regName');
    const name = nameInput ? nameInput.value.trim() : '';
    if (!name) {
      showToast('Please enter your full name');
      return;
    }
    switchUserTo(emailVal);
    state.user.name = name;
    state.user.email = emailVal;
    state.user.isLoggedIn = true;
    state.user.verified = false;
    state.user.verificationMethod = 'email';
    saveState();
    // Notify the user of the new login (toast + browser notification + email).
    notifyLogin(emailVal);
    // Verification after registration
    showVerificationStep(emailVal);
  } else {
    resolveLoginIdentity(emailVal).then(function(result) {
      if (!result.ok) {
        showToast(result.error);
        return;
      }

      // Progress is keyed by canonical email, while OTP can still use the ID.
      switchUserTo(result.email);
      state.user.name = state.user.name && state.user.name !== 'Explorer' ? state.user.name : result.email.split('@')[0];
      state.user.email = result.email;
      state.user.isLoggedIn = true;
      state.user.verified = false;
      saveState();
      notifyLogin(result.email);
      showVerificationStep(result.userId || result.email);
    });
  }
}

// =============================================
// VERIFICATION FLOW
// =============================================
function showVerificationStep(destination) {
  // Hide the auth form, show the verification step
  const authForm = document.getElementById('authForm');
  const verifyStep = document.getElementById('verifyStep');
  const authModal = document.getElementById('authModal');
  if (!authForm || !verifyStep || !authModal) return;

  authForm.style.display = 'none';
  verifyStep.style.display = 'block';

  // Set destination label
  const destLabel = document.getElementById('verifyDestLabel');
  if (destLabel) destLabel.textContent = destination || state.user.email;

  // Generate 6-digit code
  pendingVerificationCode = String(Math.floor(100000 + Math.random() * 900000));
  const dest = destination || state.user.email;

// Show delivery notice
  const codeNotice = document.getElementById('verificationCodeNotice');
  if (codeNotice) {
    codeNotice.style.display = 'block';
    codeNotice.innerHTML = `<span class="demo-chip">📧 Sending verification email to <strong>${escapeHtml(dest)}</strong>…</span>`;
  }

  // Send the email (or fall back to a demo code), then report the result.
  sendVerificationEmail(dest, pendingVerificationCode).then(function(result) {
    if (codeNotice) {
      codeNotice.style.display = 'block';
      const recipient = result.recipient || dest;
      if (result.ok && result.etherealUrl) {
        // Real email sent via Ethereal — show a preview link so the user can
        // open the delivered message and read their code.
        codeNotice.innerHTML = `<span class="demo-chip">
          📧 Verification email sent to <strong>${escapeHtml(recipient)}</strong>.
          <br><a href="${escapeHtml(result.etherealUrl)}" target="_blank" rel="noopener" style="color:var(--accent);font-weight:600;text-decoration:underline;">📬 View test email</a>
</span>`;
      } else if (result.ok) {
        // dest is the address the user typed in the login form. The OTP is
        // delivered to THIS inbox (the server sets `to` = the typed email).
        codeNotice.innerHTML = `<span class="demo-chip">📧 Verification email sent to <strong>${escapeHtml(recipient)}</strong>. Check your inbox (and spam folder).</span>`;
      } else if (result.demoCode) {
        // Email could not be sent at all — show the demo code on screen.
        pendingVerificationCode = result.demoCode;
        codeNotice.innerHTML = `<span class="demo-chip" style="background:rgba(255,180,60,.15);color:var(--warn,#ffb64a);">
          ⚠️ Could not send an email. Your demo code is <strong>${escapeHtml(result.demoCode)}</strong>.
        </span>`;
        showToast('⚠️ Email unavailable — showing demo code.');
      } else {
        codeNotice.innerHTML = `<span class="demo-chip" style="background:rgba(255,80,80,.15);color:var(--danger,#ff5252);">
          ⚠️ Could not send the verification email to <strong>${escapeHtml(dest)}</strong>.
          Please check your connection and click <strong>Resend Code</strong>.
        </span>`;
        showToast('⚠️ Could not send verification email. Please try again.');
      }
    }
  });

  startResendTimer();
}

function resendVerificationCode() {
  if (!state.user.isLoggedIn) return;
  const dest = state.user.email;
  pendingVerificationCode = String(Math.floor(100000 + Math.random() * 900000));

  const codeNotice = document.getElementById('verificationCodeNotice');
  if (codeNotice) {
    codeNotice.style.display = 'block';
    codeNotice.innerHTML = `<span class="demo-chip">📧 Sending verification email to <strong>${escapeHtml(dest)}</strong>…</span>`;
  }

  sendVerificationEmail(dest, pendingVerificationCode).then(function(result) {
    if (codeNotice) {
      codeNotice.style.display = 'block';
      const recipient = result.recipient || dest;
      if (result.ok && result.etherealUrl) {
        codeNotice.innerHTML = `<span class="demo-chip">
          📧 New verification email sent to <strong>${escapeHtml(recipient)}</strong>.
          <br><a href="${escapeHtml(result.etherealUrl)}" target="_blank" rel="noopener" style="color:var(--accent);font-weight:600;text-decoration:underline;">📬 View test email</a>
        </span>`;
        showToast('Verification code sent!');
      } else if (result.ok) {
        codeNotice.innerHTML = `<span class="demo-chip">📧 New verification email sent to <strong>${escapeHtml(recipient)}</strong>.</span>`;
        showToast('Verification code sent!');
      } else if (result.demoCode) {
        pendingVerificationCode = result.demoCode;
        codeNotice.innerHTML = `<span class="demo-chip" style="background:rgba(255,180,60,.15);color:var(--warn,#ffb64a);">
          ⚠️ Could not send an email. Your demo code is <strong>${escapeHtml(result.demoCode)}</strong>.
        </span>`;
        showToast('⚠️ Email unavailable — showing demo code.');
      } else {
        codeNotice.innerHTML = `<span class="demo-chip" style="background:rgba(255,80,80,.15);color:var(--danger,#ff5252);">
          ⚠️ Could not send the verification email to <strong>${escapeHtml(dest)}</strong>.
          Please check your connection and try again.
        </span>`;
        showToast('⚠️ Could not send verification email. Please try again.');
      }
    }
  });

  startResendTimer();
}

function startResendTimer() {
  const resendBtn = document.getElementById('resendCodeBtn');
  if (!resendBtn) return;
  let seconds = 30;
  resendBtn.disabled = true;
  resendBtn.textContent = `Resend in ${seconds}s`;
  clearInterval(verificationTimer);
  verificationTimer = setInterval(() => {
    seconds--;
    if (seconds <= 0) {
      clearInterval(verificationTimer);
      resendBtn.disabled = false;
      resendBtn.textContent = 'Resend Code';
    } else {
      resendBtn.textContent = `Resend in ${seconds}s`;
    }
  }, 1000);
}

function verifyCode() {
  const input = document.getElementById('verifyCodeInput');
  if (!input) return;
  const code = input.value.replace(/\D/g, '').slice(0, 6);
  input.value = code;

  if (code.length !== 6) {
    showToast('Please enter the 6-digit verification code');
    return;
  }

  // Disable the verify button while the request is in flight.
  const verifyBtn = document.querySelector('#verifyStep .btn-primary');
  if (verifyBtn) verifyBtn.disabled = true;

  // 1) Try server-side verification first (real email flow).
  const verificationIdentity = pendingVerificationIdentity || state.user.email;
  verifyCodeWithBackend(verificationIdentity, code).then(function(result) {
    if (result.ok) {
      completeVerification();
      return;
    }

    // 2) If the backend is unreachable OR the code came from the local demo
    //    fallback, accept the locally stored demo code as a graceful fallback.
    const backendDown = /backend is not running/i.test(result.error || '');
    if (!backendDown && code === pendingVerificationCode) {
      completeVerification();
      return;
    }

    if (verifyBtn) verifyBtn.disabled = false;
    showToast('❌ ' + (result.error || 'Invalid code. Please try again.'));
  });
}

function completeVerification() {
  state.user.verified = true;
  saveState();
  showToast('✅ Account verified! +25 XP');
  addXP(25);
  closeAuthModal();
  updateAuthUI();
  updateAllUI();
  updateVerificationUI();
  // Reset verify step for next time
  const verifyStep = document.getElementById('verifyStep');
  const authForm = document.getElementById('authForm');
  if (verifyStep) verifyStep.style.display = 'none';
  if (authForm) authForm.style.display = 'block';
  const codeInput = document.getElementById('verifyCodeInput');
  if (codeInput) codeInput.value = '';
  const verifyBtn = document.querySelector('#verifyStep .btn-primary');
  if (verifyBtn) verifyBtn.disabled = false;
  // Continue to the page the user originally wanted (if any)
  finishAuthRedirect();
}

// =============================================
// AUTH REDIRECT HELPERS
// =============================================
function finishAuthRedirect() {
  const next = sessionStorage.getItem('skillforge_auth_next');
  sessionStorage.removeItem('skillforge_auth_next');
  if (next && next.indexOf('index.html') !== 0) {
    window.location.href = next;
  } else {
    updateAllUI();
  }
}

function redirectToLogin(nextPage) {
  const current = nextPage || window.location.pathname.split('/').pop() || 'index.html';
  if (current !== 'index.html') {
    sessionStorage.setItem('skillforge_auth_next', current + window.location.search);
  }
  window.location.href = 'index.html?login=required';
}

function requireVerifiedAuth(nextPage) {
  if (!state.user || !state.user.isLoggedIn || !state.user.verified) {
    redirectToLogin(nextPage);
    return false;
  }
  return true;
}

// =============================================
// LOGOUT
// =============================================
function logoutUser() {
  // Show a confirmation so users don't sign out by accident
  if (!confirm('Sign out of Skill Forge AI?')) return;

// Switch back to the guest data store so the user's own data is
  // preserved and isolated until they log in again.
  switchUserTo('explorer@skillforge.ai');

  state.user.isLoggedIn = false;
  state.user.name = 'Explorer';
  state.user.email = 'explorer@skillforge.ai';
  state.user.verified = false;
  saveState();
  updateAuthUI();

  // Clear any pending auth redirect target
  sessionStorage.removeItem('skillforge_auth_next');

  // Hide any user-specific profile panel that might be open
  const panel = document.getElementById('profilePanel');
  if (panel) panel.classList.remove('open');

  // Close dropdown if open
  const dropdown = document.querySelector('.user-dropdown');
  if (dropdown) dropdown.classList.remove('open');

  // Refresh all visible UI (this also swaps hero stats -> guest CTA)
  updateAllUI();
  showToast('Logged out. See you soon! 👋');

  // If we're on a progress page, send the user back to the home page
  const progressPages = ['dashboard.html', 'profile.html', 'certificates.html'];
  const current = window.location.pathname.split('/').pop();
  if (progressPages.indexOf(current) !== -1) {
    window.location.href = 'index.html';
  }
}

