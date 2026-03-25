// Fixed script.js - No naming conflicts, global functions work
// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton?.addEventListener('click', () => {
    mobileMenu?.classList.toggle('hidden');
});

// Smooth Scrolling
document.querySelectorAll('a[href^=\"#\"]')?.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target?.scrollIntoView({ behavior: 'smooth' });
        mobileMenu?.classList.add('hidden');
    });
});



function setupAuthListener() {
    supabase.auth.onAuthStateChange((event, session) => {
        updateUI();
    });
}


window.loginUser = async function () {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert(error.message);
    return;
  }

  alert("Login successful");
  window.location.href = "internship-domains.html";
};
// GLOBAL FUNCTIONS - Now bulletproof

window.signupUser = async function () {
  const name = document.getElementById("signup-name").value;
  const email = document.getElementById("signup-email").value;
  const phone = document.getElementById("signup-phone").value;
  const password = document.getElementById("signup-password").value;

  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    alert(error.message);
    return;
  }

  await supabase.from("users").insert([
    { id: data.user.id, name, email, phone }
  ]);

  alert("Signup successful");
  window.location.href = "internship-domains.html";
};

window.updateCourse = async (course) => {
    if (!supabase) throw new Error('Supabase not ready');
    const { data: session } = await supabase.auth.getSession();
    if (!session) throw new Error('Login required');
    
    await supabase.from('users').update({ course }).eq('id', session.user.id);
    alert(`"${course}" applied!`);
    window.location.href = 'dashboard.html';
};

window.getCurrentUser = async () => {
    if (!supabase) return null;
    const { data: session } = await supabase.auth.getSession();
    if (!session?.user) return null;
    return await supabase.from('users').select('*').eq('id', session.user.id).single().then(({ data }) => data);
};

window.logout = async () => {
    if (supabase) await supabase.auth.signOut();
    window.location.href = 'index.html';
};

// UI
async function updateUI() {
    const user = await window.getCurrentUser();
    const loginLinks = document.querySelectorAll('a[href*="login"], a[href*="signup"], #login-nav, #signup-nav');
    const dashboardBtns = document.querySelectorAll('#dashboard-btn, #mobile-dashboard-btn');
    const logoutBtns = document.querySelectorAll('#logout-btn, [onclick*="logout"]');
    
    if (user) {
        loginLinks.forEach(l => l.style.display = 'none');
        dashboardBtns.forEach(b => b.style.display = 'inline-flex');
        logoutBtns.forEach(b => b.style.display = 'inline-flex');
    } else {
        loginLinks.forEach(l => l.style.display = 'inline-flex');
        dashboardBtns.forEach(b => b.style.display = 'none');
        logoutBtns.forEach(b => b.style.display = 'none');
    }
}

function setupDashboardBtns() {
    ['dashboard-btn', 'mobile-dashboard-btn'].forEach(id => {
        const btn = document.getElementById(id);
        btn && (btn.onclick = async e => {
            e.preventDefault();
            const user = await window.getCurrentUser();
            if (!user) return window.location.href = 'login.html';
            if (!user.paid) return alert('Payment required');
            window.location.href = 'dashboard.html';
        });
    });
}

// Apply buttons
document.addEventListener('click', async e => {
    if (e.target.matches('.apply-btn *') || e.target.matches('.apply-btn')) {
        e.preventDefault();
        const btn = e.target.closest('.apply-btn');
        const user = await window.getCurrentUser();
        if (!user) return window.location.href = 'login.html';
        const course = btn.closest('.domain-card')?.querySelector('h3').textContent.trim();
        await window.updateCourse(course);
    }
});

// Back to top & theme
function setupUI() {
    const backBtn = document.getElementById('back-to-top');
    backBtn && window.addEventListener('scroll', () => backBtn.style.opacity = window.scrollY > 300 ? '1' : '0');
    backBtn && (backBtn.onclick = () => window.scrollTo({top:0, behavior:'smooth'}));
    
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        const dark = localStorage.theme === 'dark';
        document.body.classList.toggle('dark', dark);
        themeBtn.innerHTML = dark ? '☀️' : '🌙';
        themeBtn.onclick = () => {
            document.body.classList.toggle('dark');
            localStorage.theme = document.body.classList.contains('dark') ? 'dark' : 'light';
        };
    }
    
    setTimeout(updateUI, 500);
}

