const newsletterForm = document.getElementById('signup-form');
const emailInput = document.getElementById('email');
const successMessage = document.querySelector('.success-message');

newsletterForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = emailInput.value;

  if (email === '') {
    alert('Please enter your email address.');
    return;
  }

  if (!isValidEmail(email)) {
    alert('Please enter a valid email address.');
    return;   

  }

  try {
    const response = await fetch('/submit-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `email=${encodeURIComponent(email)}`
    });

    if (response.ok) {
      successMessage.classList.add('show');
      console.log('Email submitted successfully!');
    } else {
      console.error('Error sending email:', response.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
  }
});

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}