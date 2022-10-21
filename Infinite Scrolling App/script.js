const filter = document.getElementById('filter-container');
const newsFeed = document.getElementById('news-feed-container');
const loader = document.getElementById('loader')
//Global Variable
let limit = 5;
let page = 1;

fetchPost = async () => {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
    const data = response.data;
    return data;
}

renderPosts = async () => {
    const posts = await fetchPost();
    //console.log(posts);
    posts.forEach( post => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');
        postDiv.innerHTML = `
        <div class="post-id">${post.id}</div>
            <div class="post-content">
                <h2 class="post-title">${post.title}</h2>
                <p class="post-body">${post.body}</p>
            </div>
        `;
        newsFeed.appendChild(postDiv)
    });
}

showLoader = () => {
    loader.classList.add('show');
    page++;
    renderPosts();
    loader.classList.add()
}

filterPosts = (e) => {
    const filterKeyword = e.target.value.toLowerCase();
    const posts = document.querySelectorAll('.post');
    posts.forEach( post => {
        const title = post.querySelector('.post-title').innerText;
        const body = post.querySelector('.post-body').innerText;
        if ( title.indexOf(filterKeyword) >= 0 || title.indexOf(filterKeyword) >= 0 ) {
            post.style.display = 'flex'
        } else {
            post.style.display = 'none'
        }
    })
};

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight} = document.documentElement;
    if ( scrollTop + clientHeight >= scrollHeight - 1 ) {
        showLoader();
    };
});

filter.addEventListener('input', filterPosts)

renderPosts();
