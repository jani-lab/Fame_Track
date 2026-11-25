const KEY='fametrack-blog-posts';
const escapeHTML=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
function readPosts(){try{const posts=JSON.parse(localStorage.getItem(KEY)||'[]');return Array.isArray(posts)?posts:[]}catch{return[]}}
let posts=readPosts();
const postList=document.getElementById('blog-posts'),status=document.getElementById('blog-status');
document.getElementById('year').textContent=new Date().getFullYear();
function render(){
  posts=readPosts().sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
  postList.innerHTML=posts.length?posts.map(post=>`<article class="blog-post">
    <div class="blog-post-meta"><span class="tag">${escapeHTML(post.category)}</span><time>${escapeHTML(new Date(post.createdAt).toLocaleString())}</time></div>
    <h3>${escapeHTML(post.title)}</h3><p class="blog-post-body">${escapeHTML(post.body)}</p>
    <div class="blog-post-actions"><button class="topic-delete" type="button" data-delete="${escapeHTML(post.id)}">Delete this post</button></div>
  </article>`).join(''):'<p class="empty">No blog posts yet. You can write the first one!</p>';
}
document.getElementById('blog-form').addEventListener('submit',event=>{
  event.preventDefault();
  const title=document.getElementById('blog-title').value.trim(),body=document.getElementById('blog-body').value.trim();
  if(!title||!body)return;
  posts.push({id:`blog-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,title,body,category:document.getElementById('blog-category').value,createdAt:new Date().toISOString()});
  localStorage.setItem(KEY,JSON.stringify(posts));event.currentTarget.reset();status.textContent='Your post is saved in this browser.';render();
});
postList.addEventListener('click',event=>{
  const button=event.target.closest('[data-delete]');if(!button)return;
  posts=posts.filter(post=>post.id!==button.dataset.delete);localStorage.setItem(KEY,JSON.stringify(posts));render();
});
render();
