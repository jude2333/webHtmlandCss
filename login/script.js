document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
  
    const data = await response.json();
  
    if (response.ok) {
      alert('Login successful!');
      // Redirect to a different page or perform other actions
    } else {
      document.getElementById('message').textContent = data.message;
    }
  });