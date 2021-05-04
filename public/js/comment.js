const commentFormHandler = async (event) => {
  event.preventDefault();
  const commentBody = document.querySelector('#comment').value.trim();
  const button = document.querySelector('.submit-btn');
  const blogId = parseInt(button.dataset.blogid);
  console.log("Blog id:",blogId);
  const response = await fetch('/api/comments', {
    method: 'POST',
    body: JSON.stringify({ commentBody, blogId }),
    headers: {'Content-Type': 'application/json' },
  });

  if (response.ok) {
    alert('Comment submitted');
  } else {
    alert('Comment failed to submit');
  }
}

document.querySelector('.comment-form')
  .addEventListener('submit', commentFormHandler);