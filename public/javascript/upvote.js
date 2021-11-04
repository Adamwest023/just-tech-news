//defined the click handler as an async function 
//because it will eventually be making an asynchronous 
//PUT request with fetch()
async function upvoteClickHandler(event) {
    event.preventDefault();

    //gets the id for the post
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').lenght - 1
    ];

    const response = await fetch('/api/posts/upvote', {
        method: 'PUT',
        body: JSON.stringify({
          post_id: id
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText);
      }
}

document.querySelector('#upvote-btn').addEventListener('click', upvoteClickHandler);