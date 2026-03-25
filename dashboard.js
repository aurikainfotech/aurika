// Dashboard specific logic
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const user = await getCurrentUser();
        if (!user) {
            alert('Please login');
            window.location.href = 'login.html';
            return;
        }
        
        // Update user info
        document.getElementById('welcome-msg').textContent = `Welcome, ${user.name}!`;
        document.getElementById('user-course').textContent = user.course || 'No course selected';
        
        const paidStatus = document.getElementById('paid-status');
        if (user.paid) {
            paidStatus.textContent = '✅ Payment Verified - Full Access';
            paidStatus.className = 'text-lg font-semibold text-green-600 mt-2';
            const { data: modules, error } = await supabase
  .from('modules')
  .select('*')
  .eq('course', user.course);

if (error) {
  console.error(error);
  alert("Error loading modules");
  return;
}

if (modules && modules.length > 0) {
  document.getElementById('empty-state').classList.add('hidden');
  document.getElementById('modules-section').classList.remove('hidden');

  const modulesList = document.getElementById('modules-list');

  modulesList.innerHTML = modules.map(m => `
    <div class="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl shadow-lg">
      <h4 class="font-bold text-xl text-gray-800 mb-2">${m.title}</h4>
      <p class="text-sm text-gray-600 mb-4">Week ${m.week}</p>
      <a href="${m.link || '#'}" target="_blank"
         class="bg-blue-600 text-white px-4 py-2 rounded-lg">
         Open Module
      </a>
    </div>
  `).join('');
}
            
        } else {
            document.getElementById('payment-alert').classList.remove('hidden');
            document.getElementById('empty-state').classList.add('hidden');
            paidStatus.textContent = '⚠️ Payment Pending';
            paidStatus.className = 'text-lg font-semibold text-yellow-600 mt-2';
        }
    } catch (error) {
        console.error('Dashboard load error:', error);
        alert('Error loading dashboard: ' + error.message);
    }
});

