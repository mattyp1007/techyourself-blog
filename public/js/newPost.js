const newPostFormHandler = async (event) => {
  event.preventDefault();
  const postTitle = document.querySelector('#post-title').value.trim();
  const postBody = document.querySelector('#post-body').value.trim();
  const statusMsg = document.querySelector('.post-status');
  const response = await fetch('/api/blogs', {
    method: 'POST',
    body: JSON.stringify({ postTitle, postBody }),
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

document.querySelector('.newpost-form')
  .addEventListener('submit', newPostFormHandler);