const commentFormHandler = async (event) => {
  event.preventDefault();
  const commentBody = document.querySelector('#comment').value.trim();
  const button = document.querySelector('.submit-btn');
  const blogId = parseInt(button.dataset.blogid);
  const statusMsg = document.querySelector('.comment-status');

  console.log("Blog id:",blogId);
  const response = await fetch('/api/blogs/comments', {
    method: 'POST',
    body: JSON.stringify({ commentBody, blogId }),
    headers: {'Content-Type': 'application/json' },
  });

  if (response.ok) {
    statusMsg.classList.remove('invisible');
  } else {
    statusMsg.textContent = 'Post failed';
    statusMsg.classList.remove('text-success');
    statusMsg.classList.add('text-danger');
    statusMsg.classList.remove('invisible');
  }
}

document.querySelector('.comment-form')
  .addEventListener('submit', commentFormHandler);